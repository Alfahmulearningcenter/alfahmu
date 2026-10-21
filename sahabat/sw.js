/* Service worker Sahabat Al-Fahmu
 * - Tampilan disimpan agar cepat terbuka. Dzikir, doa, kalender & tes tetap jalan walau tanpa sinyal.
 * - Halaman utama selalu dicek ke internet dulu, jadi update di GitHub langsung terpakai.
 * - Jawaban kamus/kaidah dari Apps Script TIDAK lewat sini (disimpan di HP oleh halaman itu sendiri).
 * Naikkan VERSI bila mengganti ikon.
 */
const VERSI = 'sahabat-v1';
const FILE = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSI).then(c => c.addAll(FILE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.indexOf('sahabat-') === 0 && k !== VERSI).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return; // Apps Script & font: langsung ke internet

  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then(r => { const salin = r.clone(); caches.open(VERSI).then(c => c.put('index.html', salin)); return r; })
        .catch(() => caches.match('index.html'))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(simpan => {
      const ambil = fetch(e.request).then(r => {
        if (r.ok) { const salin = r.clone(); caches.open(VERSI).then(c => c.put(e.request, salin)); }
        return r;
      }).catch(() => simpan);
      return simpan || ambil;
    })
  );
});
