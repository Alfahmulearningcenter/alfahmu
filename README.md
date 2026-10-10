# Portal Al-Fahmu Learning Center

Aplikasi portal (PWA) untuk **Guru, Murid, Wali Murid, dan Manajemen**.
Tampilan di-host di **GitHub Pages**, sedangkan data (PIN dan daftar link) tetap di **Google Apps Script + Spreadsheet**.

```
HP pengguna ──► GitHub Pages (portal ini) ──► Apps Script Portal (PIN & daftar link)
                       │
                       └──► 3 aplikasi Apps Script dibuka DI DALAM portal
                            (Manajemen · Guru · Wali Murid)
```

## Isi folder

| File | Fungsi |
|---|---|
| `index.html` | Tampilan portal (jam, login PIN, daftar aplikasi) |
| `manifest.webmanifest` | Agar portal bisa dipasang di HP seperti aplikasi |
| `sw.js` | Supaya portal cepat terbuka |
| `logo.png`, `icon-*.png`, `favicon.png`, `apple-touch-icon.png` | Logo & ikon aplikasi |

## Pengaturan wajib (1 baris)

Di `index.html`, cari:

```js
const API_URL = 'https://script.google.com/macros/s/GANTI_DENGAN_ID_DEPLOY/exec';
```

Ganti dengan link **/exec** Apps Script Portal.

## Agar 3 aplikasi bisa tampil di dalam portal

Di **setiap** Apps Script (Manajemen, Guru, Wali Murid), pastikan `doGet` memiliki baris ini:

```js
.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
```

Contoh:

```js
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Aplikasi Guru Al-Fahmu')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
```

Lalu **Deploy → Manage deployments → ✏️ → New version → Deploy**.
Akses deploy harus **Anyone**, bukan "Anyone with Google account".

Kalau ada aplikasi yang tetap tidak mau tampil di dalam portal, isi kolom **Mode** di sheet `LINKS` dengan `luar`. Aplikasi itu akan dibuka di browser.

## Update tampilan

Edit file di GitHub, lalu **Commit**. Dalam 1–2 menit HP pengguna otomatis memakai versi baru.
Jika mengganti logo atau ikon, naikkan `VERSI` di `sw.js` (misalnya `alfahmu-v2`).
