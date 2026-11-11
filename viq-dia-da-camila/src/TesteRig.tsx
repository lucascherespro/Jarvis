import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Camila} from './character/Camila';
import {EXPRESSOES, NomeExpressao, NomePose, POSES} from './character/rig';

/** Folha de referência: todas as expressões (linha de cima) e poses (linha de baixo) */
export const TesteRig: React.FC = () => {
  const exprs = Object.keys(EXPRESSOES) as NomeExpressao[];
  const poses = Object.keys(POSES) as NomePose[];
  return (
    <AbsoluteFill style={{background: '#EADBD0', flexDirection: 'row', flexWrap: 'wrap', padding: 20, gap: 10}}>
      {exprs.map((x) => (
        <div key={x} style={{width: 200, textAlign: 'center', fontSize: 20, fontFamily: 'sans-serif'}}>
          <Camila poses={[{f: 0, v: 'emPe'}]} expressoes={[{f: -100, v: x}]} largura={200} />
          {x}
        </div>
      ))}
      {poses.map((x) => (
        <div key={x} style={{width: 200, textAlign: 'center', fontSize: 20, fontFamily: 'sans-serif'}}>
          <Camila poses={[{f: -100, v: x}]} expressoes={[{f: -100, v: 'neutra'}]} largura={200} />
          {x}
        </div>
      ))}
    </AbsoluteFill>
  );
};
