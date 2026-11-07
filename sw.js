const CACHE_NAME="linkguru-pwa-v1";const APP_SHELL=["./","./index.html","./manifest.webmanifest","./icon.svg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)) )));self.clients.claim()});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);if(u.origin!==self.location.origin)return;
if(r.mode==="navigate"||u.pathname.endsWith(".html")){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE_NAME).then(c=>c.put(r,cp));return res}).catch(()=>caches.match(r).then(hit=>hit||caches.match("./index.html"))));return}
e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(CACHE_NAME).then(c=>c.put(r,cp))}return res})))});
