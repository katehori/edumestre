import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { 
  BookOpen, Users, Calendar, MessageSquare, QrCode, 
  TrendingUp, Clock, CheckCircle, Users2, Share2,
  FileText, Heart, MessageCircle, Calendar as CalendarIcon // Adicionar CalendarIcon
} from 'lucide-react';

export default function DashboardProfessor() {
  const navigate = useNavigate();

    const menuItems = [
        { icon: <Users size={24} />, label: 'Minhas Turmas', path: '/professor/turmas', color: '#3b82f6', count: 4 },
        { icon: <Users2 size={24} />, label: 'Comunidade de Professores', path: '/professor/comunidade', color: '#8b5cf6', count: 12, isNew: true },
        { icon: <FileText size={24} />, label: 'Publicações', path: '/professor/publicacoes', color: '#10b981', count: 23 },
        { icon: <CalendarIcon size={24} />, label: 'Calendário', path: '/professor/calendario', color: '#f59e0b', count: 5 }, // NOVO
        { icon: <Clock size={24} />, label: 'Atividades', path: '/professor/atividades', color: '#f59e0b', count: 12 },
        { icon: <MessageSquare size={24} />, label: 'WhatsApp', path: '/professor/whatsapp', color: '#25D366', count: 3 },
        { icon: <QrCode size={24} />, label: 'QR Codes', path: '/professor/qrcode', color: '#8b5cf6', isNew: true },
    ];

  // Mock de publicações recentes
  const publicacoesRecentes = [
    { id: 1, titulo: 'Conteúdo para prova', turma: '6º Ano A', comentarios: 5, curtidas: 23 },
    { id: 2, titulo: 'Videoaula de frações', turma: '7º Ano B', comentarios: 2, curtidas: 12 },
    { id: 3, titulo: 'Material de apoio', turma: '8º Ano C', comentarios: 1, curtidas: 8 },
  ];

  const eventosHoje = [
    { id: 1, titulo: 'Entrega de Frações', turma: '6º Ano A', hora: '23:59' },
    { id: 2, titulo: 'Reunião de Pais', turma: 'Geral', hora: '19:00' },
  ];

  return (
    <Layout perfil="professor" nome="Prof. Carlos Silva" turmaInfo="Coordenador - Matemática">
      {/* Boas-vindas */}
      <div style={styles.welcome}>
        <div>
          <h2 style={styles.welcomeTitle}>Olá, Prof. Carlos! 👋</h2>
          <p style={styles.welcomeText}>Acompanhe o resumo das suas atividades</p>
        </div>
        <div style={styles.dateBox}>
          <Clock size={16} />
          <span>{new Date().toLocaleDateString('pt-BR')}</span>
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: '#3b82f620', color: '#3b82f6' }}>
            <Users size={24} />
          </div>
          <div>
            <span style={styles.statLabel}>Total de Alunos</span>
            <strong style={styles.statValue}>87</strong>
          </div>
          <span style={styles.statTrend}>
            <TrendingUp size={14} /> +12%
          </span>
        </div>

        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: '#10b98120', color: '#10b981' }}>
            <FileText size={24} />
          </div>
          <div>
            <span style={styles.statLabel}>Publicações</span>
            <strong style={styles.statValue}>23</strong>
          </div>
          <span style={styles.statTrend}>esse mês</span>
        </div>

        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: '#f59e0b20', color: '#f59e0b' }}>
            <Calendar size={24} />
          </div>
          <div>
            <span style={styles.statLabel}>Atividades</span>
            <strong style={styles.statValue}>12</strong>
          </div>
          <span style={styles.statTrend}>5 pendentes</span>
        </div>

        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: '#8b5cf620', color: '#8b5cf6' }}>
            <Share2 size={24} />
          </div>
          <div>
            <span style={styles.statLabel}>Grupos</span>
            <strong style={styles.statValue}>3</strong>
          </div>
          <span style={styles.statTrend}>comunidade</span>
        </div>
      </div>

      {/* Menu rápido */}
      <div style={styles.menuSection}>
        <h3 style={styles.sectionTitle}>Acesso Rápido</h3>
        <div style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <button
              key={index}
              style={styles.menuCard}
              onClick={() => navigate(item.path)}
            >
              <div style={{ ...styles.menuIcon, backgroundColor: item.color + '20', color: item.color }}>
                {item.icon}
              </div>
              <div style={styles.menuInfo}>
                <span style={styles.menuLabel}>{item.label}</span>
                {item.count && <span style={styles.menuCount}>{item.count}</span>}
              </div>
              {item.isNew && <span style={styles.newBadge}>Novo</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Seção de Publicações Recentes */}
      <div style={styles.publicacoesSection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>📢 Publicações Recentes</h3>
          <button 
            style={styles.verTodosBtn}
            onClick={() => navigate('/professor/publicacoes')}
          >
            Ver todas
          </button>
        </div>
        <div style={styles.publicacoesList}>
          {publicacoesRecentes.map(pub => (
            <div 
              key={pub.id} 
              style={styles.publicacaoItem}
              onClick={() => navigate('/professor/publicacoes')}
            >
              <div style={styles.publicacaoInfo}>
                <strong>{pub.titulo}</strong>
                <span style={styles.publicacaoTurma}>{pub.turma}</span>
              </div>
              <div style={styles.publicacaoStats}>
                <span style={styles.publicacaoStat}>
                  <MessageCircle size={14} /> {pub.comentarios}
                </span>
                <span style={styles.publicacaoStat}>
                  <Heart size={14} color="#ef4444" /> {pub.curtidas}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Destaque: Comunidade de Professores */}
      <div style={styles.destaqueSection}>
        <div style={styles.destaqueContent}>
          <div>
            <h3 style={styles.destaqueTitle}>👥 Comunidade de Professores</h3>
            <p style={styles.destaqueText}>
              Compartilhe materiais, planejamentos e ideias com outros educadores
            </p>
            <div style={styles.destaqueStats}>
              <span>📚 342 materiais</span>
              <span>👥 156 professores</span>
              <span>📋 12 grupos</span>
            </div>
          </div>
          <button 
            style={styles.destaqueButton}
            onClick={() => navigate('/professor/comunidade')}
          >
            Acessar Comunidade
          </button>
        </div>
      </div>

      {/* Links rápidos para turmas */}
      <div style={styles.turmasSection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>📚 Minhas Turmas</h3>
          <button 
            style={styles.verTodosBtn}
            onClick={() => navigate('/professor/turmas')}
          >
            Ver todas
          </button>
        </div>
        <div style={styles.turmasMiniGrid}>
          <div style={styles.turmaMiniCard} onClick={() => navigate('/professor/turma/1')}>
            <div style={{...styles.turmaMiniCor, backgroundColor: '#3b82f6'}} />
            <div>
              <strong>6º Ano A</strong>
              <p>32 alunos • 8 atividades</p>
            </div>
          </div>
          <div style={styles.turmaMiniCard} onClick={() => navigate('/professor/turma/2')}>
            <div style={{...styles.turmaMiniCor, backgroundColor: '#10b981'}} />
            <div>
              <strong>7º Ano B</strong>
              <p>28 alunos • 6 atividades</p>
            </div>
          </div>
          <div style={styles.turmaMiniCard} onClick={() => navigate('/professor/turma/3')}>
            <div style={{...styles.turmaMiniCor, backgroundColor: '#f59e0b'}} />
            <div>
              <strong>8º Ano C</strong>
              <p>30 alunos • 5 atividades</p>
            </div>
          </div>
        </div>
      </div>

      {/* Seção do Calendário - NOVA */}
      <div style={styles.calendarioSection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>📅 Hoje no Calendário</h3>
          <button 
            style={styles.verTodosBtn}
            onClick={() => navigate('/professor/calendario')}
          >
            Ver calendário completo
          </button>
        </div>
        <div style={styles.eventosHojeLista}>
          {eventosHoje.map(evento => (
            <div 
              key={evento.id} 
              style={styles.eventoHojeItem}
              onClick={() => navigate('/professor/calendario')}
            >
              <CalendarIcon size={16} color="#f59e0b" />
              <div style={styles.eventoHojeInfo}>
                <strong>{evento.titulo}</strong>
                <span>{evento.turma} • {evento.hora}</span>
              </div>
            </div>
          ))}
          {eventosHoje.length === 0 && (
            <p style={styles.semEventos}>Nenhum evento programado para hoje</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  welcome: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
  },
  welcomeTitle: {
    fontSize: '24px',
    margin: '0 0 5px',
    color: '#1f2937'
  },
  welcomeText: {
    color: '#6b7280',
    margin: 0
  },
  dateBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 15px',
    backgroundColor: 'white',
    borderRadius: '30px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    fontSize: '14px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginBottom: '40px'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    position: 'relative'
  },
  statIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statLabel: {
    fontSize: '12px',
    color: '#6b7280',
    display: 'block'
  },
  statValue: {
    fontSize: '24px',
    color: '#1f2937'
  },
  statTrend: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '11px',
    color: '#10b981',
    display: 'flex',
    alignItems: 'center',
    gap: '2px'
  },
  menuSection: {
    marginBottom: '40px'
  },
  sectionTitle: {
    fontSize: '18px',
    margin: '0 0 15px',
    color: '#1f2937'
  },
  menuGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '15px'
  },
  menuCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    position: 'relative',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    transition: 'all 0.3s'
  },
  menuIcon: {
    width: '45px',
    height: '45px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuInfo: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  menuLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1f2937'
  },
  menuCount: {
    backgroundColor: '#f3f4f6',
    padding: '2px 8px',
    borderRadius: '20px',
    fontSize: '12px'
  },
  newBadge: {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    backgroundColor: '#ef4444',
    color: 'white',
    padding: '2px 8px',
    borderRadius: '20px',
    fontSize: '10px'
  },
  publicacoesSection: {
    marginBottom: '30px'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px'
  },
  verTodosBtn: {
    background: 'none',
    border: 'none',
    color: '#3b82f6',
    cursor: 'pointer',
    fontSize: '14px'
  },
  publicacoesList: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  publicacaoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    borderBottom: '1px solid #e5e7eb',
    cursor: 'pointer'
  },
  publicacaoInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  publicacaoTurma: {
    fontSize: '12px',
    color: '#6b7280'
  },
  publicacaoStats: {
    display: 'flex',
    gap: '15px'
  },
  publicacaoStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: '#6b7280'
  },
  destaqueSection: {
    backgroundColor: '#8b5cf6',
    borderRadius: '12px',
    padding: '30px',
    marginBottom: '40px',
    color: 'white'
  },
  destaqueContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  destaqueTitle: {
    fontSize: '20px',
    margin: '0 0 10px'
  },
  destaqueText: {
    margin: '0 0 15px',
    opacity: 0.9
  },
  destaqueStats: {
    display: 'flex',
    gap: '20px',
    fontSize: '14px'
  },
  destaqueButton: {
    padding: '12px 30px',
    backgroundColor: 'white',
    color: '#8b5cf6',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  recentesSection: {
    marginBottom: '30px'
  },
  recentesList: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  recenteItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 0',
    borderBottom: '1px solid #e5e7eb',
    cursor: 'pointer'
  },
  recenteInfo: {
    flex: 1
  },
  progressInfo: {
    display: 'flex',
    gap: '20px',
    margin: '5px 0',
    fontSize: '12px',
    color: '#6b7280'
  },
  progressBar: {
    width: '300px',
    height: '6px',
    backgroundColor: '#e5e7eb',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    transition: 'width 0.3s'
  },
  recenteData: {
    fontSize: '12px'
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px'
  },
  turmasSection: {
    marginBottom: '30px'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px'
  },
  verTodosBtn: {
    background: 'none',
    border: 'none',
    color: '#3b82f6',
    cursor: 'pointer',
    fontSize: '14px'
  },
  turmasMiniGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px'
  },
  turmaMiniCard: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  turmaMiniCor: {
    width: '40px',
    height: '40px',
    borderRadius: '8px'
  },
  calendarioSection: {
    marginBottom: '30px'
  },
  eventosHojeLista: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  eventoHojeItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px',
    borderBottom: '1px solid #e5e7eb',
    cursor: 'pointer'
  },
  eventoHojeInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  semEventos: {
    textAlign: 'center',
    padding: '20px',
    color: '#6b7280',
    fontSize: '13px'
  }
};