import React from 'react';
import {linearTiming, springTiming, TransitionPresentation, TransitionPresentationComponentProps, TransitionSeries} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {wipe} from '@remotion/transitions/wipe';
import {AbsoluteFill, CalculateMetadataFunction, interpolate, Sequence} from 'remotion';
import type {Roteiro} from './data/schema';
import {BarraProgresso} from './components/BarraProgresso';
import {FundoMarca, GraoGlobal} from './components/FundoMarca';
import {SeloFicticio} from './components/SeloFicticio';
import {ZonaSegura} from './components/ZonaSegura';
import {Cena1Procedimento} from './scenes/Cena1Procedimento';
import {Cena2Noite} from './scenes/Cena2Noite';
import {Cena3Manha} from './scenes/Cena3Manha';
import {Cena4Procedimento} from './scenes/Cena4Procedimento';
import {Cena5Dormindo} from './scenes/Cena5Dormindo';
import {Cena6Agenda} from './scenes/Cena6Agenda';
import {Comparacao} from './scenes/Comparacao';
import {Final} from './scenes/Final';
import {Gancho} from './scenes/Gancho';
import {Rebobinar} from './scenes/Rebobinar';
import {cores} from './theme';

type SemProps = Record<string, never>;
const ZoomComp: React.FC<TransitionPresentationComponentProps<SemProps>> = ({children, presentationDirection, presentationProgress: p}) =>
  presentationDirection === 'exiting' ? (
    <AbsoluteFill style={{scale: 1 + p * 0.3, opacity: 1 - p}}>{children}</AbsoluteFill>
  ) : (
    <AbsoluteFill style={{scale: 1.15 - 0.15 * p, opacity: interpolate(p, [0, 0.5], [0, 1], {extrapolateRight: 'clamp'})}}>{children}</AbsoluteFill>
  );
const zoom = (): TransitionPresentation<SemProps> => ({component: ZoomComp, props: {}});

/** Início (frame global) de cada cena: as transições acontecem nos primeiros frames da cena que entra */
export const inicios = (t: Roteiro['tempos']) => {
  const ordem = [t.gancho, t.cena1, t.cena2, t.cena3, t.rebobinar, t.cena4, t.cena5, t.cena6, t.comparacao, t.final];
  const ini: number[] = [];
  ordem.reduce((acc, d) => {
    ini.push(acc);
    return acc + d;
  }, 0);
  return {ini, total: ordem.reduce((a, b) => a + b, 0)};
};

export const calcularDuracao: CalculateMetadataFunction<Roteiro> = ({props}) => ({durationInFrames: inicios(props.tempos).total});

export const Video: React.FC<{roteiro: Roteiro; extras?: boolean}> = ({roteiro, extras = true}) => {
  const t = roteiro.tempos;
  const T = t.transicao;
  const {ini, total} = inicios(t);
  const timing = linearTiming({durationInFrames: T});
  const mola = springTiming({config: {damping: 200}, durationInFrames: T});
  return (
    <AbsoluteFill style={{backgroundColor: cores.navy}}>
      <FundoMarca periodo={total} />
      <TransitionSeries>
        <TransitionSeries.Sequence name="0 · Gancho" durationInFrames={t.gancho + T}>
          <Gancho roteiro={roteiro} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={zoom()} timing={timing} />
        <TransitionSeries.Sequence name="1 · Procedimento (sem VIQ)" durationInFrames={t.cena1 + T}>
          <Cena1Procedimento roteiro={roteiro} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({direction: 'from-right'})} timing={mola} />
        <TransitionSeries.Sequence name="2 · Noite exausta" durationInFrames={t.cena2 + T}>
          <Cena2Noite roteiro={roteiro} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({direction: 'from-bottom'})} timing={mola} />
        <TransitionSeries.Sequence name="3 · Manhã (cliente perdida)" durationInFrames={t.cena3}>
          <Cena3Manha roteiro={roteiro} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence name="Rebobinar" durationInFrames={t.rebobinar + T}>
          <Rebobinar roteiro={roteiro} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />
        <TransitionSeries.Sequence name="4 · Procedimento (com VIQ)" durationInFrames={t.cena4 + T}>
          <Cena4Procedimento roteiro={roteiro} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({direction: 'from-left'})} timing={mola} />
        <TransitionSeries.Sequence name="5 · Noite em paz" durationInFrames={t.cena5 + T}>
          <Cena5Dormindo roteiro={roteiro} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />
        <TransitionSeries.Sequence name="6 · Agenda cheia" durationInFrames={t.cena6 + T}>
          <Cena6Agenda roteiro={roteiro} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={zoom()} timing={timing} />
        <TransitionSeries.Sequence name="7 · Comparação" durationInFrames={t.comparacao + T}>
          <Comparacao roteiro={roteiro} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />
        <TransitionSeries.Sequence name="8 · Chamada final" durationInFrames={t.final}>
          <Final roteiro={roteiro} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <GraoGlobal />
      {extras ? (
        <>
          <Sequence name="Selo fictício" from={ini[1]} durationInFrames={ini[9] - ini[1]} layout="none">
            <SeloFicticio texto={roteiro.selo} />
          </Sequence>
          <BarraProgresso />
        </>
      ) : null}
      {roteiro.mostrarZonaSegura ? <ZonaSegura /> : null}
    </AbsoluteFill>
  );
};

export const DiaDaCamila: React.FC<Roteiro> = (props) => <Video roteiro={props} />;
