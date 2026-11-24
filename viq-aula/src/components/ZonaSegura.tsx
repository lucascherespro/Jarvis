import React from 'react';
import {AbsoluteFill} from 'remotion';
import {SAFE_BOTTOM, SAFE_TOP, useFormato} from '../layout';
import {fontFamily} from '../theme';

/** Depuração (desligado por padrão): zonas onde o Instagram cobre o vídeo */
export const ZonaSegura: React.FC = () => {
  const {deslocamentoY} = useFormato();
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
      <div style={{...faixa, top: -deslocamentoY, height: SAFE_TOP}}>ZONA PROIBIDA (topo)</div>
      <div style={{...faixa, top: SAFE_BOTTOM - deslocamentoY, height: 1920 - SAFE_BOTTOM}}>ZONA PROIBIDA (legenda e botões)</div>
    </AbsoluteFill>
  );
};
