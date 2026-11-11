import React, {useLayoutEffect, useRef} from 'react';
import {noise3D} from '@remotion/noise';
import {AbsoluteFill, useCurrentFrame} from 'remotion';

const GW = 216;
const GH = 384;

/** Textura de grão sutil, animada com @remotion/noise */
export const Grao: React.FC<{opacidade?: number; offset?: number}> = ({opacidade = 0.07, offset = 0}) => {
  const frame = useCurrentFrame() + offset;
  const ref = useRef<HTMLCanvasElement>(null);
  useLayoutEffect(() => {
    const ctx = ref.current?.getContext('2d');
    if (!ctx) return;
    const img = ctx.createImageData(GW, GH);
    const z = (frame % 24) * 7.3; // ciclo curto: grão "vivo" e loop sem emenda
    for (let y = 0; y < GH; y++) {
      for (let x = 0; x < GW; x++) {
        const n = noise3D('grao', x * 0.9, y * 0.9, z);
        const v = Math.round(128 + n * 127);
        const i = (y * GW + x) * 4;
        img.data[i] = v;
        img.data[i + 1] = v;
        img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  }, [frame]);
  return (
    <AbsoluteFill style={{opacity: opacidade, mixBlendMode: 'overlay', pointerEvents: 'none'}}>
      <canvas ref={ref} width={GW} height={GH} style={{width: '100%', height: '100%'}} />
    </AbsoluteFill>
  );
};
