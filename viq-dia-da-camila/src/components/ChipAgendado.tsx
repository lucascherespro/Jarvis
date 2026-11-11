import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {cores, fontFamily} from '../theme';

export const ChipAgendado: React.FC<{texto: string; inicio: number; x: number; y: number}> = ({texto, inicio, x, y}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (frame < inicio) return null;
  const s = spring({frame: frame - inicio, fps, config: {damping: 9, stiffness: 210}});
  const brilho = 0.5 + 0.5 * Math.sin(frame / 5);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        scale: s,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '14px 28px',
        borderRadius: 999,
        background: 'rgba(11,21,48,0.88)',
        border: `3px solid ${cores.verde}`,
        boxShadow: `0 0 ${16 + 22 * brilho}px rgba(37,211,102,0.7)`,
        fontFamily,
        fontSize: 36,
        fontWeight: 800,
        color: cores.verdeClaro,
        whiteSpace: 'nowrap',
      }}
    >
      {texto}
    </div>
  );
};
