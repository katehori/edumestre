import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { maskPhone, maskCPF, maskDate, unmask } from '../../utils/masks';
import { 
  User, Mail, Phone, Calendar, CreditCard, Users, 
  ArrowLeft, Save, Plus, X, Search, CheckCircle 
} from 'lucide-react';

export default function ResponsavelCadastro() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [filhos, setFilhos] = useState([]);
  const [buscandoAluno, setBuscandoAluno] = useState('');
  const [alunoEncontrado, setAlunoEncontrado] = useState(null);

  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    celular: '',
    dataNascimento: '',
    cpf: ''
  });

  // Mock de alunos para demonstração
  const alunosMock = [
    { id: 1, nome: 'João Silva', turma: '6º Ano A', escola: 'EMEF Professor Carlos', codigo: 'ALUNO123' },
    { id: 2, nome: 'Maria Silva', turma: '4º Ano B', escola: 'EMEF Professor Carlos', codigo: 'ALUNO456' },
    { id: 3, nome: 'Pedro Santos', turma: '7º Ano B', escola: 'EMEF Professor Carlos', codigo: 'ALUNO789' },
  ];

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

  const buscarAluno = () => {
    if (!buscandoAluno.trim()) return;
    
    // Simula busca no banco
    setTimeout(() => {
      const encontrado = alunosMock.find(a => 
        a.nome.toLowerCase().includes(buscandoAluno.toLowerCase()) ||
        a.codigo === buscandoAluno.toUpperCase()
      );
      setAlunoEncontrado(encontrado);
    }, 500);
  };

  const adicionarFilho = () => {
    if (alunoEncontrado && !filhos.find(f => f.id === alunoEncontrado.id)) {
      setFilhos([...filhos, alunoEncontrado]);
      setAlunoEncontrado(null);
      setBuscandoAluno('');
    }
  };

  const removerFilho = (id) => {
    setFilhos(filhos.filter(f => f.id !== id));
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
    
    console.log('Dados do responsável (sem máscara):', dataToSend);
    console.log('Filhos:', filhos);
    
    navigate('/pai');
  };

  const isStep1Valid = () => {
    return (
      formData.nomeCompleto &&
      formData.email &&
      formData.celular &&
      formData.dataNascimento &&
      formData.cpf
    );
  };

  return (
    <Layout perfil="pai" nome="Novo Responsável">
      <div style={styles.container}>
        {/* Cabeçalho */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <button style={styles.backButton} onClick={() => navigate('/')}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 style={styles.title}>Cadastro do Responsável</h2>
              <p style={styles.subtitle}>Cadastre-se para acompanhar a vida escolar dos seus filhos</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* PASSO 1: Dados do Responsável */}
          {step === 1 && (
            <div style={styles.stepContent}>
              <h3 style={styles.stepTitle}>Dados Pessoais</h3>
              
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
                    maxLength="15"
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

              <button 
                type="button"
                style={{
                  ...styles.nextButton,
                  opacity: isStep1Valid() ? 1 : 0.5,
                  cursor: isStep1Valid() ? 'pointer' : 'not-allowed'
                }}
                onClick={() => isStep1Valid() && setStep(2)}
                disabled={!isStep1Valid()}
              >
                Próximo: Vincular Filhos
              </button>
            </div>
          )}

          {/* PASSO 2: Vincular Filhos */}
          {step === 2 && (
            <div style={styles.stepContent}>
              <h3 style={styles.stepTitle}>👨‍👩‍👧‍👦 Vincular Filhos</h3>
              <p style={styles.stepDesc}>
                Adicione seus filhos para acompanhar o desempenho escolar deles
              </p>

              {/* Buscar aluno */}
              <div style={styles.buscarSection}>
                <label style={styles.label}>Buscar aluno por nome ou código</label>
                <div style={styles.searchBox}>
                  <input
                    type="text"
                    placeholder="Digite o nome ou código do aluno"
                    style={styles.searchInput}
                    value={buscandoAluno}
                    onChange={(e) => setBuscandoAluno(e.target.value)}
                  />
                  <button 
                    type="button"
                    style={styles.searchButton}
                    onClick={buscarAluno}
                  >
                    <Search size={18} />
                    Buscar
                  </button>
                </div>

                {alunoEncontrado && (
                  <div style={styles.alunoEncontrado}>
                    <div style={styles.alunoInfo}>
                      <strong>{alunoEncontrado.nome}</strong>
                      <p>{alunoEncontrado.turma} • {alunoEncontrado.escola}</p>
                    </div>
                    <button 
                      type="button"
                      style={styles.adicionarBtn}
                      onClick={adicionarFilho}
                    >
                      <Plus size={16} />
                      Adicionar
                    </button>
                  </div>
                )}
              </div>

              {/* Lista de filhos adicionados */}
              {filhos.length > 0 && (
                <div style={styles.filhosSection}>
                  <h4 style={styles.filhosTitle}>Filhos vinculados</h4>
                  {filhos.map(filho => (
                    <div key={filho.id} style={styles.filhoItem}>
                      <div style={styles.filhoInfo}>
                        <CheckCircle size={18} color="#10b981" />
                        <div>
                          <strong>{filho.nome}</strong>
                          <p>{filho.turma}</p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        style={styles.removerFilhoBtn}
                        onClick={() => removerFilho(filho.id)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {filhos.length === 0 && (
                <div style={styles.noFilhos}>
                  <Users size={40} color="#9ca3af" />
                  <p>Nenhum filho vinculado ainda</p>
                  <span>Busque e adicione seus filhos acima</span>
                </div>
              )}
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
            
            {step === 2 ? (
              <button 
                type="submit"
                style={{
                  ...styles.submitButton,
                  opacity: filhos.length > 0 ? 1 : 0.5,
                  cursor: filhos.length > 0 ? 'pointer' : 'not-allowed'
                }}
                disabled={filhos.length === 0}
              >
                <Save size={18} />
                Finalizar Cadastro
              </button>
            ) : (
              <div style={{ flex: 1 }} />
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
  stepTitle: {
    fontSize: '18px',
    margin: '0 0 10px',
    color: '#1f2937'
  },
  stepDesc: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '25px'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginBottom: '20px'
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
    outline: 'none'
  },
  inputHint: {
    fontSize: '11px',
    color: '#9ca3af',
    marginTop: '4px',
    display: 'block'
  },
  nextButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '10px'
  },
  buscarSection: {
    backgroundColor: '#f9fafb',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  searchBox: {
    display: 'flex',
    gap: '10px'
  },
  searchInput: {
    flex: 1,
    padding: '12px 15px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none'
  },
  searchButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '0 20px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  alunoEncontrado: {
    marginTop: '15px',
    padding: '15px',
    backgroundColor: '#d1fae5',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  alunoInfo: {
    flex: 1
  },
  adicionarBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '8px 15px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px'
  },
  filhosSection: {
    marginTop: '20px'
  },
  filhosTitle: {
    fontSize: '16px',
    margin: '0 0 15px',
    color: '#1f2937'
  },
  filhoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: '#f3f4f6',
    borderRadius: '8px',
    marginBottom: '8px'
  },
  filhoInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  removerFilhoBtn: {
    padding: '5px',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    cursor: 'pointer',
    color: '#ef4444'
  },
  noFilhos: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    color: '#6b7280'
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