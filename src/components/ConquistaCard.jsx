import { useState } from 'react';
import { Lock, CheckCircle, Award } from 'lucide-react';

export default function ConquistaCard({ conquista, conquistada, progresso }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div 
      style={{
        ...styles.card,
        ...(!conquistada && styles.cardBloqueada),
        ...(showDetails && styles.cardExpandido)
      }}
      onClick={() => setShowDetails(!showDetails)}
    >
      <div style={styles.header}>
        <div style={{
          ...styles.icone,
          backgroundColor: conquistada ? conquista.cor + '20' : '#f3f4f6',
          color: conquistada ? conquista.cor : '#9ca3af'
        }}>
          {conquistada ? conquista.icone : <Lock size={20} />}
        </div>
        <div style={styles.info}>
          <strong style={styles.titulo}>{conquista.nome}</strong>
          <span style={styles.descricao}>{conquista.descricao}</span>
        </div>
        {conquistada && <CheckCircle size={16} color="#10b981" />}
      </div>

      {showDetails && (
        <div style={styles.detalhes}>
          <div style={styles.progressoContainer}>
            <div style={styles.progressoInfo}>
              <span>Progresso</span>
              <span>{progresso.atual}/{progresso.total}</span>
            </div>
            <div style={styles.progressoBar}>
              <div style={{
                ...styles.progressoFill,
                width: `${(progresso.atual/progresso.total)*100}%`,
                backgroundColor: conquista.cor
              }} />
            </div>
          </div>
          <p style={styles.recompensa}>Recompensa: {conquista.recompensa} pontos</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '12px',
    marginBottom: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  cardBloqueada: {
    opacity: 0.7,
    filter: 'grayscale(0.5)'
  },
  cardExpandido: {
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  icone: {
    width: '45px',
    height: '45px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px'
  },
  info: {
    flex: 1
  },
  titulo: {
    display: 'block',
    fontSize: '14px',
    color: '#1f2937',
    marginBottom: '2px'
  },
  descricao: {
    display: 'block',
    fontSize: '11px',
    color: '#6b7280'
  },
  detalhes: {
    marginTop: '12px',
    paddingTop: '12px',
    borderTop: '1px solid #e5e7eb'
  },
  progressoContainer: {
    marginBottom: '8px'
  },
  progressoInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    color: '#6b7280',
    marginBottom: '4px'
  },
  progressoBar: {
    height: '6px',
    backgroundColor: '#e5e7eb',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  progressoFill: {
    height: '100%',
    transition: 'width 0.3s'
  },
  recompensa: {
    fontSize: '11px',
    color: '#f59e0b',
    margin: '5px 0 0'
  }
};