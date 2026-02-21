import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Calendar, Award, Bell, LogOut } from 'lucide-react';

export default function DashboardAluno() {
  const navigate = useNavigate();
  const [atividades] = useState([
    { id: 1, titulo: 'Frações', disciplina: 'Matemática', data: '25/02', status: 'pendente' },
    { id: 2, titulo: 'Interpretação de texto', disciplina: 'Português', data: '26/02', status: 'entregue', nota: 8.5 },
  ]);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1>👋 Olá, João (Aluno)</h1>
          <p style={styles.turmaInfo}>6º Ano A - Matutino</p>
        </div>
        <button style={styles.logout} onClick={() => navigate('/')}>
          <LogOut size={20} />
        </button>
      </header>

      <div style={styles.stats}>
        <div style={styles.statCard}>
          <Award size={24} color="#f59e0b" />
          <div>
            <h3>1.250</h3>
            <p>Pontos</p>
          </div>
        </div>
        <div style={styles.statCard}>
          <Calendar size={24} color="#3b82f6" />
          <div>
            <h3>3</h3>
            <p>Atividades</p>
          </div>
        </div>
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h2>📚 Próximas Atividades</h2>
          {atividades.map(ativ => (
            <div key={ativ.id} style={styles.atividadeItem}>
              <div>
                <strong>{ativ.titulo}</strong>
                <p>{ativ.disciplina} - Entrega: {ativ.data}</p>
              </div>
              <span style={{
                ...styles.statusBadge,
                backgroundColor: ativ.status === 'pendente' ? '#fee2e2' : '#d1fae5',
                color: ativ.status === 'pendente' ? '#dc2626' : '#10b981'
              }}>
                {ativ.status === 'pendente' ? 'Pendente' : `Nota: ${ativ.nota}`}
              </span>
            </div>
          ))}
        </div>

        <div style={styles.card}>
          <h2>📢 Últimas Publicações</h2>
          <div style={styles.publicacao}>
            <strong>📝 Conteúdo da prova</strong>
            <p>A prova de matemática será sobre frações e números decimais...</p>
            <div style={styles.likes}>
              <span>❤️ 23 likes</span>
              <button style={styles.likeBtn}>Curtir</button>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.ranking}>
        <h2>🏆 Ranking da Turma</h2>
        <div style={styles.rankingList}>
          <div style={styles.rankingItem}>
            <span>1º</span>
            <span>Maria Souza</span>
            <span>2.450 pts</span>
          </div>
          <div style={{...styles.rankingItem, backgroundColor: '#fef3c7'}}>
            <span>2º</span>
            <span>João (Você)</span>
            <span>1.250 pts</span>
          </div>
          <div style={styles.rankingItem}>
            <span>3º</span>
            <span>Pedro Lima</span>
            <span>980 pts</span>
          </div>
        </div>
      </div>

      <div style={styles.whatsappBanner}>
        <Bell size={20} />
        <span>Você receberá notificações no WhatsApp sobre novas atividades</span>
      </div>
    </div>
  );
}

// Estilos complementares...
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
  },
  turmaInfo: {
    color: '#4b5563'
  },
  logout: {
    padding: '10px',
    backgroundColor: '#fee2e2',
    border: 'none',
    borderRadius: '8px',
    color: '#dc2626',
    cursor: 'pointer'
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
    marginBottom: '30px'
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '20px',
    marginBottom: '30px'
  },
  card: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  atividadeItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    borderBottom: '1px solid #e5e7eb'
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px'
  },
  publicacao: {
    padding: '15px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px'
  },
  likes: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px'
  },
  likeBtn: {
    padding: '5px 15px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer'
  },
  ranking: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px'
  },
  rankingItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #e5e7eb'
  },
  whatsappBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '15px',
    backgroundColor: '#25D36620',
    borderRadius: '8px',
    color: '#075e54'
  }
};