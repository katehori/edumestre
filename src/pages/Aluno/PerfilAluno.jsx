import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import AvatarUpload from '../../components/AvatarUpload';
import { maskPhone, unmask } from '../../utils/masks';
import { 
  ArrowLeft, Save, User, Mail, Phone, Calendar, 
  MapPin, BookOpen, Users, Award, X
} from 'lucide-react';

export default function PerfilAluno() {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const [formData, setFormData] = useState({
    // Dados Pessoais
    nomeCompleto: 'João Silva',
    email: 'joao.silva@email.com',
    celular: '(11) 98765-4321',
    dataNascimento: '15/05/2012',
    
    // Dados Escolares
    serie: '6º ano',
    turma: '6º Ano A',
    escola: 'EMEF Professor Carlos',
    matricula: '2026001',
    responsavel: 'Carlos Silva',
    telefoneResponsavel: '(11) 99876-5432',
    
    // Localização
    endereco: 'Rua das Flores, 123',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01234-567',
    
    // Interesses
    interesses: ['Matemática', 'Ciências', 'Tecnologia']
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    if (name === 'celular' || name === 'telefoneResponsavel') {
      formattedValue = maskPhone(value);
    }
    
    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSave = () => {
    console.log('Dados salvos:', formData);
    setEditMode(false);
  };

  return (
    <Layout perfil="aluno" nome={formData.nomeCompleto} turmaInfo={formData.turma}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <button style={styles.backButton} onClick={() => navigate('/aluno')}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 style={styles.title}>Meu perfil</h2>
              <p style={styles.subtitle}>Gerencie suas informações pessoais</p>
            </div>
          </div>
          <div style={styles.headerActions}>
            {!editMode ? (
              <button style={styles.editButton} onClick={() => setEditMode(true)}>
                Editar Perfil
              </button>
            ) : (
              <>
                <button style={styles.cancelButton} onClick={() => setEditMode(false)}>
                  Cancelar
                </button>
                <button style={styles.saveButton} onClick={handleSave}>
                  <Save size={16} />
                  Salvar Alterações
                </button>
              </>
            )}
          </div>
        </div>

        {/* Avatar */}
        <AvatarUpload 
          currentAvatar={avatar}
          nome={formData.nomeCompleto}
          onAvatarChange={setAvatar}
        />

        {/* Informações do Perfil */}
        <div style={styles.profileCard}>
          {/* Estatísticas Rápidas */}
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <Award size={20} color="#f59e0b" />
              <div>
                <span style={styles.statLabel}>Pontos</span>
                <strong style={styles.statValue}>1.250</strong>
              </div>
            </div>
            <div style={styles.statCard}>
              <BookOpen size={20} color="#3b82f6" />
              <div>
                <span style={styles.statLabel}>Atividades</span>
                <strong style={styles.statValue}>12</strong>
              </div>
            </div>
            <div style={styles.statCard}>
              <Award size={20} color="#10b981" />
              <div>
                <span style={styles.statLabel}>Média</span>
                <strong style={styles.statValue}>8.5</strong>
              </div>
            </div>
          </div>

          {/* Seção: Dados Pessoais */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>
              <User size={18} color="#2563eb" />
              Dados Pessoais
            </h3>
            <div style={styles.formGrid}>
              <div style={{...styles.formGroup, gridColumn: 'span 2'}}>
                <label style={styles.label}>Nome Completo</label>
                <input
                  type="text"
                  name="nomeCompleto"
                  style={{...styles.input, ...(!editMode && styles.inputDisabled)}}
                  value={formData.nomeCompleto}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>E-mail</label>
                <input
                  type="email"
                  name="email"
                  style={{...styles.input, ...(!editMode && styles.inputDisabled)}}
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Celular</label>
                <input
                  type="text"
                  name="celular"
                  style={{...styles.input, ...(!editMode && styles.inputDisabled)}}
                  value={formData.celular}
                  onChange={handleChange}
                  disabled={!editMode}
                  maxLength="15"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Data de Nascimento</label>
                <input
                  type="date"
                  name="dataNascimento"
                  style={{...styles.input, ...(!editMode && styles.inputDisabled)}}
                  value={formData.dataNascimento}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
            </div>
          </div>

          {/* Seção: Dados Escolares */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>
              <BookOpen size={18} color="#10b981" />
              Dados Escolares
            </h3>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Série/Ano</label>
                <input
                  type="text"
                  name="serie"
                  style={{...styles.input, ...(!editMode && styles.inputDisabled)}}
                  value={formData.serie}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Turma</label>
                <input
                  type="text"
                  name="turma"
                  style={{...styles.input, ...(!editMode && styles.inputDisabled)}}
                  value={formData.turma}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>

              <div style={{...styles.formGroup, gridColumn: 'span 2'}}>
                <label style={styles.label}>Escola</label>
                <input
                  type="text"
                  name="escola"
                  style={{...styles.input, ...(!editMode && styles.inputDisabled)}}
                  value={formData.escola}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Matrícula</label>
                <input
                  type="text"
                  name="matricula"
                  style={{...styles.input, ...(!editMode && styles.inputDisabled)}}
                  value={formData.matricula}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
            </div>
          </div>

          {/* Seção: Responsável */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>
              <Users size={18} color="#f59e0b" />
              Dados do Responsável
            </h3>
            <div style={styles.formGrid}>
              <div style={{...styles.formGroup, gridColumn: 'span 2'}}>
                <label style={styles.label}>Nome do Responsável</label>
                <input
                  type="text"
                  name="responsavel"
                  style={{...styles.input, ...(!editMode && styles.inputDisabled)}}
                  value={formData.responsavel}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Telefone do Responsável</label>
                <input
                  type="text"
                  name="telefoneResponsavel"
                  style={{...styles.input, ...(!editMode && styles.inputDisabled)}}
                  value={formData.telefoneResponsavel}
                  onChange={handleChange}
                  disabled={!editMode}
                  maxLength="15"
                />
              </div>
            </div>
          </div>

          {/* Seção: Localização */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>
              <MapPin size={18} color="#8b5cf6" />
              Localização
            </h3>
            <div style={styles.formGrid}>
              <div style={{...styles.formGroup, gridColumn: 'span 2'}}>
                <label style={styles.label}>Endereço</label>
                <input
                  type="text"
                  name="endereco"
                  style={{...styles.input, ...(!editMode && styles.inputDisabled)}}
                  value={formData.endereco}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Cidade</label>
                <input
                  type="text"
                  name="cidade"
                  style={{...styles.input, ...(!editMode && styles.inputDisabled)}}
                  value={formData.cidade}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Estado</label>
                <select
                  name="estado"
                  style={{...styles.input, ...(!editMode && styles.inputDisabled)}}
                  value={formData.estado}
                  onChange={handleChange}
                  disabled={!editMode}
                >
                  <option value="SP">São Paulo</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="MG">Minas Gerais</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>CEP</label>
                <input
                  type="text"
                  name="cep"
                  style={{...styles.input, ...(!editMode && styles.inputDisabled)}}
                  value={formData.cep}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
            </div>
          </div>

          {/* Seção: Interesses */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>
              <Award size={18} color="#ec4899" />
              Interesses
            </h3>
            <div style={styles.materiasList}>
              {formData.interesses.map((interesse, index) => (
                <div key={index} style={styles.materiaTag}>
                  <span>{interesse}</span>
                  {editMode && (
                    <button 
                      style={styles.removeMateria}
                      onClick={() => {
                        const novosInteresses = formData.interesses.filter((_, i) => i !== index);
                        setFormData({ ...formData, interesses: novosInteresses });
                      }}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
              
              {editMode && (
                <div style={styles.addMateria}>
                  <input
                    type="text"
                    placeholder="Novo interesse"
                    style={styles.materiaInput}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const novo = e.target.value;
                        if (novo && !formData.interesses.includes(novo)) {
                          setFormData({
                            ...formData,
                            interesses: [...formData.interesses, novo]
                          });
                          e.target.value = '';
                        }
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Zona de Perigo */}
        {editMode && (
          <div style={styles.dangerZone}>
            <h3 style={styles.dangerTitle}>⚠️ Zona de Perigo</h3>
            <div style={styles.dangerContent}>
              <div>
                <strong>Excluir conta</strong>
                <p>Uma vez excluída, todos os seus dados serão permanentemente removidos.</p>
              </div>
              <button 
                style={styles.dangerButton}
                onClick={() => setShowDeleteModal(true)}
              >
                Excluir Conta
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Exclusão */}
      {showDeleteModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitle}>Excluir Conta</h3>
            <p style={styles.modalText}>
              Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.
            </p>
            <div style={styles.modalActions}>
              <button style={styles.modalCancel} onClick={() => setShowDeleteModal(false)}>
                Cancelar
              </button>
              <button style={styles.modalConfirm} onClick={() => {
                setShowDeleteModal(false);
                navigate('/');
              }}>
                Sim, excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

// Reutilizar estilos do perfil do professor
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
    padding: '12px 24px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  cancelButton: {
    padding: '12px 24px',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  saveButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
    marginBottom: '30px'
  },
  statCard: {
    backgroundColor: '#f9fafb',
    padding: '15px',
    borderRadius: '10px',
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
  section: {
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '1px solid #e5e7eb'
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '16px',
    margin: '0 0 20px',
    color: '#1f2937'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px'
  },
  formGroup: {
    marginBottom: '5px'
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '500',
    color: '#4b5563',
    marginBottom: '5px'
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    fontSize: '13px',
    outline: 'none'
  },
  inputDisabled: {
    backgroundColor: '#f9fafb',
    color: '#4b5563',
    borderColor: '#e5e7eb',
    cursor: 'not-allowed'
  },
  materiasList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px'
  },
  materiaTag: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '6px 12px',
    backgroundColor: '#e5e7eb',
    borderRadius: '20px',
    fontSize: '13px'
  },
  removeMateria: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '2px',
    color: '#6b7280'
  },
  addMateria: {
    marginTop: '10px'
  },
  materiaInput: {
    padding: '8px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: '20px',
    fontSize: '13px',
    outline: 'none',
    width: '200px'
  },
  dangerZone: {
    marginTop: '20px',
    backgroundColor: '#fee2e2',
    borderRadius: '12px',
    padding: '20px'
  },
  dangerTitle: {
    fontSize: '16px',
    color: '#dc2626',
    margin: '0 0 15px'
  },
  dangerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dangerButton: {
    padding: '10px 20px',
    backgroundColor: '#dc2626',
    color: 'white',
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
    margin: '0 0 15px',
    color: '#1f2937'
  },
  modalText: {
    fontSize: '14px',
    color: '#4b5563',
    marginBottom: '20px',
    lineHeight: '1.6'
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
    backgroundColor: '#dc2626',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};