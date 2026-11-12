import React from 'react';
import {interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {Camera} from '../backgrounds/Camadas';
import {LuzMesa, MesaFundo, MesaTampo} from '../backgrounds/MesaCloseUp';
import {Celular} from '../character/Celular';
import type {Roteiro} from '../data/schema';
import {Legenda} from '../components/Legenda';
import {Notificacao} from '../components/Notificacao';
import {Palco} from '../components/Palco';
import {Relogio} from '../components/Relogio';
import {clamp, filtroAto} from '../theme';
import {useCameraLeve, vibracaoEm, Vinheta} from './comum';

const CORES_AVATAR = ['#F472B6', '#60A5FA', '#F59E0B', '#34D399', '#A78BFA'];

const Tomada: React.FC<{luz: LuzMesa; dia: string; relogio: string; notificacoes: {nome: string; texto: string; f: number}[]; indice: number}> = ({luz, dia, relogio, notificacoes, indice}) => {
  const frame = useCurrentFrame();
  const cam = useCameraLeve(indice % 2 ? 18 : -18, indice % 2 ? -18 : 18, 1.02, 1.09);
  const v = vibracaoEm(frame, notificacoes.map((n) => n.f));
  const brilho = notificacoes.reduce((acc, n) => (frame >= n.f ? Math.max(acc, interpolate(frame - n.f, [0, 4, 60], [0, 1, 0.55], clamp)) : acc), 0.05);
  return (
    <Palco filtro={filtroAto(1)}>
      <Camera
        pan={cam.pan}
        zoom={cam.zoom}
        fundo={<MesaFundo luz={luz} />}
        meio={<MesaTampo luz={luz} />}
        personagem={
          <>
            {/* luz da tela no tampo */}
            <div style={{position: 'absolute', left: 540 - 330, top: 1260 - 330, width: 660, height: 660, borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,181,253,0.55), rgba(196,181,253,0) 70%)', opacity: brilho}} />
            <svg width={600} height={700} viewBox="-300 -350 600 700" style={{position: 'absolute', left: 240, top: 910, overflow: 'visible'}}>
              <g transform="rotate(-8) scale(1 0.92)">
                <Celular largura={250} brilho={brilho} vibra={v} frame={frame} />
              </g>
            </svg>
          </>
        }
      />
      {luz === 'noite' ? <Vinheta forca={0.6} /> : <Vinheta forca={0.3} />}
      {notificacoes.map((n, i) => (
        <Notificacao
          key={i}
          nome={n.nome}
          texto={n.texto}
          inicio={n.f}
          x={130 + (i % 2) * 40}
          y={450 + i * 128}
          largura={780}
          rot={i % 2 ? 1.5 : -1.5}
          origemX={300}
          origemY={1150}
          cor={CORES_AVATAR[(i + indice * 2) % CORES_AVATAR.length]}
        />
      ))}
      <Relogio hora={relogio} dia={dia} minutosPorSegundo={0} />
    </Palco>
  );
};

/** 8–20 s · Montagem rápida: o celular sozinho na mesa, mensagens chegando a qualquer hora */
export const Cena2Problema: React.FC<{roteiro: Roteiro}> = ({roteiro}) => {
  const {durationInFrames} = useVideoConfig();
  const c = roteiro.cena2;
  const n = c.tomadas.length;
  const dur = Math.floor(durationInFrames / n);
  return (
    <>
      {c.tomadas.map((t, i) => (
        <Sequence key={i} name={`Tomada ${t.dia} ${t.relogio}`} from={i * dur} durationInFrames={i === n - 1 ? durationInFrames - i * dur : dur}>
          <Tomada {...t} indice={i} />
        </Sequence>
      ))}
      <Palco>
        <Legenda top={880} inicio={c.legenda.inicio} fim={c.legenda.fim} linhas={c.legenda.linhas.map((t) => ({texto: t, tamanho: 66}))} />
      </Palco>
    </>
  );
};
