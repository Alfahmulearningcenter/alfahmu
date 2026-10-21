# Sahabat Al-Fahmu (versi GitHub Pages)

Aplikasi umum Al-Fahmu: **Kamus Arab ⇄ Indonesia**, **Kamus Kaidah**, Dzikir & Doa, Kalender Hijriah, dan Tes Level Bahasa Arab.

Link: **https://alfahmulearningcenter.github.io/alfahmu/sahabat/**

```
HP pengguna ──► GitHub Pages (folder ini) ──► Apps Script "Sahabat Al-Fahmu"
                                                 (AI Gemini + Spreadsheet KAMUS/KAIDAH/LAPORAN/HASIL_TES_ARAB)
```

## Pengaturan wajib (1 baris)

Di `index.html`, cari:

```js
const API_URL = 'https://script.google.com/macros/s/GANTI_DENGAN_ID_DEPLOY/exec';
```

Ganti dengan link **/exec** Apps Script Sahabat Al-Fahmu.

## Link langsung per fitur

| Fitur | Link |
|---|---|
| Kamus | `…/sahabat/?fitur=kamus` (bisa + `&q=كتاب`) |
| Kaidah | `…/sahabat/?fitur=kaidah` |
| Dzikir | `…/sahabat/?fitur=dzikir` |
| Kalender | `…/sahabat/?fitur=kalender` |
| Tes Level | `…/sahabat/?fitur=tes` |

## Mengubah isi (dzikir, doa, soal tes, topik kaidah)

Isi data ada di dalam `index.html`, bagian `const DZIKIR`, `const DOA`, `const SOAL`, `const LEVEL`, `const KAIDAH_TOPIK`.
Edit di GitHub, lalu **Commit**. Dalam 1–2 menit HP pengguna otomatis memakai versi baru.
Jika mengganti ikon, naikkan `VERSI` di `sw.js` (misalnya `sahabat-v2`).
