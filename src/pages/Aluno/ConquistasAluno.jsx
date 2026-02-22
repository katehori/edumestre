import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import ConquistaCard from '../../components/ConquistaCard';
import { 
  ArrowLeft, Award, Star, Trophy, Target,
  TrendingUp, Medal, Gift, Lock
} from 'lucide-react';

export default function ConquistasAluno() {
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState('todas');

  // Mock das conquistas do aluno
  const conquistas = [
    {
      id: 1,
      nome: '🔥 Ofensiva',
      descricao: 'Complete atividades por 7 dias seguidos',
      icone: '🔥',
      cor: '#f59e0b',
      recompensa: 100,
      categoria: 'ofensiva',
      progresso: { atual: 5, total: 7 }
    },
    {
      id: 2,
      nome: '⭐ Nota 10',
      descricao: 'Tire nota máxima em 5 provas',
      icone: '⭐',
      cor: '#fbbf24',
      recompensa: 150,
      categoria: 'desempenho',
      progresso: { atual: 2, total: 5 }
    },
    {
      id: 3,
      nome: '📚 Leitor',
      descricao: 'Complete 10 atividades de leitura',
      icone: '📚',
      cor: '#3b82f6',
      recompensa: 200,
      categoria: 'atividades',
      conquistada: true,
      progresso: { atual: 10, total: 10 }
    },
    {
      id: 4,
      nome: '🧮 Mestre da Matemática',
      descricao: 'Tire média 9+ em Matemática no bimestre',
      icone: '🧮',
      cor: '#10b981',
      recompensa: 300,
      categoria: 'disciplinas',
      progresso: { atual: 8.5, total: 9 }
    },
    {
      id: 5,
      nome: '🏆 Campeão',
      descricao: 'Fique no top 3 do ranking da turma',
      icone: '🏆',
      cor: '#8b5cf6',
      recompensa: 250,
      categoria: 'ranking',
      conquistada: true,
      progresso: { atual: 2, total: 3 }
    },
    {
      id: 6,
      nome: '🤝 Colaborador',
      descricao: 'Ajude 5 colegas com dúvidas',
      icone: '🤝',
      cor: '#ec4899',
      recompensa: 150,
      categoria: 'social',
      progresso: { atual: 3, total: 5 }
    },
  ];

  // Estatísticas
  const conquistadas = conquistas.filter(c => c.conquistada).length;
  const total = conquistas.length;
  const pontosGanhos = conquistas
    .filter(c => c.conquistada)
    .reduce((acc, c) => acc + c.recompensa, 0);
  const proximaConquista = conquistas
    .filter(c => !c.conquistada)
    .sort((a, b) => (b.progresso.atual/b.progresso.total) - (a.progresso.atual/a.progresso.total))[0];

  const categorias = [
    { id: 'todas', nome: 'Todas', icone: <Award size={16} /> },
    { id: 'ofensiva', nome: 'Ofensiva', icone: <TrendingUp size={16} /> },
    { id: 'desempenho', nome: 'Desempenho', icone: <Star size={16} /> },
    { id: 'atividades', nome: 'Atividades', icone: <Target size={16} /> },
    { id: 'ranking', nome: 'Ranking', icone: <Trophy size={16} /> },
  ];

  const conquistasFiltradas = categoria === 'todas' 
    ? conquistas 
    : conquistas.filter(c => c.categoria === categoria);

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
              <h2 style={styles.title}>⭐ Conquistas</h2>
              <p style={styles.subtitle}>Desbloqueie troféus e ganhe pontos</p>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <Award size={24} color="#f59e0b" />
            <div>
              <span style={styles.statLabel}>Conquistadas</span>
              <strong style={styles.statValue}>{conquistadas}/{total}</strong>
            </div>
          </div>
          <div style={styles.statCard}>
            <Gift size={24} color="#10b981" />
            <div>
              <span style={styles.statLabel}>Pontos Ganhos</span>
              <strong style={styles.statValue}>{pontosGanhos}</strong>
            </div>
          </div>
          <div style={styles.statCard}>
            <Medal size={24} color="#3b82f6" />
            <div>
              <span style={styles.statLabel}>Progresso</span>
              <strong style={styles.statValue}>{Math.round((conquistadas/total)*100)}%</strong>
            </div>
          </div>
        </div>

        {/* Próxima Conquista */}
        {proximaConquista && (
          <div style={styles.proximaCard}>
            <div style={styles.proximaHeader}>
              <span style={styles.proximaLabel}>PRÓXIMA CONQUISTA</span>
              <span style={styles.proximaProgresso}>
                {proximaConquista.progresso.atual}/{proximaConquista.progresso.total}
              </span>
            </div>
            <div style={styles.proximaContent}>
              <span style={styles.proximaIcone}>{proximaConquista.icone}</span>
              <div style={styles.proximaInfo}>
                <strong>{proximaConquista.nome}</strong>
                <p>{proximaConquista.descricao}</p>
              </div>
            </div>
            <div style={styles.proximaBarra}>
              <div style={{
                ...styles.proximaFill,
                width: `${(proximaConquista.progresso.atual/proximaConquista.progresso.total)*100}%`
              }} />
            </div>
          </div>
        )}

        {/* Categorias */}
        <div style={styles.categorias}>
          {categorias.map(cat => (
            <button
              key={cat.id}
              style={{
                ...styles.categoriaButton,
                ...(categoria === cat.id ? styles.categoriaAtiva : {})
              }}
              onClick={() => setCategoria(cat.id)}
            >
              {cat.icone}
              {cat.nome}
            </button>
          ))}
        </div>

        {/* Lista de Conquistas */}
        <div style={styles.conquistasLista}>
          {conquistasFiltradas.map(conquista => (
            <ConquistaCard
              key={conquista.id}
              conquista={conquista}
              conquistada={conquista.conquistada}
              progresso={conquista.progresso}
            />
          ))}
        </div>

        {/* Loja de Conquistas (opcional) */}
        <div style={styles.lojaSection}>
          <h3 style={styles.lojaTitulo}>🛒 Trocar Pontos</h3>
          <p style={styles.lojaDescricao}>Use seus pontos para desbloquear recompensas especiais</p>
          <div style={styles.lojaGrid}>
            <div style={styles.lojaItem}>
              <span style={styles.lojaIcone}>🎨</span>
              <strong>Avatar Especial</strong>
              <span style={styles.lojaPreco}>500 pts</span>
              <button style={styles.lojaButton}>Trocar</button>
            </div>
            <div style={styles.lojaItem}>
              <span style={styles.lojaIcone}>🌈</span>
              <strong>Tema Personalizado</strong>
              <span style={styles.lojaPreco}>300 pts</span>
              <button style={styles.lojaButton}>Trocar</button>
            </div>
            <div style={styles.lojaItem}>
              <span style={styles.lojaIcone}>🔍</span>
              <strong>Emblema Exclusivo</strong>
              <span style={styles.lojaPreco}>200 pts</span>
              <button style={styles.lojaButton}>Trocar</button>
            </div>
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
    marginBottom: '20px'
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
  proximaCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '15px',
    marginBottom: '20px',
    border: '2px solid #f59e0b'
  },
  proximaHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px'
  },
  proximaLabel: {
    fontSize: '11px',
    fontWeight: 'bold',
    color: '#f59e0b'
  },
  proximaProgresso: {
    fontSize: '11px',
    color: '#6b7280'
  },
  proximaContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px'
  },
  proximaIcone: {
    fontSize: '24px'
  },
  proximaInfo: {
    flex: 1
  },
  proximaBarra: {
    height: '6px',
    backgroundColor: '#e5e7eb',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  proximaFill: {
    height: '100%',
    backgroundColor: '#f59e0b'
  },
  categorias: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    overflowX: 'auto',
    paddingBottom: '5px'
  },
  categoriaButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '13px',
    whiteSpace: 'nowrap'
  },
  categoriaAtiva: {
    backgroundColor: '#2563eb',
    color: 'white',
    borderColor: '#2563eb'
  },
  conquistasLista: {
    marginBottom: '30px'
  },
  lojaSection: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  lojaTitulo: {
    fontSize: '16px',
    margin: '0 0 5px',
    color: '#1f2937'
  },
  lojaDescricao: {
    fontSize: '13px',
    color: '#6b7280',
    marginBottom: '15px'
  },
  lojaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px'
  },
  lojaItem: {
    textAlign: 'center',
    padding: '15px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px'
  },
  lojaIcone: {
    fontSize: '32px',
    display: 'block',
    marginBottom: '10px'
  },
  lojaPreco: {
    display: 'block',
    fontSize: '12px',
    color: '#f59e0b',
    fontWeight: 'bold',
    margin: '8px 0'
  },
  lojaButton: {
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