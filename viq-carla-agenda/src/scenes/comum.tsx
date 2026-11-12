import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp, curvas} from '../theme';

/** Câmera padrão das cenas: pan e zoom leves e contínuos */
export const useCameraLeve = (panIni = -24, panFim = 24, zoomIni = 1, zoomFim = 1.05) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const p = interpolate(frame, [0, durationInFrames], [0, 1], {...clamp, easing: curvas.suave});
  return {pan: panIni + (panFim - panIni) * p, zoom: zoomIni + (zoomFim - zoomIni) * p};
};

/** Tremida curta de câmera */
export const tremida = (frame: number, inicio: number, forca = 14) => {
  const d = frame - inicio;
  if (d < 0 || d > 16) return {x: 0, y: 0};
  const k = (1 - d / 16) * forca;
  return {x: Math.sin(d * 2.3) * k, y: Math.cos(d * 3.1) * k * 0.6};
};

/** Intensidade da vibração (0..1) a partir de uma lista de frames */
export const vibracaoEm = (frame: number, lista: number[], dur = 14) =>
  lista.reduce((acc, f) => {
    const d = frame - f;
    return d >= 0 && d < dur ? Math.max(acc, 1 - d / dur) : acc;
  }, 0);

/** Vinheta escura nas bordas */
export const Vinheta: React.FC<{forca?: number; cor?: string}> = ({forca = 0.5, cor = '0,0,0'}) => (
  <AbsoluteFill style={{pointerEvents: 'none', background: `radial-gradient(ellipse at 50% 45%, rgba(${cor},0) 45%, rgba(${cor},${forca}) 100%)`}} />
);

/** Luz da tela do celular no rosto */
export const BrilhoTela: React.FC<{x: number; y: number; intensidade: number; raio?: number; cor?: string}> = ({x, y, intensidade, raio = 260, cor = '150,180,255'}) => (
  <div
    style={{
      position: 'absolute',
      left: x - raio,
      top: y - raio,
      width: raio * 2,
      height: raio * 2,
      borderRadius: '50%',
      background: `radial-gradient(circle, rgba(${cor},0.45), rgba(${cor},0) 70%)`,
      mixBlendMode: 'screen',
      opacity: intensidade,
      pointerEvents: 'none',
    }}
  />
);
