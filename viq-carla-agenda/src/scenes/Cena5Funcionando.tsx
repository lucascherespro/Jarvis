import React from 'react';
import {useCurrentFrame} from 'remotion';
import type {Roteiro} from '../data/schema';
import {ChipAgendado} from '../components/ChipAgendado';
import {Legenda} from '../components/Legenda';
import {Palco} from '../components/Palco';
import {Relogio} from '../components/Relogio';
import {TelaChat} from '../components/TelaChat';
import {filtroAto} from '../theme';
import {CenaCama} from './Quarto';

/** 40–52 s · 23h47: ela manda mensagem e recebe resposta na hora, com horários. Agendada. */
export const Cena5Funcionando: React.FC<{roteiro: Roteiro}> = ({roteiro}) => {
  const frame = useCurrentFrame();
  const c = roteiro.cena5;
  const vibracoes = c.mensagens.filter((m) => m.de === 'clinica').map((m) => m.f);
  return (
    <Palco filtro={filtroAto(2)}>
      <CenaCama poses={c.poses} expressoes={c.expressoes} brilho={frame > 236 ? 0.6 : 1} vibracoes={vibracoes} />
      <TelaChat titulo={roteiro.nomeClinica} mensagens={c.mensagens} digitando={c.digitando} botaoEscolhido={c.botaoEscolhido} x={540} y={380} largura={500} inicio={10} />
      <ChipAgendado texto={c.chip.texto} inicio={c.chip.f} x={110} y={1010} />
      <Relogio hora={c.relogio} />
      <Legenda top={1110} inicio={c.legenda.inicio} fim={c.legenda.fim} linhas={c.legenda.linhas.map((t, i) => ({texto: t, tamanho: 66, cor: i === 1 ? '#78EBA0' : undefined}))} />
    </Palco>
  );
};
