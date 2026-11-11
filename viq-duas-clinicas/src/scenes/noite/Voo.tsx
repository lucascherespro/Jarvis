import React from 'react';
import {Easing, interpolate, useVideoConfig} from 'remotion';
import type {Roteiro} from '../../data/schema';
import {AvatarCliente} from '../../components/AvatarCliente';
import type {Layout} from '../../layout';
import {clamp, cores} from '../../theme';
import {agendadasB, alturaA, empilhar, itensA, PAINEL_A_X, vooDuracao} from './logica';
import {slotAvatarB} from './Rodape';

const bezier = (p: number, a: number, c: number, b: number) => (1 - p) * (1 - p) * a + 2 * (1 - p) * p * c + p * p * b;

/** A cliente sai do painel A e voa em arco até a lista de agendadas do painel B */
export const Voos: React.FC<{roteiro: Roteiro; g: number; L: Layout}> = ({roteiro, g, L}) => {
  const {fps} = useVideoConfig();
  const feedH = L.feedBottom - L.feedTop;
  const desist = itensA(roteiro).filter((i) => i.tipo === 'desistencia');
  const ag = agendadasB(roteiro);
  return (
    <>
      {desist.map((it, idx) => {
        const ini = it.vooInicio!;
        const dur = vooDuracao(idx);
        if (g < ini || g > ini + dur + 30) return null;
        // origem: ícone do card no painel A, calculado no frame em que o voo começa
        const pilha = empilhar(itensA(roteiro), (x) => alturaA(x, ini, fps), ini, fps, feedH);
        const card = pilha.find((p) => p.id === it.id)!;
        const x0 = PAINEL_A_X + 22 + 30;
        const y0 = Math.min(L.feedBottom - 60, Math.max(L.feedTop + 40, L.feedTop + card.y + 50));
        const slot = ag.findIndex((a) => a.cliente.nome === it.cliente.nome);
        const alvo = slotAvatarB(L, slot < 0 ? ag.length - 1 : slot, ag.length);
        const cx = L.W / 2;
        const cy = Math.min(y0, alvo.y) - (L.vertical ? 640 : 460);
        const posicao = (q: number) => {
          const e = interpolate(q, [0, 1], [0, 1], {...clamp, easing: Easing.bezier(0.45, 0, 0.35, 1)});
          return {x: bezier(e, x0, cx, alvo.x), y: bezier(e, y0, cy, alvo.y), e};
        };
        const p = interpolate(g, [ini, ini + dur], [0, 1], clamp);
        const voando = g <= ini + dur;
        const pos = posicao(p);
        const tamanho = interpolate(pos.e, [0, 0.5, 1], [60, 120, 40]);
        const pouso = interpolate(g, [ini + dur, ini + dur + 22], [0, 1], clamp);
        return (
          <React.Fragment key={it.id}>
            {voando
              ? [0.12, 0.08, 0.04].map((d, k) => {
                  const q = posicao(Math.max(0, p - d));
                  const tq = interpolate(q.e, [0, 0.5, 1], [60, 120, 40]);
                  return (
                    <div
                      key={k}
                      style={{
                        position: 'absolute',
                        left: q.x - tq / 2,
                        top: q.y - tq / 2,
                        width: tq,
                        height: tq,
                        borderRadius: tq * 0.28,
                        background: cores.verde,
                        opacity: 0.12 + k * 0.08,
                        filter: 'blur(6px)',
                      }}
                    />
                  );
                })
              : null}
            {voando ? (
              <AvatarCliente
                nome={it.cliente.nome}
                cor={it.cliente.cor}
                tamanho={tamanho}
                brilho="rgba(37,211,102,0.9)"
                style={{position: 'absolute', left: pos.x - tamanho / 2, top: pos.y - tamanho / 2, rotate: `${Math.sin(pos.e * Math.PI) * -12}deg`}}
              />
            ) : (
              <div
                style={{
                  position: 'absolute',
                  left: alvo.x - 20 - 60 * pouso,
                  top: alvo.y - 20 - 60 * pouso,
                  width: 40 + 120 * pouso,
                  height: 40 + 120 * pouso,
                  borderRadius: '50%',
                  border: `${6 * (1 - pouso)}px solid ${cores.verde}`,
                  boxShadow: `0 0 40px ${cores.verde}`,
                  opacity: 1 - pouso,
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};
