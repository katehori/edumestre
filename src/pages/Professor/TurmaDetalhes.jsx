import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import { 
  ArrowLeft, Users, BookOpen, Calendar, Edit2, Trash2, 
  Plus, QrCode, Copy, Check, Download, Share2, 
  UserPlus, FileText, Award, Settings, MoreVertical
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function TurmaDetalhes() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('alunos');
  const [copiado, setCopiado] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Mock da turma (viria do Firebase)
  const turma = {
    id: 1,
    nome: '6º Ano A',
    serie: '6º ano',
    materia: 'Matemática',
    codigo: 'TURMA123',
    alunos: 32,
    atividades: 8,
    proximaAtividade: '25/02',
    cor: '#3b82f6',
    descricao: 'Turma de Matemática - 6º ano. Aulas segundas e quartas.',
    professor: 'Prof. Carlos Silva'
  };

  // Mock de alunos
  const alunos = [
    { id: 1, nome: 'João Silva', matricula: '2025001', media: 8.5, atividades: 12 },
    { id: 2, nome: 'Maria Santos', matricula: '2025002', media: 9.2, atividades: 12 },
    { id: 3, nome: 'Pedro Oliveira', matricula: '2025003', media: 7.8, atividades: 11 },
    { id: 4, nome: 'Ana Souza', matricula: '2025004', media: 9.5, atividades: 12 },
    { id: 5, nome: 'Lucas Lima', matricula: '2025005', media: 6.5, atividades: 10 },
  ];

  // Mock de atividades
  const atividades = [
    { id: 1, titulo: 'Exercícios de Frações', data: '25/02', entregas: 28, total: 32, status: 'aberta' },
    { id: 2, titulo: 'Prova de Matemática', data: '20/02', entregas: 32, total: 32, status: 'concluida' },
    { id: 3, titulo: 'Trabalho em Grupo', data: '15/02', entregas: 30, total: 32, status: 'concluida' },
  ];

  const copiarCodigo = () => {
    navigator.clipboard.writeText(turma.codigo);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    // Lógica para deletar
    console.log('Deletando turma:', id);
    setShowDeleteModal(false);
    navigate('/professor/turmas');
  };

  return (
    <Layout perfil="professor" nome="Prof. Carlos Silva">
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <button style={styles.backButton} onClick={() => navigate('/professor/turmas')}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 style={styles.title}>{turma.nome}</h2>
              <p style={styles.subtitle}>{turma.materia} • {turma.serie}</p>
            </div>
          </div>
          <div style={styles.headerActions}>
            <button style={styles.editButton} onClick={handleEdit}>
              <Edit2 size={18} />
              Editar
            </button>
            <button style={styles.deleteButton} onClick={handleDelete}>
              <Trash2 size={18} />
              Excluir
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div style={styles.infoCards}>
          <div style={styles.infoCard}>
            <Users size={24} color="#3b82f6" />
            <div>
              <span style={styles.infoLabel}>Alunos</span>
              <strong style={styles.infoValue}>{turma.alunos}</strong>
            </div>
          </div>
          <div style={styles.infoCard}>
            <BookOpen size={24} color="#10b981" />
            <div>
              <span style={styles.infoLabel}>Atividades</span>
              <strong style={styles.infoValue}>{turma.atividades}</strong>
            </div>
          </div>
          <div style={styles.infoCard}>
            <Calendar size={24} color="#f59e0b" />
            <div>
              <span style={styles.infoLabel}>Próxima</span>
              <strong style={styles.infoValue}>{turma.proximaAtividade}</strong>
            </div>
          </div>
        </div>

        {/* Código de Acesso e QR Code */}
        <div style={styles.acessoSection}>
          <div style={styles.acessoHeader}>
            <h3 style={styles.sectionTitle}>🔑 Código de Acesso</h3>
            <button style={styles.qrToggle} onClick={() => setShowQR(!showQR)}>
              <QrCode size={18} />
              {showQR ? 'Esconder QR' : 'Mostrar QR'}
            </button>
          </div>
          
          <div style={styles.acessoContent}>
            <div style={styles.codigoBox}>
              <code style={styles.codigo}>{turma.codigo}</code>
              <button style={styles.copyButton} onClick={copiarCodigo}>
                {copiado ? <Check size={18} color="#10b981" /> : <Copy size={18} />}
              </button>
            </div>
            
            <div style={styles.acessoLinks}>
              <button style={styles.linkButton}>
                <Share2 size={16} />
                Compartilhar link
              </button>
              <button style={styles.linkButton}>
                <Download size={16} />
                Baixar QR Code
              </button>
            </div>

            {showQR && (
              <div style={styles.qrDisplay}>
                <QRCodeSVG value={`https://edumestre.com/entrar/${turma.codigo}`} size={150} />
                <p style={styles.qrText}>Escaneie para entrar na turma</p>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button 
            style={{...styles.tab, ...(activeTab === 'alunos' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('alunos')}
          >
            <Users size={16} />
            Alunos
          </button>
          <button 
            style={{...styles.tab, ...(activeTab === 'atividades' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('atividades')}
          >
            <BookOpen size={16} />
            Atividades
          </button>
          <button 
            style={{...styles.tab, ...(activeTab === 'configuracoes' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('configuracoes')}
          >
            <Settings size={16} />
            Configurações
          </button>
        </div>

        {/* Conteúdo das Tabs */}
        <div style={styles.tabContent}>
          {/* Tab Alunos */}
          {activeTab === 'alunos' && (
            <div>
              <div style={styles.tabHeader}>
                <h3 style={styles.tabTitle}>Lista de Alunos</h3>
                <button style={styles.addButton}>
                  <UserPlus size={18} />
                  Adicionar Aluno
                </button>
              </div>

              <div style={styles.alunosList}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Matrícula</th>
                      <th>Média</th>
                      <th>Atividades</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alunos.map(aluno => (
                      <tr key={aluno.id}>
                        <td>{aluno.nome}</td>
                        <td>{aluno.matricula}</td>
                        <td>
                          <span style={{
                            ...styles.mediaBadge,
                            backgroundColor: aluno.media >= 7 ? '#d1fae5' : '#fee2e2',
                            color: aluno.media >= 7 ? '#10b981' : '#dc2626'
                          }}>
                            {aluno.media}
                          </span>
                        </td>
                        <td>{aluno.atividades}/12</td>
                        <td>
                          <button style={styles.tableAction}>
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab Atividades */}
          {activeTab === 'atividades' && (
            <div>
              <div style={styles.tabHeader}>
                <h3 style={styles.tabTitle}>Atividades da Turma</h3>
                <button style={styles.addButton}>
                  <Plus size={18} />
                  Nova Atividade
                </button>
              </div>

              <div style={styles.atividadesList}>
                {atividades.map(ativ => (
                  <div key={ativ.id} style={styles.atividadeCard}>
                    <div style={styles.atividadeInfo}>
                      <h4>{ativ.titulo}</h4>
                      <p>Data: {ativ.data}</p>
                    </div>
                    <div style={styles.atividadeStats}>
                      <span style={styles.entregas}>
                        {ativ.entregas}/{ativ.total} entregas
                      </span>
                      <span style={{
                        ...styles.atividadeStatus,
                        backgroundColor: ativ.status === 'aberta' ? '#dbeafe' : '#d1fae5',
                        color: ativ.status === 'aberta' ? '#3b82f6' : '#10b981'
                      }}>
                        {ativ.status === 'aberta' ? 'Aberta' : 'Concluída'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Configurações */}
          {activeTab === 'configuracoes' && (
            <div style={styles.configuracoes}>
              <div style={styles.configGroup}>
                <h4>Informações da Turma</h4>
                <div style={styles.configItem}>
                  <label>Nome da Turma</label>
                  <input type="text" value={turma.nome} style={styles.configInput} />
                </div>
                <div style={styles.configItem}>
                  <label>Série/Ano</label>
                  <input type="text" value={turma.serie} style={styles.configInput} />
                </div>
                <div style={styles.configItem}>
                  <label>Matéria</label>
                  <input type="text" value={turma.materia} style={styles.configInput} />
                </div>
                <div style={styles.configItem}>
                  <label>Descrição</label>
                  <textarea style={styles.configTextarea} rows="3">
                    {turma.descricao}
                  </textarea>
                </div>
              </div>

              <div style={styles.configGroup}>
                <h4>Configurações de Acesso</h4>
                <div style={styles.configItem}>
                  <label>Regenerar Código</label>
                  <button style={styles.regenerateButton}>
                    Gerar novo código
                  </button>
                  <p style={styles.configNote}>
                    Atenção: ao gerar um novo código, o anterior deixará de funcionar
                  </p>
                </div>
              </div>

              <div style={styles.configGroup}>
                <h4>Zona de Perigo</h4>
                <div style={styles.configItem}>
                  <button style={styles.dangerButton} onClick={handleDelete}>
                    <Trash2 size={16} />
                    Excluir Turma Permanentemente
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Edição */}
      {showEditModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitle}>Editar Turma</h3>
            <div style={styles.modalContent}>
              <div style={styles.modalField}>
                <label>Nome da Turma</label>
                <input type="text" defaultValue={turma.nome} style={styles.modalInput} />
              </div>
              <div style={styles.modalField}>
                <label>Série/Ano</label>
                <input type="text" defaultValue={turma.serie} style={styles.modalInput} />
              </div>
              <div style={styles.modalField}>
                <label>Matéria</label>
                <input type="text" defaultValue={turma.materia} style={styles.modalInput} />
              </div>
            </div>
            <div style={styles.modalActions}>
              <button style={styles.modalCancel} onClick={() => setShowEditModal(false)}>
                Cancelar
              </button>
              <button style={styles.modalConfirm} onClick={() => setShowEditModal(false)}>
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Exclusão */}
      {showDeleteModal && (
        <div style={styles.modalOverlay}>
          <div style={{...styles.modal, maxWidth: '400px'}}>
            <h3 style={{...styles.modalTitle, color: '#dc2626'}}>Excluir Turma</h3>
            <div style={styles.modalContent}>
              <p>Tem certeza que deseja excluir a turma <strong>{turma.nome}</strong>?</p>
              <p style={styles.warningText}>Esta ação não pode ser desfeita. Todos os dados da turma serão perdidos.</p>
            </div>
            <div style={styles.modalActions}>
              <button style={styles.modalCancel} onClick={() => setShowDeleteModal(false)}>
                Cancelar
              </button>
              <button style={styles.modalDanger} onClick={handleConfirmDelete}>
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  headerActions: {
    display: 'flex',
    gap: '10px'
  },
  editButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  deleteButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
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
    padding: '20px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  infoLabel: {
    fontSize: '12px',
    color: '#6b7280',
    display: 'block'
  },
  infoValue: {
    fontSize: '20px',
    color: '#1f2937'
  },
  acessoSection: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '25px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  acessoHeader: {
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
  qrToggle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 15px',
    backgroundColor: '#f3f4f6',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px'
  },
  acessoContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  codigoBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#f3f4f6',
    padding: '12px 15px',
    borderRadius: '8px'
  },
  codigo: {
    flex: 1,
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2563eb'
  },
  copyButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '5px'
  },
  acessoLinks: {
    display: 'flex',
    gap: '10px'
  },
  linkButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 15px',
    backgroundColor: '#f3f4f6',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px'
  },
  qrDisplay: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px'
  },
  qrText: {
    margin: '10px 0 0',
    fontSize: '12px',
    color: '#6b7280'
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  tabTitle: {
    fontSize: '16px',
    margin: 0,
    color: '#1f2937'
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  mediaBadge: {
    padding: '4px 8px',
    borderRadius: '20px',
    fontSize: '12px'
  },
  tableAction: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '5px'
  },
  atividadesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  atividadeCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px'
  },
  atividadeInfo: {
    flex: 1
  },
  atividadeStats: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  entregas: {
    fontSize: '13px',
    color: '#6b7280'
  },
  atividadeStatus: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px'
  },
  configuracoes: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px'
  },
  configGroup: {
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '20px'
  },
  configItem: {
    marginBottom: '15px'
  },
  configInput: {
    width: '100%',
    padding: '10px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    marginTop: '5px'
  },
  configTextarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    marginTop: '5px',
    fontFamily: 'inherit'
  },
  regenerateButton: {
    padding: '10px 20px',
    backgroundColor: '#f59e0b',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '5px'
  },
  configNote: {
    fontSize: '12px',
    color: '#6b7280',
    marginTop: '5px'
  },
  dangerButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
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
    padding: '25px',
    maxWidth: '500px',
    width: '90%'
  },
  modalTitle: {
    fontSize: '18px',
    margin: '0 0 20px'
  },
  modalContent: {
    marginBottom: '20px'
  },
  modalField: {
    marginBottom: '15px'
  },
  modalInput: {
    width: '100%',
    padding: '10px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    marginTop: '5px'
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px'
  },
  modalCancel: {
    padding: '10px 20px',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  modalConfirm: {
    padding: '10px 20px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  modalDanger: {
    padding: '10px 20px',
    backgroundColor: '#dc2626',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  warningText: {
    fontSize: '13px',
    color: '#dc2626',
    marginTop: '10px'
  }
};