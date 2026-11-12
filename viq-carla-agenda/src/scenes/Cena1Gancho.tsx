import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Camera} from '../backgrounds/Camadas';
import {BalcaoCarla, ClinicaCarlaFundo, ClinicaCarlaMeio} from '../backgrounds/ClinicaCarla';
import {Personagem} from '../character/Personagem';
import type {Roteiro} from '../data/schema';
import {Legenda} from '../components/Legenda';
import {Palco} from '../components/Palco';
import {clamp, cores, curvas} from '../theme';
import {tremida, Vinheta} from './comum';

export const CARLA_BALCAO = {x: 220, y: 630, largura: 640};

/** 0–8 s · Entardecer, clínica vazia. Carla encara o celular, suspira e larga o aparelho no balcão. */
export const Cena1Gancho: React.FC<{roteiro: Roteiro}> = ({roteiro}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const c = roteiro.cena1;
  // push-in lento
  const p = interpolate(frame, [0, durationInFrames], [0, 1], {...clamp, easing: curvas.suave});
  const zoom = 1 + p * 0.14;
  const queda = spring({frame: frame - c.largaCelular, fps, config: {damping: 9, stiffness: 200}});
  const tr = tremida(frame, c.largaCelular + 4, 6);
  const vib = c.vibracoes.reduce((acc, f) => (frame - f >= 0 && frame - f < 14 ? Math.max(acc, 1 - (frame - f) / 14) : acc), 0);
  return (
    <Palco filtro="saturate(0.82) sepia(0.12) brightness(0.93)">
      <div style={{position: 'absolute', inset: 0, translate: `${tr.x}px ${tr.y}px`}}>
        <Camera
          pan={interpolate(p, [0, 1], [-10, 10])}
          zoom={zoom}
          fundo={<ClinicaCarlaFundo luz="entardecer" />}
          meio={<ClinicaCarlaMeio luz="entardecer" />}
          personagem={
            <BalcaoCarla
              objetos={
                frame >= c.largaCelular ? (
                  <svg width={200} height={120} viewBox="-100 -60 200 120" style={{position: 'absolute', left: 560, top: 1104 - (1 - queda) * 40, overflow: 'visible'}}>
                    {/* celular deitado no balcão, tela para baixo */}
                    <rect x={-70} y={-12} width={140} height={24} rx={10} fill="#141827" />
                    <rect x={-62} y={-14} width={124} height={6} rx={3} fill="#2A2F47" />
                  </svg>
                ) : null
              }
            >
              <div style={{position: 'absolute', left: CARLA_BALCAO.x, top: CARLA_BALCAO.y}}>
                <Personagem largura={CARLA_BALCAO.largura} poses={c.poses} expressoes={c.expressoes} vibracoes={c.vibracoes} brilhoCelular={0.5 + vib * 0.5} />
              </div>
            </BalcaoCarla>
          }
        />
      </div>
      <Vinheta forca={0.55} cor="40,16,8" />
      <Legenda
        top={290}
        inicio={c.ganchoInicio}
        fim={c.ganchoFim}
        slam
        intervalo={9}
        linhas={c.gancho.map((t, i) => ({texto: t, tamanho: i === 2 ? 88 : 76, cor: i === 2 ? cores.dourado : undefined}))}
      />
    </Palco>
  );
};
