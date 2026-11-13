// 360px browser QA for Zen-trade calm hub. Hermetic: all Hyperliquid REST/WS intercepted with synthetic zero-address fixtures.
const { chromium } = require('playwright');
const fs = require('fs');
const OUT = process.argv[2];
fs.mkdirSync(OUT, { recursive: true });

const fixtures = {
  clearinghouseState: { marginSummary: { accountValue: '0.0', totalNtlPos: '0.0', totalRawUsd: '0.0', totalMarginUsed: '0.0' }, assetPositions: [], withdrawable: '0.0', time: Date.now() },
  frontendOpenOrders: [],
  userFillsByTime: [],
  userFunding: [],
};

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 360, height: 780 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  const log = { console: [], pageErrors: [], requests: [], externalBlocked: [], ws: [], steps: [] };

  page.on('console', m => log.console.push({ type: m.type(), text: m.text() }));
  page.on('pageerror', e => log.pageErrors.push(String(e)));

  await page.route(/hyperliquid/, async route => {
    const req = route.request();
    let type = null;
    try { type = JSON.parse(req.postData() || '{}').type; } catch {}
    log.requests.push({ url: req.url(), type });
    const body = type in fixtures ? fixtures[type] : null;
    if (body === null) return route.fulfill({ status: 400, body: 'unknown fixture' });
    return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(body) });
  });
  // Block any other non-localhost traffic (e.g. COMS link prefetch) so no real network is used.
  await page.route(url => !/^https?:\/\/localhost/.test(url.toString()) && !/hyperliquid/.test(url.toString()), r => { log.externalBlocked.push(r.request().url()); r.abort(); });
  await page.routeWebSocket(/hyperliquid/, ws => {
    log.ws.push({ url: ws.url() });
    ws.onMessage(m => { log.ws.push({ in: String(m).slice(0, 200) }); });
  });

  const shot = async name => {
    await page.waitForTimeout(400);
    const overflow = await page.evaluate(() => ({ scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth }));
    const small = await page.evaluate(() => [...document.querySelectorAll('button,a')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.height < 44 || r.width < 44); }).map(e => ({ text: e.textContent.trim().slice(0, 30), w: Math.round(e.getBoundingClientRect().width), h: Math.round(e.getBoundingClientRect().height) })));
    await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
    const heading = await page.evaluate(() => (document.querySelector('main')?.innerText || '').slice(0, 300));
    log.steps.push({ name, horizontalOverflow: overflow.scrollW > overflow.clientW, ...overflow, tapTargetsUnder44: small, mainText: heading });
  };
  const tab = async label => page.locator('nav.tabbar button', { hasText: label }).click();

  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  await shot('01-home');
  const tabs = await page.locator('nav.tabbar button').allInnerTexts();
  log.tabs = tabs;
  for (const [i, t] of tabs.entries()) {
    if (/home/i.test(t)) continue;
    await tab(t); await shot(`0${i + 1}-${t.toLowerCase().replace(/\W+/g, '-')}`);
  }
  await tab(tabs.find(t => /home/i.test(t)));
  await page.getByRole('button', { name: /Trading/ }).click();
  await shot('10-home-trading');
  await page.getByRole('button', { name: /Back/ }).click();
  await shot('11-trading-back-home');
  log.backReturnedHome = (await page.locator('nav.tabbar button.active').innerText());

  fs.writeFileSync(`${OUT}/qa-log.json`, JSON.stringify(log, null, 2));
  await browser.close();
})().catch(e => { console.error('QA FAILED', e); process.exit(1); });
