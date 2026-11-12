import React from 'react';

export type Luz = 'entardecer' | 'dia' | 'manha';

const CEU: Record<Luz, [string, string]> = {
  entardecer: ['#F08A55', '#F7C58E'],
  dia: ['#CFE6FA', '#FFF8EC'],
  manha: ['#FFE2B8', '#FFF6E8'],
};

/** Clínica minimalista bege e dourada: parede, janela em arco, espelho dourado, prateleira */
export const ClinicaCarlaFundo: React.FC<{luz: Luz}> = ({luz}) => {
  const [c1, c2] = CEU[luz];
  const tarde = luz === 'entardecer';
  return (
    <svg width={1200} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', left: -60}}>
      <defs>
        <linearGradient id="paredeC" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tarde ? '#E6CFB8' : '#F3E8DA'} />
          <stop offset="1" stopColor={tarde ? '#CDB096' : '#E6D6C4'} />
        </linearGradient>
        <linearGradient id="ceuC" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c1} />
          <stop offset="1" stopColor={c2} />
        </linearGradient>
      </defs>
      <rect width={1080} height={1920} fill="url(#paredeC)" />
      {/* piso */}
      <rect y={1400} width={1080} height={520} fill={tarde ? '#B99E86' : '#DCC8B3'} />
      <rect y={1392} width={1080} height={14} fill="#C9A45C" opacity={0.8} />
      {/* janela em arco */}
      <path d="M660 900 L660 520 Q660 380 810 380 Q960 380 960 520 L960 900 Z" fill="url(#ceuC)" />
      {tarde ? <circle cx={760} cy={800} r={60} fill="#FFD9A0" opacity={0.9} /> : null}
      <path d="M660 900 L660 520 Q660 380 810 380 Q960 380 960 520 L960 900 Z" fill="none" stroke="#C9A45C" strokeWidth={12} />
      <line x1={810} y1={384} x2={810} y2={900} stroke="#C9A45C" strokeWidth={7} />
      {/* feixe de luz */}
      <path d="M660 900 L480 1400 L1060 1400 L960 900 Z" fill={tarde ? '#FFB27A' : '#FFF4E2'} opacity={tarde ? 0.28 : 0.4} />
      {/* espelho redondo dourado */}
      <circle cx={250} cy={560} r={130} fill="#C9A45C" />
      <circle cx={250} cy={560} r={116} fill={tarde ? '#E9D3BE' : '#F7EEE4'} />
      <path d="M186 500 Q230 456 300 470" stroke="white" strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.7} />
      {/* prateleira com vasos */}
      <rect x={110} y={790} width={300} height={12} rx={6} fill="#C9A45C" />
      <path d="M140 790 Q130 740 150 720 L176 720 Q196 740 186 790 Z" fill="#EFE6DA" />
      <rect x={222} y={736} width={40} height={54} rx={14} fill="#D9BC86" />
      <circle cx={330} cy={764} r={26} fill="#F4EDE4" />
      <path d="M160 720 Q150 670 140 650 M164 720 Q170 668 186 646" stroke="#7E9C7E" strokeWidth={5} fill="none" strokeLinecap="round" />
    </svg>
  );
};

/** Pendente dourado e planta alta (camada do meio) */
export const ClinicaCarlaMeio: React.FC<{luz: Luz}> = ({luz}) => (
  <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', overflow: 'visible'}}>
    <line x1={560} y1={0} x2={560} y2={400} stroke="#B08A43" strokeWidth={4} />
    <path d="M480 470 Q480 400 560 400 Q640 400 640 470 Z" fill="#C9A45C" />
    <ellipse cx={560} cy={472} rx={80} ry={12} fill={luz === 'entardecer' ? '#FFD49A' : '#FFF4D6'} />
    {luz === 'entardecer' ? <circle cx={560} cy={500} r={120} fill="#FFD49A" opacity={0.18} /> : null}
    {/* planta alta à direita */}
    <g transform="translate(900 860)">
      <path d="M30 330 L14 220 L130 220 L114 330 Z" fill="#E9DCCB" />
      <rect x={10} y={210} width={124} height={16} rx={6} fill="#C9A45C" />
      {[-30, -12, 6, 22, 38].map((a, i) => (
        <ellipse key={i} cx={72} cy={90} rx={24} ry={120} fill={i % 2 ? '#6E9A78' : '#5D8A69'} transform={`rotate(${a} 72 210)`} />
      ))}
    </g>
  </svg>
);

/** Balcão da recepção (na frente da personagem). `objetos` ficam sobre o tampo. */
export const BalcaoCarla: React.FC<{objetos?: React.ReactNode; children?: React.ReactNode}> = ({objetos, children}) => (
  <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920}}>
    {children}
    <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', left: 0, top: 0}}>
      <rect x={-20} y={1176} width={1120} height={800} fill="#EFE3D3" />
      <rect x={-20} y={1176} width={1120} height={800} fill="url(#ripas)" />
      <defs>
        <pattern id="ripas" width={60} height={800} patternUnits="userSpaceOnUse">
          <rect x={0} y={0} width={4} height={800} fill="#DCC9B3" />
        </pattern>
      </defs>
      <rect x={-20} y={1150} width={1120} height={34} rx={6} fill="#F8F3EC" />
      <rect x={-20} y={1180} width={1120} height={8} fill="#C9A45C" />
    </svg>
    {objetos}
  </div>
);

/** Notebook visto de trás (tampa sem marca) sobre o balcão */
export const Notebook: React.FC<{x: number; brilho: number}> = ({x, brilho}) => (
  <svg width={380} height={300} viewBox="0 0 380 300" style={{position: 'absolute', left: x, top: 880, overflow: 'visible'}}>
    <ellipse cx={190} cy={150} rx={240} ry={190} fill="#FFF4D6" opacity={0.25 * brilho} />
    <path d="M40 40 L340 40 L326 262 L54 262 Z" fill="#D9D4CC" />
    <path d="M40 40 L340 40 L338 60 L42 60 Z" fill="#E8E4DD" />
    <circle cx={190} cy={150} r={14} fill="#C9A45C" opacity={0.8} />
    <rect x={20} y={262} width={340} height={18} rx={8} fill="#BFB9AF" />
  </svg>
);
