import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import RankingCard from '../../components/RankingCard';
import { 
  ArrowLeft, Trophy, Award, Users, Crown
} from 'lucide-react';

export default function RankingAluno() {
  const navigate = useNavigate();
  const [tipoRanking, setTipoRanking] = useState('turma');
  const [periodo, setPeriodo] = useState('bimestre');

  // Mock do aluno atual
  const alunoAtual = {
    id: 1,
    nome: 'João Silva',
    turma: '6º Ano A',
    pontos: 1250,
    media: 8.5,
    atividades: 12,
    conquistas: [
      { id: 1, icone: '🔥', nome: 'Ofensiva' },
      { id: 2, icone: '⭐', nome: 'Nota 10' }
    ]
  };

  // Mock do ranking da turma
  const rankingTurma = [
    { id: 1, nome: 'Maria Souza', turma: '6º Ano A', pontos: 2450, media: 9.5, atividades: 15, conquistas: [{ icone: '🔥' }, { icone: '⭐' }, { icone: '📚' }] },
    { id: 2, nome: 'João Silva', turma: '6º Ano A', pontos: 1250, media: 8.5, atividades: 12, conquistas: [{ icone: '🔥' }, { icone: '⭐' }], isCurrentUser: true },
    { id: 3, nome: 'Pedro Lima', turma: '6º Ano A', pontos: 980, media: 7.8, atividades: 11, conquistas: [{ icone: '🔥' }] },
    { id: 4, nome: 'Ana Beatriz', turma: '6º Ano A', pontos: 870, media: 7.5, atividades: 10, conquistas: [] },
    { id: 5, nome: 'Lucas Santos', turma: '6º Ano A', pontos: 720, media: 6.5, atividades: 9, conquistas: [] },
  ];

  // Mock do ranking geral da escola
  const rankingGeral = [
    { id: 1, nome: 'Maria Souza', turma: '6º Ano A', pontos: 2450, media: 9.5, atividades: 15 },
    { id: 2, nome: 'Carlos Eduardo', turma: '9º Ano B', pontos: 2350, media: 9.2, atividades: 14 },
    { id: 3, nome: 'Juliana Costa', turma: '8º Ano A', pontos: 2100, media: 9.0, atividades: 14 },
    { id: 4, nome: 'João Silva', turma: '6º Ano A', pontos: 1250, media: 8.5, atividades: 12, isCurrentUser: true },
    { id: 5, nome: 'Pedro Lima', turma: '6º Ano A', pontos: 980, media: 7.8, atividades: 11 },
  ];

  const rankingAtual = tipoRanking === 'turma' ? rankingTurma : rankingGeral;

  // Estatísticas do aluno
  const stats = {
    posicaoTurma: rankingTurma.findIndex(a => a.isCurrentUser) + 1,
    posicaoGeral: rankingGeral.findIndex(a => a.isCurrentUser) + 1,
    totalTurma: rankingTurma.length,
    totalGeral: 120,
    pontos: alunoAtual.pontos,
    media: alunoAtual.media,
    conquistas: alunoAtual.conquistas.length
  };

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
              <h2 style={styles.title}>🏆 Ranking</h2>
              <p style={styles.subtitle}>Veja sua posição e compare com outros alunos</p>
            </div>
          </div>
        </div>

        {/* Card do Aluno - Destaque */}
        <div style={styles.alunoDestaque}>
          <div style={styles.alunoDestaqueHeader}>
            <Crown size={24} color="#f59e0b" />
            <h3 style={styles.alunoDestaqueTitulo}>Seu Desempenho</h3>
          </div>
          <div style={styles.alunoDestaqueStats}>
            <div style={styles.alunoDestaqueStat}>
              <Trophy size={20} color="#f59e0b" />
              <div>
                <span style={styles.statLabel}>Posição na Turma</span>
                <strong style={styles.statValue}>{stats.posicaoTurma}º de {stats.totalTurma}</strong>
              </div>
            </div>
            <div style={styles.alunoDestaqueStat}>
              <Users size={20} color="#3b82f6" />
              <div>
                <span style={styles.statLabel}>Posição Geral</span>
                <strong style={styles.statValue}>{stats.posicaoGeral}º de {stats.totalGeral}</strong>
              </div>
            </div>
            <div style={styles.alunoDestaqueStat}>
              <Award size={20} color="#10b981" />
              <div>
                <span style={styles.statLabel}>Pontos Totais</span>
                <strong style={styles.statValue}>{stats.pontos} pts</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div style={styles.filtrosSection}>
          <div style={styles.filtros}>
            <button 
              style={{
                ...styles.filtroButton,
                ...(tipoRanking === 'turma' ? styles.filtroAtivo : {})
              }}
              onClick={() => setTipoRanking('turma')}
            >
              <Users size={16} />
              Ranking da Turma
            </button>
            <button 
              style={{
                ...styles.filtroButton,
                ...(tipoRanking === 'geral' ? styles.filtroAtivo : {})
              }}
              onClick={() => setTipoRanking('geral')}
            >
              <Trophy size={16} />
              Ranking Geral
            </button>
          </div>
          <select 
            style={styles.periodoSelect}
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
          >
            <option value="bimestre">Este Bimestre</option>
            <option value="mes">Este Mês</option>
            <option value="ano">Este Ano</option>
            <option value="total">Total</option>
          </select>
        </div>

        {/* Ranking */}
        <div style={styles.rankingSection}>
          <div style={styles.rankingHeader}>
            <h3 style={styles.rankingTitulo}>
              {tipoRanking === 'turma' ? 'Ranking da Turma 6º Ano A' : 'Ranking Geral da Escola'}
            </h3>
            <span style={styles.totalAlunos}>
              {rankingAtual.length} alunos
            </span>
          </div>

          <div style={styles.rankingLista}>
            {rankingAtual.map((aluno, index) => (
              <RankingCard
                key={aluno.id}
                aluno={aluno}
                posicao={index + 1}
                isCurrentUser={aluno.isCurrentUser}
              />
            ))}
          </div>
        </div>

        {/* Estatísticas Adicionais */}
        <div style={styles.statsSection}>
          <h3 style={styles.statsTitulo}>📊 Estatísticas</h3>
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <span style={styles.statCardLabel}>Média Geral</span>
              <strong style={styles.statCardValue}>{stats.media}</strong>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statCardLabel}>Atividades</span>
              <strong style={styles.statCardValue}>{alunoAtual.atividades}</strong>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statCardLabel}>Conquistas</span>
              <strong style={styles.statCardValue}>{stats.conquistas}</strong>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statCardLabel}>Progresso</span>
              <strong style={styles.statCardValue}>+15%</strong>
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
  alunoDestaque: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  alunoDestaqueHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '15px'
  },
  alunoDestaqueTitulo: {
    fontSize: '16px',
    margin: 0,
    color: '#1f2937'
  },
  alunoDestaqueStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px'
  },
  alunoDestaqueStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  statLabel: {
    fontSize: '11px',
    color: '#6b7280',
    display: 'block'
  },
  statValue: {
    fontSize: '16px',
    color: '#1f2937'
  },
  filtrosSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  filtros: {
    display: 'flex',
    gap: '10px'
  },
  filtroButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '13px',
    color: '#4b5563'
  },
  filtroAtivo: {
    backgroundColor: '#2563eb',
    color: 'white',
    borderColor: '#2563eb'
  },
  periodoSelect: {
    padding: '8px 15px',
    border: '1px solid #e5e7eb',
    borderRadius: '20px',
    fontSize: '13px',
    outline: 'none',
    cursor: 'pointer'
  },
  rankingSection: {
    marginBottom: '30px'
  },
  rankingHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px'
  },
  rankingTitulo: {
    fontSize: '16px',
    margin: 0,
    color: '#1f2937'
  },
  totalAlunos: {
    fontSize: '12px',
    color: '#6b7280'
  },
  rankingLista: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  statsSection: {
    marginTop: '20px'
  },
  statsTitulo: {
    fontSize: '16px',
    margin: '0 0 15px',
    color: '#1f2937'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '15px'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  statCardLabel: {
    fontSize: '11px',
    color: '#6b7280',
    display: 'block',
    marginBottom: '5px'
  },
  statCardValue: {
    fontSize: '18px',
    color: '#1f2937'
  }
};