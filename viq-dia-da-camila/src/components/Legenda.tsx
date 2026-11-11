import React from 'react';
import {interpolate, random, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp, cores, fontFamily} from '../theme';

/** Legenda grande sobre faixa escura translúcida. `slam` = entra com escala 1.35 -> 1 e tremida. */
export const Legenda: React.FC<{
  linhas: {texto: string; cor?: string; tamanho?: number}[];
  inicio: number;
  fim?: number;
  top: number;
  slam?: boolean;
  intervalo?: number;
}> = ({linhas, inicio, fim, top, slam = false, intervalo = 14}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (frame < inicio || (fim !== undefined && frame > fim + 10)) return null;
  const saida = fim === undefined ? 1 : interpolate(frame, [fim, fim + 10], [1, 0], clamp);
  const faixa = spring({frame: frame - inicio, fps, config: {damping: 200}, durationInFrames: 10});
  return (
    <div style={{position: 'absolute', top, left: 50, right: 50, display: 'flex', justifyContent: 'center', opacity: saida}}>
      <div
        style={{
          padding: '26px 40px',
          borderRadius: 34,
          background: 'rgba(11,21,48,0.78)',
          backdropFilter: 'blur(14px)',
          border: '2px solid rgba(167,139,250,0.35)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          opacity: faixa,
          scale: interpolate(faixa, [0, 1], [0.92, 1]),
        }}
      >
        {linhas.map((l, i) => {
          const local = frame - inicio - i * intervalo;
          const s = local < 0 ? 0 : spring({frame: local, fps, config: slam ? {damping: 12, stiffness: 190, mass: 0.85} : {damping: 15, stiffness: 140}});
          const tremida = slam ? interpolate(local, [3, 5, 12], [0, 1, 0], clamp) : 0;
          return (
            <div
              key={i}
              style={{
                fontFamily,
                fontWeight: 800,
                fontSize: l.tamanho ?? 72,
                lineHeight: 1.1,
                letterSpacing: -1.5,
                color: l.cor ?? cores.branco,
                textAlign: 'center',
                textWrap: 'balance',
                opacity: local < 0 ? 0 : interpolate(s, [0, 0.35], [0, 1], clamp),
                scale: slam ? interpolate(s, [0, 1], [1.35, 1]) : 1,
                translate: slam
                  ? `${(random(`lx${i}${frame}`) - 0.5) * 8 * tremida}px ${(random(`ly${i}${frame}`) - 0.5) * 8 * tremida}px`
                  : `0px ${interpolate(s, [0, 1], [30, 0])}px`,
              }}
            >
              {l.texto}
            </div>
          );
        })}
      </div>
    </div>
  );
};
