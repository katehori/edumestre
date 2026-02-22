import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { maskPhone, maskDate, unmask } from '../../utils/masks';
import { 
  User, Mail, Phone, Calendar, BookOpen, Users, 
  ArrowLeft, Save, Search, CheckCircle 
} from 'lucide-react';

export default function AlunoCadastro() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [codigoTurma, setCodigoTurma] = useState('');
  const [turmaEncontrada, setTurmaEncontrada] = useState(null);
  const [buscando, setBuscando] = useState(false);

  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    celular: '',
    dataNascimento: '',
    serie: '',
    turmaId: '',
    turmaNome: '',
    responsavel: '',
    telefoneResponsavel: ''
  });

  // Mock de turmas para demonstração
  const turmasMock = [
    { id: 'TURMA123', nome: '6º Ano A', serie: '6º ano', escola: 'EMEF Professor Carlos' },
    { id: 'TURMA456', nome: '7º Ano B', serie: '7º ano', escola: 'EMEF Professor Carlos' },
    { id: 'TURMA789', nome: '8º Ano C', serie: '8º ano', escola: 'EMEF Professor Carlos' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Aplica máscaras específicas
    let formattedValue = value;
    
    switch (name) {
      case 'celular':
      case 'telefoneResponsavel':
        formattedValue = maskPhone(value);
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

  const buscarTurma = () => {
    setBuscando(true);
    // Simula busca no banco
    setTimeout(() => {
      const encontrada = turmasMock.find(t => t.id === codigoTurma.toUpperCase());
      setTurmaEncontrada(encontrada);
      if (encontrada) {
        setFormData({
          ...formData,
          turmaId: encontrada.id,
          turmaNome: encontrada.nome,
          serie: encontrada.serie
        });
      }
      setBuscando(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Remove máscaras antes de enviar
    const dataToSend = {
      ...formData,
      celular: unmask(formData.celular),
      telefoneResponsavel: unmask(formData.telefoneResponsavel),
      dataNascimento: unmask(formData.dataNascimento)
    };
    
    console.log('Dados do aluno (sem máscara):', dataToSend);
    navigate('/aluno');
  };

  const isFormValid = () => {
    return (
      formData.nomeCompleto &&
      formData.email &&
      formData.celular &&
      formData.dataNascimento &&
      formData.responsavel &&
      formData.telefoneResponsavel
    );
  };

  return (
    <Layout perfil="aluno" nome="Novo Aluno">
      <div style={styles.container}>
        {/* Cabeçalho */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <button style={styles.backButton} onClick={() => navigate('/')}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 style={styles.title}>📝 Cadastro do Aluno</h2>
              <p style={styles.subtitle}>Preencha seus dados para começar a usar o EduMestre</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* PASSO 1: Buscar Turma */}
          {step === 1 && (
            <div style={styles.stepContent}>
              <div style={styles.turmaSearch}>
                <label style={styles.label}>Código da Turma</label>
                <p style={styles.turmaDesc}>
                  Solicite o código de acesso com seu professor
                </p>
                
                <div style={styles.searchBox}>
                  <input
                    type="text"
                    placeholder="Digite o código da turma (ex: TURMA123)"
                    style={styles.searchInput}
                    value={codigoTurma}
                    onChange={(e) => setCodigoTurma(e.target.value.toUpperCase())}
                  />
                  <button 
                    type="button"
                    style={styles.searchButton}
                    onClick={buscarTurma}
                    disabled={buscando}
                  >
                    {buscando ? 'Buscando...' : 'Buscar Turma'}
                    <Search size={18} />
                  </button>
                </div>

                {turmaEncontrada && (
                  <div style={styles.turmaInfo}>
                    <CheckCircle size={24} color="#10b981" style={{ marginBottom: '10px' }} />
                    <h4 style={styles.turmaInfoTitle}>Turma encontrada!</h4>
                    <div style={styles.turmaDetalhes}>
                      <p><strong>Turma:</strong> {turmaEncontrada.nome}</p>
                      <p><strong>Série:</strong> {turmaEncontrada.serie}</p>
                      <p><strong>Escola:</strong> {turmaEncontrada.escola}</p>
                    </div>
                    <button 
                      type="button"
                      style={styles.confirmarTurmaBtn}
                      onClick={() => setStep(2)}
                    >
                      Confirmar e Continuar
                    </button>
                  </div>
                )}

                {codigoTurma && !turmaEncontrada && !buscando && (
                  <div style={styles.turmaNaoEncontrada}>
                    <p>❌ Turma não encontrada. Verifique o código e tente novamente.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PASSO 2: Dados do Aluno */}
          {step === 2 && (
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
                    <BookOpen size={16} style={styles.inputIcon} />
                    Série/Ano
                  </label>
                  <input
                    type="text"
                    name="serie"
                    style={{ ...styles.input, backgroundColor: '#f3f4f6' }}
                    value={formData.serie}
                    disabled
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    <Users size={16} style={styles.inputIcon} />
                    Turma
                  </label>
                  <input
                    type="text"
                    style={{ ...styles.input, backgroundColor: '#f3f4f6' }}
                    value={formData.turmaNome}
                    disabled
                  />
                </div>
              </div>

              <div style={styles.responsavelSection}>
                <h3 style={styles.responsavelTitle}>Dados do Responsável</h3>
                
                <div style={styles.formGrid}>
                  <div style={{ ...styles.inputGroup, gridColumn: 'span 2' }}>
                    <label style={styles.label}>Nome do Responsável</label>
                    <input
                      type="text"
                      name="responsavel"
                      placeholder="Nome completo do responsável"
                      style={styles.input}
                      value={formData.responsavel}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Telefone do Responsável</label>
                    <input
                      type="tel"
                      name="telefoneResponsavel"
                      placeholder="(11) 99999-9999"
                      style={styles.input}
                      value={formData.telefoneResponsavel}
                      onChange={handleChange}
                      maxLength="15"
                      required
                    />
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
            
            {step === 2 ? (
              <button 
                type="submit"
                style={{
                  ...styles.submitButton,
                  opacity: isFormValid() ? 1 : 0.5,
                  cursor: isFormValid() ? 'pointer' : 'not-allowed'
                }}
                disabled={!isFormValid()}
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
  turmaSearch: {
    padding: '20px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#4b5563',
    marginBottom: '8px'
  },
  turmaDesc: {
    fontSize: '13px',
    color: '#6b7280',
    marginBottom: '20px'
  },
  searchBox: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
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
    padding: '0 25px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  turmaInfo: {
    backgroundColor: '#d1fae5',
    padding: '20px',
    borderRadius: '8px',
    border: '2px solid #10b981',
    textAlign: 'center'
  },
  turmaInfoTitle: {
    color: '#10b981',
    margin: '0 0 15px',
    fontSize: '16px'
  },
  turmaDetalhes: {
    marginBottom: '15px',
    textAlign: 'left'
  },
  confirmarTurmaBtn: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  },
  turmaNaoEncontrada: {
    backgroundColor: '#fee2e2',
    padding: '15px',
    borderRadius: '8px',
    color: '#dc2626',
    fontSize: '14px'
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
  inputIcon: {
    color: '#9ca3af',
    marginRight: '5px'
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
  responsavelSection: {
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '2px solid #e5e7eb'
  },
  responsavelTitle: {
    fontSize: '16px',
    color: '#1f2937',
    margin: '0 0 20px'
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