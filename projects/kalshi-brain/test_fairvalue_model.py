"""Tests for fairvalue_model. Run: cd projects/kalshi-brain && python3 -m unittest -v"""
import ast
import math
import os
import random
import unittest
from statistics import NormalDist

import fairvalue_model as fv

HOUR = 3600.0
DAY = 24 * HOUR
N = NormalDist()


def bs_digital_r0(spot, strike, tte_seconds, vol):
    """Independent Black-Scholes cash-or-nothing call value with r = 0 (statistics.NormalDist)."""
    t = tte_seconds / (365.0 * 24 * 3600)
    sig = vol * math.sqrt(t)
    d2 = (math.log(spot / strike) - 0.5 * sig * sig) / sig
    return N.cdf(d2)


class TestBlackScholesSanity(unittest.TestCase):
    TOL = 1e-9  # stated tolerance vs the independent closed form

    def test_matches_bs_digital_on_grid(self):
        for spot in (30_000.0, 68_000.0, 100_000.0):
            for mny in (0.95, 0.99, 1.0, 1.005, 1.02, 1.1):
                for tte in (5 * 60, HOUR, 4 * HOUR, DAY, 7 * DAY):
                    for vol in (0.2, 0.5, 0.9):
                        strike = spot * mny
                        got = fv.prob_above(spot, strike, tte, vol)
                        want = bs_digital_r0(spot, strike, tte, vol)
                        self.assertAlmostEqual(got, want, delta=self.TOL,
                                               msg=f"{spot} {strike} {tte} {vol}")

    def test_matches_monte_carlo_gbm(self):
        rng = random.Random(1234)
        spot, strike, tte, vol = 68_000.0, 68_500.0, 4 * HOUR, 0.55
        sig = vol * math.sqrt(tte / fv.SECONDS_PER_YEAR)
        n = 200_000
        hits = sum(1 for _ in range(n)
                   if spot * math.exp(-0.5 * sig * sig + sig * rng.gauss(0, 1)) > strike)
        p_mc = hits / n
        se = math.sqrt(p_mc * (1 - p_mc) / n)
        self.assertLess(abs(fv.prob_above(spot, strike, tte, vol) - p_mc), 4 * se)


class TestShape(unittest.TestCase):
    def test_decreasing_in_strike(self):
        spot, tte, vol = 68_000.0, HOUR, 0.5
        strikes = [spot * (0.9 + 0.002 * i) for i in range(101)]
        probs = [fv.prob_above(spot, k, tte, vol) for k in strikes]
        for a, b in zip(probs, probs[1:]):
            self.assertGreaterEqual(a, b)
        self.assertGreater(probs[0], probs[-1])

    def test_atm_tends_to_half_from_below_as_tte_shrinks(self):
        spot, vol = 68_000.0, 0.6
        ttes = [7 * DAY, DAY, 4 * HOUR, HOUR, 600, 60, 1]
        probs = [fv.prob_above(spot, spot, t, vol) for t in ttes]
        for a, b in zip(probs, probs[1:]):
            self.assertLessEqual(a, b)          # rises toward 0.5
        for p in probs:
            self.assertLess(p, 0.5)             # Ito term keeps median below spot
        self.assertAlmostEqual(probs[-1], 0.5, delta=1e-3)

    def test_itm_and_otm_converge_as_tte_shrinks(self):
        spot, vol = 68_000.0, 0.6
        ttes = [DAY, 4 * HOUR, HOUR, 600, 60]
        itm = [fv.prob_above(spot, spot * 0.99, t, vol) for t in ttes]
        otm = [fv.prob_above(spot, spot * 1.01, t, vol) for t in ttes]
        for a, b in zip(itm, itm[1:]):
            self.assertLessEqual(a, b)
        for a, b in zip(otm, otm[1:]):
            self.assertGreaterEqual(a, b)
        self.assertGreater(itm[-1], 0.999)
        self.assertLess(otm[-1], 0.001)

    def test_far_itm_otm_limits(self):
        self.assertGreater(fv.prob_above(68_000, 30_000, DAY, 0.6), 1 - 1e-9)
        self.assertLess(fv.prob_above(68_000, 150_000, DAY, 0.6), 1e-9)

    def test_higher_vol_pulls_toward_middle(self):
        spot, tte = 68_000.0, DAY
        self.assertLess(fv.prob_above(spot, spot * 0.97, tte, 0.9),
                        fv.prob_above(spot, spot * 0.97, tte, 0.3))
        self.assertGreater(fv.prob_above(spot, spot * 1.03, tte, 0.9),
                           fv.prob_above(spot, spot * 1.03, tte, 0.3))

    def test_always_in_unit_interval(self):
        rng = random.Random(7)
        for _ in range(2000):
            spot = rng.uniform(1_000, 200_000)
            p = fv.prob_above(spot, spot * rng.uniform(0.5, 2.0),
                              rng.uniform(0, 30 * DAY), rng.uniform(0, 3))
            self.assertTrue(0.0 <= p <= 1.0)


class TestEdgeCases(unittest.TestCase):
    def test_expired_or_zero_vol_is_step(self):
        for tte, vol in ((0, 0.5), (HOUR, 0.0), (0, 0.0)):
            self.assertEqual(fv.prob_above(100, 99, tte, vol), 1.0)
            self.assertEqual(fv.prob_above(100, 101, tte, vol), 0.0)
            self.assertEqual(fv.prob_above(100, 100, tte, vol), 0.5)

    def test_bad_inputs_raise(self):
        bad = [(0, 100, HOUR, 0.5), (100, 0, HOUR, 0.5), (-1, 100, HOUR, 0.5),
               (100, 100, -1, 0.5), (100, 100, HOUR, -0.1),
               (float("nan"), 100, HOUR, 0.5), (100, float("inf"), HOUR, 0.5),
               ("x", 100, HOUR, 0.5), (None, 100, HOUR, 0.5)]
        for args in bad:
            with self.assertRaises(ValueError, msg=str(args)):
                fv.prob_above(*args)


class TestBetween(unittest.TestCase):
    def test_equals_difference_and_partitions(self):
        spot, tte, vol = 68_000.0, 4 * HOUR, 0.5
        edges = [60_000 + 500 * i for i in range(33)]
        total = fv.prob_above(spot, edges[-1], tte, vol) + (1 - fv.prob_above(spot, edges[0], tte, vol))
        for lo, hi in zip(edges, edges[1:]):
            p = fv.prob_between(spot, lo, hi, tte, vol)
            self.assertAlmostEqual(p, fv.prob_above(spot, lo, tte, vol) - fv.prob_above(spot, hi, tte, vol))
            self.assertTrue(0.0 <= p <= 1.0)
            total += p
        self.assertAlmostEqual(total, 1.0, places=12)

    def test_bad_range_raises(self):
        with self.assertRaises(ValueError):
            fv.prob_between(100, 101, 101, HOUR, 0.5)


class TestRealizedVol(unittest.TestCase):
    def test_exact_on_known_returns(self):
        # Alternating +r/-r log returns: per-bar RMS is exactly r.
        r, bar = 0.001, 60.0
        closes = [100.0]
        for i in range(100):
            closes.append(closes[-1] * math.exp(r if i % 2 == 0 else -r))
        want = r * math.sqrt(fv.SECONDS_PER_YEAR / bar)
        self.assertAlmostEqual(fv.realized_vol(closes, bar), want, places=12)

    def test_recovers_gbm_sigma(self):
        rng = random.Random(42)
        sigma, bar = 0.6, 300.0
        step = sigma * math.sqrt(bar / fv.SECONDS_PER_YEAR)
        closes = [68_000.0]
        for _ in range(20_000):
            closes.append(closes[-1] * math.exp(-0.5 * step * step + step * rng.gauss(0, 1)))
        self.assertAlmostEqual(fv.realized_vol(closes, bar), sigma, delta=0.02)

    def test_window_uses_latest_returns(self):
        calm = [100.0 * (1.0001 if i % 2 else 1.0) for i in range(200)]
        wild = [calm[-1]]
        for i in range(60):
            wild.append(wild[-1] * (1.01 if i % 2 == 0 else 1 / 1.01))
        closes = calm + wild[1:]
        self.assertGreater(fv.realized_vol(closes, 60, window=60), fv.realized_vol(closes, 60))

    def test_thin_flat_and_floor(self):
        self.assertIsNone(fv.realized_vol([100.0] * 10, 60))              # 9 returns < 20
        self.assertEqual(fv.realized_vol([100.0] * 50, 60), 0.0)          # flat
        self.assertEqual(fv.realized_vol([100.0] * 50, 60, floor=0.2), 0.2)

    def test_bad_inputs_raise(self):
        with self.assertRaises(ValueError):
            fv.realized_vol([100, 0, 100] * 10, 60)
        with self.assertRaises(ValueError):
            fv.realized_vol([100.0] * 30, 0)
        with self.assertRaises(ValueError):
            fv.realized_vol([100.0, float("nan")] * 15, 60)
        with self.assertRaises(ValueError):
            fv.realized_vol([100.0] * 30, 60, window=0)


class TestIsolation(unittest.TestCase):
    def test_imports_are_pure(self):
        path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fairvalue_model.py")
        with open(path) as fh:
            tree = ast.parse(fh.read())
        mods = set()
        for node in ast.walk(tree):
            if isinstance(node, ast.Import):
                mods.update(a.name.split(".")[0] for a in node.names)
            elif isinstance(node, ast.ImportFrom):
                mods.add((node.module or "").split(".")[0])
        self.assertLessEqual(mods, {"__future__", "math", "typing"})


if __name__ == "__main__":
    unittest.main()
