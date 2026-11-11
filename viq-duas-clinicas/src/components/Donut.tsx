import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {clamp, cores, curvas, fontFamily} from '../theme';

export const Donut: React.FC<{valor: number; titulo: string; tamanho: number; inicio: number}> = ({valor, titulo, tamanho, inicio}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [inicio, inicio + 34], [0, valor / 100], {...clamp, easing: curvas.saida});
  const r = tamanho / 2 - 18;
  const c = 2 * Math.PI * r;
  return (
    <div style={{position: 'relative', width: tamanho, height: tamanho}}>
      <svg width={tamanho} height={tamanho} style={{rotate: '-90deg'}}>
        <circle cx={tamanho / 2} cy={tamanho / 2} r={r} stroke="rgba(255,255,255,0.12)" strokeWidth={28} fill="none" />
        <circle
          cx={tamanho / 2}
          cy={tamanho / 2}
          r={r}
          stroke={cores.verde}
          strokeWidth={28}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${c * p} ${c}`}
          style={{filter: `drop-shadow(0 0 10px ${cores.verde})`}}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily,
          color: 'white',
        }}
      >
        <div style={{fontSize: tamanho * 0.25, fontWeight: 800, color: cores.verdeClaro, lineHeight: 1}}>{Math.round(p * 100)}%</div>
        <div style={{fontSize: tamanho * 0.1, fontWeight: 700, color: cores.cinza, marginTop: 6}}>{titulo}</div>
      </div>
    </div>
  );
};
