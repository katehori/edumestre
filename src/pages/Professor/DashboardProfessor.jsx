import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Calendar, MessageSquare, QrCode, LogOut } from 'lucide-react';

export default function DashboardProfessor() {
  const navigate = useNavigate();

  const menuItems = [
    { icon: <Users size={24} />, label: 'Minhas Turmas', path: '/professor/turmas', color: '#3b82f6' },
    { icon: <BookOpen size={24} />, label: 'Publicações', path: '/professor/publicacoes', color: '#10b981' },
    { icon: <Calendar size={24} />, label: 'Atividades', path: '/professor/atividades', color: '#f59e0b' },
    { icon: <MessageSquare size={24} />, label: 'WhatsApp', path: '/professor/whatsapp', color: '#25D366' },
    { icon: <QrCode size={24} />, label: 'QR Codes', path: '/professor/qrcode', color: '#8b5cf6' },
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>👨‍🏫 Olá, Prof. Carlos</h1>
        <button style={styles.logout} onClick={() => navigate('/')}>
          <LogOut size={20} /> Sair
        </button>
      </header>

      <div style={styles.stats}>
        <div style={styles.statCard}>
          <h3>4</h3>
          <p>Turmas ativas</p>
        </div>
        <div style={styles.statCard}>
          <h3>87</h3>
          <p>Alunos</p>
        </div>
        <div style={styles.statCard}>
          <h3>12</h3>
          <p>Atividades</p>
        </div>
      </div>

      <div style={styles.grid}>
        {menuItems.map((item, index) => (
          <button
            key={index}
            style={{...styles.menuCard, backgroundColor: item.color + '20', borderColor: item.color}}
            onClick={() => navigate(item.path)}
          >
            <div style={{...styles.iconCircle, backgroundColor: item.color}}>
              {item.icon}
            </div>
            <span style={styles.menuLabel}>{item.label}</span>
          </button>
        ))}
      </div>

      <div style={styles.recentes}>
        <h2>Atividades Recentes</h2>
        <div style={styles.atividadeItem}>
          <div>
            <strong>📝 Frações</strong>
            <p>Turma: 6º Ano A - Entrega: 25/02</p>
          </div>
          <span style={styles.status}>5 entregas</span>
        </div>
        <div style={styles.atividadeItem}>
          <div>
            <strong>📖 Interpretação de texto</strong>
            <p>Turma: 7º Ano B - Entrega: 26/02</p>
          </div>
          <span style={styles.status}>12 entregas</span>
        </div>
      </div>
    </div>
  );
}

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
  logout: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: '#fee2e2',
    border: 'none',
    borderRadius: '8px',
    color: '#dc2626',
    cursor: 'pointer'
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
    marginBottom: '30px'
  },
  statCard: {
    backgroundColor: '#f8fafc',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    '& h3': {
      fontSize: '32px',
      margin: '0'
    }
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '15px',
    marginBottom: '30px'
  },
  menuCard: {
    padding: '20px',
    border: '2px solid',
    borderRadius: '12px',
    background: 'white',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px'
  },
  iconCircle: {
    width: '50px',
    height: '50px',
    borderRadius: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },
  recentes: {
    backgroundColor: '#f8fafc',
    padding: '20px',
    borderRadius: '12px'
  },
  atividadeItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    borderBottom: '1px solid #e2e8f0'
  },
  status: {
    backgroundColor: '#dbeafe',
    padding: '5px 10px',
    borderRadius: '20px',
    color: '#2563eb',
    fontSize: '14px'
  }
};