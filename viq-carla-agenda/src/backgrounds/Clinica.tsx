import React from 'react';

/** Sala da clínica de dia: parede rosa-nude, quadro dourado, prateleira, luminária, planta */
export const ClinicaFundo: React.FC = () => (
  <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', left: -60, width: 1200}}>
    <defs>
      <linearGradient id="parede" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#F1E4DA" />
        <stop offset="1" stopColor="#E3D0C3" />
      </linearGradient>
    </defs>
    <rect width={1080} height={1920} fill="url(#parede)" />
    {/* rodapé + piso */}
    <rect y={1380} width={1080} height={540} fill="#D8C2B3" />
    <rect y={1370} width={1080} height={18} fill="#CBB2A1" />
    {/* janela com luz */}
    <rect x={640} y={420} width={330} height={420} rx={20} fill="#FFF6EC" />
    <rect x={640} y={420} width={330} height={420} rx={20} fill="none" stroke="#FFFFFF" strokeWidth={16} />
    <line x1={805} y1={420} x2={805} y2={840} stroke="white" strokeWidth={10} />
    <path d="M640 840 L520 1380 L1000 1380 L970 840 Z" fill="#FFF3E6" opacity={0.45} />
    {/* quadro com moldura dourada */}
    <rect x={110} y={440} width={260} height={200} rx={8} fill="#E5B54A" />
    <rect x={128} y={458} width={224} height={164} rx={4} fill="#F8EFE7" />
    <circle cx={200} cy={540} r={36} fill="#E9C3B4" />
    <path d="M150 610 Q240 520 330 610 Z" fill="#D9A897" />
    {/* prateleira com frascos */}
    <rect x={380} y={700} width={240} height={14} rx={6} fill="#C9A98F" />
    <rect x={400} y={636} width={34} height={64} rx={10} fill="#C4B5FD" />
    <rect x={446} y={656} width={28} height={44} rx={8} fill="#F5D0C5" />
    <rect x={486} y={628} width={30} height={72} rx={10} fill="#FFFFFF" />
    <rect x={530} y={648} width={40} height={52} rx={12} fill="#A78BFA" />
  </svg>
);

export const ClinicaMeio: React.FC<{celular?: React.ReactNode}> = ({celular}) => (
  <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', overflow: 'visible'}}>
    {/* luminária articulada */}
    <path d="M560 300 L560 360 Q560 420 640 460 L700 490" stroke="#C9CED8" strokeWidth={12} fill="none" strokeLinecap="round" />
    <ellipse cx={720} cy={510} rx={70} ry={34} fill="#E8EBF2" />
    <ellipse cx={720} cy={522} rx={52} ry={16} fill="#FFF9E8" />
    {/* bancada ao fundo, à direita */}
    <rect x={760} y={1010} width={340} height={30} rx={8} fill="#FFFFFF" />
    <rect x={780} y={1040} width={300} height={340} fill="#EFE6DF" />
    <rect x={800} y={1070} width={120} height={140} rx={10} fill="#E4D8CF" />
    <rect x={940} y={1070} width={120} height={140} rx={10} fill="#E4D8CF" />
  </svg>
);

/** Maca (fica na frente da personagem e esconde a parte de baixo do corpo) */
export const Maca: React.FC<{children?: React.ReactNode}> = ({children}) => (
  <div style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1920}}>
    {children}
    <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', left: 0, top: 0}}>
      <rect x={330} y={1150} width={760} height={56} rx={26} fill="#FFFFFF" />
      <rect x={330} y={1196} width={760} height={30} rx={10} fill="#E5E7EF" />
      <rect x={400} y={1226} width={26} height={180} fill="#C9CED8" />
      <rect x={980} y={1226} width={26} height={180} fill="#C9CED8" />
      <rect x={380} y={1390} width={660} height={20} rx={10} fill="#B9BFCC" />
    </svg>
  </div>
);

export const ClinicaFrente: React.FC = () => (
  <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', overflow: 'visible'}}>
    {/* planta em primeiro plano */}
    <g transform="translate(-40 1290)">
      <path d="M90 230 L70 120 L190 120 L170 230 Z" fill="#B98A6E" />
      {[-40, -15, 10, 35, 60].map((a, i) => (
        <ellipse key={i} cx={130} cy={40} rx={26} ry={110} fill={i % 2 ? '#5E9B7A' : '#4F8A6A'} transform={`rotate(${a} 130 130)`} />
      ))}
    </g>
  </svg>
);
