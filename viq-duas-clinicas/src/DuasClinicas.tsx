import React from 'react';
import {linearTiming, springTiming, TransitionSeries} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {AbsoluteFill, CalculateMetadataFunction} from 'remotion';
import type {Roteiro} from './data/schema';
import {BarraProgresso} from './components/BarraProgresso';
import {Fundo} from './components/Fundo';
import {ZonaSegura} from './components/ZonaSegura';
import {Final} from './scenes/Final';
import {Gancho} from './scenes/Gancho';
import {Mapa} from './scenes/Mapa';
import {Noite} from './scenes/Noite';
import {Relatorio} from './scenes/Relatorio';
import {Virada} from './scenes/Virada';
import {cores} from './theme';
import {expandirB, partir, zoom} from './transicoes';
import {iniciosDasCenas} from './timing';

export const calcularDuracao: CalculateMetadataFunction<Roteiro> = ({props}) => ({
  durationInFrames: iniciosDasCenas(props.tempos).total,
});

export const Cenas: React.FC<{roteiro: Roteiro; barra?: boolean}> = ({roteiro, barra = true}) => {
  const t = roteiro.tempos;
  const ini = iniciosDasCenas(t);
  return (
    <AbsoluteFill style={{backgroundColor: cores.navy}}>
      <Fundo periodo={ini.total} />
      <TransitionSeries>
        <TransitionSeries.Sequence name="1 · Gancho" durationInFrames={t.gancho}>
          <Gancho roteiro={roteiro} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={zoom()} timing={linearTiming({durationInFrames: t.transicaoGanchoMapa})} />
        <TransitionSeries.Sequence name="2 · Mapa" durationInFrames={t.mapa}>
          <Mapa roteiro={roteiro} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={partir()}
          timing={springTiming({config: {damping: 200}, durationInFrames: t.transicaoMapaNoite})}
        />
        <TransitionSeries.Sequence name="3-5 · Noite em paralelo" durationInFrames={t.noite}>
          <Noite roteiro={roteiro} inicio={ini.noite} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={expandirB()}
          timing={springTiming({config: {damping: 200}, durationInFrames: t.transicaoNoiteRelatorio})}
        />
        <TransitionSeries.Sequence name="6 · Relatório" durationInFrames={t.relatorio}>
          <Relatorio roteiro={roteiro} inicio={ini.relatorio} periodo={ini.total} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames: t.transicaoRelatorioVirada})} />
        <TransitionSeries.Sequence name="7 · Virada" durationInFrames={t.virada}>
          <Virada roteiro={roteiro} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={zoom()} timing={linearTiming({durationInFrames: t.transicaoViradaFinal})} />
        <TransitionSeries.Sequence name="8 · Chamada final" durationInFrames={t.final}>
          <Final roteiro={roteiro} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      {barra ? <BarraProgresso /> : null}
      {roteiro.mostrarZonaSegura ? <ZonaSegura /> : null}
    </AbsoluteFill>
  );
};

export const DuasClinicas: React.FC<Roteiro> = (props) => <Cenas roteiro={props} />;
