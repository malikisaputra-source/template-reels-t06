// Template oleh Maliki Saputra (@malikisaputra) — https://malikisaputra.biz.id
// Lisensi Nonkomersial Maliki Studio (kredit wajib, dilarang dijual) (lihat LICENSE): kredit wajib tetap ada, tidak untuk diperjualbelikan.
// ✏️ UBAH DI SINI: semua teks, warna, gambar (taruh di public/), dan audio opsional.
// Lama tiap adegan diatur di komponen (frame, 30 fps).
export const K = {
  videoWajah: null as string | null, // contoh: "wajah.mp4" di public/
  gambar: { pembuka: "t06/kolase.svg", hasil: "t06/potret-halftone.svg" },
  takarir: [
    [0, "SATU FOTO"], [24, "SATU PROMPT"], [50, "LIMA MENIT"], [80, "TANPA"], [96, "AFTER EFFECTS"], [130, "PERTAMA"],
    [150, "BUKA CLAUDE"], [184, "PASANG"], [204, "KONEKTORNYA"], [240, "LALU"], [258, "TULIS"], [278, "YANG KAMU MAU"],
    [330, "HASILNYA"], [360, "KAYAK GINI"], [400, "KOMENTAR"], [420, "VOX"],
  ] as [number, string][],
  chat: { judul: "✺ Mau animasikan apa?", lampiran: "📎 foto.jpg", prompt: "Animasikan foto ini dengan gaya kolase" },
  konektor: {
    judul: "Konektor",
    item: [
      { nama: "Google Calendar", warna: "#4285f4" }, { nama: "Notion", warna: "#eeeeee" }, { nama: "Canva", warna: "#00c4cc" },
      { nama: "Figma", warna: "#a259ff" }, { nama: "Gmail", warna: "#ea4335" }, { nama: "Drive", warna: "#0f9d58" },
    ],
    dipilih: 2,
  },
  komentar: { akun: "@kamu", kata: "VOX" },
  // 🔊 Audio opsional. Taruh berkas di public/ lalu isi namanya, contoh: musik: "musik.mp3".
  // Paket ini sengaja TANPA musik/SFX/suara bawaan: pakai musik berlisensi bebas atau rekaman suaramu sendiri.
  audio: {
    musik: null as string | null, // backsound, diulang otomatis + fade masuk/keluar
    volumeMusik: 0.16,
    suara: null as string | null, // voice over / narasi milikmu (mp3/wav)
    volumeSuara: 1,
  },
};
