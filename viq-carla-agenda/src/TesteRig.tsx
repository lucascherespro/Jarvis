import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Aparencia, CARLA, CLIENTE} from './character/aparencia';
import {Personagem} from './character/Personagem';
import {EXPRESSOES, NomeExpressao, NomePose, POSES} from './character/rig';
import {fontFamily} from './theme';

const Linha: React.FC<{titulo: string; itens: string[]; render: (n: string) => React.ReactNode}> = ({titulo, itens, render}) => (
  <div>
    <div style={{fontFamily, fontWeight: 800, fontSize: 30, color: 'white', margin: '10px 0'}}>{titulo}</div>
    <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
      {itens.map((n) => (
        <div key={n} style={{width: 200, textAlign: 'center', background: '#E9DCCB', borderRadius: 16, paddingTop: 10}}>
          {render(n)}
          <div style={{fontFamily, fontWeight: 700, fontSize: 20, padding: 6}}>{n}</div>
        </div>
      ))}
    </div>
  </div>
);

const Folha: React.FC<{a: Aparencia}> = ({a}) => (
  <>
    <Linha titulo={`${a.nome} · expressões`} itens={Object.keys(EXPRESSOES)} render={(n) => <Personagem aparencia={a} largura={180} poses={[{f: 0, v: 'emPe'}]} expressoes={[{f: 0, v: n as NomeExpressao}]} style={{height: 200}} />} />
    <Linha titulo={`${a.nome} · poses`} itens={Object.keys(POSES)} render={(n) => <Personagem aparencia={a} largura={130} poses={[{f: 0, v: n as NomePose}]} expressoes={[{f: 0, v: 'neutra'}]} />} />
  </>
);

/** Folha de referência: todas as expressões e poses da Carla e da cliente */
export const TesteRig: React.FC = () => (
  <AbsoluteFill style={{background: '#1B1530', padding: 30, overflow: 'hidden'}}>
    <Folha a={CARLA} />
    <Folha a={CLIENTE} />
  </AbsoluteFill>
);
