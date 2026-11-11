import React from 'react';
import type {TransitionPresentation, TransitionPresentationComponentProps} from '@remotion/transitions';
import {AbsoluteFill, interpolate} from 'remotion';
import {cores} from './theme';

type SemProps = Record<string, never>;

/** O mapa se parte ao meio (wipe vertical) revelando a tela dividida */
const PartirComp: React.FC<TransitionPresentationComponentProps<SemProps>> = ({children, presentationDirection, presentationProgress: p}) => {
  if (presentationDirection === 'entering') return <AbsoluteFill>{children}</AbsoluteFill>;
  const d = interpolate(p, [0, 1], [0, 560]);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{clipPath: 'inset(0 50% 0 0)', translate: `${-d}px 0px`}}>{children}</AbsoluteFill>
      <AbsoluteFill style={{clipPath: 'inset(0 0 0 50%)', translate: `${d}px 0px`}}>{children}</AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: 6,
          marginLeft: -3,
          background: cores.roxoClaro,
          boxShadow: `0 0 40px 10px ${cores.roxo}`,
          opacity: interpolate(p, [0, 0.15, 0.9, 1], [0, 1, 1, 0]),
        }}
      />
    </AbsoluteFill>
  );
};
export const partir = (): TransitionPresentation<SemProps> => ({component: PartirComp, props: {}});

/** O painel B se expande e ocupa a tela; o A sai deslizando para a esquerda */
const ExpandirBComp: React.FC<TransitionPresentationComponentProps<SemProps>> = ({children, presentationDirection, presentationProgress: p}) => {
  if (presentationDirection === 'exiting') {
    return (
      <AbsoluteFill>
        <AbsoluteFill style={{clipPath: 'inset(0 0 0 50%)'}}>{children}</AbsoluteFill>
        <AbsoluteFill style={{clipPath: 'inset(0 50% 0 0)', translate: `${-p * 100}% 0px`, opacity: 1 - p * 0.5}}>{children}</AbsoluteFill>
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill style={{clipPath: `inset(0 0 0 ${50 * (1 - p)}% round ${40 * (1 - p)}px)`, opacity: interpolate(p, [0, 0.3], [0.4, 1], {extrapolateRight: 'clamp'})}}>
      {children}
    </AbsoluteFill>
  );
};
export const expandirB = (): TransitionPresentation<SemProps> => ({component: ExpandirBComp, props: {}});

/** Zoom: a cena que sai cresce e some; a que entra vem de levemente maior */
const ZoomComp: React.FC<TransitionPresentationComponentProps<SemProps>> = ({children, presentationDirection, presentationProgress: p}) => {
  if (presentationDirection === 'exiting') {
    return <AbsoluteFill style={{scale: 1 + p * 0.25, opacity: 1 - p}}>{children}</AbsoluteFill>;
  }
  return <AbsoluteFill style={{scale: 1.12 - 0.12 * p, opacity: p}}>{children}</AbsoluteFill>;
};
export const zoom = (): TransitionPresentation<SemProps> => ({component: ZoomComp, props: {}});
