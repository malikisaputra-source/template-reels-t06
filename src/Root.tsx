// Template oleh Maliki Saputra (@malikisaputra) — https://malikisaputra.biz.id
// Lisensi MIT + syarat kredit-maliki (lihat LICENSE): kredit wajib tetap ada, tidak untuk diperjualbelikan.
import React from "react";
import { Composition } from "remotion";
import { T06Bicara, DURASI_T06 } from "./T06Bicara";

export const Root: React.FC = () => (
  <Composition id="T06Bicara" component={T06Bicara} durationInFrames={DURASI_T06} fps={30} width={1080} height={1920} />
);
