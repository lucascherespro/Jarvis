import React from 'react';
import {useCurrentFrame} from 'remotion';

/** Quarto à noite: janela, cabeceira, mesa de cabeceira */
export const QuartoFundo: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <svg width={1200} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', left: -60}}>
      <rect width={1080} height={1920} fill="#1C1A42" />
      <rect y={1400} width={1080} height={520} fill="#151335" />
      <rect x={120} y={420} width={340} height={420} rx={22} fill="#0C1030" />
      <circle cx={210} cy={520} r={44} fill="#F5F0D8" />
      <circle cx={230} cy={506} r={40} fill="#0C1030" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <circle key={i} cx={160 + ((i * 61) % 280)} cy={460 + ((i * 89) % 360)} r={3} fill="white" opacity={0.4 + 0.6 * Math.abs(Math.sin(frame / 13 + i))} />
      ))}
      <rect x={120} y={420} width={340} height={420} rx={22} fill="none" stroke="#2C2A5E" strokeWidth={18} />
      <line x1={290} y1={420} x2={290} y2={840} stroke="#2C2A5E" strokeWidth={12} />
    </svg>
  );
};

export const QuartoMeio: React.FC = () => (
  <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', overflow: 'visible'}}>
    {/* cabeceira */}
    <rect x={40} y={880} width={720} height={380} rx={40} fill="#4A3F7E" />
    <rect x={70} y={910} width={660} height={60} rx={24} fill="#574B91" />
    {/* travesseiro */}
    <ellipse cx={230} cy={1135} rx={170} ry={62} fill="#E7E3F6" />
  </svg>
);

/** Cobertor + colchão + mesa de cabeceira (na frente da personagem deitada) */
export const QuartoFrente: React.FC<{celular?: React.ReactNode}> = ({celular}) => (
  <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920}}>
    <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', left: 0, top: 0}}>
      <path d="M260 1120 Q480 1060 760 1110 L780 1330 L40 1330 L60 1190 Q150 1150 260 1120 Z" fill="#8B7BD8" />
      <path d="M300 1150 Q480 1100 740 1140" stroke="#A396E6" strokeWidth={10} fill="none" strokeLinecap="round" />
      <rect x={30} y={1300} width={760} height={110} rx={20} fill="#3B3270" />
      {/* mesa de cabeceira */}
      <rect x={820} y={1120} width={220} height={290} rx={18} fill="#6B5A9E" />
      <rect x={800} y={1100} width={260} height={34} rx={12} fill="#7D6BB4" />
      <rect x={850} y={1190} width={160} height={14} rx={7} fill="#5A4A8A" />
    </svg>
    {celular}
  </div>
);
