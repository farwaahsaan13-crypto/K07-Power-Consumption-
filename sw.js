const C='k07-v4';
const put=(r,n)=>{const cp=n.clone();caches.open(C).then(c=>c.put(r,cp));return n};
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET')return;
if(new URL(r.url).hostname=='api.github.com')return;const same=new URL(r.url).origin==location.origin;
e.respondWith(same?fetch(r,{cache:'no-cache'}).then(n=>put(r,n)).catch(()=>caches.match(r)):caches.match(r).then(x=>x||fetch(r).then(n=>put(r,n))))});
