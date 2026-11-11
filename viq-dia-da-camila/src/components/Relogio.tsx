import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {cores, fontFamily} from '../theme';

/** Relógio da cena. Os minutos avançam devagar (minutosPorSegundo). */
export const Relogio: React.FC<{hora: string; top?: number; minutosPorSegundo?: number; escuro?: boolean}> = ({hora, top = 300, minutosPorSegundo = 0.15, escuro = false}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const [h, m] = hora.split(':').map(Number);
  const total = (h * 60 + m + Math.floor((frame / fps) * minutosPorSegundo)) % 1440;
  const texto = `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
  const s = spring({frame: frame - 4, fps, config: {damping: 14}});
  return (
    <div style={{position: 'absolute', top, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: s, translate: `0px ${(1 - s) * -30}px`}}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '12px 30px',
          borderRadius: 999,
          background: escuro ? 'rgba(11,21,48,0.8)' : 'rgba(11,21,48,0.72)',
          border: `2px solid ${cores.roxoClaro}`,
          fontFamily,
          fontWeight: 800,
          fontSize: 60,
          color: 'white',
          letterSpacing: -1,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke={cores.roxoClaro} strokeWidth="2.4" fill="none" />
          <path d="M12 6 V12 L16 14" stroke={cores.roxoClaro} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </svg>
        {texto}
      </div>
    </div>
  );
};
