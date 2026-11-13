const {chromium}=require('playwright');
const fs=require('fs');
const phase=process.argv[2]||'baseline';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 const context=await browser.newContext({viewport:{width:360,height:800},isMobile:true,hasTouch:true});
 const page=await context.newPage();const errors=[],requests=[];let value='100',orders=true;
 page.on('pageerror',e=>errors.push(String(e)));
 page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 await page.addInitScript(()=>{
  window.__qa={permissions:[],sockets:[],delivered:[]};
  class N {static permission='default';static requestPermission(){window.__qa.permissions.push(navigator.userActivation.isActive);N.permission='granted';return Promise.resolve('granted')}constructor(t,o){window.__qa.delivered.push({t,o})}}
  window.Notification=N;
  class WS {static OPEN=1;static CLOSED=3;readyState=0;constructor(){window.__qa.sockets.push(this);setTimeout(()=>{this.readyState=1;this.onopen?.()},20)}send(){}close(){this.readyState=3;this.onclose?.()}}
  window.WebSocket=WS;
  window.__emit=(channel,data)=>window.__qa.sockets.at(-1)?.onmessage?.({data:JSON.stringify({channel,data})});
  window.__disconnect=()=>window.__qa.sockets.at(-1)?.close();
 });
 await page.route('https://api.hyperliquid.xyz/**',async route=>{
  const b=route.request().postDataJSON();requests.push(b.type);
  let data=[];
  if(b.type==='clearinghouseState') data={marginSummary:{accountValue:value},withdrawable:'80'};
  if(b.type==='frontendOpenOrders')data=orders?[{coin:'HYPE',oid:1,side:'B',sz:'1',limitPx:'100',timestamp:Date.now(),origSz:'1'}]:[];
  if(b.type==='userFillsByTime')data=[{coin:'HYPE',px:'100',sz:'1',side:'B',time:Date.now()-30000,startPosition:'0',dir:'Open Long',closedPnl:'1',hash:'0xfixture',oid:1,crossed:true,fee:'0.1',tid:1,feeToken:'USDC'}];
  await route.fulfill({json:data});
 });
 await page.goto('http://127.0.0.1:5173/');await page.waitForTimeout(500);
 const baseline={permissionsOnMount:await page.evaluate(()=>window.__qa.permissions.length),homeText:await page.locator('main').innerText()};
 const tabs={};
 for(const tab of ['Home','Chart','COMS','Projects','Activity']){
  await page.getByRole('button',{name:tab,exact:true}).click();
  tabs[tab]={text:await page.locator('main').innerText(),width:await page.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth})),smallTargets:await page.locator('button,a').evaluateAll(es=>es.filter(e=>e.getBoundingClientRect().height<44).map(e=>({text:e.textContent.trim(),height:e.getBoundingClientRect().height})))};
  await page.screenshot({path:`../evidence/${phase}-${tab.toLowerCase()}.png`,fullPage:true});
 }
 await page.getByRole('button',{name:'Home',exact:true}).click();await page.getByRole('button',{name:'Trading →',exact:true}).click();
 tabs.Trading={text:await page.locator('main').innerText(),width:await page.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth}))};
 await page.screenshot({path:`../evidence/${phase}-trading.png`,fullPage:true});
 value='200';orders=false;
 await page.evaluate(()=>window.__emit('orderUpdates',[{order:{coin:'HYPE',oid:1,side:'B',sz:'0',origSz:'1',limitPx:'100',timestamp:Date.now()},status:'canceled',statusTimestamp:Date.now()}]));
 await page.waitForTimeout(500);
 const afterOrder=await page.locator('main').innerText();
 await page.evaluate(()=>window.__disconnect());await page.waitForTimeout(50);
 const afterDisconnect=await page.locator('main').innerText();
 await page.getByRole('button',{name:'← Back',exact:true}).click();
 if(phase==='final'){
  await page.getByRole('button',{name:'Enable fill alerts',exact:true}).click();
  await page.waitForTimeout(50);
 }
 const result={phase,fixture:'Synthetic read-only zero-address responses; no live API calls',baseline,tabs,afterOrder,afterDisconnect,requests,permissions:await page.evaluate(()=>window.__qa.permissions),errors};
 fs.writeFileSync(`../evidence/${phase}-browser.json`,JSON.stringify(result,null,2));
 console.log(JSON.stringify(result,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
