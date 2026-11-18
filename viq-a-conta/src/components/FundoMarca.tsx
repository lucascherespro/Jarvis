import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {cores} from '../theme';
import {Grao} from './Grao';

/** Fundo azul-marinho com manchas roxas em ciclo (usado no gancho e no final: loop sem emenda) */
export const FundoMarca: React.FC<{offset?: number; periodo: number}> = ({offset = 0, periodo}) => {
  const frame = useCurrentFrame() + offset;
  const a = (frame / periodo) * Math.PI * 2;
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, #121E48 0%, ${cores.navy} 60%, #070E22 100%)`}}>
      <div style={{position: 'absolute', width: 800, height: 800, borderRadius: '50%', background: 'rgba(124,58,237,0.5)', filter: 'blur(150px)', left: -150 + Math.sin(a) * 140, top: 300 + Math.cos(a) * 120}} />
      <div style={{position: 'absolute', width: 700, height: 700, borderRadius: '50%', background: 'rgba(167,139,250,0.3)', filter: 'blur(150px)', left: 560 + Math.cos(a) * 120, top: 1100 + Math.sin(a) * 140}} />
    </AbsoluteFill>
  );
};

export const GraoGlobal: React.FC = () => <Grao opacidade={0.06} />;
