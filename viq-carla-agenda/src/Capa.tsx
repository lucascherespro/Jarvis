import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import type {Roteiro} from './data/schema';
import {Video} from './AgendaDaCarla';
import {cores, fontFamily} from './theme';

/** Capa: Carla frustrada no fim de tarde + pergunta do gancho */
export const CAPA_FRAME = 120;

export const Capa: React.FC<Roteiro> = (props) => (
  <AbsoluteFill>
    <Sequence from={-CAPA_FRAME} layout="none">
      <Video roteiro={{...props, cena1: {...props.cena1, ganchoInicio: 9999}}} extras={false} />
    </Sequence>
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(11,21,48,0.92) 0%, rgba(11,21,48,0.65) 26%, rgba(11,21,48,0) 40%)'}} />
    <div style={{position: 'absolute', top: 300, left: 40, right: 40, textAlign: 'center', fontFamily, color: 'white'}}>
      <div style={{fontSize: 104, fontWeight: 800, letterSpacing: -3, lineHeight: 1.02, textShadow: '0 8px 40px rgba(0,0,0,0.5)'}}>
        Quantas clientes você perde <span style={{color: cores.dourado}}>sem saber?</span>
      </div>
      <div style={{fontSize: 44, fontWeight: 700, marginTop: 20, color: '#E0E7FF'}}>A agenda da Carla</div>
    </div>
  </AbsoluteFill>
);
