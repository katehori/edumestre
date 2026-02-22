import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { maskPhone, maskCPF, maskDate, unmask } from '../../utils/masks';
import { 
  User, Mail, Phone, Calendar, CreditCard, GraduationCap, 
  BookOpen, ChevronRight, ArrowLeft, Save, Plus, X 
} from 'lucide-react';

export default function ProfessorCadastro() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [materias, setMaterias] = useState([]);
  const [novaMateria, setNovaMateria] = useState('');
  
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    celular: '',
    dataNascimento: '',
    cpf: '',
    graduacao: '',
    registroProfissional: '',
    instituicao: '',
    anoConclusao: '',
    experiencia: ''
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
      case 'dataNascimento':
        formattedValue = maskDate(value);
        break;
      default:
        formattedValue = value;
    }
    
    setFormData({
      ...formData,
      [name]: formattedValue
    });
  };

  const adicionarMateria = () => {
    if (novaMateria.trim() && !materias.includes(novaMateria.trim())) {
      setMaterias([...materias, novaMateria.trim()]);
      setNovaMateria('');
    }
  };

  const removerMateria = (materia) => {
    setMaterias(materias.filter(m => m !== materia));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Remove máscaras antes de enviar
    const dataToSend = {
      ...formData,
      celular: unmask(formData.celular),
      cpf: unmask(formData.cpf),
      dataNascimento: unmask(formData.dataNascimento)
    };
    
    console.log('Dados do professor (sem máscara):', dataToSend);
    console.log('Matérias:', materias);
    
    // Redirecionar para o dashboard
    navigate('/professor');
  };

  const isStepValid = () => {
    if (step === 1) {
      return (
        formData.nomeCompleto &&
        formData.email &&
        formData.celular &&
        formData.dataNascimento &&
        formData.cpf
      );
    }
    if (step === 2) {
      return (
        formData.graduacao &&
        formData.instituicao &&
        formData.anoConclusao &&
        formData.experiencia
      );
    }
    return true;
  };

  return (
    <Layout perfil="professor" nome="Novo Professor">
      <div style={styles.container}>
        {/* Cabeçalho */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <button style={styles.backButton} onClick={() => navigate('/')}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 style={styles.title}>📝 Cadastro do Professor</h2>
              <p style={styles.subtitle}>Preencha seus dados para começar a usar o EduMestre</p>
            </div>
          </div>
          <div style={styles.steps}>
            <div style={{ ...styles.step, ...(step >= 1 ? styles.stepActive : {}) }}>
              <span>1</span>
              <span style={styles.stepLabel}>Dados Pessoais</span>
            </div>
            <div style={styles.stepLine} />
            <div style={{ ...styles.step, ...(step >= 2 ? styles.stepActive : {}) }}>
              <span>2</span>
              <span style={styles.stepLabel}>Formação</span>
            </div>
            <div style={styles.stepLine} />
            <div style={{ ...styles.step, ...(step >= 3 ? styles.stepActive : {}) }}>
              <span>3</span>
              <span style={styles.stepLabel}>Disciplinas</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* PASSO 1: Dados Pessoais */}
          {step === 1 && (
            <div style={styles.stepContent}>
              <div style={styles.formGrid}>
                <div style={{ ...styles.inputGroup, gridColumn: 'span 2' }}>
                  <label style={styles.label}>
                    <User size={16} style={styles.inputIcon} />
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    name="nomeCompleto"
                    placeholder="Digite seu nome completo"
                    style={styles.input}
                    value={formData.nomeCompleto}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    <Mail size={16} style={styles.inputIcon} />
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="seu@email.com"
                    style={styles.input}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    <Phone size={16} style={styles.inputIcon} />
                    Celular
                  </label>
                  <input
                    type="tel"
                    name="celular"
                    placeholder="(11) 99999-9999"
                    style={styles.input}
                    value={formData.celular}
                    onChange={handleChange}
                    required
                  />
                  <span style={styles.inputHint}>Digite apenas números</span>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    <Calendar size={16} style={styles.inputIcon} />
                    Data de Nascimento
                  </label>
                  <input
                    type="text"
                    name="dataNascimento"
                    placeholder="DD/MM/AAAA"
                    style={styles.input}
                    value={formData.dataNascimento}
                    onChange={handleChange}
                    maxLength="10"
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    <CreditCard size={16} style={styles.inputIcon} />
                    CPF
                  </label>
                  <input
                    type="text"
                    name="cpf"
                    placeholder="000.000.000-00"
                    style={styles.input}
                    value={formData.cpf}
                    onChange={handleChange}
                    maxLength="14"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* PASSO 2: Formação */}
          {step === 2 && (
            <div style={styles.stepContent}>
              <div style={styles.formGrid}>
                <div style={{ ...styles.inputGroup, gridColumn: 'span 2' }}>
                  <label style={styles.label}>
                    <GraduationCap size={16} style={styles.inputIcon} />
                    Graduação
                  </label>
                  <input
                    type="text"
                    name="graduacao"
                    placeholder="Ex: Licenciatura em Matemática"
                    style={styles.input}
                    value={formData.graduacao}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    <CreditCard size={16} style={styles.inputIcon} />
                    Registro Profissional
                  </label>
                  <input
                    type="text"
                    name="registroProfissional"
                    placeholder="Ex: 123456"
                    style={styles.input}
                    value={formData.registroProfissional}
                    onChange={handleChange}
                  />
                </div>

                <div style={{ ...styles.inputGroup, gridColumn: 'span 2' }}>
                  <label style={styles.label}>
                    <BookOpen size={16} style={styles.inputIcon} />
                    Instituição de Formação
                  </label>
                  <input
                    type="text"
                    name="instituicao"
                    placeholder="Nome da universidade"
                    style={styles.input}
                    value={formData.instituicao}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    <Calendar size={16} style={styles.inputIcon} />
                    Ano de Conclusão
                  </label>
                  <input
                    type="number"
                    name="anoConclusao"
                    placeholder="2020"
                    min="1950"
                    max="2025"
                    style={styles.input}
                    value={formData.anoConclusao}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    Tempo de Experiência
                  </label>
                  <select
                    name="experiencia"
                    style={styles.input}
                    value={formData.experiencia}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="menos1">Menos de 1 ano</option>
                    <option value="1-3">1 a 3 anos</option>
                    <option value="3-5">3 a 5 anos</option>
                    <option value="5-10">5 a 10 anos</option>
                    <option value="mais10">Mais de 10 anos</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* PASSO 3: Disciplinas */}
          {step === 3 && (
            <div style={styles.stepContent}>
              <div style={styles.materiasSection}>
                <label style={styles.label}>Disciplinas que leciona</label>
                <p style={styles.materiasDesc}>Adicione as matérias que você ministra</p>
                
                <div style={styles.materiasInput}>
                  <input
                    type="text"
                    placeholder="Ex: Matemática"
                    style={{ ...styles.input, flex: 1 }}
                    value={novaMateria}
                    onChange={(e) => setNovaMateria(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), adicionarMateria())}
                  />
                  <button 
                    type="button"
                    style={styles.addMateriaBtn}
                    onClick={adicionarMateria}
                  >
                    <Plus size={20} />
                  </button>
                </div>

                <div style={styles.materiasList}>
                  {materias.map((materia, index) => (
                    <div key={index} style={styles.materiaTag}>
                      <span>{materia}</span>
                      <button 
                        type="button"
                        style={styles.removeMateria}
                        onClick={() => removerMateria(materia)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  {materias.length === 0 && (
                    <p style={styles.noMaterias}>Nenhuma disciplina adicionada ainda</p>
                  )}
                </div>

                <div style={styles.materiasSugestoes}>
                  <p style={styles.sugestoesLabel}>Sugestões:</p>
                  <div style={styles.sugestoes}>
                    {['Matemática', 'Português', 'Ciências', 'História', 'Geografia', 'Inglês'].map(sug => (
                      <button
                        key={sug}
                        type="button"
                        style={styles.sugestaoBtn}
                        onClick={() => {
                          if (!materias.includes(sug)) {
                            setMaterias([...materias, sug]);
                          }
                        }}
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navegação */}
          <div style={styles.navigation}>
            {step > 1 && (
              <button 
                type="button"
                style={styles.prevButton}
                onClick={() => setStep(step - 1)}
              >
                Voltar
              </button>
            )}
            
            {step < 3 ? (
              <button 
                type="button"
                style={{
                  ...styles.nextButton,
                  opacity: isStepValid() ? 1 : 0.5,
                  cursor: isStepValid() ? 'pointer' : 'not-allowed'
                }}
                onClick={() => isStepValid() && setStep(step + 1)}
                disabled={!isStepValid()}
              >
                Próximo <ChevronRight size={18} />
              </button>
            ) : (
              <button 
                type="submit"
                style={styles.submitButton}
              >
                <Save size={18} />
                Finalizar Cadastro
              </button>
            )}
          </div>
        </form>

        {/* Termos */}
        <div style={styles.termos}>
          <input type="checkbox" id="termos" required />
          <label htmlFor="termos">
            Li e aceito os <a href="#">Termos de Uso</a> e <a href="#">Política de Privacidade</a>
          </label>
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
    marginBottom: '30px'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '20px'
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
  steps: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px'
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 15px',
    backgroundColor: '#f3f4f6',
    borderRadius: '30px',
    fontSize: '14px',
    color: '#9ca3af'
  },
  stepActive: {
    backgroundColor: '#2563eb',
    color: 'white'
  },
  stepLine: {
    width: '40px',
    height: '2px',
    backgroundColor: '#e5e7eb'
  },
  stepLabel: {
    fontSize: '13px'
  },
  form: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    marginBottom: '20px'
  },
  stepContent: {
    marginBottom: '30px'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px'
  },
  inputGroup: {
    marginBottom: '5px'
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#4b5563',
    marginBottom: '8px'
  },
  inputIcon: {
    color: '#9ca3af'
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s'
  },
  inputHint: {
    fontSize: '11px',
    color: '#9ca3af',
    marginTop: '4px',
    display: 'block'
  },
  materiasSection: {
    padding: '10px 0'
  },
  materiasDesc: {
    fontSize: '13px',
    color: '#6b7280',
    margin: '5px 0 15px'
  },
  materiasInput: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },
  addMateriaBtn: {
    width: '45px',
    height: '45px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  materiasList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '20px',
    minHeight: '50px'
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6b7280'
  },
  noMaterias: {
    color: '#9ca3af',
    fontSize: '13px',
    fontStyle: 'italic'
  },
  materiasSugestoes: {
    borderTop: '1px solid #e5e7eb',
    paddingTop: '20px'
  },
  sugestoesLabel: {
    fontSize: '13px',
    color: '#4b5563',
    marginBottom: '10px'
  },
  sugestoes: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  sugestaoBtn: {
    padding: '6px 12px',
    backgroundColor: '#f3f4f6',
    border: '1px solid #e5e7eb',
    borderRadius: '20px',
    fontSize: '12px',
    cursor: 'pointer'
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '15px'
  },
  prevButton: {
    padding: '12px 30px',
    backgroundColor: 'white',
    color: '#4b5563',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  nextButton: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px'
  },
  submitButton: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  termos: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '13px',
    color: '#6b7280'
  }
};