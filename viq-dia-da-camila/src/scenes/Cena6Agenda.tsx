import React from 'react';
import {interpolate, random, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Camera} from '../backgrounds/Camadas';
import {Bancada, CozinhaFundo, CozinhaMeio} from '../backgrounds/Cozinha';
import {Camila} from '../character/Camila';
import type {Roteiro} from '../data/schema';
import {Legenda} from '../components/Legenda';
import {Palco} from '../components/Palco';
import {Relogio} from '../components/Relogio';
import {clamp, cores, filtroAto, fontFamily} from '../theme';
import {useCameraLeve} from './comum';

const Confete: React.FC<{inicio: number}> = ({inicio}) => {
  const frame = useCurrentFrame();
  const f = frame - inicio;
  if (f < 0) return null;
  const paleta = ['#7C3AED', '#A78BFA', '#E5B54A', '#C4B5FD', '#F5D27A'];
  return (
    <>
      {new Array(60).fill(0).map((_, i) => {
        const atraso = random(`d${i}`) * 20;
        const t = Math.max(0, f - atraso);
        const w = 14 + random(`w${i}`) * 12;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: random(`x${i}`) * 1080 + Math.sin(t / 8 + i) * 30,
              top: 280 + t * (8 + random(`v${i}`) * 8),
              width: w,
              height: w * 0.45,
              borderRadius: 3,
              background: paleta[i % paleta.length],
              rotate: `${t * (6 + random(`r${i}`) * 9)}deg`,
              opacity: f < atraso ? 0 : 0.85,
            }}
          />
        );
      })}
    </>
  );
};

export const Cena6Agenda: React.FC<{roteiro: Roteiro}> = ({roteiro}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const c = roteiro.cena6;
  const cam = useCameraLeve(-16, 16, 1, 1.06);
  const tela = spring({frame: frame - c.tela.f, fps, config: {damping: 14, stiffness: 140}});
  const saiTela = interpolate(frame, [c.tela.sai, c.tela.sai + 12], [1, 0], clamp);
  const selo = spring({frame: frame - c.confete, fps, config: {damping: 10, stiffness: 170}});
  return (
    <Palco filtro={filtroAto(2)}>
      <Camera
        pan={cam.pan}
        zoom={cam.zoom}
        fundo={<CozinhaFundo sol={interpolate(frame, [0, 195], [0.5, 1])} />}
        meio={<CozinhaMeio />}
        personagem={
          <>
            <div style={{position: 'absolute', left: 20, top: 520}}>
              <Camila largura={640} poses={c.poses} expressoes={c.expressoes} brilhoCelular={1} />
            </div>
            <Bancada />
          </>
        }
      />
      {/* tela do celular ampliada */}
      {frame >= c.tela.f && saiTela > 0 ? (
        <div
          style={{
            position: 'absolute',
            left: 500,
            top: 470,
            width: 540,
            boxSizing: 'border-box',
            padding: '30px 26px',
            borderRadius: 44,
            background: 'rgba(11,21,48,0.94)',
            border: `3px solid ${cores.roxoClaro}`,
            boxShadow: `0 0 50px rgba(124,58,237,0.55)`,
            fontFamily,
            color: 'white',
            opacity: Math.min(saiTela, interpolate(tela, [0, 0.3], [0, 1], clamp)),
            scale: interpolate(tela, [0, 1], [0.4, 1]) * interpolate(saiTela, [0, 1], [0.8, 1]),
            transformOrigin: '10% 80%',
          }}
        >
          <div style={{fontSize: 46, fontWeight: 800}}>{c.tela.titulo}</div>
          <div style={{fontSize: 34, fontWeight: 700, color: cores.verdeClaro, marginTop: 4}}>{c.tela.subtitulo}</div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 14, marginTop: 22}}>
            {c.agendamentos.map((a, i) => {
              const s = spring({frame: frame - c.tela.f - 14 - i * 9, fps, config: {damping: 14, stiffness: 160}});
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '14px 16px',
                    borderRadius: 22,
                    background: 'rgba(255,255,255,0.08)',
                    border: '2px solid rgba(37,211,102,0.45)',
                    opacity: interpolate(s, [0, 0.4], [0, 1], clamp),
                    translate: `${interpolate(s, [0, 1], [50, 0])}px 0px`,
                  }}
                >
                  <div style={{width: 54, height: 54, borderRadius: 16, background: a.cor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 30}}>{a.nome[0]}</div>
                  <div style={{lineHeight: 1.15}}>
                    <div style={{fontSize: 32, fontWeight: 800}}>
                      {a.nome} <span style={{color: cores.verdeClaro, fontSize: 28}}>· {a.quando}</span>
                    </div>
                    <div style={{fontSize: 26, fontWeight: 500, color: cores.cinza}}>{a.procedimento}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
      <Confete inicio={c.confete} />
      {frame >= c.confete ? (
        <div style={{position: 'absolute', top: 430, left: 540, scale: selo}}>
          <div style={{padding: '18px 34px', borderRadius: 999, background: cores.verde, boxShadow: '0 0 40px rgba(37,211,102,0.7)', fontFamily, fontWeight: 800, fontSize: 48, color: '#06301A', whiteSpace: 'nowrap'}}>
            ✓ {c.selo}
          </div>
        </div>
      ) : null}
      <Relogio hora={c.relogio} />
      <Legenda top={1188} inicio={c.legenda.inicio} fim={c.legenda.fim} linhas={c.legenda.linhas.map((t) => ({texto: t, tamanho: 64}))} />
    </Palco>
  );
};
