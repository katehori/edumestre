import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, Heart } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState('professor');

  const entrarComo = () => {
    if (perfil === 'professor') navigate('/professor');
    if (perfil === 'aluno') navigate('/aluno');
    if (perfil === 'pai') navigate('/pai');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>📚 EduMestre</h1>
        <p style={styles.subtitle}>Plataforma de apoio a professores da rede pública</p>
        
        <div style={styles.perfis}>
          <button 
            style={{...styles.perfilBtn, backgroundColor: perfil === 'professor' ? '#2563eb' : '#e2e8f0'}}
            onClick={() => setPerfil('professor')}
          >
            <GraduationCap size={32} />
            <span>Sou Professor</span>
          </button>
          
          <button 
            style={{...styles.perfilBtn, backgroundColor: perfil === 'aluno' ? '#2563eb' : '#e2e8f0'}}
            onClick={() => setPerfil('aluno')}
          >
            <Users size={32} />
            <span>Sou Aluno</span>
          </button>
          
          <button 
            style={{...styles.perfilBtn, backgroundColor: perfil === 'pai' ? '#2563eb' : '#e2e8f0'}}
            onClick={() => setPerfil('pai')}
          >
            <Heart size={32} />
            <span>Sou Responsável</span>
          </button>
        </div>

        <button style={styles.entrarBtn} onClick={entrarComo}>
          Entrar como {perfil === 'professor' ? 'Professor' : perfil === 'aluno' ? 'Aluno' : 'Responsável'}
        </button>

        <p style={styles.demoInfo}>
          🔍 Modo demonstração - sem cadastro necessário
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    maxWidth: '500px',
    width: '90%'
  },
  title: {
    fontSize: '36px',
    margin: '0 0 10px',
    color: '#1a202c'
  },
  subtitle: {
    color: '#4a5568',
    marginBottom: '30px'
  },
  perfis: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },
  perfilBtn: {
    flex: 1,
    padding: '20px 10px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    transition: 'all 0.3s',
    color: '#1a202c'
  },
  entrarBtn: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '20px'
  },
  demoInfo: {
    textAlign: 'center',
    color: '#718096',
    fontSize: '14px',
    marginTop: '20px'
  }
};