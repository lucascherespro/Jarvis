import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp, curvas} from '../theme';

/** Câmera padrão das cenas: pan e zoom leves e contínuos */
export const useCameraLeve = (panIni = -24, panFim = 24, zoomIni = 1, zoomFim = 1.05) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const p = interpolate(frame, [0, durationInFrames], [0, 1], {...clamp, easing: curvas.suave});
  return {pan: panIni + (panFim - panIni) * p, zoom: zoomIni + (zoomFim - zoomIni) * p};
};

/** Tremida curta de câmera (ex.: susto) */
export const tremida = (frame: number, inicio: number, forca = 14) => {
  const d = frame - inicio;
  if (d < 0 || d > 16) return {x: 0, y: 0};
  const k = (1 - d / 16) * forca;
  return {x: Math.sin(d * 2.3) * k, y: Math.cos(d * 3.1) * k * 0.6};
};

export const Posicionado: React.FC<{x: number; y: number; children: React.ReactNode; style?: React.CSSProperties}> = ({x, y, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, ...style}}>{children}</div>
);

/** Intensidade da vibração (0..1) a partir de uma lista de frames */
export const vibracaoEm = (frame: number, lista: number[], dur = 14) =>
  lista.reduce((acc, f) => {
    const d = frame - f;
    return d >= 0 && d < dur ? Math.max(acc, 1 - d / dur) : acc;
  }, 0);
