// Service worker : l'app marche hors ligne, le plan (seances.md) est relu dès qu'il y a du réseau.
const CACHE = "seances-v1";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./seances.md"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Réseau d'abord (pour avoir le dernier plan et la dernière version de l'app), cache sinon.
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  // Délai max de 3 s sur le réseau : en salle avec une mauvaise connexion, on bascule vite sur le cache.
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 3000);
  e.respondWith(
    fetch(req, { cache: "no-store", signal: ctrl.signal })
      .finally(() => clearTimeout(timer))
      .then(res => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match("./index.html")))
  );
});
