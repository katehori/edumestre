import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, Heart, ChevronRight, LogIn, UserPlus } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState('professor');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const entrarComo = () => {
    if (perfil === 'professor') navigate('/professor');
    if (perfil === 'aluno') navigate('/aluno');
    if (perfil === 'pai') navigate('/pai');
  };

  const irParaCadastro = () => {
    if (perfil === 'professor') navigate('/cadastro/professor');
    if (perfil === 'aluno') navigate('/cadastro/aluno');
    if (perfil === 'pai') navigate('/cadastro/responsavel');
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>
            <GraduationCap size={40} color="#2563eb" />
            <h1 style={styles.logoText}>Edu<span style={{ color: '#2563eb' }}>Mestre</span></h1>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.title}>Bem-vindo ao EduMestre</h2>
            <p style={styles.subtitle}>Faça login ou cadastre-se para continuar</p>
          </div>

          {/* Seletor de Perfil */}
          <div style={styles.perfis}>
            <button 
              style={{
                ...styles.perfilBtn,
                ...(perfil === 'professor' ? styles.perfilAtivo : {}),
                borderColor: perfil === 'professor' ? '#2563eb' : '#e5e7eb'
              }}
              onClick={() => setPerfil('professor')}
            >
              <div style={styles.perfilIconGrande}>
                <GraduationCap size={30} color={perfil === 'professor' ? '#2563eb' : '#9ca3af'} />
              </div>
              <strong style={{ color: perfil === 'professor' ? '#2563eb' : '#4b5563' }}>Professor</strong>
            </button>

            <button 
              style={{
                ...styles.perfilBtn,
                ...(perfil === 'aluno' ? styles.perfilAtivo : {}),
                borderColor: perfil === 'aluno' ? '#10b981' : '#e5e7eb'
              }}
              onClick={() => setPerfil('aluno')}
            >
              <div style={styles.perfilIconGrande}>
                <Users size={30} color={perfil === 'aluno' ? '#10b981' : '#9ca3af'} />
              </div>
              <strong style={{ color: perfil === 'aluno' ? '#10b981' : '#4b5563' }}>Aluno</strong>
            </button>

            <button 
              style={{
                ...styles.perfilBtn,
                ...(perfil === 'pai' ? styles.perfilAtivo : {}),
                borderColor: perfil === 'pai' ? '#8b5cf6' : '#e5e7eb'
              }}
              onClick={() => setPerfil('pai')}
            >
              <div style={styles.perfilIconGrande}>
                <Heart size={30} color={perfil === 'pai' ? '#8b5cf6' : '#9ca3af'} />
              </div>
              <strong style={{ color: perfil === 'pai' ? '#8b5cf6' : '#4b5563' }}>Responsável</strong>
            </button>
          </div>

          {/* Formulário de Login */}
          <div style={styles.formContainer}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>E-mail</label>
              <input
                type="email"
                placeholder="seu@email.com"
                style={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Senha</label>
              <input
                type="password"
                placeholder="••••••••"
                style={styles.input}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <div style={styles.forgotPassword}>
              <a href="#" style={styles.forgotLink}>Esqueceu a senha?</a>
            </div>

            <button 
              style={styles.entrarBtn}
              onClick={entrarComo}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              <LogIn size={20} />
              Entrar como {perfil === 'professor' ? 'Professor' : perfil === 'aluno' ? 'Aluno' : 'Responsável'}
            </button>

            <div style={styles.divider}>
              <span style={styles.dividerText}>ou</span>
            </div>

            <button 
              style={styles.cadastroBtn}
              onClick={irParaCadastro}
            >
              <UserPlus size={20} />
              Criar nova conta
            </button>
          </div>

          <div style={styles.demoInfo}>
            <span style={styles.demoBadge}>🔍 DEMO</span>
            <p style={styles.demoText}>Use qualquer email/senha para testar</p>
          </div>
        </div>
      </main>

      <footer style={styles.footer}>
        <p>© 2025 EduMestre - Transformando a educação pública</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  header: {
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '15px 20px'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  logoText: {
    fontSize: '28px',
    margin: 0,
    color: '#1f2937'
  },
  main: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '40px',
    maxWidth: '450px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
  },
  cardHeader: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  title: {
    fontSize: '28px',
    margin: '0 0 10px',
    color: '#1a202c'
  },
  subtitle: {
    color: '#4a5568',
    fontSize: '14px',
    margin: 0
  },
  perfis: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    marginBottom: '30px'
  },
  perfilBtn: {
    padding: '15px 5px',
    border: '2px solid',
    borderRadius: '10px',
    background: 'white',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s'
  },
  perfilAtivo: {
    transform: 'scale(1.02)',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
  },
  perfilIconGrande: {
    width: '50px',
    height: '50px',
    borderRadius: '25px',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  formContainer: {
    marginBottom: '20px'
  },
  inputGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#4b5563',
    marginBottom: '5px'
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
  forgotPassword: {
    textAlign: 'right',
    marginBottom: '20px'
  },
  forgotLink: {
    color: '#3b82f6',
    fontSize: '13px',
    textDecoration: 'none'
  },
  entrarBtn: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'all 0.3s',
    marginBottom: '15px'
  },
  divider: {
    position: 'relative',
    textAlign: 'center',
    margin: '20px 0'
  },
  dividerText: {
    backgroundColor: 'white',
    padding: '0 15px',
    color: '#9ca3af',
    fontSize: '14px',
    position: 'relative',
    zIndex: 1
  },
  cadastroBtn: {
    width: '100%',
    padding: '14px',
    backgroundColor: 'white',
    color: '#2563eb',
    border: '2px solid #2563eb',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'all 0.3s'
  },
  demoInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '12px',
    backgroundColor: '#fef3c7',
    borderRadius: '8px',
    marginTop: '20px'
  },
  demoBadge: {
    backgroundColor: '#f59e0b',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 'bold'
  },
  demoText: {
    color: '#92400e',
    margin: 0,
    fontSize: '13px'
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    color: 'rgba(255,255,255,0.7)',
    fontSize: '14px'
  }
};