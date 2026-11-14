# T06 Bicara + Sisipan · Template Video Reels (Remotion)

Template video vertikal 9:16 (1080×1920, 30 fps, 15 detik) gaya podcast/talking head: video wajah bicara penuh layar dengan takarir 1–2 kata, dipotong sisipan (hasil kolase penuh layar, layar terbelah kartu chat + wajah, daftar konektor gelap, hasil halftone, bubble komentar).

Template oleh Maliki Saputra (@malikisaputra) — https://malikisaputra.biz.id. Gratis dipakai dan diubah, kredit wajib tetap ada, tidak untuk diperjualbelikan.

## Cara pakai
1. Install [Node.js](https://nodejs.org) 18 ke atas.
2. Buka terminal di folder ini: `npm install`
3. Ubah teks, warna, gambar, dan audio di `src/konten.ts`. Gambar taruh di folder `public/` (contoh: `public/t06/`).
4. Pratinjau: `npm run studio`
5. Render: `npm run render` → hasil di `out/video.mp4`
6. Cek kode (opsional): `npm run cek`

## Isi `src/konten.ts`
- `videoWajah`: rekaman bicaramu (mp4 di public/), `null` = kotak placeholder abu. Video dibisukan; suaranya pakai slot `audio.suara` (bisa berkas audio dari video yang sama).
- `gambar`: `pembuka` (hasil di awal), `hasil` (hasil di akhir)
- `takarir`: daftar `[frame, "KATA"]` (frame = detik × 30)
- `chat`: `judul`, `lampiran`, `prompt` (diketik)
- `konektor`: `judul` + 6 `item` (`nama`, `warna`), `dipilih` (urutan yang dicentang)
- `komentar`: `akun`, `kata`
- `audio`: `musik` (backsound, diulang + fade) dan `suara` (voice over), keduanya `null` = tanpa suara. Taruh berkas mp3/wav di `public/` lalu isi namanya, misalnya `musik: "musik.mp3"`.

## Gambar pengganti (placeholder)
- Video wajah: tidak disertakan (rekaman asli kreator bersifat pribadi). Tanpa `videoWajah` tampil kotak abu "[ SLOT VIDEO WAJAH ]".
- `kolase.svg`, `potret-halftone.svg`: pengganti gambar hasil (versi asli memakai foto orang).

## Audio
Versi ini sengaja dikirim **tanpa** musik, SFX, dan suara asli kreator. Isi slot `audio` di `src/konten.ts` dengan musik berlisensi bebas (misalnya dari YouTube Audio Library atau Pixabay Music) dan rekaman suaramu sendiri. Kalau mau efek bunyi per adegan, tambahkan `<Sequence from={frame}><Audio src={staticFile("bunyi.mp3")} /></Sequence>` di komponen.

## Struktur folder
```
proyek/
├── public/
│   ├── t06/kolase.svg
│   ├── t06/potret-halftone.svg
├── src/
│   ├── index.ts          # titik masuk Remotion
│   ├── Root.tsx          # daftar komposisi: T06Bicara (1080×1920, 30 fps)
│   ├── T06Bicara.tsx  # animasi & tata letak
│   ├── SlotAudio.tsx     # slot musik + suara opsional
│   └── konten.ts         # ✏️ semua isi yang bisa diganti
├── package.json
├── remotion.config.ts
├── tsconfig.json
└── LICENSE
```

## Lisensi
Lisensi Nonkomersial Maliki Studio (kredit wajib, dilarang dijual) (lihat `LICENSE`): kredit "Template oleh Maliki Saputra (@malikisaputra) — https://malikisaputra.biz.id" wajib tetap ada, dan template ini tidak boleh dijual ulang tanpa izin.
