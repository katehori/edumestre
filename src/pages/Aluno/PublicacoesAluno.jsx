import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import PublicacaoCard from '../../components/PublicacaoCard';
import { 
  ArrowLeft, Search, Filter, Bell,
  BookOpen, Heart, MessageCircle, Eye
} from 'lucide-react';

export default function PublicacoesAluno() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTurma, setFilterTurma] = useState('todas');
  const [publicacoes, setPublicacoes] = useState([]);

  // Mock de turmas do aluno
  const turmas = [
    { id: 1, nome: 'Matemática - 6º Ano A' },
    { id: 2, nome: 'Português - 6º Ano A' },
    { id: 3, nome: 'Ciências - 6º Ano A' },
  ];

  // Mock de publicações (vindas dos professores)
  useEffect(() => {
    // Simulando dados do Firebase
    setPublicacoes([
      {
        id: 1,
        titulo: 'Conteúdo para a prova de Matemática',
        conteudo: 'Pessoal, segue o conteúdo que vai cair na prova bimestral: frações, números decimais e operações básicas. Estudar pelos capítulos 5, 6 e 7 do livro.',
        autor: 'Prof. Carlos Silva',
        autorCor: '#3b82f6',
        turma: 'Matemática - 6º Ano A',
        data: '2 horas atrás',
        likes: 23,
        comentarios: [
          { autor: 'João Silva', texto: 'Obrigado professor!', data: '1h atrás' },
          { autor: 'Maria Santos', texto: 'Vai cair frações mistas?', data: '30min atrás' }
        ],
        usuarioCurtiu: true,
        midias: [
          { tipo: 'arquivo', nome: 'Conteúdo_Prova.pdf', tamanho: '2.5 MB' }
        ],
        visualizacoes: 45
      },
      {
        id: 2,
        titulo: 'Videoaula: Frações',
        conteudo: 'Segue uma videoaula explicando frações de forma simples e divertida!',
        autor: 'Prof. Carlos Silva',
        autorCor: '#3b82f6',
        turma: 'Matemática - 6º Ano A',
        data: '1 dia atrás',
        likes: 45,
        comentarios: [
          { autor: 'Pedro Lima', texto: 'Ótimo vídeo!', data: '20h atrás' }
        ],
        usuarioCurtiu: false,
        midias: [
          { tipo: 'youtube', id: 'dQw4w9WgXcQ' }
        ],
        visualizacoes: 78
      },
      {
        id: 3,
        titulo: 'Material de apoio - Português',
        conteudo: 'Disponibilizei alguns links com exercícios de interpretação de texto.',
        autor: 'Profa. Maria Santos',
        autorCor: '#10b981',
        turma: 'Português - 6º Ano A',
        data: '3 dias atrás',
        likes: 12,
        comentarios: [],
        usuarioCurtiu: false,
        midias: [
          { tipo: 'link', url: 'https://www.todamateria.com.br/interpretacao-de-texto/' }
        ],
        visualizacoes: 34
      },
    ]);
  }, []);

  const handleLike = (id) => {
    setPublicacoes(publicacoes.map(pub => 
      pub.id === id 
        ? { ...pub, likes: pub.usuarioCurtiu ? pub.likes - 1 : pub.likes + 1, usuarioCurtiu: !pub.usuarioCurtiu }
        : pub
    ));
  };

  const handleComment = (id, texto) => {
    setPublicacoes(publicacoes.map(pub => 
      pub.id === id 
        ? { 
            ...pub, 
            comentarios: [...pub.comentarios, { 
              autor: 'João Silva (você)', 
              texto, 
              data: 'agora mesmo' 
            }] 
          }
        : pub
    ));
  };

  const filtrarPublicacoes = publicacoes.filter(pub => {
    const matchesSearch = pub.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pub.conteudo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTurma = filterTurma === 'todas' || pub.turma === filterTurma;
    return matchesSearch && matchesTurma;
  });

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
              <h2 style={styles.title}>📢 Publicações</h2>
              <p style={styles.subtitle}>Acompanhe os conteúdos compartilhados pelos seus professores</p>
            </div>
          </div>
        </div>

        {/* Busca e Filtros */}
        <div style={styles.searchSection}>
          <div style={styles.searchBox}>
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
            value={filterTurma}
            onChange={(e) => setFilterTurma(e.target.value)}
          >
            <option value="todas">Todas as turmas</option>
            {turmas.map(t => (
              <option key={t.id} value={t.nome}>{t.nome}</option>
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
            <Heart size={20} color="#ef4444" />
            <div>
              <span style={styles.statValue}>
                {publicacoes.reduce((acc, p) => acc + p.likes, 0)}
              </span>
              <span style={styles.statLabel}>Curtidas</span>
            </div>
          </div>
          <div style={styles.statCard}>
            <MessageCircle size={20} color="#f59e0b" />
            <div>
              <span style={styles.statValue}>
                {publicacoes.reduce((acc, p) => acc + (p.comentarios?.length || 0), 0)}
              </span>
              <span style={styles.statLabel}>Comentários</span>
            </div>
          </div>
        </div>

        {/* Lista de Publicações */}
        <div style={styles.publicacoesList}>
          {filtrarPublicacoes.map(publicacao => (
            <PublicacaoCard
              key={publicacao.id}
              publicacao={publicacao}
              perfil="aluno"
              onLike={handleLike}
              onComment={handleComment}
            />
          ))}

          {filtrarPublicacoes.length === 0 && (
            <div style={styles.emptyState}>
              <p>Nenhuma publicação encontrada</p>
            </div>
          )}
        </div>

        {/* Dica */}
        <div style={styles.dicaCard}>
          <Bell size={18} />
          <span>
            Você receberá uma notificação sempre que um professor fizer uma nova publicação!
          </span>
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
    cursor: 'pointer'
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
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
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
    marginBottom: '30px'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: 'white',
    borderRadius: '12px',
    color: '#6b7280'
  },
  dicaCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '15px 20px',
    backgroundColor: '#dbeafe',
    borderRadius: '8px',
    color: '#2563eb',
    fontSize: '13px'
  }
};