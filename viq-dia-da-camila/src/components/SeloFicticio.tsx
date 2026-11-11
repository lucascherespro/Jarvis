import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useFormato} from '../layout';
import {fontFamily} from '../theme';

export const SeloFicticio: React.FC<{texto: string; opacity?: number}> = ({texto, opacity = 1}) => {
  const {vertical, H} = useFormato();
  return (
    <AbsoluteFill style={{pointerEvents: 'none', opacity}}>
      <div style={{position: 'absolute', top: vertical ? 1362 : H - 62, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
        <div style={{fontFamily, fontSize: 22, fontWeight: 700, letterSpacing: 2.5, color: 'rgba(255,255,255,0.92)', padding: '7px 18px', borderRadius: 10, background: 'rgba(11,21,48,0.72)', border: '1.5px solid rgba(255,255,255,0.3)'}}>
          {texto}
        </div>
      </div>
    </AbsoluteFill>
  );
};
