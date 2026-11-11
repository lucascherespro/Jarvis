import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp, cores, fontFamily} from '../theme';

export const GraficoBarras: React.FC<{
  barras: {hora: string; valor: number; pico: boolean}[];
  largura: number;
  altura: number;
  inicio: number;
  intervalo?: number;
}> = ({barras, largura, altura, inicio, intervalo = 4}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const max = Math.max(1, ...barras.map((b) => b.valor));
  const gap = 12;
  const bw = (largura - gap * (barras.length - 1)) / barras.length;
  const areaH = altura - 50;
  const picos = barras.map((b, i) => (b.pico ? i : -1)).filter((i) => i >= 0);
  const destaque = interpolate(frame, [inicio + barras.length * intervalo, inicio + barras.length * intervalo + 12], [0, 1], clamp);
  return (
    <div style={{position: 'relative', width: largura, height: altura}}>
      {picos.length ? (
        <div
          style={{
            position: 'absolute',
            left: picos[0] * (bw + gap) - 6,
            width: (picos[picos.length - 1] - picos[0] + 1) * (bw + gap) - gap + 12,
            top: 0,
            height: areaH + 4,
            borderRadius: 16,
            border: `2px dashed ${cores.roxoClaro}`,
            background: 'rgba(167,139,250,0.10)',
            opacity: destaque,
          }}
        />
      ) : null}
      {barras.map((b, i) => {
        const s = spring({frame: frame - inicio - i * intervalo, fps, config: {damping: 14, stiffness: 120}});
        const h = Math.max(6, (b.valor / max) * (areaH - 46)) * s;
        return (
          <div key={b.hora} style={{position: 'absolute', left: i * (bw + gap), width: bw, bottom: 0, height: altura}}>
            <div
              style={{
                position: 'absolute',
                bottom: 50,
                width: bw,
                height: h,
                borderRadius: 10,
                background: b.pico
                  ? `linear-gradient(180deg, ${cores.roxoClaro}, ${cores.roxo})`
                  : 'rgba(170,180,210,0.45)',
                boxShadow: b.pico ? `0 0 18px ${cores.roxo}` : undefined,
              }}
            />
            {b.valor > 0 ? (
              <div style={{position: 'absolute', bottom: 56 + h, width: bw, textAlign: 'center', fontFamily, fontWeight: 800, fontSize: 26, color: 'white', opacity: s}}>
                {b.valor}
              </div>
            ) : null}
            <div style={{position: 'absolute', bottom: 8, width: bw, textAlign: 'center', fontFamily, fontWeight: 600, fontSize: 22, color: cores.cinza}}>
              {b.hora}
            </div>
          </div>
        );
      })}
    </div>
  );
};
