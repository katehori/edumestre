import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import {
  ArrowLeft, Users, BookOpen, FileText, Award,
  Search, Filter, Plus, Download, Star,
  Clock
} from 'lucide-react';

export default function ComunidadeProfessores() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('todas');

  // Mock de turmas de professores
  const turmasProfessores = [
    {
      id: 1,
      nome: 'Matemática - Planejamento',
      membros: 12,
      materiais: 34,
      descricao: 'Compartilhamento de planos de aula, atividades e avaliações de Matemática',
      tags: ['Planos de aula', 'Atividades', 'Avaliações'],
      ultimaAtividade: '2h atrás',
      cor: '#3b82f6',
      tipo: 'publica'
    },
    {
      id: 2,
      nome: 'Português - BNCC',
      membros: 8,
      materiais: 23,
      descricao: 'Materiais alinhados à Base Nacional Comum Curricular',
      tags: ['BNCC', 'Literatura', 'Gramática'],
      ultimaAtividade: '5h atrás',
      cor: '#10b981',
      tipo: 'publica'
    },
    {
      id: 3,
      nome: 'Ciências - Experimentos',
      membros: 15,
      materiais: 42,
      descricao: 'Experimentos práticos e atividades de laboratório',
      tags: ['Experimentos', 'Laboratório', 'Práticas'],
      ultimaAtividade: '1d atrás',
      cor: '#f59e0b',
      tipo: 'privada'
    },
    {
      id: 4,
      nome: 'História - Projetos',
      membros: 6,
      materiais: 18,
      descricao: 'Projetos interdisciplinares e atividades temáticas',
      tags: ['Projetos', 'Interdisciplinar', 'Temas'],
      ultimaAtividade: '3d atrás',
      cor: '#8b5cf6',
      tipo: 'publica'
    },
  ];

  // Mock de materiais recentes
  const materiaisRecentes = [
    { id: 1, titulo: 'Plano de aula - Frações', turma: 'Matemática', autor: 'Profa. Maria', downloads: 23, likes: 12 },
    { id: 2, titulo: 'Lista de exercícios - Verbos', turma: 'Português', autor: 'Prof. João', downloads: 18, likes: 8 },
    { id: 3, titulo: 'Avaliação - Sistema Solar', turma: 'Ciências', autor: 'Profa. Ana', downloads: 31, likes: 15 },
  ];

  const filtrarTurmas = turmasProfessores.filter(turma =>
    turma.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    turma.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout perfil="professor" nome="Prof. Carlos Silva">
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <button style={styles.backButton} onClick={() => navigate('/professor')}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 style={styles.title}>Comunidade de professores</h2>
              <p style={styles.subtitle}>Compartilhe materiais, planejamentos e ideias com outros educadores</p>
            </div>
          </div>
          <button style={styles.newGroupBtn}>
            <Plus size={20} />
            <span>Criar Grupo</span>
          </button>
        </div>

        {/* Estatísticas */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <Users size={24} color="#3b82f6" />
            <div>
              <span style={styles.statLabel}>Professores</span>
              <strong style={styles.statValue}>156</strong>
            </div>
          </div>
          <div style={styles.statCard}>
            <BookOpen size={24} color="#10b981" />
            <div>
              <span style={styles.statLabel}>Grupos</span>
              <strong style={styles.statValue}>12</strong>
            </div>
          </div>
          <div style={styles.statCard}>
            <FileText size={24} color="#f59e0b" />
            <div>
              <span style={styles.statLabel}>Materiais</span>
              <strong style={styles.statValue}>342</strong>
            </div>
          </div>
        </div>

        {/* Busca e Filtros - CORRIGIDO */}
        <div style={styles.searchContainer}>
          <div style={styles.searchWrapper}>
            <Search size={18} color="#9ca3af" style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar grupos por nome, descrição ou tags..."
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button style={styles.filterButton}>
            <Filter size={18} />
            Filtros
          </button>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button
            style={{...styles.tab, ...(activeTab === 'todas' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('todas')}
          >
            Todas as Turmas
          </button>
          <button
            style={{...styles.tab, ...(activeTab === 'minhas' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('minhas')}
          >
            Minhas Turmas
          </button>
          <button
            style={{...styles.tab, ...(activeTab === 'populares' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('populares')}
          >
            Populares
          </button>
        </div>

        {/* Grid de Turmas */}
        <div style={styles.turmasGrid}>
          {filtrarTurmas.map(turma => (
            <div key={turma.id} style={styles.turmaCard}>
              <div style={{...styles.turmaHeader, backgroundColor: turma.cor + '10'}}>
                <div style={styles.turmaHeaderContent}>
                  <h3 style={styles.turmaNome}>{turma.nome}</h3>
                  {turma.tipo === 'privada' && (
                    <span style={styles.privadaBadge}>Privada</span>
                  )}
                </div>
                <p style={styles.turmaDescricao}>{turma.descricao}</p>
              </div>

              <div style={styles.turmaBody}>
                <div style={styles.turmaStats}>
                  <span style={styles.turmaStat}>
                    <Users size={14} /> {turma.membros} membros
                  </span>
                  <span style={styles.turmaStat}>
                    <FileText size={14} /> {turma.materiais} materiais
                  </span>
                  <span style={styles.turmaStat}>
                    <Clock size={14} /> {turma.ultimaAtividade}
                  </span>
                </div>

                <div style={styles.tags}>
                  {turma.tags.map((tag, index) => (
                    <span key={index} style={styles.tag}>{tag}</span>
                  ))}
                </div>

                <div style={styles.turmaActions}>
                  <button style={styles.entrarBtn}>
                    {turma.tipo === 'publica' ? 'Entrar no Grupo' : 'Solicitar Acesso'}
                  </button>
                  <button style={styles.verMateriaisBtn}>
                    Ver Materiais
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Materiais Recentes */}
        <div style={styles.recentesSection}>
          <h3 style={styles.sectionTitle}>Materiais recentes</h3>
          <div style={styles.materiaisGrid}>
            {materiaisRecentes.map(material => (
              <div key={material.id} style={styles.materialCard}>
                <div style={styles.materialHeader}>
                  <FileText size={20} color="#3b82f6" />
                  <span style={styles.materialTurma}>{material.turma}</span>
                </div>
                <h4 style={styles.materialTitulo}>{material.titulo}</h4>
                <p style={styles.materialAutor}>por {material.autor}</p>
                <div style={styles.materialStats}>
                  <span style={styles.materialStat}>
                    <Download size={14} /> {material.downloads}
                  </span>
                  <span style={styles.materialStat}>
                    <Star size={14} /> {material.likes}
                  </span>
                </div>
                <button style={styles.verMaterialBtn}>
                  Ver Material
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Seção de Templates */}
        <div style={styles.templatesSection}>
          <h3 style={styles.sectionTitle}>Templates populares</h3>
          <div style={styles.templatesGrid}>
            <div style={styles.templateCard}>
              <Award size={24} color="#f59e0b" />
              <h4>Plano de Aula</h4>
              <p>Modelo completo para planejamento de aulas</p>
              <span style={styles.templateUso}>Usado 234 vezes</span>
              <button style={styles.usarTemplateBtn}>
                Usar Template
              </button>
            </div>
            <div style={styles.templateCard}>
              <Award size={24} color="#10b981" />
              <h4>Lista de Materiais</h4>
              <p>Organizador de recursos por bimestre</p>
              <span style={styles.templateUso}>Usado 156 vezes</span>
              <button style={styles.usarTemplateBtn}>
                Usar Template
              </button>
            </div>
            <div style={styles.templateCard}>
              <Award size={24} color="#8b5cf6" />
              <h4>Avaliação Diagnóstica</h4>
              <p>Modelo de prova com gabarito</p>
              <span style={styles.templateUso}>Usado 98 vezes</span>
              <button style={styles.usarTemplateBtn}>
                Usar Template
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
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
  newGroupBtn: {
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
    flexShrink: 0
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
    marginBottom: '25px'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
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
  // CORREÇÃO PRINCIPAL: Container da busca com flexbox
  searchContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
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
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  tabs: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    borderBottom: '2px solid #e5e7eb',
    flexWrap: 'wrap'
  },
  tab: {
    padding: '12px 20px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#6b7280',
    borderBottom: '2px solid transparent',
    marginBottom: '-2px',
    flexShrink: 0
  },
  activeTab: {
    color: '#2563eb',
    borderBottom: '2px solid #2563eb'
  },
  turmasGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  turmaCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  turmaHeader: {
    padding: '20px'
  },
  turmaHeaderContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  turmaNome: {
    margin: 0,
    fontSize: '16px',
    color: '#1f2937'
  },
  privadaBadge: {
    padding: '4px 8px',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    borderRadius: '20px',
    fontSize: '11px',
    flexShrink: 0
  },
  turmaDescricao: {
    margin: 0,
    fontSize: '13px',
    color: '#6b7280',
    lineHeight: '1.5'
  },
  turmaBody: {
    padding: '20px'
  },
  turmaStats: {
    display: 'flex',
    gap: '15px',
    marginBottom: '15px',
    fontSize: '12px',
    color: '#6b7280',
    flexWrap: 'wrap'
  },
  turmaStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '20px'
  },
  tag: {
    padding: '4px 10px',
    backgroundColor: '#f3f4f6',
    borderRadius: '20px',
    fontSize: '11px',
    color: '#4b5563'
  },
  turmaActions: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px'
  },
  entrarBtn: {
    padding: '10px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px'
  },
  verMateriaisBtn: {
    padding: '10px',
    backgroundColor: '#f3f4f6',
    color: '#4b5563',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px'
  },
  recentesSection: {
    marginBottom: '40px'
  },
  sectionTitle: {
    fontSize: '18px',
    margin: '0 0 20px',
    color: '#1f2937'
  },
  materiaisGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '15px'
  },
  materialCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  materialHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
    flexWrap: 'wrap'
  },
  materialTurma: {
    fontSize: '12px',
    color: '#6b7280'
  },
  materialTitulo: {
    margin: '0 0 5px',
    fontSize: '16px',
    color: '#1f2937'
  },
  materialAutor: {
    margin: '0 0 15px',
    fontSize: '12px',
    color: '#9ca3af'
  },
  materialStats: {
    display: 'flex',
    gap: '15px',
    marginBottom: '15px',
    flexWrap: 'wrap'
  },
  materialStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: '#6b7280'
  },
  verMaterialBtn: {
    width: '100%',
    padding: '8px',
    backgroundColor: '#f3f4f6',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px'
  },
  templatesSection: {
    marginBottom: '40px'
  },
  templatesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '15px'
  },
  templateCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  templateUso: {
    display: 'block',
    fontSize: '12px',
    color: '#6b7280',
    margin: '10px 0'
  },
  usarTemplateBtn: {
    width: '100%',
    padding: '8px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px'
  }
};