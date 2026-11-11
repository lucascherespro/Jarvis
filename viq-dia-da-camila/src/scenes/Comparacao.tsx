import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {ClinicaFundo} from '../backgrounds/Clinica';
import {Camila} from '../character/Camila';
import type {Roteiro} from '../data/schema';
import {Legenda} from '../components/Legenda';
import {Palco} from '../components/Palco';
import {clamp, cores, filtroAto, fontFamily} from '../theme';

const Metade: React.FC<{lado: 'A' | 'B'; roteiro: Roteiro}> = ({lado, roteiro}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const c = roteiro.comparacao;
  const a = lado === 'A';
  const entra = spring({frame: frame - (a ? 0 : 6), fps, config: {damping: 200}, durationInFrames: 16});
  const pill = spring({frame: frame - (a ? 20 : 30), fps, config: {damping: 10, stiffness: 180}});
  return (
    <div style={{position: 'absolute', top: 0, bottom: 0, left: a ? 0 : 540, width: 540, overflow: 'hidden', translate: `${(a ? -1 : 1) * (1 - entra) * 540}px 0px`}}>
      <div style={{position: 'absolute', inset: 0, filter: a ? 'saturate(0.35) brightness(0.8) hue-rotate(-15deg)' : filtroAto(2)}}>
        <div style={{position: 'absolute', left: a ? -60 : -540, top: 0, width: 1080, height: 1920}}>
          <ClinicaFundo />
        </div>
        <AbsoluteFill style={{background: a ? 'rgba(40,60,110,0.35)' : 'rgba(255,170,90,0.18)'}} />
        <div style={{position: 'absolute', left: -10, top: 600}}>
          <Camila
            largura={560}
            poses={[{f: -60, v: a ? 'olhandoCelular' : 'comemorando'}]}
            expressoes={[{f: -60, v: a ? 'estressada' : 'comemorando'}]}
            vibracoes={a ? [10, 35, 60, 85] : []}
            brilhoCelular={0.9}
          />
        </div>
      </div>
      <div style={{position: 'absolute', top: 322, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
        <div style={{padding: '8px 22px', borderRadius: 14, background: 'rgba(11,21,48,0.85)', fontFamily, fontWeight: 800, fontSize: 38, letterSpacing: 4, color: a ? '#C9D1E6' : cores.roxoClaro}}>
          {a ? c.rotuloA : c.rotuloB}
        </div>
      </div>
      <div style={{position: 'absolute', top: 400, left: 0, right: 0, display: 'flex', justifyContent: 'center', scale: pill}}>
        <div
          style={{
            padding: '14px 24px',
            borderRadius: 24,
            background: a ? cores.vermelho : cores.verde,
            color: a ? 'white' : '#06301A',
            fontFamily,
            fontWeight: 800,
            fontSize: 40,
            textAlign: 'center',
            maxWidth: 440,
            boxShadow: a ? '0 10px 30px rgba(239,68,68,0.5)' : '0 0 34px rgba(37,211,102,0.7)',
          }}
        >
          {a ? c.resultadoA : c.resultadoB}
        </div>
      </div>
    </div>
  );
};

export const Comparacao: React.FC<{roteiro: Roteiro}> = ({roteiro}) => {
  const frame = useCurrentFrame();
  const c = roteiro.comparacao;
  return (
    <Palco>
      <AbsoluteFill style={{background: cores.navy}} />
      <Metade lado="A" roteiro={roteiro} />
      <Metade lado="B" roteiro={roteiro} />
      <div style={{position: 'absolute', left: 537, top: 0, bottom: 0, width: 6, background: cores.roxoClaro, boxShadow: `0 0 30px 6px ${cores.roxo}`, opacity: interpolate(frame, [6, 16], [0, 1], clamp)}} />
      <Legenda top={1110} inicio={c.legenda.inicio} fim={c.legenda.fim} linhas={[{texto: c.legenda.linhas[0], tamanho: 60}, {texto: c.legenda.linhas[1] ?? '', tamanho: 76, cor: cores.roxoClaro}]} intervalo={18} />
    </Palco>
  );
};
