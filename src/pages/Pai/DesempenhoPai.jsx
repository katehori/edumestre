import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import RankingCard from '../../components/RankingCard';
import ConquistaCard from '../../components/ConquistaCard';
import { 
  ArrowLeft, Award, Trophy, Star, TrendingUp, 
  Users, Eye, Calendar, Medal, Target
} from 'lucide-react';

export default function DesempenhoPai() {
  const navigate = useNavigate();
  const [filhoSelecionado, setFilhoSelecionado] = useState('joao');
  const [periodo, setPeriodo] = useState('bimestre');
  const [abaAtiva, setAbaAtiva] = useState('notas'); // 'notas', 'ranking', 'conquistas'

  const filhos = [
    { id: 'joao', nome: 'João Silva', turma: '6º Ano A' },
    { id: 'maria', nome: 'Maria Silva', turma: '4º Ano B' },
  ];

  // Mock do ranking da turma do João
  const rankingJoao = [
    { id: 1, nome: 'Maria Souza', turma: '6º Ano A', pontos: 2450, media: 9.5, atividades: 15 },
    { id: 2, nome: 'João Silva', turma: '6º Ano A', pontos: 1250, media: 8.5, atividades: 12, isCurrentUser: true },
    { id: 3, nome: 'Pedro Lima', turma: '6º Ano A', pontos: 980, media: 7.8, atividades: 11 },
  ];

  // Mock do ranking da turma da Maria
  const rankingMaria = [
    { id: 1, nome: 'Ana Beatriz', turma: '4º Ano B', pontos: 2100, media: 9.2, atividades: 14 },
    { id: 2, nome: 'Maria Silva', turma: '4º Ano B', pontos: 1580, media: 9.2, atividades: 15, isCurrentUser: true },
    { id: 3, nome: 'Lucas Santos', turma: '4º Ano B', pontos: 1450, media: 8.5, atividades: 13 },
  ];

  // Mock das notas do João
  const notasJoao = {
    matematica: [8.5, 9.0, 7.5, 8.0],
    portugues: [9.0, 8.5, 9.5, 8.0],
    ciencias: [7.5, 8.0, 8.5, 9.0],
    historia: [8.0, 7.5, 8.0, 8.5],
    media: 8.5
  };

  // Mock das notas da Maria
  const notasMaria = {
    matematica: [9.5, 9.0, 9.5, 9.0],
    portugues: [9.0, 9.5, 9.0, 9.5],
    ciencias: [8.5, 9.0, 9.5, 9.0],
    historia: [9.0, 8.5, 9.0, 9.5],
    media: 9.2
  };

  // Mock das conquistas do João
  const conquistasJoao = [
    {
      id: 1,
      nome: '🔥 Ofensiva',
      descricao: 'Complete atividades por 7 dias seguidos',
      icone: '🔥',
      cor: '#f59e0b',
      conquistada: false,
      progresso: { atual: 5, total: 7 }
    },
    {
      id: 2,
      nome: '⭐ Nota 10',
      descricao: 'Tire nota máxima em 5 provas',
      icone: '⭐',
      cor: '#fbbf24',
      conquistada: true,
      progresso: { atual: 2, total: 5 }
    },
    {
      id: 3,
      nome: '📚 Leitor',
      descricao: 'Complete 10 atividades de leitura',
      icone: '📚',
      cor: '#3b82f6',
      conquistada: true,
      progresso: { atual: 10, total: 10 }
    },
  ];

  // Mock das conquistas da Maria
  const conquistasMaria = [
    {
      id: 1,
      nome: '🔥 Ofensiva',
      descricao: 'Complete atividades por 7 dias seguidos',
      icone: '🔥',
      cor: '#f59e0b',
      conquistada: true,
      progresso: { atual: 7, total: 7 }
    },
    {
      id: 2,
      nome: '⭐ Nota 10',
      descricao: 'Tire nota máxima em 5 provas',
      icone: '⭐',
      cor: '#fbbf24',
      conquistada: true,
      progresso: { atual: 4, total: 5 }
    },
    {
      id: 3,
      nome: '🏆 Campeã',
      descricao: 'Fique no top 3 do ranking da turma',
      icone: '🏆',
      cor: '#8b5cf6',
      conquistada: true,
      progresso: { atual: 3, total: 3 }
    },
  ];

  const rankingAtual = filhoSelecionado === 'joao' ? rankingJoao : rankingMaria;
  const notasAtuais = filhoSelecionado === 'joao' ? notasJoao : notasMaria;
  const conquistasAtuais = filhoSelecionado === 'joao' ? conquistasJoao : conquistasMaria;
  const filho = filhos.find(f => f.id === filhoSelecionado);

  const renderConteudo = () => {
    switch(abaAtiva) {
      case 'notas':
        return (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>📝 Boletim de Notas</h3>
            <div style={styles.notasGrid}>
              <div style={styles.notaCard}>
                <h4>Matemática</h4>
                <div style={styles.notasLista}>
                  {notasAtuais.matematica.map((nota, i) => (
                    <span key={i} style={styles.notaItem}>{i+1}º Bim: {nota}</span>
                  ))}
                </div>
              </div>
              <div style={styles.notaCard}>
                <h4>Português</h4>
                <div style={styles.notasLista}>
                  {notasAtuais.portugues.map((nota, i) => (
                    <span key={i} style={styles.notaItem}>{i+1}º Bim: {nota}</span>
                  ))}
                </div>
              </div>
              <div style={styles.notaCard}>
                <h4>Ciências</h4>
                <div style={styles.notasLista}>
                  {notasAtuais.ciencias.map((nota, i) => (
                    <span key={i} style={styles.notaItem}>{i+1}º Bim: {nota}</span>
                  ))}
                </div>
              </div>
              <div style={styles.notaCard}>
                <h4>História</h4>
                <div style={styles.notasLista}>
                  {notasAtuais.historia.map((nota, i) => (
                    <span key={i} style={styles.notaItem}>{i+1}º Bim: {nota}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'ranking':
        return (
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>🏆 Ranking da Turma</h3>
              <select
                style={styles.periodoSelect}
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
              >
                <option value="bimestre">Este Bimestre</option>
                <option value="mes">Este Mês</option>
                <option value="ano">Este Ano</option>
              </select>
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
        );

      case 'conquistas':
        return (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>⭐ Conquistas</h3>
            <div style={styles.conquistasLista}>
              {conquistasAtuais.map(conquista => (
                <ConquistaCard
                  key={conquista.id}
                  conquista={conquista}
                  conquistada={conquista.conquistada}
                  progresso={conquista.progresso}
                />
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
              <h2 style={styles.title}>📊 Desempenho Escolar</h2>
              <p style={styles.subtitle}>Acompanhe notas, ranking e conquistas dos seus filhos</p>
            </div>
          </div>
        </div>

        {/* Aviso de visualização */}
        <div style={styles.avisoCard}>
          <Eye size={18} />
          <span>
            Você está no modo <strong>visualização</strong>. Acompanhe o desempenho dos seus filhos.
          </span>
        </div>

        {/* Seletor de Filho */}
        <div style={styles.seletorFilho}>
          <label style={styles.seletorLabel}>Selecione o filho:</label>
          <select 
            style={styles.seletorSelect}
            value={filhoSelecionado}
            onChange={(e) => setFilhoSelecionado(e.target.value)}
          >
            {filhos.map(f => (
              <option key={f.id} value={f.id}>{f.nome} - {f.turma}</option>
            ))}
          </select>
        </div>

        {/* Card de Resumo do Aluno */}
        <div style={styles.alunoResumo}>
          <div style={styles.alunoHeader}>
            <div style={styles.alunoAvatar}>
              {filho.nome.charAt(0)}
            </div>
            <div>
              <h3 style={styles.alunoNome}>{filho.nome}</h3>
              <p style={styles.alunoTurma}>{filho.turma}</p>
            </div>
          </div>

          <div style={styles.alunoStats}>
            <div style={styles.alunoStat}>
              <Award size={20} color="#f59e0b" />
              <div>
                <span>Média Geral</span>
                <strong>{notasAtuais.media}</strong>
              </div>
            </div>
            <div style={styles.alunoStat}>
              <Trophy size={20} color="#3b82f6" />
              <div>
                <span>Posição na Turma</span>
                <strong>{filhoSelecionado === 'joao' ? '2º' : '2º'}</strong>
              </div>
            </div>
            <div style={styles.alunoStat}>
              <Star size={20} color="#10b981" />
              <div>
                <span>Pontos</span>
                <strong>{filhoSelecionado === 'joao' ? '1250' : '1580'}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button
            style={{...styles.tab, ...(abaAtiva === 'notas' ? styles.tabAtivo : {})}}
            onClick={() => setAbaAtiva('notas')}
          >
            <Award size={16} />
            Notas
          </button>
          <button
            style={{...styles.tab, ...(abaAtiva === 'ranking' ? styles.tabAtivo : {})}}
            onClick={() => setAbaAtiva('ranking')}
          >
            <Trophy size={16} />
            Ranking
          </button>
          <button
            style={{...styles.tab, ...(abaAtiva === 'conquistas' ? styles.tabAtivo : {})}}
            onClick={() => setAbaAtiva('conquistas')}
          >
            <Star size={16} />
            Conquistas
          </button>
        </div>

        {/* Conteúdo dinâmico baseado na aba ativa */}
        {renderConteudo()}
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
  seletorFilho: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '20px'
  },
  seletorLabel: {
    fontSize: '14px',
    color: '#4b5563'
  },
  seletorSelect: {
    padding: '10px 20px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    minWidth: '200px'
  },
  alunoResumo: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  alunoHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '15px'
  },
  alunoAvatar: {
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
  alunoNome: {
    margin: '0 0 5px',
    fontSize: '18px',
    color: '#1f2937'
  },
  alunoTurma: {
    margin: 0,
    fontSize: '14px',
    color: '#6b7280'
  },
  alunoStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
    paddingTop: '15px',
    borderTop: '1px solid #e5e7eb'
  },
  alunoStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  tabs: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    borderBottom: '2px solid #e5e7eb'
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#6b7280',
    borderBottom: '2px solid transparent',
    marginBottom: '-2px'
  },
  tabAtivo: {
    color: '#2563eb',
    borderBottom: '2px solid #2563eb'
  },
  section: {
    marginBottom: '30px'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px'
  },
  sectionTitle: {
    fontSize: '16px',
    margin: 0,
    color: '#1f2937'
  },
  periodoSelect: {
    padding: '6px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: '20px',
    fontSize: '12px',
    outline: 'none',
    cursor: 'pointer'
  },
  notasGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px'
  },
  notaCard: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  notasLista: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    marginTop: '10px'
  },
  notaItem: {
    fontSize: '13px',
    color: '#4b5563'
  },
  rankingLista: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  conquistasLista: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  }
};