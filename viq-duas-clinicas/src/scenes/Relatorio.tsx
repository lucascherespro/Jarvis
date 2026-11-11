import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import type {Roteiro} from '../data/schema';
import {AvatarCliente} from '../components/AvatarCliente';
import {Donut} from '../components/Donut';
import {Fundo} from '../components/Fundo';
import {GraficoBarras} from '../components/GraficoBarras';
import {SeloSimulacao} from '../components/SeloSimulacao';
import {Linha} from '../components/Texto';
import {useLayout} from '../layout';
import {clamp, cores, fontFamily} from '../theme';

export const Relatorio: React.FC<{roteiro: Roteiro; inicio: number; periodo: number}> = ({roteiro, inicio, periodo}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const L = useLayout();
  const r = roteiro.relatorio;
  const agendados = roteiro.clientes.filter((c) => c.agendou);
  const titY = L.safeTop + (L.vertical ? 8 : 0);
  const cardTop = titY + 150;
  const cardBottom = L.safeBottom - 12;
  const graficoH = L.vertical ? 300 : 270;
  const linhaTop = cardTop + 36 + 50 + graficoH + 40;
  const card = spring({frame: frame - 6, fps, config: {damping: 200}, durationInFrames: 18});
  const linhaH = Math.min(100, (cardBottom - linhaTop - 70) / Math.max(1, agendados.length));
  const donutTam = L.vertical ? 300 : 280;
  return (
    <AbsoluteFill>
      <Fundo offset={inicio} periodo={periodo} />
      <div style={{position: 'absolute', top: titY, left: 0, right: 0}}>
        <Linha atraso={0} tamanho={84}>
          {r.titulo}
        </Linha>
        <Linha atraso={6} tamanho={34} peso={600} cor={cores.cinza} style={{marginTop: 8}}>
          {r.subtitulo}
        </Linha>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 50,
          right: 50,
          top: cardTop,
          height: cardBottom - cardTop,
          borderRadius: 44,
          background: 'rgba(22,33,74,0.78)',
          border: '2px solid rgba(167,139,250,0.35)',
          boxShadow: '0 0 60px rgba(124,58,237,0.25)',
          opacity: card,
          scale: interpolate(card, [0, 1], [0.94, 1]),
        }}
      />
      {/* a) gráfico de barras */}
      <div style={{position: 'absolute', left: 90, top: cardTop + 32, fontFamily, fontWeight: 700, fontSize: 36, color: 'white', opacity: interpolate(frame, [14, 22], [0, 1], clamp)}}>
        {r.graficoTitulo}
      </div>
      <div style={{position: 'absolute', left: 90, top: cardTop + 36 + 50}}>
        <GraficoBarras barras={r.barras} largura={900} altura={graficoH} inicio={20} />
      </div>
      {/* b) donut */}
      <div style={{position: 'absolute', left: 80, top: linhaTop + 20, opacity: interpolate(frame, [66, 74], [0, 1], clamp)}}>
        <Donut valor={r.donutValor} titulo={r.donutTitulo} tamanho={donutTam} inicio={70} />
      </div>
      {/* c) lista de agendamentos */}
      <div style={{position: 'absolute', left: 420, top: linhaTop, fontFamily, fontWeight: 700, fontSize: 34, color: 'white', opacity: interpolate(frame, [84, 92], [0, 1], clamp)}}>
        {r.listaTitulo}
      </div>
      {agendados.map((c, i) => {
        const s = spring({frame: frame - 92 - i * 9, fps, config: {damping: 14, stiffness: 150}});
        return (
          <div
            key={c.nome}
            style={{
              position: 'absolute',
              left: 420,
              top: linhaTop + 56 + i * linhaH,
              width: 580,
              height: linhaH - 12,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              opacity: interpolate(s, [0, 0.4], [0, 1], clamp),
              translate: `${interpolate(s, [0, 1], [60, 0])}px 0px`,
            }}
          >
            <AvatarCliente nome={c.nome} cor={c.cor} tamanho={56} />
            <div style={{fontFamily, lineHeight: 1.15}}>
              <div style={{fontSize: 32, fontWeight: 800, color: 'white'}}>
                {c.nome} <span style={{color: cores.verdeClaro, fontWeight: 700, fontSize: 28}}>· {c.dia}</span>
              </div>
              <div style={{fontSize: 26, fontWeight: 500, color: cores.cinza}}>{c.procedimento}</div>
            </div>
          </div>
        );
      })}
      <SeloSimulacao texto={roteiro.textos.selo} top={L.seloY} />
    </AbsoluteFill>
  );
};
