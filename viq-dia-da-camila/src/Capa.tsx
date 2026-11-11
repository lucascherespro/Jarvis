import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import type {Roteiro} from './data/schema';
import {Video} from './DiaDaCamila';
import {cores, fontFamily} from './theme';

/** Capa: Dra. Camila estressada com o celular cheio de notificações + "Essa é você?" */
export const CAPA_FRAME = 60;

export const Capa: React.FC<Roteiro> = (props) => (
  <AbsoluteFill>
    <Sequence from={-CAPA_FRAME} layout="none">
      <Video roteiro={{...props, gancho: {...props.gancho, titulo: '', subtitulo: ''}}} extras={false} />
    </Sequence>
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(11,21,48,0.9) 0%, rgba(11,21,48,0.6) 24%, rgba(11,21,48,0) 36%)'}} />
    <div style={{position: 'absolute', top: 300, left: 40, right: 40, textAlign: 'center', fontFamily, color: 'white'}}>
      <div style={{fontSize: 130, fontWeight: 800, letterSpacing: -4, lineHeight: 1, textShadow: '0 8px 40px rgba(0,0,0,0.5)'}}>
        Essa é <span style={{color: cores.roxoClaro}}>você?</span>
      </div>
      <div style={{fontSize: 46, fontWeight: 700, marginTop: 18, color: '#E0E7FF'}}>Um dia na vida da Dra. Camila</div>
    </div>
  </AbsoluteFill>
);
