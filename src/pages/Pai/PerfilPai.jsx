import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import AvatarUpload from '../../components/AvatarUpload';
import { maskPhone, maskCPF, unmask } from '../../utils/masks';
import { 
  ArrowLeft, Save, User, Mail, Phone, Calendar, 
  CreditCard, MapPin, Users, Heart, X, Plus
} from 'lucide-react';

export default function PerfilPai() {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const [formData, setFormData] = useState({
    // Dados Pessoais
    nomeCompleto: 'Carlos Antonio Silva',
    email: 'carlos.silva@email.com',
    celular: '(11) 99876-5432',
    dataNascimento: '15/05/1980',
    cpf: '123.456.789-00',
    
    // Localização
    endereco: 'Rua das Flores, 123',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01234-567',
    
    // Filhos
    filhos: [
      { id: 1, nome: 'João Silva', turma: '6º Ano A', escola: 'EMEF Professor Carlos' },
      { id: 2, nome: 'Maria Silva', turma: '4º Ano B', escola: 'EMEF Professor Carlos' }
    ]
  });

  const [novoFilho, setNovoFilho] = useState({
    nome: '',
    turma: '',
    escola: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    if (name === 'celular') {
      formattedValue = maskPhone(value);
    } else if (name === 'cpf') {
      formattedValue = maskCPF(value);
    }
    
    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSave = () => {
    console.log('Dados salvos:', formData);
    setEditMode(false);
  };

  const adicionarFilho = () => {
    if (novoFilho.nome && novoFilho.turma) {
      setFormData({
        ...formData,
        filhos: [...formData.filhos, { ...novoFilho, id: Date.now() }]
      });
      setNovoFilho({ nome: '', turma: '', escola: '' });
    }
  };

  const removerFilho = (id) => {
    setFormData({
      ...formData,
      filhos: formData.filhos.filter(f => f.id !== id)
    });
  };

  return (
    <Layout perfil="pai" nome={formData.nomeCompleto} turmaInfo="Responsável por 2 alunos">
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <button style={styles.backButton} onClick={() => navigate('/pai')}>
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

              <div style={styles.formGroup}>
                <label style={styles.label}>CPF</label>
                <input
                  type="text"
                  name="cpf"
                  style={{...styles.input, ...(!editMode && styles.inputDisabled)}}
                  value={formData.cpf}
                  onChange={handleChange}
                  disabled={!editMode}
                  maxLength="14"
                />
              </div>
            </div>
          </div>

          {/* Seção: Localização */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>
              <MapPin size={18} color="#10b981" />
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

          {/* Seção: Filhos */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>
              <Heart size={18} color="#f59e0b" />
              Meus Filhos
            </h3>
            
            {formData.filhos.map(filho => (
              <div key={filho.id} style={styles.filhoItem}>
                <div style={styles.filhoAvatar}>
                  {filho.nome.charAt(0)}
                </div>
                <div style={styles.filhoInfo}>
                  <strong>{filho.nome}</strong>
                  <span>{filho.turma} • {filho.escola}</span>
                </div>
                {editMode && (
                  <button 
                    style={styles.removeFilho}
                    onClick={() => removerFilho(filho.id)}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}

            {editMode && (
              <div style={styles.addFilhoSection}>
                <h4 style={styles.addFilhoTitle}>Adicionar Filho</h4>
                <div style={styles.addFilhoForm}>
                  <input
                    type="text"
                    placeholder="Nome do filho"
                    style={styles.filhoInput}
                    value={novoFilho.nome}
                    onChange={(e) => setNovoFilho({ ...novoFilho, nome: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Turma"
                    style={styles.filhoInput}
                    value={novoFilho.turma}
                    onChange={(e) => setNovoFilho({ ...novoFilho, turma: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Escola"
                    style={styles.filhoInput}
                    value={novoFilho.escola}
                    onChange={(e) => setNovoFilho({ ...novoFilho, escola: e.target.value })}
                  />
                  <button style={styles.addFilhoButton} onClick={adicionarFilho}>
                    <Plus size={16} />
                    Adicionar
                  </button>
                </div>
              </div>
            )}
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

// Reutilizar estilos dos perfis anteriores
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
  filhoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '12px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    marginBottom: '10px'
  },
  filhoAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '20px',
    backgroundColor: '#10b981',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 'bold'
  },
  filhoInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  removeFilho: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#dc2626'
  },
  addFilhoSection: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#f3f4f6',
    borderRadius: '8px'
  },
  addFilhoTitle: {
    fontSize: '14px',
    margin: '0 0 15px',
    color: '#1f2937'
  },
  addFilhoForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  filhoInput: {
    padding: '10px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    fontSize: '13px',
    outline: 'none'
  },
  addFilhoButton: {
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
    fontSize: '13px'
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