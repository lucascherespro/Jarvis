import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Camila} from '../character/Camila';
import type {Roteiro} from '../data/schema';
import {Palco} from '../components/Palco';
import {clamp, cores, curvas, fontFamily} from '../theme';
import {GANCHO_CAMILA} from './Gancho';

const Logo: React.FC<{arquivo: string}> = ({arquivo}) => {
  if (arquivo) return <Img src={staticFile(arquivo)} style={{height: 130, maxWidth: 520, objectFit: 'contain'}} />;
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
      <div style={{width: 104, height: 104, borderRadius: 28, background: `linear-gradient(135deg, ${cores.roxoClaro}, ${cores.roxo})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily, fontWeight: 800, fontSize: 72, color: 'white'}}>V</div>
      <div style={{fontFamily, fontWeight: 800, fontSize: 104, color: 'white', letterSpacing: -3, lineHeight: 1}}>VIQ</div>
    </div>
  );
};

export const Final: React.FC<{roteiro: Roteiro}> = ({roteiro}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const f = roteiro.final;
  const fimLoop = durationInFrames - 1;
  const inicioLoop = durationInFrames - 30;
  // loop: nos últimos 30 frames a Camila volta ao enquadramento do gancho (frame 0)
  const loop = interpolate(frame, [inicioLoop, fimLoop], [0, 1], {...clamp, easing: curvas.suave});
  const textoSai = interpolate(frame, [inicioLoop, inicioLoop + 14], [1, 0], clamp);
  const pos = {
    x: interpolate(loop, [0, 1], [-70, GANCHO_CAMILA.x]),
    y: interpolate(loop, [0, 1], [880, GANCHO_CAMILA.y]),
    w: interpolate(loop, [0, 1], [600, GANCHO_CAMILA.largura]),
  };
  const logo = spring({frame: frame - 4, fps, config: {damping: 200}, durationInFrames: 20});
  const pulso = 1 + 0.06 * Math.max(0, Math.sin((frame - 40) / 4.5));
  const entra = (d: number) => spring({frame: frame - d, fps, config: {damping: 15, stiffness: 140}});
  const camilaEntra = spring({frame, fps, config: {damping: 16}});
  return (
    <Palco>
      <AbsoluteFill style={{opacity: textoSai}}>
        <div style={{position: 'absolute', top: 320, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: logo, scale: interpolate(logo, [0, 1], [0.6, 1], {output: 'perceptual-scale'}), filter: `drop-shadow(0 0 ${28 * logo}px rgba(124,58,237,0.8))`}}>
          <Logo arquivo={roteiro.logoFile} />
        </div>
        <div style={{position: 'absolute', top: 500, left: 400, right: 60, fontFamily, fontWeight: 800, fontSize: 76, lineHeight: 1.06, letterSpacing: -2, color: 'white', textWrap: 'balance', opacity: entra(14), translate: `0px ${(1 - entra(14)) * 40}px`}}>
          {f.pergunta}
        </div>
        <div style={{position: 'absolute', top: 790, left: 400, scale: entra(30) * pulso, transformOrigin: '0% 50%'}}>
          <div style={{padding: '22px 36px', borderRadius: 999, background: 'rgba(11,21,48,0.9)', border: `3px solid ${cores.roxoClaro}`, boxShadow: `0 0 40px ${cores.roxo}`, fontFamily, fontWeight: 800, fontSize: 70, color: 'white', whiteSpace: 'nowrap'}}>
            {f.cta} <span style={{color: cores.roxoClaro}}>{f.ctaDestaque}</span>
          </div>
        </div>
        <div style={{position: 'absolute', top: 950, left: 410, fontFamily, fontWeight: 700, fontSize: 46, color: '#C7D2FE', opacity: entra(44)}}>{f.handle}</div>
      </AbsoluteFill>
      <div style={{position: 'absolute', left: pos.x, top: pos.y + (1 - camilaEntra) * 300}}>
        <Camila
          largura={pos.w}
          deslocamento={-fimLoop}
          poses={[
            {f: -40 - fimLoop, v: 'apontando'},
            {f: inicioLoop - fimLoop, v: 'olhandoCelular'},
          ]}
          expressoes={[
            {f: -40 - fimLoop, v: 'feliz'},
            {f: inicioLoop - fimLoop, v: 'estressada'},
          ]}
          brilhoCelular={0.9}
        />
      </div>
    </Palco>
  );
};
