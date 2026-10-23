const V='pp-mvklglqu';const FILES=['./','index.html','stockfish.js','stockfish.wasm','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET')return;
 if(u.origin!==location.origin){e.respondWith(caches.open(V+'-ext').then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(n=>{if(n.ok||n.type==='opaque')c.put(e.request,n.clone());return n;}).catch(()=>r))));return;}
 const isDoc=e.request.mode==='navigate';
 if(isDoc){e.respondWith(fetch(e.request).then(n=>{caches.open(V).then(c=>c.put('index.html',n.clone()));return n;}).catch(()=>caches.match('index.html')));return;}
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
