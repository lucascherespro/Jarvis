import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp, fontFamily} from '../theme';

/** Balão de pensamento (nuvem + bolinhas até a cabeça) */
export const BalaoPensamento: React.FC<{texto: string; inicio: number; fim: number; x: number; y: number; largura?: number; cabecaX: number; cabecaY: number}> = ({
  texto,
  inicio,
  fim,
  x,
  y,
  largura = 560,
  cabecaX,
  cabecaY,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (frame < inicio || frame > fim + 12) return null;
  const s = spring({frame: frame - inicio, fps, config: {damping: 12, stiffness: 160}});
  const saida = interpolate(frame, [fim, fim + 12], [1, 0], clamp);
  const bolinhas = [0.25, 0.5, 0.75].map((t, i) => ({
    cx: cabecaX + (x + largura / 2 - cabecaX) * t,
    cy: cabecaY + (y + 120 - cabecaY) * t,
    r: 10 + i * 7,
    on: frame - inicio > i * 3,
  }));
  return (
    <div style={{position: 'absolute', inset: 0, opacity: saida}}>
      {bolinhas.map((b, i) =>
        b.on ? <div key={i} style={{position: 'absolute', left: b.cx - b.r, top: b.cy - b.r, width: b.r * 2, height: b.r * 2, borderRadius: '50%', background: 'white', boxShadow: '0 6px 18px rgba(0,0,0,0.2)'}} /> : null,
      )}
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: largura,
          padding: '30px 36px',
          boxSizing: 'border-box',
          borderRadius: 80,
          background: 'white',
          boxShadow: '0 14px 40px rgba(0,0,0,0.25), -30px -18px 0 -6px white, 40px -22px 0 -10px white',
          fontFamily,
          fontSize: 44,
          fontWeight: 700,
          fontStyle: 'italic',
          color: '#374151',
          textAlign: 'center',
          scale: s,
          opacity: interpolate(s, [0, 0.3], [0, 1], clamp),
        }}
      >
        {texto}
      </div>
    </div>
  );
};
