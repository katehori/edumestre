import { useState } from 'react';
import QRCode from 'qrcode.react';
import { Plus, Users, QrCode as QrIcon } from 'lucide-react';

export default function Turmas() {
  const [turmas, setTurmas] = useState([
    { id: 1, nome: '6º Ano A', serie: '6º ano', alunos: 32, codigo: 'TURMA123' },
    { id: 2, nome: '7º Ano B', serie: '7º ano', alunos: 28, codigo: 'TURMA456' },
    { id: 3, nome: '8º Ano C', serie: '8º ano', alunos: 30, codigo: 'TURMA789' },
  ]);

  const [mostrarQR, setMostrarQR] = useState(null);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>📚 Minhas Turmas</h1>
        <button style={styles.novaTurmaBtn}>
          <Plus size={20} /> Nova Turma
        </button>
      </header>

      <div style={styles.grid}>
        {turmas.map(turma => (
          <div key={turma.id} style={styles.turmaCard}>
            <div style={styles.turmaHeader}>
              <h2>{turma.nome}</h2>
              <span style={styles.serie}>{turma.serie}</span>
            </div>
            
            <div style={styles.turmaBody}>
              <div style={styles.infoRow}>
                <Users size={18} />
                <span>{turma.alunos} alunos</span>
              </div>
              
              <div style={styles.qrContainer}>
                <button 
                  style={styles.qrBtn}
                  onClick={() => setMostrarQR(turma.id === mostrarQR ? null : turma.id)}
                >
                  <QrIcon size={18} /> 
                  {mostrarQR === turma.id ? 'Esconder QR' : 'Mostrar QR'}
                </button>
                
                {mostrarQR === turma.id && (
                  <div style={styles.qrCode}>
                    <QRCode value={`https://edumestre.com/entrar/${turma.codigo}`} size={150} />
                    <p>Código: {turma.codigo}</p>
                  </div>
                )}
              </div>
            </div>

            <div style={styles.turmaFooter}>
              <button style={styles.actionBtn}>Publicações</button>
              <button style={styles.actionBtn}>Atividades</button>
              <button style={styles.actionBtn}>Alunos</button>
            </div>
          </div>
        ))}
      </div>

      {/* Seção de Turmas de Professores */}
      <div style={styles.professoresSection}>
        <h2>👥 Turmas de Professores (Compartilhamento)</h2>
        <div style={styles.profCard}>
          <h3>Matemática - Planejamento</h3>
          <p>12 professores · 34 materiais compartilhados</p>
          <div style={styles.tags}>
            <span style={styles.tag}>Planos de aula</span>
            <span style={styles.tag}>Atividades</span>
            <span style={styles.tag}>Avaliações</span>
          </div>
          <button style={styles.entrarBtn}>Solicitar acesso</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
  },
  novaTurmaBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  turmaCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    overflow: 'hidden'
  },
  turmaHeader: {
    padding: '20px',
    backgroundColor: '#f0f9ff',
    borderBottom: '1px solid #e2e8f0'
  },
  serie: {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px'
  },
  turmaBody: {
    padding: '20px'
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '15px'
  },
  qrContainer: {
    textAlign: 'center'
  },
  qrBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: '#f3f4f6',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    margin: '0 auto'
  },
  qrCode: {
    marginTop: '15px',
    padding: '15px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px'
  },
  turmaFooter: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    borderTop: '1px solid #e2e8f0'
  },
  actionBtn: {
    padding: '12px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    borderRight: '1px solid #e2e8f0'
  },
  professoresSection: {
    marginTop: '40px'
  },
  profCard: {
    backgroundColor: '#f8fafc',
    padding: '20px',
    borderRadius: '12px'
  },
  tags: {
    display: 'flex',
    gap: '10px',
    margin: '15px 0'
  },
  tag: {
    backgroundColor: '#e2e8f0',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '14px'
  },
  entrarBtn: {
    padding: '10px 20px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};