import { Trophy, Award, Star, TrendingUp, Medal } from 'lucide-react';

export default function RankingCard({ aluno, posicao, isCurrentUser }) {
  const getMedalColor = (pos) => {
    switch(pos) {
      case 1: return { bg: '#fef3c7', color: '#f59e0b', icon: '🥇' };
      case 2: return { bg: '#e5e7eb', color: '#6b7280', icon: '🥈' };
      case 3: return { bg: '#fed7aa', color: '#b45309', icon: '🥉' };
      default: return { bg: '#f3f4f6', color: '#4b5563', icon: `${pos}º` };
    }
  };

  const medal = getMedalColor(posicao);

  return (
    <div style={{
      ...styles.card,
      ...(isCurrentUser ? styles.currentUserCard : {})
    }}>
      <div style={styles.posicao}>
        <span style={{
          ...styles.posicaoBadge,
          backgroundColor: medal.bg,
          color: medal.color
        }}>
          {medal.icon}
        </span>
      </div>

      <div style={styles.alunoInfo}>
        <div style={styles.alunoHeader}>
          <strong style={styles.alunoNome}>{aluno.nome}</strong>
          <span style={styles.alunoTurma}>{aluno.turma}</span>
        </div>
        <div style={styles.alunoStats}>
          <span style={styles.stat}>
            <Award size={12} color="#f59e0b" />
            {aluno.pontos} pts
          </span>
          <span style={styles.stat}>
            <Star size={12} color="#3b82f6" />
            Média: {aluno.media}
          </span>
          <span style={styles.stat}>
            <TrendingUp size={12} color="#10b981" />
            {aluno.atividades} ativ.
          </span>
        </div>
      </div>

      {aluno.conquistas && (
        <div style={styles.conquistasPreview}>
          {aluno.conquistas.slice(0, 3).map((conquista, idx) => (
            <span key={idx} style={styles.conquistaIcone} title={conquista.nome}>
              {conquista.icone}
            </span>
          ))}
          {aluno.conquistas.length > 3 && (
            <span style={styles.maisConquistas}>+{aluno.conquistas.length - 3}</span>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '12px 15px',
    backgroundColor: 'white',
    borderRadius: '10px',
    marginBottom: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  currentUserCard: {
    border: '2px solid #3b82f6',
    backgroundColor: '#dbeafe'
  },
  posicao: {
    width: '40px',
    textAlign: 'center'
  },
  posicaoBadge: {
    display: 'inline-block',
    width: '30px',
    height: '30px',
    borderRadius: '15px',
    textAlign: 'center',
    lineHeight: '30px',
    fontWeight: 'bold',
    fontSize: '14px'
  },
  alunoInfo: {
    flex: 1
  },
  alunoHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '4px'
  },
  alunoNome: {
    fontSize: '14px',
    color: '#1f2937'
  },
  alunoTurma: {
    fontSize: '11px',
    color: '#6b7280'
  },
  alunoStats: {
    display: 'flex',
    gap: '12px'
  },
  stat: {
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    fontSize: '11px',
    color: '#6b7280'
  },
  conquistasPreview: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  conquistaIcone: {
    fontSize: '16px',
    cursor: 'pointer'
  },
  maisConquistas: {
    fontSize: '10px',
    color: '#6b7280',
    marginLeft: '2px'
  }
};