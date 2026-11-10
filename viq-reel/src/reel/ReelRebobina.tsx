import React from 'react';
import {AbsoluteFill, Sequence, Track} from 'remotion';
import {COLORS} from './config';
import {LockScreen} from './LockScreen';
import {FinalOverlay, HookOverlay, MorningAOverlay, MorningBOverlay, ProgressBar, RewindOverlay, Seal} from './Overlays';
import {F} from './timeline';

export type ReelProps = {
  /** Nome do arquivo do logo dentro de public/ (ex.: "LOGOTIPO.png"). Vazio = wordmark "VIQ". */
  readonly logoFile: string;
};

export const ReelRebobina: React.FC<ReelProps> = ({logoFile}) => {
  return (
    <AbsoluteFill style={{backgroundColor: COLORS.navy}}>
      <LockScreen />
      <Track name="Textos">
        <Sequence name="Gancho" from={0} durationInFrames={F.nightAStart}>
          <HookOverlay />
        </Sequence>
        <Sequence name="8h sem VIQ" from={F.morningA} durationInFrames={F.rewindStart - F.morningA}>
          <MorningAOverlay />
        </Sequence>
        <Sequence name="Rebobina" from={F.rewindStart} durationInFrames={F.nightBStart - F.rewindStart}>
          <RewindOverlay />
        </Sequence>
        <Sequence name="Bom dia com VIQ" from={F.morningB} durationInFrames={F.final - F.morningB}>
          <MorningBOverlay />
        </Sequence>
        <Sequence name="Final" from={F.final} durationInFrames={32 * 30 - F.final}>
          <FinalOverlay logoFile={logoFile} />
        </Sequence>
      </Track>
      <Sequence name="Selo simulação" from={F.nightAStart} durationInFrames={F.final - F.nightAStart}>
        <Seal />
      </Sequence>
      <ProgressBar />
    </AbsoluteFill>
  );
};
