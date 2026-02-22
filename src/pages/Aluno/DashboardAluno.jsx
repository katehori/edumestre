import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { 
  Award, Bell, Clock, CheckCircle, XCircle, Users,
  ChevronRight, QrCode, Heart, MessageCircle, FileText,
  Calendar as CalendarIcon // Adicionar CalendarIcon
} from 'lucide-react';

export default function DashboardAluno() {
  const navigate = useNavigate();
  
  const atividades = [
    { id: 1, titulo: 'Frações', disciplina: 'Matemática', data: '25/02', status: 'pendente', nota: null },
    { id: 2, titulo: 'Interpretação de texto', disciplina: 'Português', data: '26/02', status: 'entregue', nota: 8.5 },
    { id: 3, titulo: 'Sistema Solar', disciplina: 'Ciências', data: '27/02', status: 'pendente', nota: null },
  ];

  const publicacoesRecentes = [
    { id: 1, titulo: 'Conteúdo para prova', autor: 'Prof. Carlos', curtidas: 23, comentarios: 5 },
    { id: 2, titulo: 'Videoaula de frações', autor: 'Prof. Carlos', curtidas: 45, comentarios: 2 },
  ];

  const conquistas = [
    { id: 1, icone: '🔥', titulo: 'Ofensiva', progresso: 5, total: 7 },
    { id: 2, icone: '⭐', titulo: 'Nota 10', progresso: 2, total: 5 },
    { id: 3, icone: '📚', titulo: 'Leitor', progresso: 3, total: 10 },
  ];

  const minhasTurmas = [
    { id: 1, nome: '6º Ano A', materia: 'Matemática', cor: '#3b82f6' },
    { id: 2, nome: '6º Ano A', materia: 'Português', cor: '#10b981' },
    { id: 3, nome: '6º Ano A', materia: 'Ciências', cor: '#f59e0b' },
  ];

  const proximosEventos = [
    { id: 1, titulo: 'Exercícios de Frações', disciplina: 'Matemática', data: '25/02', tipo: 'atividade' },
    { id: 2, titulo: 'Prova Bimestral', disciplina: 'Matemática', data: '28/02', tipo: 'prova' },
    { id: 3, titulo: 'Interpretação de Texto', disciplina: 'Português', data: '26/02', tipo: 'atividade' },
  ];

  return (
    <Layout perfil="aluno" nome="João Silva" turmaInfo="6º Ano A">
      {/* Header com pontos */}
      <div style={styles.header}>
        <div style={styles.welcome}>
          <h2 style={styles.welcomeTitle}>Olá, João! 👋</h2>
          <p style={styles.welcomeText}>Bom dia! Pronto para aprender hoje?</p>
        </div>
        <div style={styles.pointsCard}>
          <Award size={24} color="#f59e0b" />
          <div>
            <span style={styles.pointsLabel}>Seus pontos</span>
            <strong style={styles.pointsValue}>1.250</strong>
          </div>
        </div>
      </div>

      {/* Cards rápidos */}
      <div style={styles.quickStats}>
        <div style={styles.quickStat} onClick={() => navigate('/aluno/turmas')}>
          <Users size={20} color="#3b82f6" />
          <div>
            <span style={styles.quickLabel}>Minhas Turmas</span>
            <strong style={styles.quickValue}>3 turmas</strong>
          </div>
          <ChevronRight size={16} color="#9ca3af" style={styles.quickArrow} />
        </div>
        <div style={styles.quickStat} onClick={() => navigate('/aluno/calendario')}> {/* NOVO */}
          <CalendarIcon size={20} color="#f59e0b" />
          <div>
            <span style={styles.quickLabel}>Calendário</span>
            <strong style={styles.quickValue}>3 eventos</strong>
          </div>
          <ChevronRight size={16} color="#9ca3af" style={styles.quickArrow} />
        </div>
        <div style={styles.quickStat} onClick={() => navigate('/aluno/publicacoes')}>
          <FileText size={20} color="#10b981" />
          <div>
            <span style={styles.quickLabel}>Publicações</span>
            <strong style={styles.quickValue}>12 novas</strong>
          </div>
          <ChevronRight size={16} color="#9ca3af" style={styles.quickArrow} />
        </div>
      </div>

      {/* Botão para entrar em nova turma */}
      <div style={styles.joinSection}>
        <button style={styles.joinButton} onClick={() => navigate('/aluno/turmas')}>
          <QrCode size={20} />
          Entrar em nova turma
        </button>
      </div>

      <div style={styles.grid}>
        {/* Coluna da esquerda */}
        <div style={styles.leftColumn}>
          {/* Minhas Turmas */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>📚 Minhas Turmas</h3>
              <button 
                style={styles.verTodos}
                onClick={() => navigate('/aluno/turmas')}
              >
                Ver todas
              </button>
            </div>
            <div style={styles.turmasList}>
              {minhasTurmas.map(turma => (
                <div 
                  key={turma.id} 
                  style={styles.turmaItem}
                  onClick={() => navigate(`/aluno/turma/${turma.id}`)}
                >
                  <div style={{...styles.turmaCor, backgroundColor: turma.cor}} />
                  <div style={styles.turmaInfo}>
                    <strong>{turma.nome}</strong>
                    <span>{turma.materia}</span>
                  </div>
                  <ChevronRight size={16} color="#9ca3af" />
                </div>
              ))}
            </div>
          </div>

          {/* Publicações Recentes */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>📢 Publicações Recentes</h3>
              <button 
                style={styles.verTodos}
                onClick={() => navigate('/aluno/publicacoes')}
              >
                Ver todas
              </button>
            </div>
            <div style={styles.publicacoesList}>
              {publicacoesRecentes.map(pub => (
                <div 
                  key={pub.id} 
                  style={styles.publicacaoItem}
                  onClick={() => navigate('/aluno/publicacoes')}
                >
                  <div style={styles.publicacaoInfo}>
                    <strong>{pub.titulo}</strong>
                    <span style={styles.publicacaoAutor}>{pub.autor}</span>
                  </div>
                  <div style={styles.publicacaoStats}>
                    <span style={styles.publicacaoStat}>
                      <Heart size={12} color="#ef4444" /> {pub.curtidas}
                    </span>
                    <span style={styles.publicacaoStat}>
                      <MessageCircle size={12} /> {pub.comentarios}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Próximas atividades */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>📚 Próximas Atividades</h3>
              <button 
                style={styles.verTodos}
                onClick={() => navigate('/aluno/turmas')}
              >
                Ver todos
              </button>
            </div>
            <div style={styles.atividadesList}>
              {atividades.map(ativ => (
                <div 
                  key={ativ.id} 
                  style={styles.atividadeItem}
                  onClick={() => navigate(`/aluno/turma/1`)}
                >
                  <div style={styles.atividadeInfo}>
                    <strong>{ativ.titulo}</strong>
                    <span style={styles.atividadeDisciplina}>{ativ.disciplina}</span>
                  </div>
                  <div style={styles.atividadeMeta}>
                    <span style={styles.atividadeData}>
                      <Clock size={12} /> {ativ.data}
                    </span>
                    {ativ.status === 'pendente' ? (
                      <span style={{ ...styles.statusBadge, backgroundColor: '#fee2e2', color: '#dc2626' }}>
                        <XCircle size={12} /> Pendente
                      </span>
                    ) : (
                      <span style={{ ...styles.statusBadge, backgroundColor: '#d1fae5', color: '#10b981' }}>
                        <CheckCircle size={12} /> Nota: {ativ.nota}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coluna da direita */}
        <div style={styles.rightColumn}>
          {/* Ranking */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>🏆 Ranking da Turma</h3>
            <div style={styles.rankingList}>
              <div style={styles.rankingItem}>
                <span style={styles.rankingPos}>1º</span>
                <span style={styles.rankingNome}>Maria Souza</span>
                <span style={styles.rankingPontos}>2.450 pts</span>
              </div>
              <div style={{ ...styles.rankingItem, ...styles.rankingDestaque }}>
                <span style={styles.rankingPos}>2º</span>
                <span style={styles.rankingNome}>João (Você)</span>
                <span style={styles.rankingPontos}>1.250 pts</span>
              </div>
              <div style={styles.rankingItem}>
                <span style={styles.rankingPos}>3º</span>
                <span style={styles.rankingNome}>Pedro Lima</span>
                <span style={styles.rankingPontos}>980 pts</span>
              </div>
            </div>
            <button 
              style={styles.verRankingBtn}
              onClick={() => navigate('/aluno/ranking')}
            >
              Ver ranking completo
            </button>
          </div>

          {/* Conquistas */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>⭐ Próximas Conquistas</h3>
            {conquistas.map(conq => (
              <div key={conq.id} style={styles.conquistaItem}>
                <span style={styles.conquistaIcone}>{conq.icone}</span>
                <div style={styles.conquistaInfo}>
                  <strong>{conq.titulo}</strong>
                  <div style={styles.conquistaProgresso}>
                    <div style={styles.progressoBar}>
                      <div style={{
                        ...styles.progressoFill,
                        width: `${(conq.progresso/conq.total)*100}%`
                      }} />
                    </div>
                    <span style={styles.progressoTexto}>{conq.progresso}/{conq.total}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Banner WhatsApp */}
      <div style={styles.whatsappBanner}>
        <Bell size={20} />
        <span>📱 Você receberá notificações no WhatsApp sobre novas atividades e lembretes</span>
        <button style={styles.ativarBtn}>Ativar notificações</button>
      </div>

       {/* Seção do Calendário - NOVA */}
      <div style={styles.calendarioSection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>📅 Próximos Eventos</h3>
          <button 
            style={styles.verTodosBtn}
            onClick={() => navigate('/aluno/calendario')}
          >
            Ver calendário completo
          </button>
        </div>
        <div style={styles.eventosLista}>
          {proximosEventos.map(evento => (
            <div 
              key={evento.id} 
              style={styles.eventoItem}
              onClick={() => navigate('/aluno/calendario')}
            >
              <div style={{
                ...styles.eventoIcone,
                backgroundColor: evento.tipo === 'prova' ? '#f59e0b20' : '#3b82f620',
                color: evento.tipo === 'prova' ? '#f59e0b' : '#3b82f6'
              }}>
                {evento.tipo === 'prova' ? '📝' : '📚'}
              </div>
              <div style={styles.eventoInfo}>
                <strong>{evento.titulo}</strong>
                <span>{evento.disciplina} • {evento.data}</span>
              </div>
              <ChevronRight size={16} color="#9ca3af" />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
  },
  welcome: {
    flex: 1
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
  pointsCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    backgroundColor: '#fef3c7',
    padding: '15px 25px',
    borderRadius: '12px',
    cursor: 'pointer'
  },
  pointsLabel: {
    fontSize: '12px',
    color: '#92400e',
    display: 'block'
  },
  pointsValue: {
    fontSize: '24px',
    color: '#92400e'
  },
  quickStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
    marginBottom: '20px'
  },
  quickStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '12px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    cursor: 'pointer',
    position: 'relative'
  },
  quickArrow: {
    position: 'absolute',
    right: '10px'
  },
  quickLabel: {
    fontSize: '12px',
    color: '#6b7280',
    display: 'block'
  },
  quickValue: {
    fontSize: '16px',
    color: '#1f2937'
  },
  joinSection: {
    marginBottom: '20px'
  },
  joinButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    padding: '15px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '20px',
    marginBottom: '30px'
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px'
  },
  cardTitle: {
    margin: 0,
    fontSize: '18px',
    color: '#1f2937'
  },
  verTodos: {
    background: 'none',
    border: 'none',
    color: '#3b82f6',
    cursor: 'pointer',
    fontSize: '14px'
  },
  turmasList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  turmaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  turmaCor: {
    width: '40px',
    height: '40px',
    borderRadius: '8px'
  },
  turmaInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  publicacoesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  publicacaoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#f9fafb',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  publicacaoInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  publicacaoAutor: {
    fontSize: '11px',
    color: '#6b7280'
  },
  publicacaoStats: {
    display: 'flex',
    gap: '10px'
  },
  publicacaoStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    fontSize: '11px',
    color: '#6b7280'
  },
  atividadesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  atividadeItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  atividadeInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  atividadeDisciplina: {
    fontSize: '12px',
    color: '#6b7280'
  },
  atividadeMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  atividadeData: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: '#6b7280'
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    borderRadius: '20px',
    fontSize: '11px'
  },
  rankingList: {
    marginBottom: '15px'
  },
  rankingItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #e5e7eb'
  },
  rankingDestaque: {
    backgroundColor: '#fef3c7',
    borderRadius: '6px'
  },
  rankingPos: {
    width: '30px',
    fontWeight: 'bold'
  },
  rankingNome: {
    flex: 1
  },
  rankingPontos: {
    fontWeight: '500',
    color: '#f59e0b'
  },
  verRankingBtn: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#f3f4f6',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px'
  },
  conquistaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '15px'
  },
  conquistaIcone: {
    fontSize: '24px'
  },
  conquistaInfo: {
    flex: 1
  },
  conquistaProgresso: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  progressoBar: {
    flex: 1,
    height: '6px',
    backgroundColor: '#e5e7eb',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  progressoFill: {
    height: '100%',
    backgroundColor: '#f59e0b'
  },
  progressoTexto: {
    fontSize: '11px',
    color: '#6b7280'
  },
  whatsappBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px 20px',
    backgroundColor: '#25D36620',
    borderRadius: '12px',
    color: '#075e54'
  },
  ativarBtn: {
    marginLeft: 'auto',
    padding: '8px 20px',
    backgroundColor: '#25D366',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px'
  },
  calendarioSection: {
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
  eventosLista: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  eventoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px',
    borderBottom: '1px solid #e5e7eb',
    cursor: 'pointer'
  },
  eventoIcone: {
    width: '35px',
    height: '35px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px'
  },
  eventoInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  }
};