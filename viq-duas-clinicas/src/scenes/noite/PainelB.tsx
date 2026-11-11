import React from 'react';
import {interpolate, spring, useVideoConfig} from 'remotion';
import type {Roteiro} from '../../data/schema';
import {ALTURAS, Chip, Digitando, Notificacao, NotificacaoCompacta, RespostaViq} from '../../components/Notificacao';
import {clamp, cores} from '../../theme';
import {alturaB, empilhar, GAP, gruposB, MASCARA, PAINEL_W} from './logica';

export const PainelB: React.FC<{roteiro: Roteiro; g: number; feedH: number}> = ({roteiro, g, feedH}) => {
  const {fps} = useVideoConfig();
  const grupos = gruposB(roteiro).map((gr) => ({...gr, chegada: gr.ev.chegada}));
  const itens = empilhar(grupos, (gr) => alturaB(gr, g, fps).altura, g, fps, feedH);
  const t = roteiro.textos;
  return (
    <>
      {itens.map((s) => {
        if (s.presenca <= 0.001 && s.queda <= 0.001) return null;
        const {colapso} = alturaB(s, g, fps);
        const c = s.cliente;
        const anel = interpolate(s.local, [4, 18], [0, 1], clamp);
        const yResposta = ALTURAS.clienteCheio + GAP;
        const respostaS = g < s.ev.resposta ? 0 : spring({frame: g - s.ev.resposta, fps, config: {damping: 13, stiffness: 170}});
        const chipS = g < s.ev.chip ? 0 : spring({frame: g - s.ev.chip, fps, config: {damping: 10, stiffness: 200}});
        const yChip = yResposta + ALTURAS.resposta + GAP;
        const textoChip = c.agendou ? `${t.agendado} · ${c.dia}` : t.duvidaRespondida;
        const brilho = 0.5 + 0.5 * Math.sin(g / 5);
        return (
          <div
            key={s.id}
            style={{
              position: 'absolute',
              top: s.y + MASCARA,
              left: 0,
              width: PAINEL_W,
              height: s.altura,
              opacity: interpolate(s.queda, [0, 0.4], [0, 1], clamp),
              translate: `0px ${interpolate(s.queda, [0, 1], [-200, 0])}px`,
            }}
          >
            <div style={{position: 'absolute', inset: 0, opacity: 1 - Math.min(1, colapso * 2), overflow: 'hidden'}}>
              <Notificacao lado="B" nome={c.nome} cor={c.cor} mensagem={c.mensagem} hora={c.hora} largura={PAINEL_W} anel={anel} />
              {g >= s.ev.digitando && g < s.ev.resposta ? (
                <div style={{position: 'absolute', top: yResposta, left: 0}}>
                  <Digitando texto={t.digitando} frame={g} />
                </div>
              ) : null}
              {g >= s.ev.resposta ? (
                <div
                  style={{
                    position: 'absolute',
                    top: yResposta,
                    left: 0,
                    opacity: interpolate(respostaS, [0, 0.4], [0, 1], clamp),
                    scale: interpolate(respostaS, [0, 1], [0.85, 1]),
                    transformOrigin: '0% 0%',
                  }}
                >
                  <RespostaViq texto={c.respostaViq} rodape={t.respondidoEm} largura={PAINEL_W} hora={c.hora} />
                </div>
              ) : null}
              {g >= s.ev.chip ? (
                <div style={{position: 'absolute', top: yChip, left: 0, scale: chipS, transformOrigin: '0% 50%'}}>
                  <Chip texto={textoChip} verde={c.agendou} brilho={brilho} />
                </div>
              ) : null}
            </div>
            {colapso > 0.5 ? (
              <div style={{position: 'absolute', inset: 0, opacity: (colapso - 0.5) * 2}}>
                <NotificacaoCompacta
                  lado="B"
                  nome={c.nome}
                  cor={c.cor}
                  texto={c.agendou ? `✓ ${c.dia}` : `✓ ${t.duvidaRespondida}`}
                  corTexto={c.agendou ? cores.verdeClaro : '#DDD6FE'}
                  largura={PAINEL_W}
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
};
