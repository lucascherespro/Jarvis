import React from 'react';
import {AbsoluteFill, interpolate, random, Sequence, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import type {Roteiro} from '../data/schema';
import {Legenda} from '../components/Legenda';
import {Palco} from '../components/Palco';
import {clamp, cores, fontFamily} from '../theme';
import {Cena1Procedimento} from './Cena1Procedimento';
import {Cena2Noite} from './Cena2Noite';
import {Cena3Manha} from './Cena3Manha';

/** Mostra uma cena tocando de trás para frente, rápido */
const AoContrario: React.FC<{de: number; ate: number; inicio: number; fim: number; children: React.ReactNode}> = ({de, ate, inicio, fim, children}) => {
  const frame = useCurrentFrame();
  if (frame < inicio || frame >= fim) return null;
  const alvo = Math.round(interpolate(frame, [inicio, fim - 1], [de, ate]));
  return (
    <Sequence from={frame - alvo} layout="none">
      {children}
    </Sequence>
  );
};

export const Rebobinar: React.FC<{roteiro: Roteiro}> = ({roteiro}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const t = roteiro.tempos;
  const split = 6 + random(`ab${frame}`) * 8;
  const icone = spring({frame, fps, config: {damping: 10, stiffness: 180}});
  const faixaY = (frame * 83) % 2100 - 200;
  const terco = Math.floor(durationInFrames / 3);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{filter: 'url(#vhs) saturate(1.3) contrast(1.1)', translate: `${(random(`j${frame}`) - 0.5) * 22}px 0px`}}>
        <svg width="0" height="0" style={{position: 'absolute'}}>
          <filter id="vhs" x="-5%" y="-5%" width="110%" height="110%">
            <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
            <feOffset in="r" dx={split} result="r2" />
            <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
            <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b" />
            <feOffset in="b" dx={-split} result="b2" />
            <feBlend in="r2" in2="g" mode="screen" result="rg" />
            <feBlend in="rg" in2="b2" mode="screen" />
          </filter>
        </svg>
        <AoContrario inicio={0} fim={terco} de={t.cena3 - 1} ate={0}>
          <Cena3Manha roteiro={roteiro} />
        </AoContrario>
        <AoContrario inicio={terco} fim={terco * 2} de={t.cena2 - 1} ate={0}>
          <Cena2Noite roteiro={roteiro} />
        </AoContrario>
        <AoContrario inicio={terco * 2} fim={durationInFrames} de={t.cena1 - 1} ate={0}>
          <Cena1Procedimento roteiro={roteiro} />
        </AoContrario>
      </AbsoluteFill>
      <Palco>
        <AbsoluteFill style={{background: 'rgba(10,6,30,0.5)'}} />
        <AbsoluteFill style={{background: 'repeating-linear-gradient(180deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 3px, transparent 3px, transparent 7px)', translate: `0px ${(frame * 3) % 7}px`}} />
        <div style={{position: 'absolute', top: faixaY, left: 0, right: 0, height: 90, background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.25), transparent)'}} />
        <div style={{position: 'absolute', top: 318, left: 80, fontFamily, fontWeight: 800, fontSize: 48, color: 'white', letterSpacing: 4, opacity: frame % 16 < 10 ? 1 : 0.25, textShadow: '3px 0 #ff2a6d, -3px 0 #05d9e8'}}>◀◀ REW</div>
        <div style={{position: 'absolute', top: 560, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
          <svg width="300" height="200" viewBox="0 0 300 200" style={{scale: icone * (1 + 0.06 * Math.sin(frame / 2.2)), filter: 'drop-shadow(6px 0 0 rgba(255,42,109,0.8)) drop-shadow(-6px 0 0 rgba(5,217,232,0.8))'}}>
            <polygon points="150,10 150,190 10,100" fill="white" />
            <polygon points="290,10 290,190 150,100" fill="white" />
          </svg>
        </div>
        <Legenda
          top={860}
          inicio={4}
          linhas={[
            {texto: roteiro.rebobinar.linha1, tamanho: 76},
            {texto: roteiro.rebobinar.linha2, tamanho: 92, cor: cores.roxoClaro},
          ]}
          intervalo={16}
        />
      </Palco>
      <AbsoluteFill style={{background: 'white', opacity: interpolate(frame, [durationInFrames - 4, durationInFrames], [0, 0.5], clamp)}} />
    </AbsoluteFill>
  );
};
