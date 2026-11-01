"""Fair-value model for Kalshi BTC "above/below" (KXBTCD) and range (KXBTC) markets.

Pure functions only: no I/O, no network, no trading, no signing, no credentials.
The model advises; it never places anything.

Public API
----------
prob_above(spot, strike, tte_seconds, vol) -> float in [0, 1]
    Probability that BTC settles strictly above `strike` after `tte_seconds`.
prob_between(spot, low, high, tte_seconds, vol) -> float in [0, 1]
    Probability that BTC settles in [low, high). Convenience for range markets.
realized_vol(closes, bar_seconds, *, window=None, min_returns=20, floor=None)
    Annualized volatility estimate from evenly spaced close prices.

Model and assumptions (read before trusting the numbers)
--------------------------------------------------------
1. Distribution: BTC at expiry is lognormal (geometric Brownian motion).
   P(S_T > K) = N(d2), d2 = (ln(S/K) - 0.5 * sigma^2 * T) / (sigma * sqrt(T)).
   This is the Black-Scholes cash-or-nothing digital with r = 0.
2. Drift: zero (apart from the -0.5*sigma^2 Ito term, which keeps the median
   below spot). Over 1 h to 1 day horizons, any drift estimate is noise next to
   volatility; a directional view belongs in the signal layer (HLBOTV2), not
   here. If a caller wants to tilt the model, do it explicitly and log it.
3. Interest/funding: ignored. At these horizons a few % a year moves the
   probability by far less than vol uncertainty does.
4. Time: crypto trades 24/7, so a year is 365 * 24 * 3600 seconds. Use the
   same convention in realized_vol (it does) so vol and TTE stay consistent.
5. Volatility is constant to expiry. The caller supplies it; `realized_vol` is
   one way to get it.

Known weaknesses (not hidden)
-----------------------------
- Fat tails / jumps: BTC returns are fatter-tailed than lognormal. The model
  overstates certainty for strikes far from spot (probabilities too close to
  0 or 1). Treat deep ITM/OTM edges with suspicion.
- Vol clustering: realized vol lags regime changes (news, liquidations, US
  open). A quiet window right before an event underprices risk.
- Expiry-minute effects: Kalshi settles on an index average/print near expiry,
  not a single instantaneous price. Near expiry the model's step function is
  sharper than the real settlement. Do not trade the last minutes on this.
- Ties: at exactly spot == strike at expiry the function returns 0.5. Check
  the market's rules ("above" vs "at or above") if this ever matters.
- Calibration is unproven until checked against settled hourly BTC outcomes
  (Muse's paper scoreboard owns that check).
"""
from __future__ import annotations

import math
from typing import Optional, Sequence

SECONDS_PER_YEAR = 365.0 * 24.0 * 3600.0
_SQRT2 = math.sqrt(2.0)


def _norm_cdf(x: float) -> float:
    # erfc form keeps precision in the far tails.
    return 0.5 * math.erfc(-x / _SQRT2)


def _finite(name: str, value: float) -> float:
    try:
        v = float(value)
    except (TypeError, ValueError):
        raise ValueError(f"{name} must be a number") from None
    if not math.isfinite(v):
        raise ValueError(f"{name} must be finite")
    return v


def prob_above(spot: float, strike: float, tte_seconds: float, vol: float) -> float:
    """P(BTC strictly above `strike` at expiry), lognormal, zero drift.

    spot, strike: positive prices in the same unit (USD).
    tte_seconds: seconds to expiry, >= 0.
    vol: annualized volatility as a fraction (0.5 == 50%), >= 0.
    """
    s = _finite("spot", spot)
    k = _finite("strike", strike)
    t = _finite("tte_seconds", tte_seconds)
    v = _finite("vol", vol)
    if s <= 0 or k <= 0:
        raise ValueError("spot and strike must be > 0")
    if t < 0:
        raise ValueError("tte_seconds must be >= 0")
    if v < 0:
        raise ValueError("vol must be >= 0")

    sig = v * math.sqrt(t / SECONDS_PER_YEAR)
    if sig == 0.0:
        # No time or no vol left: the outcome is already known.
        if s > k:
            return 1.0
        if s < k:
            return 0.0
        return 0.5
    d2 = (math.log(s / k) - 0.5 * sig * sig) / sig
    return min(1.0, max(0.0, _norm_cdf(d2)))


def prob_between(spot: float, low: float, high: float, tte_seconds: float, vol: float) -> float:
    """P(low <= BTC < high at expiry). For KXBTC range buckets."""
    lo = _finite("low", low)
    hi = _finite("high", high)
    if not lo < hi:
        raise ValueError("low must be < high")
    p = prob_above(spot, lo, tte_seconds, vol) - prob_above(spot, hi, tte_seconds, vol)
    return min(1.0, max(0.0, p))


def realized_vol(
    closes: Sequence[float],
    bar_seconds: float,
    *,
    window: Optional[int] = None,
    min_returns: int = 20,
    floor: Optional[float] = None,
) -> Optional[float]:
    """Annualized realized volatility from evenly spaced closes.

    Method: close-to-close log returns, zero-mean RMS (sqrt of the mean squared
    return), scaled by sqrt(SECONDS_PER_YEAR / bar_seconds). Zero-mean because
    at 1m/5m bars the sample mean is noise and subtracting it only adds error.

    closes: chronological close prices, all > 0, one per bar, no gaps. Missing
        bars inflate the return across the gap; fill or drop them first.
    bar_seconds: bar length (60 for 1m, 300 for 5m).
    window: use only the last `window` returns (e.g. 240 one-minute bars = 4 h).
        None uses all of them. Match the window to the market horizon: a few
        hours of 1m bars for hourly markets, a day or more of 5m bars for daily.
    min_returns: if fewer returns are available, return None (too thin to
        estimate; the caller should skip the market, not guess).
    floor: optional minimum annualized vol. Flat data gives 0.0, which turns
        prob_above into a step function; set a floor (e.g. 0.2) to avoid that.

    Returns None when data is too thin; otherwise a float >= 0.
    """
    b = _finite("bar_seconds", bar_seconds)
    if b <= 0:
        raise ValueError("bar_seconds must be > 0")
    if min_returns < 1:
        raise ValueError("min_returns must be >= 1")
    if window is not None and window < 1:
        raise ValueError("window must be >= 1")
    prices = [_finite("close", c) for c in closes]
    if any(p <= 0 for p in prices):
        raise ValueError("closes must all be > 0")

    rets = [math.log(prices[i] / prices[i - 1]) for i in range(1, len(prices))]
    if window is not None:
        rets = rets[-window:]
    if len(rets) < min_returns:
        return None

    per_bar = math.sqrt(sum(r * r for r in rets) / len(rets))
    vol = per_bar * math.sqrt(SECONDS_PER_YEAR / b)
    if floor is not None:
        vol = max(vol, _finite("floor", floor))
    return vol
