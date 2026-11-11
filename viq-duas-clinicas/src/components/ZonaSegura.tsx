import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useLayout} from '../layout';
import {fontFamily} from '../theme';

/** Depuração: mostra onde o Instagram coloca botões/legenda (desligado por padrão) */
export const ZonaSegura: React.FC = () => {
  const L = useLayout();
  const faixa: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    right: 0,
    background: 'repeating-linear-gradient(45deg, rgba(239,68,68,0.35) 0 20px, rgba(239,68,68,0.15) 20px 40px)',
    border: '3px dashed #EF4444',
    color: 'white',
    fontFamily,
    fontWeight: 800,
    fontSize: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div style={{...faixa, top: 0, height: L.safeTop}}>ZONA PROIBIDA (topo)</div>
      <div style={{...faixa, top: L.safeBottom, bottom: 0}}>ZONA PROIBIDA (legenda e botões)</div>
    </AbsoluteFill>
  );
};
