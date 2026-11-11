import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {cores} from '../theme';

export const BarraProgresso: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 10, background: 'rgba(255,255,255,0.15)'}} />
      <div style={{position: 'absolute', top: 0, left: 0, height: 10, width: `${interpolate(frame, [0, durationInFrames - 1], [0, 100])}%`, background: `linear-gradient(90deg, ${cores.roxo}, ${cores.roxoClaro})`, boxShadow: `0 0 16px ${cores.roxo}`}} />
    </AbsoluteFill>
  );
};
