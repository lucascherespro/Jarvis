import React from 'react';
import {interpolate, spring, useVideoConfig} from 'remotion';
import type {Roteiro} from '../../data/schema';
import {AvatarCliente} from '../../components/AvatarCliente';
import {Contador} from '../../components/Contador';
import type {Layout} from '../../layout';
import {clamp, cores, fontFamily} from '../../theme';
import {agendadasB, contagem, eventosContadorA, itensA, PAINEL_A_X, PAINEL_B_X, PAINEL_W, vooDuracao} from './logica';

const AV = 40;
export const slotAvatarB = (L: Layout, i: number, n: number) => ({
  x: PAINEL_B_X + PAINEL_W - 26 - AV / 2 - (n - 1 - i) * 30,
  y: L.rodapeY + 40,
});

export const Rodape: React.FC<{roteiro: Roteiro; g: number; L: Layout; aparece: number}> = ({roteiro, g, L, aparece}) => {
  const {fps} = useVideoConfig();
  const a = contagem(eventosContadorA(roteiro), g);
  const ag = agendadasB(roteiro);
  const b = contagem(
    ag.map((x) => x.ev.chip),
    g,
  );
  const pousos = itensA(roteiro)
    .filter((i) => i.tipo === 'desistencia')
    .map((i, idx) => ({nome: i.cliente.nome, frame: i.vooInicio! + vooDuracao(idx)}));
  return (
    <div style={{position: 'absolute', top: L.rodapeY, left: 0, right: 0, opacity: aparece}}>
      <div style={{position: 'absolute', left: PAINEL_A_X}}>
        <Contador rotulo={roteiro.textos.semResposta} valor={a.n} mudouEm={a.mudouEm} cor={cores.vermelho} largura={PAINEL_W} />
      </div>
      {/* "+1 mensagem" subindo a cada mensagem extra */}
      {roteiro.extrasA.map((e) => {
        if (g < e || g > e + 26) return null;
        const p = interpolate(g, [e, e + 26], [0, 1], clamp);
        return (
          <div
            key={e}
            style={{
              position: 'absolute',
              left: PAINEL_A_X + PAINEL_W - 210,
              top: -46 - 60 * p,
              fontFamily,
              fontWeight: 800,
              fontSize: 28,
              color: 'white',
              padding: '6px 16px',
              borderRadius: 999,
              background: cores.vermelho,
              opacity: interpolate(p, [0, 0.15, 0.7, 1], [0, 1, 1, 0]),
            }}
          >
            {roteiro.textos.mensagemExtra}
          </div>
        );
      })}
      <div style={{position: 'absolute', left: PAINEL_B_X}}>
        <Contador rotulo={roteiro.textos.agendadas} valor={b.n} mudouEm={b.mudouEm} cor={cores.verde} largura={PAINEL_W} />
      </div>
      {ag.map((gr, i) => {
        if (g < gr.ev.chip) return null;
        const s = spring({frame: g - gr.ev.chip, fps, config: {damping: 10, stiffness: 200}});
        const slot = slotAvatarB(L, i, ag.length);
        const pouso = pousos.find((p) => p.nome === gr.cliente.nome && g >= p.frame && g < p.frame + 30);
        const brilho = pouso ? 1 - (g - pouso.frame) / 30 : 0;
        return (
          <AvatarCliente
            key={gr.id}
            nome={gr.cliente.nome}
            cor={gr.cliente.cor}
            tamanho={AV}
            raio={AV / 2}
            brilho={brilho > 0 ? `rgba(37,211,102,${brilho})` : undefined}
            style={{
              position: 'absolute',
              left: slot.x - AV / 2,
              top: slot.y - L.rodapeY - AV / 2,
              scale: s * (1 + 0.35 * brilho),
              border: '3px solid #0B1530',
              borderRadius: '50%',
            }}
          />
        );
      })}
    </div>
  );
};
