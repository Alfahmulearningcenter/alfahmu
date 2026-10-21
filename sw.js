/* Service worker Portal Al-Fahmu
 * - Tampilan portal disimpan agar cepat terbuka (dan tetap muncul walau sinyal lemah)
 * - Halaman utama selalu dicek ke internet dulu, jadi update di GitHub langsung terpakai
 * - Data dari Apps Script TIDAK disimpan di sini (selalu langsung ke server)
 * Naikkan VERSI bila mengganti logo/ikon.
 */
const VERSI = 'alfahmu-v3';
const FILE = ['./', 'index.html', 'manifest.webmanifest', 'logo.png', 'bg.jpg', 'icon-192.png', 'icon-512.png', 'favicon.png', 'apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSI).then(c => c.addAll(FILE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.indexOf('alfahmu-') === 0 && k !== VERSI).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return; // Apps Script & font: langsung ke internet
  if (url.pathname.indexOf('/sahabat/') > -1) return; // folder Sahabat Al-Fahmu punya service worker sendiri

  // Halaman: internet dulu, cadangan dari simpanan
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then(r => { const salin = r.clone(); caches.open(VERSI).then(c => c.put('index.html', salin)); return r; })
        .catch(() => caches.match('index.html'))
    );
    return;
  }

  // Gambar & file lain: simpanan dulu, lalu perbarui di belakang
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
