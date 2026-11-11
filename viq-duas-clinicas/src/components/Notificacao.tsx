import React from 'react';
import {cores, fontFamily} from '../theme';
import {AvatarCliente} from './AvatarCliente';

export const ALTURAS = {
  clienteCheio: 196,
  clienteA: 236, // com cronômetro vermelho
  compacto: 84,
  digitando: 78,
  resposta: 236,
  chip: 64,
};

const cartao = (lado: 'A' | 'B'): React.CSSProperties => ({
  boxSizing: 'border-box',
  borderRadius: 36,
  padding: '20px 22px',
  background: lado === 'A' ? cores.aCard : 'rgba(255,255,255,0.88)',
  backdropFilter: 'blur(24px) saturate(150%)',
  boxShadow: '0 10px 34px rgba(0,0,0,0.3)',
  fontFamily,
  color: cores.aTexto,
});

/** Mensagem da cliente (versão completa) */
export const Notificacao: React.FC<{
  lado: 'A' | 'B';
  nome: string;
  cor: string;
  mensagem: string;
  hora: string;
  largura: number;
  anel?: number;
  cronometro?: string;
  esconderAvatar?: boolean;
}> = ({lado, nome, cor, mensagem, hora, largura, anel = 0, cronometro, esconderAvatar}) => (
  <div style={{...cartao(lado), width: largura, height: cronometro ? ALTURAS.clienteA : ALTURAS.clienteCheio}}>
    <div style={{display: 'flex', gap: 16, alignItems: 'center'}}>
      {esconderAvatar ? (
        <div style={{width: 60, height: 60, borderRadius: 17, border: '3px dashed rgba(31,41,55,0.35)', boxSizing: 'border-box'}} />
      ) : (
        <AvatarCliente nome={nome} cor={lado === 'A' ? '#8E96A8' : cor} tamanho={60} anel={anel} />
      )}
      <div style={{flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
        <span style={{fontSize: 34, fontWeight: 800}}>{nome}</span>
        <span style={{fontSize: 24, fontWeight: 600, color: '#4B5563'}}>{hora}</span>
      </div>
    </div>
    <div style={{fontSize: 34, fontWeight: 500, lineHeight: 1.2, marginTop: 10, height: 82, overflow: 'hidden'}}>{mensagem}</div>
    {cronometro ? (
      <div style={{marginTop: 8, display: 'flex', alignItems: 'center', gap: 8, fontSize: 26, fontWeight: 700, color: '#DC2626'}}>
        <svg width="26" height="26" viewBox="0 0 24 24">
          <circle cx="12" cy="13" r="9" stroke="#DC2626" strokeWidth="2.6" fill="none" />
          <path d="M12 8 V13 L15 15" stroke="#DC2626" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        </svg>
        {cronometro}
      </div>
    ) : null}
  </div>
);

/** Versão compacta (uma linha), usada quando a próxima mensagem chega */
export const NotificacaoCompacta: React.FC<{
  lado: 'A' | 'B';
  nome: string;
  cor: string;
  texto: string;
  corTexto: string;
  largura: number;
  esconderAvatar?: boolean;
}> = ({lado, nome, cor, texto, corTexto, largura, esconderAvatar}) => (
  <div
    style={{
      ...cartao(lado),
      width: largura,
      height: ALTURAS.compacto,
      padding: '0 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      background: lado === 'A' ? 'rgba(170,178,194,0.55)' : 'rgba(255,255,255,0.14)',
      border: lado === 'B' ? '2px solid rgba(37,211,102,0.55)' : undefined,
      color: lado === 'A' ? cores.aTexto : 'white',
    }}
  >
    {esconderAvatar ? (
      <div style={{width: 48, height: 48, borderRadius: 14, border: '3px dashed rgba(31,41,55,0.35)', boxSizing: 'border-box'}} />
    ) : (
      <AvatarCliente nome={nome} cor={lado === 'A' ? '#8E96A8' : cor} tamanho={48} />
    )}
    <span style={{fontSize: 30, fontWeight: 800}}>{nome}</span>
    <span style={{fontSize: 26, fontWeight: 700, color: corTexto, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{texto}</span>
  </div>
);

export const Digitando: React.FC<{texto: string; frame: number}> = ({texto, frame}) => (
  <div
    style={{
      height: ALTURAS.digitando,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 14,
      padding: '0 26px',
      borderRadius: 36,
      background: 'rgba(124,58,237,0.35)',
      border: '2px solid rgba(167,139,250,0.6)',
      fontFamily,
      fontSize: 30,
      fontWeight: 600,
      color: '#EDE9FE',
      boxSizing: 'border-box',
    }}
  >
    <div style={{display: 'flex', gap: 7}}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: '#EDE9FE',
            translate: `0px ${-6 * Math.max(0, Math.sin((frame - i * 3) / 2.5))}px`,
          }}
        />
      ))}
    </div>
    {texto}
  </div>
);

/** Resposta da VIQ (roxa) */
export const RespostaViq: React.FC<{texto: string; rodape: string; largura: number; hora: string}> = ({texto, rodape, largura, hora}) => (
  <div
    style={{
      width: largura,
      height: ALTURAS.resposta,
      boxSizing: 'border-box',
      borderRadius: 36,
      padding: '18px 22px',
      background: 'linear-gradient(135deg, rgba(124,58,237,0.97), rgba(91,33,182,0.97))',
      border: '2px solid rgba(196,181,253,0.7)',
      boxShadow: '0 0 34px rgba(124,58,237,0.6), 0 10px 34px rgba(0,0,0,0.3)',
      fontFamily,
      color: 'white',
    }}
  >
    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 23, fontWeight: 700, color: '#DDD6FE', letterSpacing: 1}}>
      <span>VIQ · ATENDIMENTO IA</span>
      <span>{hora}</span>
    </div>
    <div style={{fontSize: 30, fontWeight: 500, lineHeight: 1.22, marginTop: 8, height: 111, overflow: 'hidden'}}>{texto}</div>
    <div style={{fontSize: 25, fontWeight: 700, color: cores.verdeClaro, marginTop: 6}}>✓ {rodape}</div>
  </div>
);

export const Chip: React.FC<{texto: string; verde: boolean; brilho?: number}> = ({texto, verde, brilho = 0}) => (
  <div
    style={{
      height: ALTURAS.chip,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: '0 24px',
      borderRadius: 999,
      background: verde ? 'rgba(37,211,102,0.18)' : 'rgba(167,139,250,0.2)',
      border: `3px solid ${verde ? cores.verde : cores.roxoClaro}`,
      boxShadow: verde ? `0 0 ${14 + 20 * brilho}px rgba(37,211,102,0.6)` : undefined,
      fontFamily,
      fontSize: 30,
      fontWeight: 800,
      color: verde ? cores.verdeClaro : '#DDD6FE',
      boxSizing: 'border-box',
      whiteSpace: 'nowrap',
    }}
  >
    {verde ? '✓' : '?'} {texto}
  </div>
);
