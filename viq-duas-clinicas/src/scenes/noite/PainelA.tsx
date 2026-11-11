import React from 'react';
import {interpolate, useVideoConfig} from 'remotion';
import type {Roteiro} from '../../data/schema';
import {Notificacao, NotificacaoCompacta} from '../../components/Notificacao';
import {clamp} from '../../theme';
import {alturaA, cronometro, empilhar, itensA, MASCARA, molaSuave, PAINEL_W} from './logica';

export const PainelA: React.FC<{roteiro: Roteiro; g: number; feedH: number}> = ({roteiro, g, feedH}) => {
  const {fps} = useVideoConfig();
  const itens = empilhar(itensA(roteiro), (it) => alturaA(it, g, fps), g, fps, feedH);
  return (
    <>
      {itens.map((s) => {
        if (s.presenca <= 0.001 && s.queda <= 0.001) return null;
        const col = s.colapsa === null ? 0 : molaSuave(g, s.colapsa, fps, 10);
        const semAvatar = s.vooInicio !== null && g >= s.vooInicio;
        const anel = interpolate(s.local, [4, 18], [0, 1], clamp);
        const textoCompacto = s.tipo === 'cliente' ? cronometro(roteiro, s.hora, g) : roteiro.textos.foiParaOutra;
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
            <div style={{position: 'absolute', inset: 0, opacity: 1 - Math.min(1, col * 2), overflow: 'hidden', borderRadius: 36}}>
              <Notificacao
                lado="A"
                nome={s.cliente.nome}
                cor={s.cliente.cor}
                mensagem={s.mensagem}
                hora={s.tipo === 'cliente' ? s.hora : ''}
                largura={PAINEL_W}
                anel={anel}
                cronometro={s.tipo === 'cliente' ? cronometro(roteiro, s.hora, g) : undefined}
                esconderAvatar={semAvatar}
              />
            </div>
            {col > 0.5 ? (
              <div style={{position: 'absolute', inset: 0, opacity: (col - 0.5) * 2}}>
                <NotificacaoCompacta
                  lado="A"
                  nome={s.cliente.nome}
                  cor={s.cliente.cor}
                  texto={textoCompacto}
                  corTexto="#DC2626"
                  largura={PAINEL_W}
                  esconderAvatar={semAvatar}
                />
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
};
