import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Camera} from '../backgrounds/Camadas';
import {QuartoFrente, QuartoFundo, QuartoMeio} from '../backgrounds/Quarto';
import {Camila} from '../character/Camila';
import {Celular} from '../character/Celular';
import type {Roteiro} from '../data/schema';
import {ChipAgendado} from '../components/ChipAgendado';
import {Legenda} from '../components/Legenda';
import {BalaoFala} from '../components/Notificacao';
import {Palco} from '../components/Palco';
import {Relogio} from '../components/Relogio';
import {clamp, filtroAto, fontFamily} from '../theme';
import {useCameraLeve} from './comum';

export const Cena5Dormindo: React.FC<{roteiro: Roteiro}> = ({roteiro}) => {
  const frame = useCurrentFrame();
  const c = roteiro.cena5;
  const cam = useCameraLeve(16, -16, 1.03, 1.08);
  const brilho = c.avisos.reduce((acc, a) => {
    const d = frame - a.f;
    return d >= 0 && d < 40 ? Math.max(acc, interpolate(d, [0, 6, 40], [0, 1, 0.15])) : acc;
  }, 0.05);
  return (
    <Palco filtro={filtroAto(2)}>
      <Camera
        pan={cam.pan}
        zoom={cam.zoom}
        fundo={<QuartoFundo />}
        meio={<QuartoMeio />}
        personagem={
          <>
            <div style={{position: 'absolute', left: 180, top: 690, width: 560, height: 851, rotate: '-90deg'}}>
              <Camila largura={560} poses={[{f: 0, v: 'deitadaDormindo'}]} expressoes={[{f: 0, v: 'dormindo'}]} mostrarZzz={false} />
            </div>
            <QuartoFrente
              celular={
                <>
                  <div style={{position: 'absolute', left: 930 - 160, top: 1060 - 160, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.55), rgba(167,139,250,0) 70%)', opacity: brilho}} />
                  <svg width={200} height={200} viewBox="-100 -100 200 200" style={{position: 'absolute', left: 830, top: 960, overflow: 'visible'}}>
                    <g transform="rotate(-12)">
                      <Celular largura={60} brilho={brilho} frame={frame} />
                    </g>
                  </svg>
                </>
              }
            />
            {/* zZz */}
            {[0, 1, 2].map((i) => {
              const t = ((frame + i * 20) % 60) / 60;
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: 300 + t * 70 + i * 10,
                    top: 960 - t * 200,
                    fontFamily,
                    fontWeight: 800,
                    fontSize: 54 + i * 14,
                    color: '#C4B5FD',
                    opacity: interpolate(t, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
                  }}
                >
                  z
                </div>
              );
            })}
          </>
        }
      />
      {c.avisos.map((a, i) => {
        const prox = c.avisos[i + 1]?.f ?? 9999;
        if (frame < a.f || frame > prox + 8) return null;
        const saida = interpolate(frame, [prox - 4, prox + 6], [1, 0], clamp);
        return (
          <div key={i} style={{position: 'absolute', inset: 0, opacity: saida}}>
            <BalaoFala texto={a.texto} inicio={a.f} x={560} y={700} largura={420} tipo="viq" rabicho="direita" tamanho={36} />
            <ChipAgendado texto={a.chip} inicio={a.f + 14} x={520} y={880} />
          </div>
        );
      })}
      <Relogio hora={c.relogio} />
      <Legenda top={1150} inicio={c.legenda.inicio} fim={c.legenda.fim} linhas={c.legenda.linhas.map((t) => ({texto: t, tamanho: 64}))} intervalo={10} />
    </Palco>
  );
};
