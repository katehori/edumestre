import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import { 
  ArrowLeft, BookOpen, Calendar, Clock,
  FileText, Video, Link as LinkIcon, Download,
  ChevronRight, CheckCircle
} from 'lucide-react';

export default function TurmaDetalhesAluno() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('atividades');

  // Mock da turma
  const turma = {
    id: 1,
    nome: '6º Ano A',
    materia: 'Matemática',
    professor: 'Prof. Carlos Silva',
    cor: '#3b82f6'
  };

  // Mock de atividades
  const atividades = [
    { id: 1, titulo: 'Exercícios de Frações', data: '25/02', status: 'pendente', tipo: 'exercicio', nota: null },
    { id: 2, titulo: 'Trabalho de Geometria', data: '20/02', status: 'entregue', tipo: 'trabalho', nota: 8.5 },
    { id: 3, titulo: 'Prova Bimestral', data: '15/02', status: 'corrigido', tipo: 'prova', nota: 7.0 },
    { id: 4, titulo: 'Lista de Exercícios', data: '10/02', status: 'corrigido', tipo: 'exercicio', nota: 9.5 },
  ];

  // Mock de publicações
  const publicacoes = [
    { id: 1, titulo: 'Conteúdo da prova', descricao: 'A prova será sobre frações e números decimais. Estudar páginas 45 a 52.', data: '2 dias atrás', autor: 'Prof. Carlos' },
    { id: 2, titulo: 'Material de apoio', descricao: 'Segue link com videoaulas sobre frações', data: '5 dias atrás', autor: 'Prof. Carlos', link: 'https://youtube.com/...' },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pendente':
        return { text: 'Pendente', color: '#dc2626', bg: '#fee2e2' };
      case 'entregue':
        return { text: 'Entregue', color: '#f59e0b', bg: '#fef3c7' };
      case 'corrigido':
        return { text: 'Corrigido', color: '#10b981', bg: '#d1fae5' };
      default:
        return { text: status, color: '#6b7280', bg: '#f3f4f6' };
    }
  };

  return (
    <Layout perfil="aluno" nome="João Silva" turmaInfo="6º Ano A">
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <button style={styles.backButton} onClick={() => navigate('/aluno/turmas')}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 style={styles.title}>{turma.nome}</h2>
              <p style={styles.subtitle}>{turma.materia} • {turma.professor}</p>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div style={styles.infoCards}>
          <div style={styles.infoCard}>
            <BookOpen size={24} color="#3b82f6" />
            <div>
              <span style={styles.infoLabel}>Atividades</span>
              <strong style={styles.infoValue}>12</strong>
            </div>
          </div>
          <div style={styles.infoCard}>
            <Clock size={24} color="#f59e0b" />
            <div>
              <span style={styles.infoLabel}>Pendentes</span>
              <strong style={styles.infoValue}>2</strong>
            </div>
          </div>
          <div style={styles.infoCard}>
            <CheckCircle size={24} color="#10b981" />
            <div>
              <span style={styles.infoLabel}>Média</span>
              <strong style={styles.infoValue}>8.3</strong>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button 
            style={{...styles.tab, ...(activeTab === 'atividades' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('atividades')}
          >
            <BookOpen size={16} />
            Atividades
          </button>
          <button 
            style={{...styles.tab, ...(activeTab === 'publicacoes' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('publicacoes')}
          >
            <FileText size={16} />
            Publicações
          </button>
          <button 
            style={{...styles.tab, ...(activeTab === 'materiais' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('materiais')}
          >
            <LinkIcon size={16} />
            Materiais
          </button>
        </div>

        {/* Conteúdo das Tabs */}
        <div style={styles.tabContent}>
          {/* Tab Atividades */}
          {activeTab === 'atividades' && (
            <div>
              <div style={styles.tabHeader}>
                <h3 style={styles.tabTitle}>Minhas Atividades</h3>
              </div>

              <div style={styles.atividadesList}>
                {atividades.map(ativ => {
                  const status = getStatusBadge(ativ.status);
                  return (
                    <div key={ativ.id} style={styles.atividadeCard}>
                      <div style={styles.atividadeHeader}>
                        <h4>{ativ.titulo}</h4>
                        <span style={{
                          ...styles.statusBadge,
                          backgroundColor: status.bg,
                          color: status.color
                        }}>
                          {status.text}
                        </span>
                      </div>
                      
                      <div style={styles.atividadeInfo}>
                        <span style={styles.atividadeData}>
                          <Calendar size={14} /> Entrega: {ativ.data}
                        </span>
                        {ativ.nota && (
                          <span style={styles.atividadeNota}>
                            Nota: {ativ.nota}
                          </span>
                        )}
                      </div>

                      <div style={styles.atividadeActions}>
                        {ativ.status === 'pendente' && (
                          <button style={styles.entregarBtn}>
                            Entregar Atividade
                          </button>
                        )}
                        {ativ.status === 'entregue' && (
                          <button style={styles.verEntregaBtn}>
                            Ver Entrega
                          </button>
                        )}
                        {ativ.status === 'corrigido' && (
                          <button style={styles.verCorrecaoBtn}>
                            Ver Correção
                          </button>
                        )}
                        <ChevronRight size={16} color="#9ca3af" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab Publicações */}
          {activeTab === 'publicacoes' && (
            <div>
              <div style={styles.tabHeader}>
                <h3 style={styles.tabTitle}>Publicações da Turma</h3>
              </div>

              <div style={styles.publicacoesList}>
                {publicacoes.map(pub => (
                  <div key={pub.id} style={styles.publicacaoCard}>
                    <div style={styles.publicacaoHeader}>
                      <h4>{pub.titulo}</h4>
                      <span style={styles.publicacaoData}>{pub.data}</span>
                    </div>
                    
                    <p style={styles.publicacaoTexto}>{pub.descricao}</p>
                    
                    {pub.link && (
                      <a href="#" style={styles.publicacaoLink}>
                        <Video size={16} />
                        Ver vídeo
                      </a>
                    )}

                    <div style={styles.publicacaoFooter}>
                      <span style={styles.publicacaoAutor}>Por {pub.autor}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Materiais */}
          {activeTab === 'materiais' && (
            <div>
              <div style={styles.tabHeader}>
                <h3 style={styles.tabTitle}>Materiais de Apoio</h3>
              </div>

              <div style={styles.materiaisList}>
                <div style={styles.materialItem}>
                  <FileText size={20} color="#3b82f6" />
                  <div style={styles.materialInfo}>
                    <strong>Apostila de Matemática</strong>
                    <p>Capítulos 1 a 5 - 2.5 MB</p>
                  </div>
                  <button style={styles.downloadBtn}>
                    <Download size={18} />
                  </button>
                </div>

                <div style={styles.materialItem}>
                  <Video size={20} color="#ef4444" />
                  <div style={styles.materialInfo}>
                    <strong>Videoaula - Frações</strong>
                    <p>YouTube - 15 min</p>
                  </div>
                  <button style={styles.downloadBtn}>
                    <LinkIcon size={18} />
                  </button>
                </div>

                <div style={styles.materialItem}>
                  <FileText size={20} color="#10b981" />
                  <div style={styles.materialInfo}>
                    <strong>Lista de Exercícios</strong>
                    <p>PDF - 500 KB</p>
                  </div>
                  <button style={styles.downloadBtn}>
                    <Download size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
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
  infoCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
    marginBottom: '25px'
  },
  infoCard: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  infoLabel: {
    fontSize: '11px',
    color: '#6b7280',
    display: 'block'
  },
  infoValue: {
    fontSize: '18px',
    color: '#1f2937'
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
    padding: '10px 20px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#6b7280',
    borderBottom: '2px solid transparent',
    marginBottom: '-2px'
  },
  activeTab: {
    color: '#2563eb',
    borderBottom: '2px solid #2563eb'
  },
  tabContent: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  tabHeader: {
    marginBottom: '20px'
  },
  tabTitle: {
    fontSize: '16px',
    margin: 0,
    color: '#1f2937'
  },
  atividadesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  atividadeCard: {
    padding: '15px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px'
  },
  atividadeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '11px'
  },
  atividadeInfo: {
    display: 'flex',
    gap: '15px',
    marginBottom: '10px',
    fontSize: '12px',
    color: '#6b7280'
  },
  atividadeData: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  atividadeNota: {
    fontWeight: '500',
    color: '#10b981'
  },
  atividadeActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  entregarBtn: {
    padding: '6px 12px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px'
  },
  verEntregaBtn: {
    padding: '6px 12px',
    backgroundColor: '#f59e0b',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px'
  },
  verCorrecaoBtn: {
    padding: '6px 12px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px'
  },
  publicacoesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  publicacaoCard: {
    padding: '15px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px'
  },
  publicacaoHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  publicacaoData: {
    fontSize: '11px',
    color: '#9ca3af'
  },
  publicacaoTexto: {
    fontSize: '13px',
    color: '#4b5563',
    margin: '0 0 10px'
  },
  publicacaoLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    color: '#2563eb',
    textDecoration: 'none',
    fontSize: '12px',
    marginBottom: '10px'
  },
  publicacaoFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  publicacaoAutor: {
    fontSize: '11px',
    color: '#9ca3af'
  },
  curtirBtn: {
    padding: '4px 12px',
    backgroundColor: '#fee2e2',
    color: '#ef4444',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '11px'
  },
  materiaisList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  materialItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '12px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px'
  },
  materialInfo: {
    flex: 1
  },
  downloadBtn: {
    padding: '8px',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};