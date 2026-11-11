import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import type {Roteiro} from '../data/schema';
import {Layout, useLayout} from '../layout';
import {clamp, cores, curvas, fontFamily} from '../theme';
import {ComDestaque, slamEstado} from '../components/Texto';

export const GANCHO_TAMANHO = 104;
/** Centro vertical de cada linha do gancho (reutilizado no último frame para o loop) */
export const ganchoY = (L: Layout, i: number) => L.centroY + (i - 1) * 140;

export const LinhaGancho: React.FC<{
  L: Layout;
  indice: number;
  escala: number;
  dx?: number;
  dy?: number;
  opacity?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({L, indice, escala, dx = 0, dy = 0, opacity = 1, children, style}) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      top: ganchoY(L, indice) - GANCHO_TAMANHO * 0.6,
      height: GANCHO_TAMANHO * 1.2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily,
      fontWeight: 800,
      fontSize: GANCHO_TAMANHO,
      letterSpacing: -3,
      color: 'white',
      whiteSpace: 'nowrap',
      textShadow: '0 8px 40px rgba(0,0,0,0.5)',
      scale: escala,
      translate: `${dx}px ${dy}px`,
      opacity,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Gancho: React.FC<{roteiro: Roteiro}> = ({roteiro}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const L = useLayout();
  const g = roteiro.gancho;
  const linhas = [g.linha1, g.linha2, g.linha3];
  // frame 75: as frases se comprimem para cima
  const comprime = interpolate(frame, [75, 92], [0, 1], {...clamp, easing: curvas.entrada});
  const estados = linhas.map((_, i) => slamEstado(frame, g.atrasos[i] ?? i * 25, fps));
  const flash = Math.max(...estados.map((e) => e.flash));
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          translate: `0px ${-comprime * 260}px`,
          scale: `1 ${1 - comprime * 0.45}`,
          opacity: 1 - comprime,
        }}
      >
        {linhas.map((texto, i) =>
          estados[i].visivel ? (
            <LinhaGancho key={i} L={L} indice={i} escala={estados[i].escala} dx={estados[i].dx} dy={estados[i].dy}>
              {i === 2 ? <ComDestaque texto={texto} destaque={g.destaque} cor={cores.roxoClaro} /> : texto}
            </LinhaGancho>
          ) : null,
        )}
      </AbsoluteFill>
      <AbsoluteFill style={{background: 'white', opacity: flash, pointerEvents: 'none'}} />
    </AbsoluteFill>
  );
};
