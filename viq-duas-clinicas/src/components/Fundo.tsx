import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {cores} from '../theme';
import {Grao} from './Grao';

/** Gradiente azul-marinho + duas manchas roxas que se movem em ciclo (loop perfeito) */
export const Fundo: React.FC<{offset?: number; periodo: number}> = ({offset = 0, periodo}) => {
  const frame = useCurrentFrame() + offset;
  const {width, height} = useVideoConfig();
  const a = (frame / periodo) * Math.PI * 2;
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, #0E1A3D 0%, ${cores.navy} 55%, #070E22 100%)`}}>
      <div
        style={{
          position: 'absolute',
          width: 760,
          height: 760,
          borderRadius: '50%',
          background: 'rgba(124,58,237,0.45)',
          filter: 'blur(140px)',
          left: width * 0.05 + Math.sin(a) * 160 - 200,
          top: height * 0.18 + Math.cos(a) * 120 - 200,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 680,
          height: 680,
          borderRadius: '50%',
          background: 'rgba(167,139,250,0.30)',
          filter: 'blur(150px)',
          left: width * 0.62 + Math.cos(a * 2) * 120 - 200,
          top: height * 0.62 + Math.sin(a) * 160 - 200,
        }}
      />
      <Grao offset={offset} />
    </AbsoluteFill>
  );
};
