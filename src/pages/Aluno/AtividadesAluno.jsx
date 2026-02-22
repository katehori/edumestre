import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import AtividadeCard from '../../components/AtividadeCard';
import { 
  ArrowLeft, Search, Calendar,
  Clock, CheckCircle, AlertCircle
} from 'lucide-react';

export default function AtividadesAluno() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todas');
  const [filterTipo, setFilterTipo] = useState('todas');

  // Mock de atividades do aluno
  const atividades = [
    {
      id: 1,
      titulo: 'Exercícios de Frações',
      descricao: 'Resolver os exercícios 1 a 10 da página 45.',
      tipo: 'atividade',
      turma: '6º Ano A',
      disciplina: 'Matemática',
      dataLimite: '25/02/2025',
      status: 'pendente',
      cor: '#3b82f6'
    },
    {
      id: 2,
      titulo: 'Prova Bimestral - Matemática',
      descricao: 'Conteúdo: frações, números decimais e operações.',
      tipo: 'prova',
      turma: '6º Ano A',
      disciplina: 'Matemática',
      dataLimite: '28/02/2025',
      status: 'pendente',
      questoes: 5,
      cor: '#f59e0b'
    },
    {
      id: 3,
      titulo: 'Interpretação de Texto',
      descricao: 'Ler o texto e responder as questões.',
      tipo: 'atividade',
      turma: '6º Ano A',
      disciplina: 'Português',
      dataLimite: '20/02/2025',
      status: 'entregue',
      nota: 8.5,
      cor: '#10b981'
    },
    {
      id: 4,
      titulo: 'Trabalho de Ciências',
      descricao: 'Pesquisa sobre o sistema solar.',
      tipo: 'atividade',
      turma: '6º Ano A',
      disciplina: 'Ciências',
      dataLimite: '15/02/2025',
      status: 'concluida',
      nota: 9.0,
      cor: '#8b5cf6'
    },
  ];

  const filtrarAtividades = atividades.filter(ativ => {
    const matchesSearch = ativ.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'todas' || ativ.status === filterStatus;
    const matchesTipo = filterTipo === 'todas' || ativ.tipo === filterTipo;
    return matchesSearch && matchesStatus && matchesTipo;
  });

  const pendentes = atividades.filter(a => a.status === 'pendente').length;
  const entregues = atividades.filter(a => a.status === 'entregue').length;
  const concluidas = atividades.filter(a => a.status === 'concluida').length;

  return (
    <Layout perfil="aluno" nome="João Silva" turmaInfo="6º Ano A">
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <button style={styles.backButton} onClick={() => navigate('/aluno')}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 style={styles.title}>📚 Minhas Atividades</h2>
              <p style={styles.subtitle}>Acompanhe e entregue suas atividades e provas</p>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <Clock size={20} color="#f59e0b" />
            <div>
              <span style={styles.statLabel}>Pendentes</span>
              <strong style={styles.statValue}>{pendentes}</strong>
            </div>
          </div>
          <div style={styles.statCard}>
            <CheckCircle size={20} color="#10b981" />
            <div>
              <span style={styles.statLabel}>Entregues</span>
              <strong style={styles.statValue}>{entregues}</strong>
            </div>
          </div>
          <div style={styles.statCard}>
            <AlertCircle size={20} color="#3b82f6" />
            <div>
              <span style={styles.statLabel}>Concluídas</span>
              <strong style={styles.statValue}>{concluidas}</strong>
            </div>
          </div>
        </div>

        {/* Busca e Filtros */}
        <div style={styles.searchSection}>
          <div style={styles.searchBox}>
            <Search size={18} color="#9ca3af" style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar atividades..."
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            style={styles.filterSelect}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="todas">Todos os status</option>
            <option value="pendente">Pendentes</option>
            <option value="entregue">Entregues</option>
            <option value="concluida">Concluídas</option>
          </select>
          <select 
            style={styles.filterSelect}
            value={filterTipo}
            onChange={(e) => setFilterTipo(e.target.value)}
          >
            <option value="todas">Todos os tipos</option>
            <option value="atividade">Atividades</option>
            <option value="prova">Provas</option>
          </select>
        </div>

        {/* Lista de Atividades */}
        <div style={styles.atividadesList}>
          {filtrarAtividades.map(atividade => (
            <AtividadeCard
              key={atividade.id}
              atividade={atividade}
              perfil="aluno"
            />
          ))}

          {filtrarAtividades.length === 0 && (
            <div style={styles.emptyState}>
              <p>Nenhuma atividade encontrada</p>
            </div>
          )}
        </div>

        {/* Calendário resumido */}
        <div style={styles.calendarioCard}>
          <h3 style={styles.calendarioTitle}>📅 Próximas entregas</h3>
          <div style={styles.proximasLista}>
            {atividades
              .filter(a => a.status === 'pendente')
              .slice(0, 3)
              .map(ativ => (
                <div key={ativ.id} style={styles.proximaItem}>
                  <Calendar size={14} color="#3b82f6" />
                  <span style={styles.proximaData}>{ativ.dataLimite}</span>
                  <span style={styles.proximaTitulo}>{ativ.titulo}</span>
                  <span style={styles.proximaDisciplina}>{ativ.disciplina}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto'
  },
  header: {
    marginBottom: '25px'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
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
    justifyContent: 'center'
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
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
    marginBottom: '25px'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  statLabel: {
    fontSize: '11px',
    color: '#6b7280',
    display: 'block'
  },
  statValue: {
    fontSize: '18px',
    color: '#1f2937'
  },
  searchSection: {
    display: 'flex',
    gap: '10px',
    marginBottom: '25px'
  },
  searchBox: {
    flex: 1,
    position: 'relative'
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  searchInput: {
    width: '100%',
    padding: '12px 40px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none'
  },
  filterSelect: {
    padding: '0 20px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    cursor: 'pointer',
    minWidth: '130px'
  },
  atividadesList: {
    marginBottom: '30px'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: 'white',
    borderRadius: '12px',
    color: '#6b7280'
  },
  calendarioCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  calendarioTitle: {
    fontSize: '16px',
    margin: '0 0 15px',
    color: '#1f2937'
  },
  proximasLista: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  proximaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px',
    backgroundColor: '#f9fafb',
    borderRadius: '6px'
  },
  proximaData: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#3b82f6'
  },
  proximaTitulo: {
    flex: 1,
    fontSize: '13px',
    color: '#1f2937'
  },
  proximaDisciplina: {
    fontSize: '11px',
    color: '#6b7280'
  }
};