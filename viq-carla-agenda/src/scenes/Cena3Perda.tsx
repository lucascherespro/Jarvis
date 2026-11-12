import React from 'react';
import {interpolate, Sequence, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import type {Roteiro} from '../data/schema';
import {ChipAgendado} from '../components/ChipAgendado';
import {Legenda} from '../components/Legenda';
import {Palco} from '../components/Palco';
import {Relogio} from '../components/Relogio';
import {TelaChat} from '../components/TelaChat';
import {clamp, cores, filtroAto, fontFamily} from '../theme';
import {CenaCama} from './Quarto';

/** 20–30 s · A cliente manda mensagem, espera, desiste e marca em outra clínica */
export const Cena3Perda: React.FC<{roteiro: Roteiro}> = ({roteiro}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const c = roteiro.cena3;
  const o = c.outraClinica;
  const selo = spring({frame: frame - c.seloSemResposta, fps, config: {damping: 10, stiffness: 190}});
  const troca = spring({frame: frame - o.f, fps, config: {damping: 16, stiffness: 120}});
  const apagada = interpolate(frame, [c.seloSemResposta, c.seloSemResposta + 20], [0, 0.8], clamp);
  return (
    <Palco filtro={filtroAto(1)}>
      <CenaCama poses={c.poses} expressoes={c.expressoes} brilho={0.9} />
      {/* conversa com a clínica: sem resposta */}
      <div style={{position: 'absolute', inset: 0, translate: `${-troca * 80}px ${troca * 40}px`, opacity: interpolate(troca, [0, 1], [1, 0.0]), scale: interpolate(troca, [0, 1], [1, 0.9])}}>
        <TelaChat titulo={roteiro.nomeClinica} mensagens={[c.mensagem]} x={560} y={430} largura={470} inicio={6} apagada={apagada}>
          {frame >= c.seloSemResposta ? (
            <div style={{alignSelf: 'center', marginTop: 10, scale: selo, rotate: '-6deg', padding: '10px 22px', border: `4px solid ${cores.vermelho}`, borderRadius: 14, color: cores.vermelho, fontWeight: 800, fontSize: 30, letterSpacing: 2}}>
              SEM RESPOSTA
            </div>
          ) : null}
        </TelaChat>
      </div>
      {/* outra clínica responde e ela marca */}
      {frame >= o.f ? (
        <div style={{position: 'absolute', inset: 0, translate: `${(1 - troca) * 500}px 0px`}}>
          <TelaChat
            titulo={o.nome}
            mensagens={[
              {de: 'cliente', texto: c.mensagem.texto, hora: c.relogioDepois, f: o.f},
              {de: 'clinica', texto: o.resposta, hora: c.relogioDepois, f: o.f + 14},
            ]}
            x={560}
            y={430}
            largura={470}
            inicio={o.f}
          />
          <ChipAgendado texto={o.chip} inicio={o.f + 40} x={470} y={1060} />
        </div>
      ) : null}
      <Sequence durationInFrames={c.pulaRelogio} layout="none">
        <Relogio hora={c.relogio} />
      </Sequence>
      <Sequence from={c.pulaRelogio} layout="none">
        <Relogio hora={c.relogioDepois} />
        <div style={{position: 'absolute', top: 404, left: 0, right: 0, textAlign: 'center', fontFamily, fontWeight: 800, fontSize: 32, color: '#C7D2FE', letterSpacing: 2}}>43 MIN DEPOIS</div>
      </Sequence>
      <Legenda top={1110} inicio={c.legenda.inicio} fim={c.legenda.fim} linhas={c.legenda.linhas.map((t) => ({texto: t, tamanho: 70}))} />
      <Legenda top={1110} inicio={c.legenda2.inicio} fim={c.legenda2.fim} linhas={c.legenda2.linhas.map((t) => ({texto: t, tamanho: 70}))} />
    </Palco>
  );
};
