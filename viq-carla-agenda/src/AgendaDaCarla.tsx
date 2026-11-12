import React from 'react';
import {linearTiming, springTiming, TransitionPresentation, TransitionPresentationComponentProps, TransitionSeries} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {wipe} from '@remotion/transitions/wipe';
import {AbsoluteFill, CalculateMetadataFunction, interpolate} from 'remotion';
import type {Roteiro} from './data/schema';
import {BarraProgresso} from './components/BarraProgresso';
import {GraoGlobal} from './components/FundoMarca';
import {SeloFicticio} from './components/SeloFicticio';
import {ZonaSegura} from './components/ZonaSegura';
import {Cena1Gancho} from './scenes/Cena1Gancho';
import {Cena2Problema} from './scenes/Cena2Problema';
import {Cena3Perda} from './scenes/Cena3Perda';
import {Cena4Virada} from './scenes/Cena4Virada';
import {Cena5Funcionando} from './scenes/Cena5Funcionando';
import {Cena6Final} from './scenes/Cena6Final';
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
  const ordem = [t.cena1, t.cena2, t.cena3, t.cena4, t.cena5, t.cena6];
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
  const linear = linearTiming({durationInFrames: T});
  const mola = springTiming({config: {damping: 200}, durationInFrames: T});
  return (
    <AbsoluteFill style={{backgroundColor: cores.navy}}>
      <TransitionSeries>
        <TransitionSeries.Sequence name="1 · Gancho" durationInFrames={t.cena1 + T}>
          <Cena1Gancho roteiro={roteiro} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={zoom()} timing={linear} />
        <TransitionSeries.Sequence name="2 · O problema" durationInFrames={t.cena2 + T}>
          <Cena2Problema roteiro={roteiro} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linear} />
        <TransitionSeries.Sequence name="3 · A perda" durationInFrames={t.cena3 + T}>
          <Cena3Perda roteiro={roteiro} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={mola} />
        <TransitionSeries.Sequence name="4 · A virada" durationInFrames={t.cena4 + T}>
          <Cena4Virada roteiro={roteiro} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({direction: 'from-left'})} timing={mola} />
        <TransitionSeries.Sequence name="5 · Funcionando" durationInFrames={t.cena5 + T}>
          <Cena5Funcionando roteiro={roteiro} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linear} />
        <TransitionSeries.Sequence name="6 · Final" durationInFrames={t.cena6}>
          <Cena6Final roteiro={roteiro} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <GraoGlobal />
      {extras ? (
        <>
          <SeloFicticio texto={roteiro.selo} />
          <BarraProgresso />
        </>
      ) : null}
      {roteiro.mostrarZonaSegura ? <ZonaSegura /> : null}
    </AbsoluteFill>
  );
};

export const AgendaDaCarla: React.FC<Roteiro> = (props) => <Video roteiro={props} />;
