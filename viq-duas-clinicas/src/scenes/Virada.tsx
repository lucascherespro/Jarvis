import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import type {Roteiro} from '../data/schema';
import {Linha} from '../components/Texto';
import {useLayout} from '../layout';
import {clamp, cores} from '../theme';

export const Virada: React.FC<{roteiro: Roteiro}> = ({roteiro}) => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const v = roteiro.virada;
  const atenua = interpolate(frame, [80, 92], [1, 0.45], clamp);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: 'rgba(4,8,20,0.82)'}} />
      <div style={{position: 'absolute', left: 70, right: 70, top: L.centroY - 330, display: 'flex', flexDirection: 'column', gap: 18}}>
        <div style={{opacity: atenua}}>
          <Linha atraso={4} tamanho={64} peso={700}>
            {v.linha1}
          </Linha>
        </div>
        <div style={{opacity: atenua}}>
          <Linha atraso={30} tamanho={104}>
            {v.linha2}
          </Linha>
        </div>
        <div style={{opacity: atenua}}>
          <Linha atraso={56} tamanho={104}>
            {v.linha3}
          </Linha>
        </div>
        <Linha atraso={84} tamanho={112} cor={cores.roxoClaro} style={{marginTop: 30, textShadow: `0 0 40px ${cores.roxo}`}}>
          {v.linha4}
        </Linha>
      </div>
    </AbsoluteFill>
  );
};
