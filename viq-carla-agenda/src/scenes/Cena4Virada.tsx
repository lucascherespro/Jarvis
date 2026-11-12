import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Camera} from '../backgrounds/Camadas';
import {BalcaoCarla, ClinicaCarlaFundo, ClinicaCarlaMeio, Notebook} from '../backgrounds/ClinicaCarla';
import {Personagem} from '../character/Personagem';
import type {Roteiro} from '../data/schema';
import {Legenda} from '../components/Legenda';
import {Palco} from '../components/Palco';
import {Relogio} from '../components/Relogio';
import {clamp, cores, filtroAto, fontFamily} from '../theme';
import {useCameraLeve} from './comum';

/** 30–40 s · De dia, Carla configura o atendimento automático no notebook */
export const Cena4Virada: React.FC<{roteiro: Roteiro}> = ({roteiro}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const c = roteiro.cena4;
  const cam = useCameraLeve(20, -20, 1.0, 1.07);
  const entra = spring({frame: frame - c.tela.f, fps, config: {damping: 15, stiffness: 140}});
  const liga = spring({frame: frame - c.tela.liga, fps, config: {damping: 12, stiffness: 180}});
  const brilhoNote = interpolate(frame, [c.tela.liga, c.tela.liga + 10], [0.5, 1], clamp);
  return (
    <Palco filtro={filtroAto(2)}>
      <Camera
        pan={cam.pan}
        zoom={cam.zoom}
        fundo={<ClinicaCarlaFundo luz="dia" />}
        meio={<ClinicaCarlaMeio luz="dia" />}
        personagem={
          <BalcaoCarla objetos={<Notebook x={360} brilho={brilhoNote} />}>
            <div style={{position: 'absolute', left: 70, top: 560}}>
              <Personagem largura={640} poses={c.poses} expressoes={c.expressoes} />
            </div>
          </BalcaoCarla>
        }
      />
      {/* tela do notebook ampliada */}
      {frame >= c.tela.f ? (
        <div
          style={{
            position: 'absolute',
            left: 590,
            top: 420,
            width: 460,
            boxSizing: 'border-box',
            padding: '28px 28px 30px',
            borderRadius: 36,
            background: 'rgba(255,255,255,0.97)',
            border: `3px solid ${cores.dourado}`,
            boxShadow: '0 24px 70px rgba(80,50,10,0.35)',
            fontFamily,
            color: '#1F1B2D',
            opacity: interpolate(entra, [0, 0.3], [0, 1], clamp),
            scale: interpolate(entra, [0, 1], [0.6, 1]),
            transformOrigin: '0% 100%',
          }}
        >
          <div style={{fontSize: 22, fontWeight: 800, letterSpacing: 2, color: cores.roxo}}>VIQ · CONFIGURAÇÃO</div>
          <div style={{fontSize: 40, fontWeight: 800, lineHeight: 1.1, marginTop: 6}}>{c.tela.titulo}</div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 14, marginTop: 22}}>
            {c.tela.passos.map((p, i) => {
              const s = spring({frame: frame - p.f, fps, config: {damping: 11, stiffness: 200}});
              const feito = frame >= p.f;
              return (
                <div key={i} style={{display: 'flex', alignItems: 'center', gap: 16, fontSize: 32, fontWeight: 700}}>
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 14,
                      border: `3px solid ${feito ? cores.verde : '#CFC8DD'}`,
                      background: feito ? cores.verde : 'white',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 30,
                      fontWeight: 800,
                      scale: feito ? interpolate(s, [0, 1], [0.4, 1]) : 1,
                    }}
                  >
                    {feito ? '✓' : ''}
                  </div>
                  <span style={{color: feito ? '#1F1B2D' : '#9C95AE'}}>{p.texto}</span>
                </div>
              );
            })}
          </div>
          <div style={{marginTop: 26, padding: '18px 20px', borderRadius: 24, background: frame >= c.tela.liga ? 'rgba(37,211,102,0.12)' : '#F3F0F7', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{fontSize: 30, fontWeight: 800}}>{c.tela.chave}</div>
            <div style={{width: 96, height: 54, borderRadius: 999, background: interpolate(liga, [0, 1], [0, 1]) > 0.5 ? cores.verde : '#CFC8DD', position: 'relative'}}>
              <div style={{position: 'absolute', top: 6, left: 6 + interpolate(liga, [0, 1], [0, 42], clamp), width: 42, height: 42, borderRadius: '50%', background: 'white', boxShadow: '0 2px 6px rgba(0,0,0,0.25)'}} />
            </div>
          </div>
          {frame >= c.tela.liga ? (
            <div style={{marginTop: 12, fontSize: 26, fontWeight: 800, color: '#15803D', opacity: liga}}>Ligado · responde a qualquer hora</div>
          ) : null}
        </div>
      ) : null}
      <Relogio hora={c.relogio} />
      <Legenda top={1050} inicio={c.legenda.inicio} fim={c.legenda.fim} linhas={c.legenda.linhas.map((t) => ({texto: t, tamanho: 60}))} />
    </Palco>
  );
};
