import React from 'react';

/** Cozinha de manhã: janela com o sol nascendo, armários */
export const CozinhaFundo: React.FC<{sol: number}> = ({sol}) => (
  <svg width={1200} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', left: -60}}>
    <rect width={1080} height={1920} fill="#F4E6D6" />
    <rect x={590} y={430} width={380} height={420} rx={20} fill="#FFD9A8" />
    <circle cx={780} cy={830 - sol * 160} r={80} fill="#FFB547" />
    <rect x={590} y={760} width={380} height={90} fill="#F7C28A" opacity={0.6} />
    <rect x={590} y={430} width={380} height={420} rx={20} fill="none" stroke="white" strokeWidth={18} />
    <line x1={780} y1={430} x2={780} y2={850} stroke="white" strokeWidth={12} />
    {/* armários */}
    <rect x={80} y={380} width={420} height={260} rx={16} fill="#E2CFBC" />
    <line x1={290} y1={380} x2={290} y2={640} stroke="#D3BEA8" strokeWidth={6} />
    <circle cx={270} cy={600} r={8} fill="#B89B80" />
    <circle cx={310} cy={600} r={8} fill="#B89B80" />
    {/* raio de sol */}
    <path d="M590 850 L380 1500 L1000 1500 L970 850 Z" fill="#FFE2B5" opacity={0.35 * sol} />
  </svg>
);

export const CozinhaMeio: React.FC = () => (
  <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', overflow: 'visible'}}>
    <rect x={720} y={980} width={60} height={110} rx={10} fill="#7C3AED" opacity={0.8} />
    <rect x={800} y={1000} width={40} height={90} rx={10} fill="#E5B54A" />
    <ellipse cx={920} cy={1080} rx={70} ry={16} fill="#D3BEA8" />
  </svg>
);

/** Bancada na frente da personagem */
export const Bancada: React.FC = () => (
  <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', left: 0, top: 0}}>
    <rect x={-20} y={1150} width={1120} height={50} rx={10} fill="#FFFFFF" />
    <rect x={-20} y={1196} width={1120} height={260} fill="#D8C2AE" />
    <line x1={360} y1={1210} x2={360} y2={1456} stroke="#C8B09A" strokeWidth={6} />
    <line x1={720} y1={1210} x2={720} y2={1456} stroke="#C8B09A" strokeWidth={6} />
  </svg>
);
