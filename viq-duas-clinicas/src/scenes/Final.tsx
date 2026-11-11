import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import type {Roteiro} from '../data/schema';
import {ComDestaque, Linha} from '../components/Texto';
import {useLayout} from '../layout';
import {clamp, cores, curvas, fontFamily} from '../theme';
import {LinhaGancho} from './Gancho';

const Logo: React.FC<{arquivo: string}> = ({arquivo}) => {
  if (arquivo) return <Img src={staticFile(arquivo)} style={{height: 170, maxWidth: 640, objectFit: 'contain'}} />;
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
      <div
        style={{
          width: 136,
          height: 136,
          borderRadius: 36,
          background: `linear-gradient(135deg, ${cores.roxoClaro}, ${cores.roxo})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily,
          fontWeight: 800,
          fontSize: 96,
          color: 'white',
        }}
      >
        V
      </div>
      <div style={{fontFamily, fontWeight: 800, fontSize: 140, color: 'white', letterSpacing: -4, lineHeight: 1}}>VIQ</div>
    </div>
  );
};

const Botao: React.FC<{letra: string; marca: boolean; atraso: number}> = ({letra, marca, atraso}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - atraso, fps, config: {damping: 11, stiffness: 160}});
  const pulso = 1 + 0.06 * Math.max(0, Math.sin((frame - atraso - 12) / (marca ? 4 : 5.5)));
  return (
    <div
      style={{
        width: 210,
        height: 190,
        borderRadius: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily,
        fontWeight: 800,
        fontSize: 120,
        color: 'white',
        background: marca ? `linear-gradient(135deg, ${cores.roxoClaro}, ${cores.roxo})` : 'linear-gradient(135deg, #6B7387, #4A5163)',
        boxShadow: marca ? `0 0 50px ${cores.roxo}` : '0 10px 30px rgba(0,0,0,0.4)',
        border: '4px solid rgba(255,255,255,0.25)',
        scale: s * pulso,
      }}
    >
      {letra}
    </div>
  );
};

export const Final: React.FC<{roteiro: Roteiro}> = ({roteiro}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const L = useLayout();
  const f = roteiro.final;
  const logo = spring({frame: frame - 2, fps, config: {damping: 200}, durationInFrames: 22});
  // loop: nos últimos frames o conteúdo some e "Duas clínicas." volta ao estado do frame 0
  const loop = interpolate(frame, [durationInFrames - 14, durationInFrames - 1], [0, 1], {...clamp, easing: curvas.suave});
  const base = L.vertical ? L.safeTop + 10 : 70;
  const passo = L.vertical ? 1 : 0.86;
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', inset: 0, opacity: 1 - loop}}>
        <div
          style={{
            position: 'absolute',
            top: base,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            opacity: logo,
            scale: interpolate(logo, [0, 1], [0.6, 1], {output: 'perceptual-scale'}),
            filter: `drop-shadow(0 0 ${30 * logo}px rgba(124,58,237,0.8))`,
          }}
        >
          <Logo arquivo={roteiro.logoFile} />
        </div>
        <div style={{position: 'absolute', top: base + 220 * passo, left: 60, right: 60}}>
          <Linha atraso={12} tamanho={80}>
            {f.pergunta}
          </Linha>
        </div>
        <div style={{position: 'absolute', top: base + 360 * passo, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 60}}>
          <Botao letra={f.botaoA} marca={false} atraso={22} />
          <Botao letra={f.botaoB} marca atraso={28} />
        </div>
        <div style={{position: 'absolute', top: base + 600 * passo, left: 50, right: 50}}>
          <Linha atraso={38} tamanho={72}>
            {f.cta1}
          </Linha>
        </div>
        <div style={{position: 'absolute', top: base + 720 * passo, left: 50, right: 50}}>
          <Linha atraso={50} tamanho={54} peso={700}>
            {f.cta2} <ComDestaque texto={f.cta2Destaque} destaque={f.cta2Destaque} cor={cores.roxoClaro} />
          </Linha>
        </div>
        <div style={{position: 'absolute', top: base + 830 * passo, left: 0, right: 0}}>
          <Linha atraso={60} tamanho={44} peso={600} cor="#C7D2FE">
            {f.handle}
          </Linha>
        </div>
      </div>
      {loop > 0 ? (
        <LinhaGancho L={L} indice={0} escala={1.4} opacity={loop}>
          {roteiro.gancho.linha1}
        </LinhaGancho>
      ) : null}
    </AbsoluteFill>
  );
};
