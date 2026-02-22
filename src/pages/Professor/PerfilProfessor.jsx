import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import AvatarUpload from '../../components/AvatarUpload';
import { maskPhone, maskCPF, unmask } from '../../utils/masks';
import { 
  ArrowLeft, Save, User, Mail, Phone, Calendar, 
  CreditCard, GraduationCap, BookOpen, MapPin, 
  Briefcase, Globe, Github, Linkedin, X, Plus
} from 'lucide-react';

export default function PerfilProfessor() {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [redesSociais, setRedesSociais] = useState([]);
  const [novaRede, setNovaRede] = useState({ nome: '', url: '' });

  const [formData, setFormData] = useState({
    // Dados Pessoais
    nomeCompleto: 'Carlos Eduardo Silva',
    email: 'carlos.silva@escola.edu.br',
    celular: '(11) 98765-4321',
    dataNascimento: '15/05/1985',
    cpf: '123.456.789-00',
    
    // Dados Profissionais
    registroProfissional: '123456',
    graduacao: 'Licenciatura em Matemática',
    instituicao: 'Universidade de São Paulo',
    anoConclusao: '2008',
    experiencia: 'mais10',
    
    // Localização
    endereco: 'Rua das Flores, 123',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01234-567',
    
    // Biografia
    biografia: 'Professor de Matemática há 15 anos, apaixonado por educação e tecnologia. Especialista em ensino de frações e geometria.',
    
    // Disciplinas
    materias: ['Matemática', 'Física', 'Cálculo']
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Aplica máscaras específicas
    let formattedValue = value;
    switch (name) {
      case 'celular':
        formattedValue = maskPhone(value);
        break;
      case 'cpf':
        formattedValue = maskCPF(value);
        break;
      default:
        formattedValue = value;
    }
    
    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSave = () => {
    // Lógica para salvar
    console.log('Dados salvos:', formData);
    setEditMode(false);
  };

  const adicionarRedeSocial = () => {
    if (novaRede.nome && novaRede.url) {
      setRedesSociais([...redesSociais, novaRede]);
      setNovaRede({ nome: '', url: '' });
    }
  };

  const removerRedeSocial = (index) => {
    setRedesSociais(redesSociais.filter((_, i) => i !== index));
  };

  return (
    <Layout perfil="professor" nome={formData.nomeCompleto} turmaInfo="Coordenador - Matemática">
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <button style={styles.backButton} onClick={() => navigate('/professor')}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 style={styles.title}>Meu perfil</h2>
              <p style={styles.subtitle}>Gerencie suas informações pessoais e profissionais</p>
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
              <div style={styles.formGroup}>
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
                  type="text"
                  name="dataNascimento"
                  style={{...styles.input, ...(!editMode && styles.inputDisabled)}}
                  value={formData.dataNascimento}
                  onChange={handleChange}
                  disabled={!editMode}
                  placeholder="DD/MM/AAAA"
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

          {/* Seção: Dados Profissionais */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>
              <Briefcase size={18} color="#10b981" />
              Dados Profissionais
            </h3>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Registro Profissional</label>
                <input
                  type="text"
                  name="registroProfissional"
                  style={{...styles.input, ...(!editMode && styles.inputDisabled)}}
                  value={formData.registroProfissional}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Graduação</label>
                <input
                  type="text"
                  name="graduacao"
                  style={{...styles.input, ...(!editMode && styles.inputDisabled)}}
                  value={formData.graduacao}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Instituição</label>
                <input
                  type="text"
                  name="instituicao"
                  style={{...styles.input, ...(!editMode && styles.inputDisabled)}}
                  value={formData.instituicao}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Ano de Conclusão</label>
                <input
                  type="text"
                  name="anoConclusao"
                  style={{...styles.input, ...(!editMode && styles.inputDisabled)}}
                  value={formData.anoConclusao}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Tempo de Experiência</label>
                <select
                  name="experiencia"
                  style={{...styles.input, ...(!editMode && styles.inputDisabled)}}
                  value={formData.experiencia}
                  onChange={handleChange}
                  disabled={!editMode}
                >
                  <option value="menos1">Menos de 1 ano</option>
                  <option value="1-3">1 a 3 anos</option>
                  <option value="3-5">3 a 5 anos</option>
                  <option value="5-10">5 a 10 anos</option>
                  <option value="mais10">Mais de 10 anos</option>
                </select>
              </div>
            </div>
          </div>

          {/* Seção: Disciplinas */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>
              <BookOpen size={18} color="#f59e0b" />
              Disciplinas que Leciona
            </h3>
            <div style={styles.materiasList}>
              {formData.materias.map((materia, index) => (
                <div key={index} style={styles.materiaTag}>
                  <span>{materia}</span>
                  {editMode && (
                    <button 
                      style={styles.removeMateria}
                      onClick={() => {
                        const novasMaterias = formData.materias.filter((_, i) => i !== index);
                        setFormData({ ...formData, materias: novasMaterias });
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
                    placeholder="Nova disciplina"
                    style={styles.materiaInput}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const nova = e.target.value;
                        if (nova && !formData.materias.includes(nova)) {
                          setFormData({
                            ...formData,
                            materias: [...formData.materias, nova]
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
                  <option value="ES">Espírito Santo</option>
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

          {/* Seção: Biografia */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>
              <GraduationCap size={18} color="#ec4899" />
              Biografia
            </h3>
            <textarea
              name="biografia"
              style={{...styles.textarea, ...(!editMode && styles.inputDisabled)}}
              rows="4"
              value={formData.biografia}
              onChange={handleChange}
              disabled={!editMode}
            />
          </div>

          {/* Seção: Redes Sociais */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>
              <Globe size={18} color="#3b82f6" />
              Redes Sociais
            </h3>
            
            {redesSociais.map((rede, index) => (
              <div key={index} style={styles.redeSocialItem}>
                {rede.nome === 'github' && <Github size={18} />}
                {rede.nome === 'linkedin' && <Linkedin size={18} />}
                <span>{rede.url}</span>
                {editMode && (
                  <button 
                    style={styles.removeRede}
                    onClick={() => removerRedeSocial(index)}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}

            {editMode && (
              <div style={styles.addRedeSocial}>
                <select
                  style={styles.redeSelect}
                  value={novaRede.nome}
                  onChange={(e) => setNovaRede({ ...novaRede, nome: e.target.value })}
                >
                  <option value="">Selecione...</option>
                  <option value="github">GitHub</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="lattes">Lattes</option>
                </select>
                <input
                  type="text"
                  placeholder="URL do perfil"
                  style={styles.redeInput}
                  value={novaRede.url}
                  onChange={(e) => setNovaRede({ ...novaRede, url: e.target.value })}
                />
                <button style={styles.addRedeButton} onClick={adicionarRedeSocial}>
                  <Plus size={16} />
                </button>
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

      {/* Modal de Exclusão de Conta */}
      {showDeleteModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitle}>Excluir Conta</h3>
            <p style={styles.modalText}>
              Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita e 
              todos os seus dados, turmas, publicações e atividades serão permanentemente removidos.
            </p>
            <div style={styles.modalActions}>
              <button style={styles.modalCancel} onClick={() => setShowDeleteModal(false)}>
                Cancelar
              </button>
              <button style={styles.modalConfirm} onClick={() => {
                // Lógica de exclusão
                setShowDeleteModal(false);
                navigate('/');
              }}>
                Sim, excluir minha conta
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
  textarea: {
    width: '100%',
    padding: '12px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    fontSize: '13px',
    outline: 'none',
    fontFamily: 'inherit'
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
  redeSocialItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    backgroundColor: '#f9fafb',
    borderRadius: '6px',
    marginBottom: '8px'
  },
  removeRede: {
    marginLeft: 'auto',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#dc2626'
  },
  addRedeSocial: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px'
  },
  redeSelect: {
    width: '120px',
    padding: '8px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    fontSize: '13px',
    outline: 'none'
  },
  redeInput: {
    flex: 1,
    padding: '8px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    fontSize: '13px',
    outline: 'none'
  },
  addRedeButton: {
    width: '40px',
    height: '40px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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