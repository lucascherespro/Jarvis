import React from 'react';
import {useCurrentFrame} from 'remotion';

/** Sala de casa à noite: janela com lua e estrelas, abajur quente, TV desligada */
export const SalaFundo: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <svg width={1200} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', left: -60}}>
      <rect width={1080} height={1920} fill="#1A1F45" />
      <rect y={1380} width={1080} height={540} fill="#141836" />
      {/* janela */}
      <rect x={600} y={400} width={380} height={460} rx={22} fill="#0D1233" />
      <circle cx={860} cy={520} r={52} fill="#F5F0D8" />
      <circle cx={882} cy={506} r={46} fill="#0D1233" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <circle key={i} cx={640 + ((i * 53) % 320)} cy={440 + ((i * 97) % 380)} r={3} fill="white" opacity={0.4 + 0.6 * Math.abs(Math.sin(frame / 12 + i))} />
      ))}
      <rect x={600} y={400} width={380} height={460} rx={22} fill="none" stroke="#2D3466" strokeWidth={18} />
      <line x1={790} y1={400} x2={790} y2={860} stroke="#2D3466" strokeWidth={12} />
      {/* TV desligada */}
      <rect x={90} y={560} width={360} height={210} rx={14} fill="#0A0D20" stroke="#2D3466" strokeWidth={8} />
      <path d="M120 590 L200 590" stroke="#232A55" strokeWidth={6} strokeLinecap="round" />
    </svg>
  );
};

export const SalaMeio: React.FC = () => (
  <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', overflow: 'visible'}}>
    {/* luz do abajur */}
    <circle cx={110} cy={840} r={300} fill="#FFB86B" opacity={0.18} />
    <circle cx={110} cy={840} r={160} fill="#FFB86B" opacity={0.18} />
    <rect x={100} y={880} width={20} height={300} fill="#7C5A44" />
    <path d="M40 880 L180 880 L150 780 L70 780 Z" fill="#FFD7A0" />
    {/* encosto do sofá */}
    <rect x={150} y={980} width={860} height={300} rx={60} fill="#5B4A8B" />
    <rect x={150} y={980} width={860} height={60} rx={30} fill="#6A58A0" />
  </svg>
);

/** Assento e braços do sofá: ficam na frente da personagem */
export const SofaFrente: React.FC<{celularNoBraco?: React.ReactNode}> = ({celularNoBraco}) => (
  <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920}}>
    <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', left: 0, top: 0}}>
      <rect x={120} y={1210} width={920} height={210} rx={50} fill="#4C3D78" />
      <rect x={160} y={1196} width={420} height={70} rx={30} fill="#6A58A0" />
      <rect x={590} y={1196} width={410} height={70} rx={30} fill="#6A58A0" />
      {/* braço direito do sofá */}
      <rect x={900} y={1070} width={150} height={350} rx={60} fill="#5B4A8B" />
      <rect x={900} y={1070} width={150} height={60} rx={30} fill="#7462AE" />
      <rect x={60} y={1070} width={150} height={350} rx={60} fill="#5B4A8B" />
      <rect x={60} y={1070} width={150} height={60} rx={30} fill="#7462AE" />
    </svg>
    {celularNoBraco}
  </div>
);
