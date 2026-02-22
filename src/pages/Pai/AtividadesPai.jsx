import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import AtividadeCard from '../../components/AtividadeCard';
import { 
  ArrowLeft, Search, Filter, Eye, Users,
  Calendar, Award, Download, FileText
} from 'lucide-react';

export default function AtividadesPai() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFilho, setFilterFilho] = useState('todos');

  const filhos = [
    { id: 1, nome: 'João Silva', turma: '6º Ano A' },
    { id: 2, nome: 'Maria Silva', turma: '4º Ano B' },
  ];

  // Mock de atividades dos filhos
  const atividades = [
    {
      id: 1,
      titulo: 'Exercícios de Frações',
      descricao: 'Resolver os exercícios 1 a 10 da página 45.',
      tipo: 'atividade',
      turma: '6º Ano A',
      disciplina: 'Matemática',
      aluno: 'João Silva',
      dataLimite: '25/02/2026',
      dataLimitePassou: false,
      status: 'pendente',
      nota: null,
      cor: '#3b82f6'
    },
    {
      id: 2,
      titulo: 'Prova Bimestral - Matemática',
      descricao: 'Conteúdo: frações, números decimais e operações.',
      tipo: 'prova',
      turma: '6º Ano A',
      disciplina: 'Matemática',
      aluno: 'João Silva',
      dataLimite: '28/02/2026',
      dataLimitePassou: false,
      status: 'pendente',
      nota: null,
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
      aluno: 'João Silva',
      dataLimite: '20/02/2026',
      dataLimitePassou: true,
      status: 'concluida',
      nota: 8.5,
      cor: '#10b981'
    },
    {
      id: 4,
      titulo: 'Atividade de Leitura',
      descricao: 'Leitura do capítulo 3 do livro.',
      tipo: 'atividade',
      turma: '4º Ano B',
      disciplina: 'Português',
      aluno: 'Maria Silva',
      dataLimite: '22/02/2026',
      dataLimitePassou: true,
      status: 'concluida',
      nota: 9.5,
      cor: '#8b5cf6'
    },
  ];

  const filtrarAtividades = atividades.filter(ativ => {
    const matchesSearch = ativ.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilho = filterFilho === 'todos' || ativ.aluno === filterFilho;
    return matchesSearch && matchesFilho;
  });

  const atividadesPorFilho = filhos.map(filho => ({
    ...filho,
    pendentes: atividades.filter(a => a.aluno === filho.nome && a.status === 'pendente').length,
    concluidas: atividades.filter(a => a.aluno === filho.nome && a.status === 'concluida').length,
    media: atividades
      .filter(a => a.aluno === filho.nome && a.nota)
      .reduce((acc, a) => acc + a.nota, 0) / 
      atividades.filter(a => a.aluno === filho.nome && a.nota).length || 0
  }));

  return (
    <Layout perfil="pai" nome="Carlos Silva" turmaInfo="Responsável por 2 alunos">
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <button style={styles.backButton} onClick={() => navigate('/pai')}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 style={styles.title}>📚 Atividades Escolares</h2>
              <p style={styles.subtitle}>Acompanhe as atividades e provas dos seus filhos</p>
            </div>
          </div>
        </div>

        {/* Aviso de visualização */}
        <div style={styles.avisoCard}>
          <Eye size={18} />
          <span>
            Você está no modo <strong>visualização</strong>. As atividades só podem ser visualizadas 
            após a data limite ou quando corrigidas pelo professor.
          </span>
        </div>

        {/* Cards dos filhos */}
        <div style={styles.filhosStats}>
          {atividadesPorFilho.map(filho => (
            <div key={filho.id} style={styles.filhoStatCard}>
              <div style={styles.filhoStatHeader}>
                <Users size={20} color="#3b82f6" />
                <strong>{filho.nome}</strong>
              </div>
              <div style={styles.filhoStatGrid}>
                <div style={styles.filhoStatItem}>
                  <span>Pendentes</span>
                  <strong>{filho.pendentes}</strong>
                </div>
                <div style={styles.filhoStatItem}>
                  <span>Concluídas</span>
                  <strong>{filho.concluidas}</strong>
                </div>
                <div style={styles.filhoStatItem}>
                  <span>Média</span>
                  <strong>{filho.media.toFixed(1)}</strong>
                </div>
              </div>
            </div>
          ))}
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
            value={filterFilho}
            onChange={(e) => setFilterFilho(e.target.value)}
          >
            <option value="todos">Todos os filhos</option>
            {filhos.map(f => (
              <option key={f.id} value={f.nome}>{f.nome}</option>
            ))}
          </select>
        </div>

        {/* Lista de Atividades */}
        <div style={styles.atividadesList}>
          {filtrarAtividades.map(atividade => (
            <div key={atividade.id} style={styles.atividadeWrapper}>
              <div style={styles.alunoTag}>
                <Users size={12} />
                <span>{atividade.aluno}</span>
              </div>
              <AtividadeCard
                atividade={atividade}
                perfil="pai"
              />
            </div>
          ))}

          {filtrarAtividades.length === 0 && (
            <div style={styles.emptyState}>
              <p>Nenhuma atividade encontrada</p>
            </div>
          )}
        </div>

        {/* Resumo de Notas */}
        <div style={styles.notasSection}>
          <h3 style={styles.sectionTitle}>📊 Últimas Notas</h3>
          <div style={styles.notasList}>
            {atividades
              .filter(a => a.nota)
              .sort((a, b) => new Date(b.dataLimite) - new Date(a.dataLimite))
              .slice(0, 5)
              .map(ativ => (
                <div key={ativ.id} style={styles.notaItem}>
                  <div style={styles.notaInfo}>
                    <strong>{ativ.titulo}</strong>
                    <span style={styles.notaAluno}>{ativ.aluno} • {ativ.disciplina}</span>
                  </div>
                  <span style={{
                    ...styles.notaValor,
                    color: ativ.nota >= 7 ? '#10b981' : '#f59e0b'
                  }}>
                    {ativ.nota}
                  </span>
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
  avisoCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '15px 20px',
    backgroundColor: '#fef3c7',
    borderRadius: '8px',
    color: '#92400e',
    fontSize: '13px',
    marginBottom: '20px'
  },
  filhosStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
    marginBottom: '25px'
  },
  filhoStatCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  filhoStatHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '10px'
  },
  filhoStatGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    textAlign: 'center'
  },
  filhoStatItem: {
    display: 'flex',
    flexDirection: 'column'
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
    minWidth: '150px'
  },
  atividadesList: {
    marginBottom: '30px'
  },
  atividadeWrapper: {
    position: 'relative',
    marginBottom: '20px'
  },
  alunoTag: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '4px 10px',
    backgroundColor: '#3b82f6',
    color: 'white',
    borderRadius: '20px',
    fontSize: '11px'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: 'white',
    borderRadius: '12px',
    color: '#6b7280'
  },
  notasSection: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  sectionTitle: {
    fontSize: '16px',
    margin: '0 0 15px',
    color: '#1f2937'
  },
  notasList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  notaItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px'
  },
  notaInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  notaAluno: {
    fontSize: '11px',
    color: '#6b7280'
  },
  notaValor: {
    fontSize: '18px',
    fontWeight: 'bold'
  }
};