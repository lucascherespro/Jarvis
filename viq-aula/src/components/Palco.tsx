import React from 'react';
import {AbsoluteFill} from 'remotion';
import {PALCO_H, PALCO_W, useFormato} from '../layout';

export const Palco: React.FC<{children: React.ReactNode; filtro?: string}> = ({children, filtro}) => {
  const {deslocamentoY} = useFormato();
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 0, top: -deslocamentoY, width: PALCO_W, height: PALCO_H, filter: filtro}}>{children}</div>
    </AbsoluteFill>
  );
};
