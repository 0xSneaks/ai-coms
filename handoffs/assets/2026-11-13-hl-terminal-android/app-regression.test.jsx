import {beforeEach,afterEach,expect,it,vi} from 'vitest';
import {JSDOM} from '../qa-runtime/node_modules/jsdom/lib/api.js';
import {indexedDB} from '../Zen-trade/node_modules/fake-indexeddb/build/esm/index.js';
import React, {act} from '../Zen-trade/node_modules/react/index.js';
import {createRoot} from '../Zen-trade/node_modules/react-dom/client.js';
import App from '../Zen-trade/src/App';

let dom,root,sockets,value,orders,permissions,requests,errors;
const fill={coin:'HYPE',px:'100',sz:'1',side:'B',time:Date.now()-30000,startPosition:'0',dir:'Open Long',closedPnl:'1',hash:'0xfixture',oid:1,crossed:true,fee:'0.1',tid:1,feeToken:'USDC'};
const flush=async()=>{await act(async()=>{await new Promise(r=>setTimeout(r,80))})};
const text=()=>document.querySelector('main').textContent;
async function click(name){const b=[...document.querySelectorAll('button')].find(b=>b.textContent===name);expect(b,`button ${name}`).toBeTruthy();await act(async()=>b.click());await flush()}
function emit(channel,data){sockets.at(-1).onmessage({data:JSON.stringify({channel,data})})}
beforeEach(async()=>{
 dom=new JSDOM('<div id="root"></div>',{url:'http://localhost',pretendToBeVisual:true});
 Object.assign(globalThis,{window:dom.window,document:dom.window.document,localStorage:dom.window.localStorage,indexedDB,IS_REACT_ACT_ENVIRONMENT:true});
 value='100';orders=true;sockets=[];permissions=[];requests=[];errors=[];
 vi.spyOn(console,'error').mockImplementation((...args)=>errors.push(args.join(' ')));
 class WS {static OPEN=1;readyState=0;constructor(){sockets.push(this);queueMicrotask(()=>{this.readyState=1;this.onopen?.()})}send(){}close(){this.readyState=3;this.onclose?.()}}
 vi.stubGlobal('WebSocket',WS);
 class N {static permission='default';static requestPermission(){permissions.push(true);N.permission='granted';return Promise.resolve('granted')}constructor(){}}
 vi.stubGlobal('Notification',N);
 vi.stubGlobal('fetch',vi.fn(async(_url,opts)=>{
  const b=JSON.parse(opts.body);requests.push(b.type);
  let data=[];
  if(b.type==='clearinghouseState')data={marginSummary:{accountValue:value},withdrawable:'80'};
  if(b.type==='frontendOpenOrders')data=orders?[{coin:'HYPE',oid:1,side:'B',sz:'1',origSz:'1',limitPx:'100',timestamp:Date.now()}]:[];
  if(b.type==='userFillsByTime')data=[fill];
  return {ok:true,json:async()=>data};
 }));
 root=createRoot(document.getElementById('root'));await act(async()=>root.render(<App/>));await flush();
});
afterEach(async()=>{await act(async()=>root.unmount());dom.window.close();expect(errors).toEqual([]);vi.restoreAllMocks();vi.unstubAllGlobals()});
it('never requests notification permission on mount, only through the explicit alert control',async()=>{
 expect(permissions).toHaveLength(0);await click('Enable fill alerts');expect(permissions).toHaveLength(1);
});
it('retains partial-history disclosure after a successful capped REST response',()=>{expect(text()).toContain('Trade history incomplete')});
it('renders all destinations and returns from Home to Trading',async()=>{
 for(const [tab,expected] of [['Chart','Market feed not yet wired'],['COMS','No crew summary available'],['Projects','not driven by a live source'],['Activity','Since you last checked'],['Home','Needs attention']]){await click(tab);expect(text()).toContain(expected)}
 await click('Trading →');expect(text()).toContain('Open orders');await click('← Back');expect(text()).toContain('Needs attention');
});
it('refreshes account and open orders after an order event',async()=>{
 value='200';orders=false;await act(async()=>emit('orderUpdates',[{order:{coin:'HYPE',oid:1,side:'B',sz:'0',origSz:'1',limitPx:'100',timestamp:Date.now()},status:'canceled',statusTimestamp:Date.now()}]));await flush();
 await click('Trading →');expect(text()).toContain('200');expect(text()).toContain('No open orders.');
});
it('marks account data stale after disconnect instead of implying current orders',async()=>{
 await act(async()=>sockets.at(-1).close());await flush();await click('Trading →');expect(text()).toContain('stale');
});
it('refreshes funding-only events and excludes persisted fills outside the 30-day window',async()=>{
 const db=await new Promise((resolve,reject)=>{const r=indexedDB.open('hl-terminal',1);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)});
 await new Promise((resolve,reject)=>{const tx=db.transaction('fills','readwrite');tx.objectStore('fills').put({key:'0x0000000000000000000000000000000000000000:99:99',fill:{...fill,oid:99,tid:99,closedPnl:'10000',time:Date.now()-40*86400000}});tx.oncomplete=resolve;tx.onabort=reject});db.close();
 const before=requests.length;await act(async()=>emit('userFundings',{user:'0x0000000000000000000000000000000000000000',fundings:[],isSnapshot:false}));await flush();expect(requests.length).toBeGreaterThan(before);
 await click('Trading →');expect(text()).not.toContain('10000');
});
it('recovers from failed account refresh and clears its stale/error state',async()=>{
 fetch.mockImplementationOnce(async()=>{throw Error('fixture offline')});
 await act(async()=>emit('userFundings',{fundings:[],isSnapshot:false}));await flush();
 expect(text()).toContain('Account data stale');expect(text()).toContain('fixture offline');
 value='250';await act(async()=>window.dispatchEvent(new dom.window.Event('focus')));await flush();
 expect(text()).toContain('250');expect(text()).not.toContain('Account data stale');expect(text()).not.toContain('fixture offline');
});
it('does not clear a subscription error or relabel its socket live after a REST refresh',async()=>{
 await act(async()=>emit('error',{}));await flush();
 expect(document.querySelector('.conn-pill').textContent).toContain('Unknown');
 await act(async()=>window.dispatchEvent(new dom.window.Event('focus')));await flush();
 expect(text()).toContain('Hyperliquid subscription/server error');
 expect(document.querySelector('.conn-pill').textContent).toContain('Unknown');
});
it('reconciles balances and orders when the socket reconnects',async()=>{
 await act(async()=>sockets.at(-1).close());await flush();value='300';orders=false;
 await act(async()=>{await new Promise(resolve=>setTimeout(resolve,2100))});await flush();
 await click('Trading →');expect(text()).toContain('300');expect(text()).toContain('No open orders.');expect(text()).not.toContain('stale');
});
it('remains silent for fills until alerts are enabled and suppresses snapshots and replay',async()=>{
 await act(async()=>emit('userFills',{isSnapshot:false,fills:[{...fill,tid:51}]}));await flush();
 expect(permissions).toHaveLength(0);
 await click('Enable fill alerts');
 // The protected adapter creates notifications only after permission is granted.
 const deliver=vi.spyOn((await import('../Zen-trade/src/domain/notificationAdapter')).BrowserNotificationAdapter.prototype,'deliver');
 await act(async()=>emit('userFills',{isSnapshot:true,fills:[{...fill,tid:52}]}));await flush();expect(deliver).not.toHaveBeenCalled();
 await act(async()=>emit('userFills',{isSnapshot:false,fills:[{...fill,tid:53}]}));await flush();expect(deliver).toHaveBeenCalledTimes(1);
 await act(async()=>emit('userFills',{isSnapshot:false,fills:[{...fill,tid:53}]}));await flush();expect(deliver).toHaveBeenCalledTimes(1);
});
it('removes a socket-open claim immediately when the browser reports offline',async()=>{
 await act(async()=>window.dispatchEvent(new dom.window.Event('offline')));await flush();
 expect(document.querySelector('.conn-pill').textContent).toContain('Offline');expect(text()).toContain('Account data stale');
});
it('refreshes on its poll interval and expires an old account snapshot',async()=>{
 await act(async()=>root.unmount());
 const callbacks=new Map();const original=globalThis.setInterval;
 vi.spyOn(globalThis,'setInterval').mockImplementation((fn,ms)=>{callbacks.set(ms,[...(callbacks.get(ms)||[]),fn]);return original(fn,ms)});
 root=createRoot(document.getElementById('root'));await act(async()=>root.render(<App/>));await flush();
 value='400';await act(async()=>callbacks.get(30000).forEach(fn=>fn()));await flush();expect(text()).toContain('400');
 const now=Date.now();vi.spyOn(Date,'now').mockReturnValue(now+46000);
 await act(async()=>callbacks.get(1000).forEach(fn=>fn()));await flush();expect(text()).toContain('Account data stale');
});
