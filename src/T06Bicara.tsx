// Template oleh Maliki Saputra (@malikisaputra) — https://malikisaputra.biz.id
// Lisensi Nonkomersial Maliki Studio (kredit wajib, dilarang dijual) (lihat LICENSE): kredit wajib tetap ada, tidak untuk diperjualbelikan.
// T06 v2 · Bicara + Sisipan — mengikuti ritme reel acuan (podcast + cut-in) per detik (9 Nov 2026).
// Pola: wajah bicara penuh layar (SLOT video rekaman HP), takarir 1–2 kata putih kapital di tengah-bawah;
// tiap 2–4 dtk dipotong sisipan: (a) layar terbelah: kartu chat atas + wajah bawah, (b) daftar konektor app gelap,
// (c) hasil kolase penuh layar, (d) bubble komentar "Komentar VOX" menempel di wajah. Ganti `video` dengan berkas rekaman.
import React from "react";
import { K } from "./konten";
import { SlotAudio } from "./SlotAudio";
import { AbsoluteFill, Easing, interpolate, OffthreadVideo, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig, Img } from "remotion";
import { loadFont as muatInter } from "@remotion/google-fonts/Inter";
import { loadFont as muatSerif } from "@remotion/google-fonts/InstrumentSerif";

const INTER = muatInter().fontFamily;
const SERIF = muatSerif().fontFamily;
const E = Easing.bezier(0.22, 1, 0.36, 1);
const k = (f: number, a: number, b: number, d: number[], ease = E) =>
  interpolate(f, [a, b], d, { easing: ease, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

export const DURASI_T06 = 450;

const TAKARIR: [number, string][] = K.takarir;

const Wajah: React.FC<{ video?: string; zoom?: number }> = ({ video, zoom = 1 }) => (
  <AbsoluteFill style={{ background: "linear-gradient(#4b5260,#2a2f38)", overflow: "hidden" }}>
    {video ? (
      <OffthreadVideo src={staticFile(video)} muted style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${zoom})` }} />
    ) : (
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", transform: `scale(${zoom})` }}>
        <div style={{ width: 460, height: 560, borderRadius: "48% 48% 40% 40%", background: "linear-gradient(#6b7382,#454b57)", marginTop: 200 }} />
        <div style={{ position: "absolute", top: 1540, fontFamily: INTER, fontSize: 26, color: "#9aa3ae", letterSpacing: 4 }}>[ SLOT VIDEO WAJAH ]</div>
      </AbsoluteFill>
    )}
  </AbsoluteFill>
);

const Takarir: React.FC<{ f: number; atas?: boolean }> = ({ f, atas }) => {
  let i = 0;
  TAKARIR.forEach(([d], j) => { if (f >= d) i = j; });
  const [d, w] = TAKARIR[i];
  return <div style={{ position: "absolute", top: atas ? 960 : 1180, width: "100%", textAlign: "center", fontFamily: INTER, fontWeight: 800, fontSize: 52, letterSpacing: 1, color: "#fff", textShadow: "0 3px 14px rgba(0,0,0,0.85)", transform: `scale(${k(f, d, d + 4, [1.12, 1])})`, zIndex: 5 }}>{w}</div>;
};

export const T06Bicara: React.FC<{ video?: string }> = ({ video = K.videoWajah ?? undefined }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const prompt = K.chat.prompt;
  return (
    <AbsoluteFill style={{ background: "#111", overflow: "hidden" }}>
      {/* dasar: wajah penuh, zoom pelan dan "punch-in" tiap ganti kalimat */}
      <Wajah video={video} zoom={1 + (f % 80 < 40 ? 0 : 0.08)} />

      {/* (a) kolase penuh layar di awal (hook hasil) */}
      <Sequence durationInFrames={50}>
        <AbsoluteFill style={{ background: "#e9dfc8" }}>
          <Img src={staticFile(K.gambar.pembuka)} style={{ position: "absolute", left: 40, top: 420, width: 1000, transform: `scale(${k(f, 0, 50, [1.15, 1], Easing.linear)}) rotate(-2deg)` }} />
        </AbsoluteFill>
      </Sequence>

      {/* (b) layar terbelah: kartu chat atas + wajah bawah */}
      <Sequence from={150} durationInFrames={90}>
        {(() => {
          const t = f - 150;
          const n = Math.floor(k(t, 10, 70, [0, prompt.length], Easing.linear));
          return (
            <AbsoluteFill>
              <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 960, background: "linear-gradient(#f6e9e1,#efe3da)", transform: `translateY(${k(t, 0, 10, [-960, 0])}px)` }}>
                <div style={{ position: "absolute", left: 120, top: 260, fontFamily: SERIF, fontSize: 64, color: "#222" }}>{K.chat.judul}</div>
                <div style={{ position: "absolute", left: 120, top: 380, width: 840, padding: 30, borderRadius: 26, background: "#fff", boxShadow: "0 20px 40px rgba(0,0,0,0.12)", fontFamily: INTER, fontSize: 34 }}>
                  <div style={{ display: "inline-block", padding: "6px 14px", borderRadius: 10, background: "#fbe2d6", color: "#c25a2f", fontSize: 22, marginBottom: 16 }}>{K.chat.lampiran}</div>
                  <div>{prompt.slice(0, n)}<span style={{ opacity: t % 14 < 7 ? 1 : 0 }}>|</span></div>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}><div style={{ width: 52, height: 52, borderRadius: "50%", background: "#d97757" }} /></div>
                </div>
                <div style={{ position: "absolute", left: k(t, 40, 70, [900, 700]), top: k(t, 40, 70, [800, 640]), fontSize: 60 }}>➚</div>
              </div>
              <div style={{ position: "absolute", left: 0, top: 960, width: 1080, height: 960, overflow: "hidden" }}><Wajah video={video} zoom={1.2} /></div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* (c) daftar konektor gelap */}
      <Sequence from={240} durationInFrames={70}>
        {(() => {
          const t = f - 240;
          const item = K.konektor.item.map((x) => x.nama);
          return (
            <AbsoluteFill style={{ background: "#141416" }}>
              <div style={{ position: "absolute", left: 100, top: 360, fontFamily: INTER, fontSize: 30, color: "#888" }}>{K.konektor.judul}</div>
              {item.map((it, i) => {
                const m = spring({ frame: t - i * 4, fps, config: { damping: 16 } });
                const pilih = i === K.konektor.dipilih && t > 34;
                return (
                  <div key={it} style={{ position: "absolute", left: 100, top: 420 + i * 120, width: 880, height: 100, borderRadius: 20, background: pilih ? "#2b2b33" : "#1c1c20", border: pilih ? "2px solid #7c5cff" : "2px solid transparent", display: "flex", alignItems: "center", gap: 24, padding: "0 28px", fontFamily: INTER, fontSize: 34, color: "#eee", opacity: m, transform: `translateX(${(1 - m) * 120}px)` }}>
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: K.konektor.item[i].warna }} />
                    <span style={{ flex: 1 }}>{it}</span><span style={{ color: pilih ? "#7c5cff" : "#666", fontSize: 44 }}>{pilih ? "✓" : "+"}</span>
                  </div>
                );
              })}
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* (d) hasil penuh layar */}
      <Sequence from={330} durationInFrames={60}>
        <AbsoluteFill style={{ background: "#e8dcc3" }}>
          <Img src={staticFile(K.gambar.hasil)} style={{ position: "absolute", left: 90, top: 460, width: 900, transform: `scale(${k(f, 330, 390, [1.1, 1], Easing.linear)})` }} />
        </AbsoluteFill>
      </Sequence>

      {/* (e) bubble komentar menempel */}
      <Sequence from={395}>
        {(() => {
          const t = f - 395;
          const m = spring({ frame: t, fps, config: { damping: 12 } });
          return (
            <div style={{ position: "absolute", left: 120, top: 1300, width: 560, padding: "22px 26px", borderRadius: 24, background: "#fff", boxShadow: "0 20px 40px rgba(0,0,0,0.35)", display: "flex", alignItems: "center", gap: 18, transform: `scale(${m}) rotate(-3deg)`, transformOrigin: "0 100%" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#f58529,#dd2a7b,#8134af)" }} />
              <div style={{ fontFamily: INTER }}><div style={{ fontSize: 24, color: "#888" }}>{K.komentar.akun}</div><div style={{ fontSize: 40, fontWeight: 800 }}>{K.komentar.kata}</div></div>
              <div style={{ marginLeft: "auto", fontSize: 36, color: "#e33" }}>♥</div>
            </div>
          );
        })()}
      </Sequence>

      <Takarir f={f} atas={f >= 150 && f < 240} />
    <SlotAudio audio={K.audio} />
    </AbsoluteFill>
  );
};
