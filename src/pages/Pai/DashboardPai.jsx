import { useNavigate } from 'react-router-dom';
import { Users, Eye, Bell, LogOut } from 'lucide-react';

export default function DashboardPai() {
  const navigate = useNavigate();
  const filhos = [
    { id: 1, nome: 'João Silva', turma: '6º Ano A', escola: 'EMEF Professor Carlos' },
    { id: 2, nome: 'Maria Silva', turma: '4º Ano B', escola: 'EMEF Professor Carlos' },
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>👨‍👩‍👧‍👦 Olá, Sr. Carlos (Responsável)</h1>
        <button style={styles.logout} onClick={() => navigate('/')}>
          <LogOut size={20} />
        </button>
      </header>

      <div style={styles.filhos}>
        <h2>Meus Filhos</h2>
        {filhos.map(filho => (
          <div key={filho.id} style={styles.filhoCard}>
            <div style={styles.filhoInfo}>
              <Users size={24} />
              <div>
                <h3>{filho.nome}</h3>
                <p>{filho.turma} • {filho.escola}</p>
              </div>
            </div>
            
            <div style={styles.statsFilho}>
              <div style={styles.stat}>
                <span>Média</span>
                <strong>8.5</strong>
              </div>
              <div style={styles.stat}>
                <span>Atividades</span>
                <strong>12</strong>
              </div>
              <div style={styles.stat}>
                <span>Pontos</span>
                <strong>1.250</strong>
              </div>
            </div>

            <div style={styles.acoes}>
              <button 
                style={styles.verBtn}
                onClick={() => navigate(`/pai/filho/${filho.id}`)}
              >
                <Eye size={16} /> Acompanhar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.acompanhamento}>
        <h2>📊 Resumo Geral</h2>
        <div style={styles.resumoCard}>
          <h4>Próximas entregas</h4>
          <p>João: Atividade de Matemática - 25/02</p>
          <p>Maria: Leitura - 26/02</p>
        </div>

        <div style={styles.resumoCard}>
          <h4>Últimas notas</h4>
          <p>João: Matemática (9.0) · Português (8.5)</p>
          <p>Maria: Ciências (10.0) · História (9.5)</p>
        </div>
      </div>

      <div style={styles.permissaoNota}>
        <Eye size={16} />
        <span>Você está no modo VISUALIZAÇÃO - Pode ver, mas não interagir</span>
      </div>

      <div style={styles.whatsappBanner}>
        <Bell size={20} />
        <span>Notificações WhatsApp ativas para novidades dos seus filhos</span>
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
    padding: '10px',
    backgroundColor: '#fee2e2',
    border: 'none',
    borderRadius: '8px',
    color: '#dc2626',
    cursor: 'pointer'
  },
  filhos: {
    marginBottom: '30px'
  },
  filhoCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  filhoInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '15px'
  },
  statsFilho: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    marginBottom: '15px',
    textAlign: 'center'
  },
  stat: {
    padding: '10px',
    backgroundColor: '#f3f4f6',
    borderRadius: '8px'
  },
  acoes: {
    textAlign: 'center'
  },
  verBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  acompanhamento: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
    marginBottom: '20px'
  },
  resumoCard: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '8px'
  },
  permissaoNota: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    backgroundColor: '#fef3c7',
    borderRadius: '6px',
    marginBottom: '15px',
    color: '#92400e'
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