const { chromium } = require('playwright');
const OUT=process.argv[2];
(async()=>{
 const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:360,height:780},deviceScaleFactor:2,isMobile:true,hasTouch:true});const p=await ctx.newPage();
 const errs=[];p.on('console',m=>{if(m.type()==='error'||m.type()==='warning')errs.push(m.text())});p.on('pageerror',e=>errs.push(String(e)));
 const fx={clearinghouseState:{marginSummary:{accountValue:'0.0',totalNtlPos:'0.0',totalRawUsd:'0.0',totalMarginUsed:'0.0'},assetPositions:[],withdrawable:'0.0',time:Date.now()},frontendOpenOrders:[],userFillsByTime:[],userFunding:[]};
 await p.route(/hyperliquid/,r=>{const t=JSON.parse(r.request().postData()||'{}').type;r.fulfill({status:200,contentType:'application/json',body:JSON.stringify(fx[t])})});
 await p.routeWebSocket(/hyperliquid/,ws=>{});
 await p.goto('http://localhost:4173/',{waitUntil:'networkidle'});
 const res={};
 for(const [name,go] of [['projects',async()=>p.locator('nav.tabbar button',{hasText:'Projects'}).click()],['trading',async()=>{await p.locator('nav.tabbar button',{hasText:'Home'}).click();await p.getByRole('button',{name:/Trading/}).click();}]]){
  await go();await p.waitForTimeout(300);await p.mouse.wheel(0,5000);await p.waitForTimeout(400);
  res[name]=await p.evaluate(()=>{const nav=document.querySelector('nav.tabbar').getBoundingClientRect();const panels=[...document.querySelectorAll('main *')].filter(e=>e.children.length===0&&e.textContent.trim());const last=panels[panels.length-1].getBoundingClientRect();return{navTop:Math.round(nav.top),lastTextBottom:Math.round(last.bottom),lastText:panels[panels.length-1].textContent.trim().slice(0,40),clear:last.bottom<=nav.top}});
  await p.screenshot({path:`${OUT}/scrolled-bottom-${name}.png`});
 }
 console.log(JSON.stringify({res,errs},null,1));await b.close();
})();
