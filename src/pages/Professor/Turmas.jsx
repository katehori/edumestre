import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { Plus, Users, QrCode, ArrowLeft, Search, Filter, Copy, Check, Clock, BookOpen, Trash2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function Turmas() {
  const navigate = useNavigate();
  const [mostrarQR, setMostrarQR] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiado, setCopiado] = useState(null);
  
  const turmas = [
    { 
      id: 1, 
      nome: '6º Ano A', 
      serie: '6º ano', 
      alunos: 32, 
      codigo: 'TURMA123',
      materia: 'Matemática',
      atividades: 8,
      proximaAtividade: '25/02',
      cor: '#3b82f6'
    },
    { 
      id: 2, 
      nome: '7º Ano B', 
      serie: '7º ano', 
      alunos: 28, 
      codigo: 'TURMA456',
      materia: 'Matemática',
      atividades: 6,
      proximaAtividade: '26/02',
      cor: '#10b981'
    },
    { 
      id: 3, 
      nome: '8º Ano C', 
      serie: '8º ano', 
      alunos: 30, 
      codigo: 'TURMA789',
      materia: 'Matemática',
      atividades: 5,
      proximaAtividade: '27/02',
      cor: '#f59e0b'
    },
    { 
      id: 4, 
      nome: '9º Ano A', 
      serie: '9º ano', 
      alunos: 27, 
      codigo: 'TURMA101',
      materia: 'Matemática',
      atividades: 7,
      proximaAtividade: '28/02',
      cor: '#8b5cf6'
    },
  ];

  const turmasProfessores = [
    { 
      id: 1, 
      nome: 'Matemática - Planejamento', 
      membros: 12, 
      materiais: 34,
      descricao: 'Compartilhamento de planos de aula, atividades e avaliações',
      tags: ['Planos de aula', 'Atividades', 'Avaliações'],
      cor: '#3b82f6'
    },
    { 
      id: 2, 
      nome: 'Português - BNCC', 
      membros: 8, 
      materiais: 23,
      descricao: 'Materiais alinhados à Base Nacional Comum Curricular',
      tags: ['BNCC', 'Literatura', 'Gramática'],
      cor: '#10b981'
    },
  ];

  const filtrarTurmas = turmas.filter(turma =>
    turma.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    turma.serie.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copiarCodigo = (codigo) => {
    navigator.clipboard.writeText(codigo);
    setCopiado(codigo);
    setTimeout(() => setCopiado(null), 2000);
  };

  return (
    <Layout perfil="professor" nome="Prof. Carlos Silva" turmaInfo="Coordenador - Matemática">
      {/* Cabeçalho */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <button style={styles.backButton} onClick={() => navigate('/professor')}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 style={styles.title}>📚 Minhas Turmas</h2>
            <p style={styles.subtitle}>Gerencie suas turmas e acompanhe o progresso dos alunos</p>
          </div>
        </div>
        <button style={styles.novaTurmaBtn}>
          <Plus size={20} />
          <span>Nova Turma</span>
        </button>
      </div>

      {/* Barra de pesquisa e filtros */}
      <div style={styles.searchContainer}>
        <div style={styles.searchWrapper}>
          <Search size={18} color="#9ca3af" style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar turma por nome ou série..."
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button style={styles.filterButton}>
          <Filter size={18} />
          <span>Filtros</span>
        </button>
      </div>

      {/* Estatísticas rápidas */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: '#3b82f620', color: '#3b82f6' }}>
            <Users size={24} />
          </div>
          <div>
            <span style={styles.statLabel}>Total de Turmas</span>
            <strong style={styles.statValue}>{turmas.length}</strong>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: '#10b98120', color: '#10b981' }}>
            <BookOpen size={24} />
          </div>
          <div>
            <span style={styles.statLabel}>Total de Alunos</span>
            <strong style={styles.statValue}>117</strong>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, backgroundColor: '#f59e0b20', color: '#f59e0b' }}>
            <Clock size={24} />
          </div>
          <div>
            <span style={styles.statLabel}>Atividades essa semana</span>
            <strong style={styles.statValue}>12</strong>
          </div>
        </div>
      </div>

      {/* Ações rápidas */}
      <div style={styles.quickActions}>
        <h3 style={styles.sectionTitle}>⚡ Ações rápidas</h3>
        <div style={styles.actionsGrid}>
          <button style={styles.actionCard}>
            <Plus size={20} color="#3b82f6" />
            <span>Criar atividade para todas as turmas</span>
          </button>
          <button style={styles.actionCard}>
            <Users size={20} color="#f59e0b" />
            <span>Convidar professores</span>
          </button>
        </div>
      </div>

      {/* Grid de Turmas */}
      <div style={styles.turmasSection}>
        <h3 style={styles.sectionTitle}>Turmas Ativas</h3>
        <div style={styles.turmasGrid}>
          {filtrarTurmas.map(turma => (
            <div
              key={turma.id}
              style={styles.turmaCard}
            >
              <div style={{ ...styles.turmaHeader, backgroundColor: turma.cor + '10', borderLeft: `4px solid ${turma.cor}` }}>
                <div
                  style={styles.turmaHeaderContent}
                  onClick={() => navigate(`/professor/turma/${turma.id}`)}
                >
                  <div>
                    <h4 style={styles.turmaNome}>{turma.nome}</h4>
                    <span style={styles.turmaMateria}>{turma.materia}</span>
                  </div>
                </div>
              </div>

              <div style={styles.turmaBody}>
                <div style={styles.turmaStats}>
                  <div style={styles.turmaStat}>
                    <Users size={16} color="#6b7280" />
                    <span>{turma.alunos} alunos</span>
                  </div>
                  <div style={styles.turmaStat}>
                    <BookOpen size={16} color="#6b7280" />
                    <span>{turma.atividades} atividades</span>
                  </div>
                </div>

                <div style={styles.codigoContainer}>
                  <span style={styles.codigoLabel}>Código de acesso:</span>
                  <div style={styles.codigoBox}>
                    <code style={styles.codigo}>{turma.codigo}</code>
                    <button 
                      style={styles.copyButton}
                      onClick={() => copiarCodigo(turma.codigo)}
                    >
                      {copiado === turma.codigo ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>

                <div style={styles.qrContainer}>
                  <button 
                    style={styles.qrButton}
                    onClick={() => setMostrarQR(turma.id === mostrarQR ? null : turma.id)}
                  >
                    <QrCode size={18} />
                    {mostrarQR === turma.id ? 'Esconder QR Code' : 'Mostrar QR Code'}
                  </button>
                  
                  {mostrarQR === turma.id && (
                    <div style={styles.qrCode}>
                      <QRCodeSVG value={`https://edumestre.com/entrar/${turma.codigo}`} size={120} />
                      <p style={styles.qrText}>Escaneie para entrar na turma</p>
                    </div>
                  )}
                </div>

                <div style={styles.proximaAtividade}>
                  <Clock size={14} color="#f59e0b" />
                  <span>Próxima atividade: {turma.proximaAtividade}</span>
                </div>
              </div>

              <div style={styles.turmaFooter}>
                <button 
                    style={styles.footerButton}
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/professor/turma/${turma.id}`);
                    }}
                >
                  <BookOpen size={16} />
                  Publicações
                </button>
                <button style={styles.footerButton}>
                  <Clock size={16} />
                  Atividades
                </button>
                <button style={styles.footerButton}>
                  <Users size={16} />
                  Alunos
                </button>
                <button style={{ ...styles.footerButton, color: '#ef4444' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comunidade de Professores */}
      <div style={styles.professoresSection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>👥 Comunidade de Professores</h3>
          <button
            style={styles.verTodosBtn}
            onClick={(e) => {
              e.stopPropagation();
              navigate('/professor/comunidade');
            }}
          >
              Ver todos
          </button>
        </div>
        <p style={styles.sectionDescription}>Espaços colaborativos para compartilhamento de materiais e planejamentos</p>
        
        <div style={styles.professoresGrid}>
          {turmasProfessores.map(turma => (
            <div key={turma.id} style={styles.professorCard}>
              <div style={{ ...styles.professorHeader, backgroundColor: turma.cor + '10' }}>
                <h4 style={styles.professorNome}>{turma.nome}</h4>
              </div>
              <div style={styles.professorBody}>
                <p style={styles.professorDescricao}>{turma.descricao}</p>
                
                <div style={styles.professorStats}>
                  <span style={styles.professorStat}>
                    <Users size={14} /> {turma.membros} professores
                  </span>
                  <span style={styles.professorStat}>
                    <BookOpen size={14} /> {turma.materiais} materiais
                  </span>
                </div>

                <div style={styles.tags}>
                  {turma.tags.map((tag, index) => (
                    <span key={index} style={styles.tag}>{tag}</span>
                  ))}
                </div>

                <button
                  style={styles.solicitarBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/professor/comunidade/${turma.id}`);
                  }}
                >
                  Solicitar acesso
                </button>
              </div>
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
    marginBottom: '25px',
    flexWrap: 'wrap',
    gap: '15px'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    flexWrap: 'wrap'
  },
  backButton: {
    width: '40px',
    height: '40px',
    borderRadius: '20px',
    border: '1px solid #e5e7eb',
    backgroundColor: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s',
    flexShrink: 0
  },
  title: {
    fontSize: '24px',
    margin: '0 0 5px',
    color: '#1f2937'
  },
  subtitle: {
    margin: 0,
    color: '#6b7280',
    fontSize: '14px'
  },
  novaTurmaBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s',
    flexShrink: 0
  },
  // CORREÇÃO PRINCIPAL: Container da busca com flexbox
  searchContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '25px',
    width: '100%'
  },
  // Wrapper para o input ocupar o espaço disponível
  searchWrapper: {
    flex: 1,
    position: 'relative',
    minWidth: 0 // Importante para evitar overflow
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1
  },
  searchInput: {
    width: '100%',
    padding: '12px 12px 12px 40px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s',
    boxSizing: 'border-box'
  },
  filterButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '0 20px',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s',
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
    marginBottom: '30px'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  statIcon: {
    width: '45px',
    height: '45px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
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
  turmasSection: {
    marginBottom: '40px'
  },
  sectionTitle: {
    fontSize: '18px',
    margin: '0 0 15px',
    color: '#1f2937'
  },
  turmasGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '20px'
  },
  turmaCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    transition: 'all 0.3s'
  },
  turmaHeader: {
    padding: '15px 20px'
  },
  turmaHeaderContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    cursor: 'pointer'
  },
  turmaNome: {
    margin: '0 0 5px',
    fontSize: '18px',
    color: '#1f2937'
  },
  turmaMateria: {
    fontSize: '13px',
    color: '#6b7280'
  },
  menuButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '5px',
    flexShrink: 0
  },
  turmaBody: {
    padding: '20px'
  },
  turmaStats: {
    display: 'flex',
    gap: '15px',
    marginBottom: '15px',
    flexWrap: 'wrap'
  },
  turmaStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '13px',
    color: '#6b7280'
  },
  codigoContainer: {
    marginBottom: '15px'
  },
  codigoLabel: {
    display: 'block',
    fontSize: '12px',
    color: '#6b7280',
    marginBottom: '5px'
  },
  codigoBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#f3f4f6',
    padding: '8px 12px',
    borderRadius: '6px'
  },
  codigo: {
    flex: 1,
    fontSize: '14px',
    fontWeight: '500',
    color: '#1f2937',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  copyButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    flexShrink: 0
  },
  qrContainer: {
    marginBottom: '15px',
    textAlign: 'center'
  },
  qrButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: '#f3f4f6',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    color: '#4b5563',
    transition: 'all 0.3s'
  },
  qrCode: {
    marginTop: '15px',
    padding: '15px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    textAlign: 'center'
  },
  qrText: {
    margin: '10px 0 0',
    fontSize: '12px',
    color: '#6b7280'
  },
  proximaAtividade: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '12px',
    color: '#f59e0b',
    padding: '8px',
    backgroundColor: '#fef3c7',
    borderRadius: '6px',
    flexWrap: 'wrap'
  },
  turmaFooter: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    borderTop: '1px solid #e5e7eb'
  },
  footerButton: {
    padding: '12px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    color: '#4b5563',
    transition: 'all 0.3s',
    borderRight: '1px solid #e5e7eb',
    ':last-child': {
      borderRight: 'none'
    }
  },
  professoresSection: {
    marginBottom: '40px'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  verTodosBtn: {
    background: 'none',
    border: 'none',
    color: '#3b82f6',
    cursor: 'pointer',
    fontSize: '14px',
    flexShrink: 0
  },
  sectionDescription: {
    margin: '0 0 20px',
    color: '#6b7280',
    fontSize: '14px'
  },
  professoresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px'
  },
  professorCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  professorHeader: {
    padding: '15px 20px'
  },
  professorNome: {
    margin: 0,
    fontSize: '16px',
    color: '#1f2937'
  },
  professorBody: {
    padding: '20px'
  },
  professorDescricao: {
    margin: '0 0 15px',
    fontSize: '13px',
    color: '#4b5563',
    lineHeight: '1.5'
  },
  professorStats: {
    display: 'flex',
    gap: '15px',
    marginBottom: '15px',
    flexWrap: 'wrap'
  },
  professorStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: '#6b7280'
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '15px'
  },
  tag: {
    padding: '4px 10px',
    backgroundColor: '#f3f4f6',
    borderRadius: '20px',
    fontSize: '11px',
    color: '#4b5563'
  },
  solicitarBtn: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
    transition: 'all 0.3s'
  },
  quickActions: {
    marginTop: '40px',
    marginBottom: '40px'
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '15px'
  },
  actionCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '15px',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#4b5563',
    transition: 'all 0.3s'
  }
};