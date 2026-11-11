import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import type {Roteiro} from './data/schema';
import {Cenas} from './DuasClinicas';
import {cores, fontFamily} from './theme';

/** Capa do Reel: momento do voo da Paty + título forte na área central (visível no corte 3:4 do grid) */
export const CAPA_FRAME = 712;

export const Capa: React.FC<Roteiro> = (props) => (
  <AbsoluteFill>
    {/* desloca a linha do tempo: o frame 0 da capa mostra o frame CAPA_FRAME do vídeo */}
    <Sequence from={-CAPA_FRAME} layout="none">
      <Cenas roteiro={props} barra={false} />
    </Sequence>
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(11,21,48,0.98) 0%, rgba(11,21,48,0.98) 30%, rgba(11,21,48,0) 37%)'}} />
    <div style={{position: 'absolute', top: 270, left: 50, right: 50, textAlign: 'center', fontFamily, color: 'white'}}>
      <div style={{fontSize: 104, fontWeight: 800, letterSpacing: -3, lineHeight: 1.02}}>Duas clínicas.</div>
      <div style={{fontSize: 104, fontWeight: 800, letterSpacing: -3, lineHeight: 1.02, color: cores.roxoClaro}}>Mesma noite.</div>
      <div style={{fontSize: 48, fontWeight: 700, marginTop: 18, color: '#DDE3F5'}}>Qual delas é a sua?</div>
    </div>
  </AbsoluteFill>
);
