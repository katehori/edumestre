import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import PublicacaoCard from '../../components/PublicacaoCard';
import {
  ArrowLeft, Search, Eye,
  Users, BookOpen, Calendar
} from 'lucide-react';

export default function PublicacoesPai() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFilho, setFilterFilho] = useState('todos');
  const [publicacoes, setPublicacoes] = useState([]);

  // Mock de filhos
  const filhos = [
    { id: 1, nome: 'João Silva', turma: '6º Ano A' },
    { id: 2, nome: 'Maria Silva', turma: '4º Ano B' },
  ];

  // Mock de publicações (apenas visualização)
  useEffect(() => {
    setPublicacoes([
      {
        id: 1,
        titulo: 'Conteúdo para a prova de Matemática',
        conteudo: 'Pessoal, segue o conteúdo que vai cair na prova bimestral: frações, números decimais e operações básicas.',
        autor: 'Prof. Carlos Silva',
        autorCor: '#3b82f6',
        turma: '6º Ano A - Matemática',
        aluno: 'João Silva',
        data: '2 horas atrás',
        likes: 23,
        comentarios: [
          { autor: 'João Silva', texto: 'Obrigado professor!', data: '1h atrás' }
        ],
        usuarioCurtiu: false,
        midias: [
          { tipo: 'arquivo', nome: 'Conteúdo_Prova.pdf', tamanho: '2.5 MB' }
        ],
        visualizacoes: 45
      },
      {
        id: 2,
        titulo: 'Videoaula: Frações',
        conteudo: 'Segue uma videoaula explicando frações de forma simples!',
        autor: 'Prof. Carlos Silva',
        autorCor: '#3b82f6',
        turma: '6º Ano A - Matemática',
        aluno: 'João Silva',
        data: '1 dia atrás',
        likes: 45,
        comentarios: [],
        usuarioCurtiu: false,
        midias: [
          { tipo: 'youtube', id: 'dQw4w9WgXcQ' }
        ],
        visualizacoes: 78
      },
      {
        id: 3,
        titulo: 'Atividade de Leitura',
        conteudo: 'Esta semana vamos trabalhar com interpretação de texto.',
        autor: 'Profa. Ana Paula',
        autorCor: '#10b981',
        turma: '4º Ano B - Português',
        aluno: 'Maria Silva',
        data: '3 dias atrás',
        likes: 12,
        comentarios: [],
        midias: [],
        visualizacoes: 34
      },
    ]);
  }, []);

  const filtrarPublicacoes = publicacoes.filter(pub => {
    const matchesSearch = pub.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.conteudo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilho = filterFilho === 'todos' || pub.aluno === filterFilho;
    return matchesSearch && matchesFilho;
  });

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
              <h2 style={styles.title}>Acompanhamento escolar</h2>
              <p style={styles.subtitle}>Visualize as publicações feitas pelos professores dos seus filhos</p>
            </div>
          </div>
        </div>

        {/* Aviso de visualização */}
        <div style={styles.avisoCard}>
          <Eye size={18} />
          <span>
            Você está no modo <strong>visualização</strong>. Pode ver todas as publicações,
            comentários e curtidas, mas não pode interagir.
          </span>
        </div>

        {/* Busca e Filtros - CORRIGIDO */}
        <div style={styles.searchContainer}>
          <div style={styles.searchWrapper}>
            <Search size={18} color="#9ca3af" style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar publicações..."
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

        {/* Estatísticas */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <BookOpen size={20} color="#3b82f6" />
            <div>
              <span style={styles.statValue}>{publicacoes.length}</span>
              <span style={styles.statLabel}>Publicações</span>
            </div>
          </div>
          <div style={styles.statCard}>
            <Users size={20} color="#10b981" />
            <div>
              <span style={styles.statValue}>{filhos.length}</span>
              <span style={styles.statLabel}>Filhos</span>
            </div>
          </div>
          <div style={styles.statCard}>
            <Calendar size={20} color="#f59e0b" />
            <div>
              <span style={styles.statValue}>5</span>
              <span style={styles.statLabel}>Atividades</span>
            </div>
          </div>
        </div>

        {/* Resumo por filho */}
        <div style={styles.resumoSection}>
          <h3 style={styles.resumoTitle}>📊 Resumo por Filho</h3>
          <div style={styles.resumoGrid}>
            {filhos.map(filho => (
              <div key={filho.id} style={styles.resumoCard}>
                <h4>{filho.nome}</h4>
                <p style={styles.resumoTurma}>{filho.turma}</p>
                <div style={styles.resumoStats}>
                  <div>
                    <span>Publicações</span>
                    <strong>{publicacoes.filter(p => p.aluno === filho.nome).length}</strong>
                  </div>
                  <div>
                    <span>Visualizações</span>
                    <strong>
                      {publicacoes
                        .filter(p => p.aluno === filho.nome)
                        .reduce((acc, p) => acc + (p.visualizacoes || 0), 0)}
                    </strong>
                  </div>
                </div>
                <button
                  style={styles.verPublicacoesBtn}
                  onClick={() => setFilterFilho(filho.nome)}
                >
                  Ver publicações
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Lista de Publicações */}
        <div style={styles.publicacoesList}>
          {filtrarPublicacoes.map(publicacao => (
            <div key={publicacao.id} style={styles.publicacaoWrapper}>
              <div style={styles.alunoTag}>
                <Users size={12} />
                <span>{publicacao.aluno}</span>
              </div>
              <PublicacaoCard
                publicacao={publicacao}
                perfil="pai"
              />
            </div>
          ))}

          {filtrarPublicacoes.length === 0 && (
            <div style={styles.emptyState}>
              <p>Nenhuma publicação encontrada</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0 15px' // Adicionado padding para telas menores
  },
  header: {
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
  avisoCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '15px 20px',
    backgroundColor: '#fef3c7',
    borderRadius: '8px',
    color: '#92400e',
    fontSize: '13px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  // CORREÇÃO PRINCIPAL: Container da busca com flexbox
  searchContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '25px',
    width: '100%',
    flexWrap: 'wrap'
  },
  // Wrapper para o input ocupar o espaço disponível
  searchWrapper: {
    flex: 1,
    position: 'relative',
    minWidth: '250px' // Largura mínima para o input
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
  filterSelect: {
    padding: '0 20px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    cursor: 'pointer',
    minWidth: '150px',
    height: '45px',
    flexShrink: 0,
    backgroundColor: 'white',
    boxSizing: 'border-box'
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
    gap: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    flexWrap: 'wrap'
  },
  statValue: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1f2937',
    display: 'block'
  },
  statLabel: {
    fontSize: '11px',
    color: '#6b7280'
  },
  publicacoesList: {
    marginBottom: '40px'
  },
  publicacaoWrapper: {
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
    fontSize: '11px',
    maxWidth: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: 'white',
    borderRadius: '12px',
    color: '#6b7280'
  },
  resumoSection: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '40px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  resumoTitle: {
    fontSize: '16px',
    margin: '0 0 15px',
    color: '#1f2937'
  },
  resumoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '15px'
  },
  resumoCard: {
    padding: '15px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px'
  },
  resumoTurma: {
    fontSize: '12px',
    color: '#6b7280',
    margin: '5px 0 15px'
  },
  resumoStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
    marginBottom: '15px'
  },
  verPublicacoesBtn: {
    width: '100%',
    padding: '8px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px'
  }
};