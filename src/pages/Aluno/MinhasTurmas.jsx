import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { 
  BookOpen, Users, Calendar, Search, 
  QrCode, LogIn, ChevronRight, Clock,
  Award, CheckCircle, XCircle
} from 'lucide-react';

export default function MinhasTurmas() {
  const navigate = useNavigate();
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [codigoAcesso, setCodigoAcesso] = useState('');
  const [joinError, setJoinError] = useState('');

  // Mock das turmas do aluno
  const minhasTurmas = [
    {
      id: 1,
      nome: '6º Ano A',
      materia: 'Matemática',
      professor: 'Prof. Carlos Silva',
      cor: '#3b82f6',
      proximaAtividade: '25/02',
      atividadesPendentes: 2,
      media: 8.5
    },
    {
      id: 2,
      nome: '6º Ano A',
      materia: 'Português',
      professor: 'Profa. Maria Santos',
      cor: '#10b981',
      proximaAtividade: '26/02',
      atividadesPendentes: 1,
      media: 9.0
    },
    {
      id: 3,
      nome: '6º Ano A',
      materia: 'Ciências',
      professor: 'Prof. João Lima',
      cor: '#f59e0b',
      proximaAtividade: '27/02',
      atividadesPendentes: 3,
      media: 7.8
    },
  ];

  const handleJoinTurma = () => {
    if (!codigoAcesso.trim()) {
      setJoinError('Digite um código de acesso');
      return;
    }

    // Simula busca da turma
    if (codigoAcesso === 'TURMA123') {
      // Turma encontrada
      setShowJoinModal(false);
      setCodigoAcesso('');
      setJoinError('');
      // Aqui adicionaria a turma à lista
      alert('Turma adicionada com sucesso!');
    } else {
      setJoinError('Código inválido. Verifique e tente novamente.');
    }
  };

  return (
    <Layout perfil="aluno" nome="João Silva" turmaInfo="6º Ano A">
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>Minhas turmas</h2>
            <p style={styles.subtitle}>Acompanhe suas turmas e atividades</p>
          </div>
          <button style={styles.joinButton} onClick={() => setShowJoinModal(true)}>
            <QrCode size={20} />
            Entrar em Turma
          </button>
        </div>

        {/* Estatísticas */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <BookOpen size={24} color="#3b82f6" />
            <div>
              <span style={styles.statLabel}>Turmas</span>
              <strong style={styles.statValue}>{minhasTurmas.length}</strong>
            </div>
          </div>
          <div style={styles.statCard}>
            <Clock size={24} color="#f59e0b" />
            <div>
              <span style={styles.statLabel}>Pendentes</span>
              <strong style={styles.statValue}>6</strong>
            </div>
          </div>
          <div style={styles.statCard}>
            <Award size={24} color="#10b981" />
            <div>
              <span style={styles.statLabel}>Média Geral</span>
              <strong style={styles.statValue}>8.4</strong>
            </div>
          </div>
        </div>

        {/* Lista de Turmas */}
        <div style={styles.turmasList}>
          {minhasTurmas.map(turma => (
            <div key={turma.id} style={styles.turmaCard}>
              <div style={{...styles.turmaHeader, backgroundColor: turma.cor + '10'}}>
                <div style={styles.turmaHeaderContent}>
                  <div>
                    <h3 style={styles.turmaNome}>{turma.nome}</h3>
                    <p style={styles.turmaMateria}>{turma.materia}</p>
                  </div>
                  <span style={{...styles.mediaBadge, backgroundColor: turma.cor + '20', color: turma.cor}}>
                    Média: {turma.media}
                  </span>
                </div>
              </div>

              <div style={styles.turmaBody}>
                <div style={styles.turmaInfo}>
                  <span style={styles.turmaProfessor}>
                    <Users size={14} /> {turma.professor}
                  </span>
                  <span style={styles.turmaProxima}>
                    <Calendar size={14} /> Próxima: {turma.proximaAtividade}
                  </span>
                </div>

                <div style={styles.atividadesStatus}>
                  <span style={styles.pendentesBadge}>
                    {turma.atividadesPendentes} atividades pendentes
                  </span>
                </div>

                <button 
                  style={styles.acessarTurmaBtn}
                  onClick={() => navigate(`/aluno/turma/${turma.id}`)}
                >
                  Acessar Turma
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Entrar em Turma */}
        {showJoinModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h3 style={styles.modalTitle}>Entrar em uma Turma</h3>
              <p style={styles.modalSubtitle}>
                Digite o código de acesso fornecido pelo seu professor
              </p>

              <div style={styles.modalContent}>
                <div style={styles.codigoInputGroup}>
                  <label style={styles.modalLabel}>Código de Acesso</label>
                  <input
                    type="text"
                    placeholder="Ex: TURMA123"
                    style={styles.codigoInput}
                    value={codigoAcesso}
                    onChange={(e) => setCodigoAcesso(e.target.value.toUpperCase())}
                    autoFocus
                  />
                  {joinError && (
                    <p style={styles.errorText}>{joinError}</p>
                  )}
                </div>

                <div style={styles.qrOption}>
                  <p>Ou escaneie um QR Code</p>
                  <button style={styles.scanQrButton}>
                    <QrCode size={18} />
                    Escanear QR Code
                  </button>
                </div>
              </div>

              <div style={styles.modalActions}>
                <button style={styles.modalCancel} onClick={() => {
                  setShowJoinModal(false);
                  setCodigoAcesso('');
                  setJoinError('');
                }}>
                  Cancelar
                </button>
                <button style={styles.modalConfirm} onClick={handleJoinTurma}>
                  <LogIn size={16} />
                  Entrar na Turma
                </button>
              </div>
            </div>
          </div>
        )}
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px'
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
  joinButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
    marginBottom: '30px'
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
  turmasList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  turmaCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  turmaHeader: {
    padding: '15px 20px'
  },
  turmaHeaderContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  turmaNome: {
    margin: '0 0 5px',
    fontSize: '16px',
    color: '#1f2937'
  },
  turmaMateria: {
    margin: 0,
    fontSize: '13px',
    color: '#6b7280'
  },
  mediaBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500'
  },
  turmaBody: {
    padding: '20px'
  },
  turmaInfo: {
    display: 'flex',
    gap: '20px',
    marginBottom: '15px',
    fontSize: '13px',
    color: '#6b7280'
  },
  turmaProfessor: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  turmaProxima: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  atividadesStatus: {
    marginBottom: '15px'
  },
  pendentesBadge: {
    padding: '6px 12px',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    borderRadius: '20px',
    fontSize: '12px'
  },
  acessarTurmaBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px',
    backgroundColor: '#f3f4f6',
    color: '#4b5563',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px',
    maxWidth: '450px',
    width: '90%'
  },
  modalTitle: {
    fontSize: '20px',
    margin: '0 0 10px',
    color: '#1f2937'
  },
  modalSubtitle: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 25px'
  },
  modalContent: {
    marginBottom: '25px'
  },
  codigoInputGroup: {
    marginBottom: '20px'
  },
  modalLabel: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#4b5563',
    marginBottom: '8px'
  },
  codigoInput: {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none'
  },
  errorText: {
    color: '#dc2626',
    fontSize: '13px',
    marginTop: '5px'
  },
  qrOption: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px'
  },
  scanQrButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '10px'
  },
  modalActions: {
    display: 'flex',
    gap: '10px'
  },
  modalCancel: {
    flex: 1,
    padding: '12px',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  modalConfirm: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px'
  }
};