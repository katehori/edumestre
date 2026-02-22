import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { 
  Eye, Bell, TrendingUp, Calendar, Award,
  Clock, AlertCircle, FileText, Heart, MessageCircle,
  ChevronRight, BookOpen, Calendar as CalendarIcon // Adicionar CalendarIcon
} from 'lucide-react';

export default function DashboardPai() {
  const navigate = useNavigate();
  
  const filhos = [
    { 
      id: 1, 
      nome: 'João Silva', 
      turma: '6º Ano A', 
      escola: 'EMEF Professor Carlos',
      media: 8.5,
      atividades: 12,
      pontos: 1250,
      ultimaAtividade: 'Matemática - 25/02',
      novasPublicacoes: 3,
      atividadesPendentes: 2 // NOVO
    },
    { 
      id: 2, 
      nome: 'Maria Silva', 
      turma: '4º Ano B', 
      escola: 'EMEF Professor Carlos',
      media: 9.2,
      atividades: 15,
      pontos: 1580,
      ultimaAtividade: 'Leitura - 26/02',
      novasPublicacoes: 1,
      atividadesPendentes: 1 // NOVO
    },
  ];

  const publicacoesRecentes = [
    { id: 1, titulo: 'Conteúdo para prova', aluno: 'João', turma: 'Matemática', curtidas: 23, comentarios: 5 },
    { id: 2, titulo: 'Videoaula de frações', aluno: 'João', turma: 'Matemática', curtidas: 45, comentarios: 2 },
    { id: 3, titulo: 'Atividade de leitura', aluno: 'Maria', turma: 'Português', curtidas: 12, comentarios: 1 },
  ];

  // NOVO: Atividades recentes dos filhos
  const atividadesRecentes = [
    { id: 1, titulo: 'Exercícios de Frações', aluno: 'João', disciplina: 'Matemática', data: '25/02', status: 'pendente' },
    { id: 2, titulo: 'Prova Bimestral', aluno: 'João', disciplina: 'Matemática', data: '28/02', status: 'pendente' },
    { id: 3, titulo: 'Interpretação de Texto', aluno: 'Maria', disciplina: 'Português', data: '26/02', status: 'pendente' },
    { id: 4, titulo: 'Trabalho de Ciências', aluno: 'João', disciplina: 'Ciências', data: '20/02', status: 'concluida', nota: 9.0 },
  ];

  const eventosProximos = [
    { id: 1, titulo: 'Exercícios de Frações', aluno: 'João', data: '25/02', tipo: 'atividade' },
    { id: 2, titulo: 'Prova Bimestral', aluno: 'João', data: '28/02', tipo: 'prova' },
    { id: 3, titulo: 'Atividade de Leitura', aluno: 'Maria', data: '26/02', tipo: 'atividade' },
  ];

  return (
    <Layout perfil="pai" nome="Carlos Silva" turmaInfo="Responsável por 2 alunos">
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.welcomeTitle}>👨‍👩‍👧‍👦 Olá, Sr. Carlos</h2>
          <p style={styles.welcomeText}>Acompanhe o desenvolvimento dos seus filhos</p>
        </div>
      </div>

      {/* Cards de Acesso Rápido - ATUALIZADO */}
      <div style={styles.quickAccess}>
        <button 
          style={{...styles.quickAccessCard, backgroundColor: '#fef3c7'}}
          onClick={() => navigate('/pai/calendario')} // NOVO
        >
          <CalendarIcon size={24} color="#f59e0b" />
          <div style={{ width: '100%'}}>
            <strong>Calendário Escolar</strong>
            <br/>
            <span>Acompanhe as datas importantes</span>
          </div>
          <ChevronRight size={20} color="#9ca3af" />
        </button>
        
        <button 
          style={{...styles.quickAccessCard, backgroundColor: '#dbeafe'}}
          onClick={() => navigate('/pai/publicacoes')}
        >
          <FileText size={24} color="#3b82f6" />
          <div style={{ width: '100%'}}>
            <strong>Acompanhar Publicações</strong>
            <br/>
            <span>Veja o que os professores estão postando</span>
          </div>
          <ChevronRight size={20} color="#9ca3af" />
        </button>
        
        <button 
          style={{...styles.quickAccessCard, backgroundColor: '#d1fae5'}}
          onClick={() => navigate('/pai/atividades')}
        >
          <BookOpen size={24} color="#10b981" />
          <div style={{ width: '100%'}}>
            <strong>Atividades Escolares</strong>
            <br/>
            <span>Acompanhe tarefas e provas</span>
          </div>
          <ChevronRight size={20} color="#9ca3af" />
        </button>
      </div>

      {/* Cards dos filhos - ATUALIZADO com link para atividades */}
      <div style={styles.filhosGrid}>
        {filhos.map(filho => (
          <div key={filho.id} style={styles.filhoCard}>
            <div style={styles.filhoHeader}>
              <div style={styles.filhoAvatar}>
                {filho.nome.charAt(0)}
              </div>
              <div style={styles.filhoInfo}>
                <h3 style={styles.filhoNome}>{filho.nome}</h3>
                <p style={styles.filhoTurma}>{filho.turma} • {filho.escola}</p>
              </div>
              {filho.novasPublicacoes > 0 && (
                <span style={styles.novasPublicacoesBadge}>
                  {filho.novasPublicacoes} novas
                </span>
              )}
            </div>

            <div style={styles.filhoStats}>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Média</span>
                <strong style={{ ...styles.statValue, color: filho.media >= 7 ? '#10b981' : '#f59e0b' }}>
                  {filho.media}
                </strong>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Atividades</span>
                <strong style={styles.statValue}>{filho.atividades}</strong>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Pontos</span>
                <strong style={styles.statValue}>{filho.pontos}</strong>
              </div>
            </div>

            {/* NOVO: Resumo de atividades pendentes */}
            {filho.atividadesPendentes > 0 && (
              <div style={styles.pendentesCard}>
                <AlertCircle size={16} color="#f59e0b" />
                <span>{filho.atividadesPendentes} atividade(s) pendente(s) de entrega</span>
              </div>
            )}

            <div style={styles.filhoFooter}>
              <div style={styles.proximaAtividade}>
                <Clock size={14} color="#6b7280" />
                <span>Próxima: {filho.ultimaAtividade}</span>
              </div>
              <div style={styles.filhoActions}>
                <button 
                  style={styles.publicacoesBtn}
                  onClick={() => navigate('/pai/publicacoes')}
                >
                  <FileText size={16} />
                  Publicações
                </button>
                {/* NOVO: Botão de atividades */}
                <button 
                  style={styles.atividadesBtn}
                  onClick={() => navigate('/pai/atividades')}
                >
                  <BookOpen size={16} />
                  Atividades
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Avisos importantes */}
      <div style={styles.avisosSection}>
        <h3 style={styles.sectionTitle}>⚠️ Avisos importantes</h3>
        <div style={styles.avisoCard}>
          <AlertCircle size={20} color="#dc2626" />
          <div style={styles.avisoContent}>
            <strong>Reunião de pais - 6º Ano A</strong>
            <p>Amanhã às 19h na sala do 6º Ano A</p>
          </div>
          <span style={styles.avisoData}>Há 1 dia</span>
        </div>
      </div>

      {/* Banner de permissões */}
      <div style={styles.permissaoBanner}>
        <Eye size={20} />
        <div>
          <strong>Modo visualização ativo</strong>
          <p style={styles.permissaoTexto}>Você pode acompanhar tudo, mas não pode entregar atividades ou comentar</p>
        </div>
      </div>

      {/* Banner WhatsApp */}
      <div style={styles.whatsappBanner}>
        <Bell size={20} />
        <span>📱 Você receberá notificações no WhatsApp sobre novas atividades e lembretes</span>
        <button style={styles.ativarBtn}>Ativar notificações</button>
      </div>

      {/* NOVA SEÇÃO: Atividades Recentes */}
      <div style={styles.atividadesSection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>📚 Atividades Recentes</h3>
          <button 
            style={styles.verTodosBtn}
            onClick={() => navigate('/pai/atividades')}
          >
            Ver todas
          </button>
        </div>
        <div style={styles.atividadesList}>
          {atividadesRecentes.map(ativ => (
            <div 
              key={ativ.id} 
              style={styles.atividadeItem}
              onClick={() => navigate('/pai/atividades')}
            >
              <div style={styles.atividadeInfo}>
                <strong>{ativ.titulo}</strong>
                <span style={styles.atividadeDetalhes}>
                  {ativ.aluno} • {ativ.disciplina} • {ativ.data}
                </span>
              </div>
              {ativ.status === 'pendente' ? (
                <span style={{...styles.atividadeStatus, backgroundColor: '#fee2e2', color: '#dc2626'}}>
                  Pendente
                </span>
              ) : (
                <span style={{...styles.atividadeStatus, backgroundColor: '#d1fae5', color: '#10b981'}}>
                  Nota: {ativ.nota}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Publicações Recentes */}
      <div style={styles.publicacoesSection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>📢 Publicações Recentes</h3>
          <button 
            style={styles.verTodosBtn}
            onClick={() => navigate('/pai/publicacoes')}
          >
            Ver todas
          </button>
        </div>
        <div style={styles.publicacoesList}>
          {publicacoesRecentes.map(pub => (
            <div 
              key={pub.id} 
              style={styles.publicacaoItem}
              onClick={() => navigate('/pai/publicacoes')}
            >
              <div style={styles.publicacaoInfo}>
                <strong>{pub.titulo}</strong>
                <span style={styles.publicacaoDetalhes}>
                  {pub.aluno} • {pub.turma}
                </span>
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

      {/* Resumo Geral */}
      <div style={styles.resumoSection}>
        <h3 style={styles.sectionTitle}>📊 Resumo Geral</h3>
        <div style={styles.resumoGrid}>
          <div style={styles.resumoCard}>
            <div style={{ ...styles.resumoIcon, backgroundColor: '#3b82f620', color: '#3b82f6' }}>
              <Calendar size={24} />
            </div>
            <div>
              <span style={styles.resumoLabel}>Próximas entregas</span>
              <div style={styles.resumoLista}>
                <div style={styles.resumoItem}>
                  <span>João - Matemática</span>
                  <span style={styles.resumoData}>25/02</span>
                </div>
                <div style={styles.resumoItem}>
                  <span>Maria - Leitura</span>
                  <span style={styles.resumoData}>26/02</span>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.resumoCard}>
            <div style={{ ...styles.resumoIcon, backgroundColor: '#10b98120', color: '#10b981' }}>
              <TrendingUp size={24} />
            </div>
            <div>
              <span style={styles.resumoLabel}>Últimas notas</span>
              <div style={styles.resumoLista}>
                <div style={styles.resumoItem}>
                  <span>João - Matemática</span>
                  <span style={{ ...styles.resumoNota, color: '#10b981' }}>9.0</span>
                </div>
                <div style={styles.resumoItem}>
                  <span>Maria - Ciências</span>
                  <span style={{ ...styles.resumoNota, color: '#10b981' }}>10.0</span>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.resumoCard}>
            <div style={{ ...styles.resumoIcon, backgroundColor: '#f59e0b20', color: '#f59e0b' }}>
              <Award size={24} />
            </div>
            <div>
              <span style={styles.resumoLabel}>Conquistas recentes</span>
              <div style={styles.resumoLista}>
                <div style={styles.resumoItem}>
                  <span>🔥 João - Ofensiva de 5 dias</span>
                </div>
                <div style={styles.resumoItem}>
                  <span>⭐ Maria - Nota 10 em Ciências</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção do Calendário - NOVA */}
      <div style={styles.calendarioSection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>📅 Próximos Eventos</h3>
          <button 
            style={styles.verTodosBtn}
            onClick={() => navigate('/pai/calendario')}
          >
            Ver calendário completo
          </button>
        </div>
        <div style={styles.eventosLista}>
          {eventosProximos.map(evento => (
            <div 
              key={evento.id} 
              style={styles.eventoItem}
              onClick={() => navigate('/pai/calendario')}
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
                <span>{evento.aluno} • {evento.data}</span>
              </div>
              <ChevronRight size={16} color="#9ca3af" />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

// ESTILOS ATUALIZADOS
const styles = {
  header: {
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
  notificacoes: {
    position: 'relative',
    cursor: 'pointer'
  },
  notificacaoBadge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#ef4444',
    color: 'white',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px'
  },
  quickAccess: {
    marginBottom: '25px',
    display: 'flex',
    gap: '15px'
  },
  quickAccessCard: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '20px',
    backgroundColor: '#dbeafe',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    textAlign: 'left'
  },
  filhosGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  filhoCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  filhoHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '15px'
  },
  filhoAvatar: {
    width: '50px',
    height: '50px',
    borderRadius: '25px',
    backgroundColor: '#3b82f6',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 'bold'
  },
  filhoInfo: {
    flex: 1
  },
  filhoNome: {
    margin: '0 0 5px',
    fontSize: '18px'
  },
  filhoTurma: {
    margin: 0,
    fontSize: '14px',
    color: '#6b7280'
  },
  novasPublicacoesBadge: {
    padding: '4px 8px',
    backgroundColor: '#ef4444',
    color: 'white',
    borderRadius: '20px',
    fontSize: '11px'
  },
  filhoStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    marginBottom: '15px',
    padding: '15px 0',
    borderTop: '1px solid #e5e7eb',
    borderBottom: '1px solid #e5e7eb'
  },
  statItem: {
    textAlign: 'center'
  },
  statLabel: {
    fontSize: '12px',
    color: '#6b7280',
    display: 'block'
  },
  statValue: {
    fontSize: '20px',
    color: '#1f2937'
  },
  pendentesCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px',
    backgroundColor: '#fef3c7',
    borderRadius: '8px',
    marginBottom: '15px',
    fontSize: '13px',
    color: '#92400e'
  },
  filhoFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '10px'
  },
  proximaAtividade: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '13px',
    color: '#6b7280'
  },
  filhoActions: {
    display: 'flex',
    gap: '8px'
  },
  publicacoesBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '8px 12px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px'
  },
  atividadesBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '8px 12px',
    backgroundColor: '#f59e0b',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px'
  },
  atividadesSection: {
    marginBottom: '30px'
  },
  sectionTitle: {
    fontSize: '18px',
    margin: '0 0 15px',
    color: '#1f2937'
  },
  atividadesList: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    marginBottom: '20px'
  },
  atividadeItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    borderBottom: '1px solid #e5e7eb',
    cursor: 'pointer'
  },
  atividadeInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  atividadeDetalhes: {
    fontSize: '11px',
    color: '#6b7280',
    marginTop: '2px'
  },
  atividadeStatus: {
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '11px'
  },
  publicacoesSection: {
    marginBottom: '30px'
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
  publicacaoDetalhes: {
    fontSize: '11px',
    color: '#6b7280',
    marginTop: '2px'
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
  resumoSection: {
    marginBottom: '30px'
  },
  resumoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px'
  },
  resumoCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    display: 'flex',
    gap: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  resumoIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  resumoLabel: {
    fontSize: '14px',
    color: '#6b7280',
    display: 'block',
    marginBottom: '10px'
  },
  resumoLista: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  resumoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '13px'
  },
  resumoData: {
    color: '#6b7280',
    fontSize: '12px'
  },
  resumoNota: {
    fontWeight: 'bold'
  },
  avisosSection: {
    marginBottom: '30px'
  },
  avisoCard: {
    backgroundColor: '#fee2e2',
    padding: '15px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  avisoContent: {
    flex: 1
  },
  avisoData: {
    fontSize: '12px',
    color: '#dc2626'
  },
  permissaoBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px 20px',
    backgroundColor: '#fef3c7',
    borderRadius: '12px',
    color: '#92400e',
    marginBottom: '30px'
  },
  permissaoTexto: {
    margin: '5px 0 0',
    fontSize: '13px'
  },
  whatsappBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px 20px',
    backgroundColor: '#25D36620',
    borderRadius: '12px',
    color: '#075e54',
    marginBottom: '40px'
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
    marginTop: '40px',
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