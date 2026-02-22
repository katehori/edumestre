import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import Calendario from '../../components/Calendario';
import { 
  ArrowLeft, Calendar as CalendarIcon, Users,
  Eye, Clock, FileText, Award, ChevronRight,
  X
} from 'lucide-react';

export default function CalendarioPai() {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [filterFilho, setFilterFilho] = useState('todos');

  const filhos = [
    { id: 1, nome: 'João Silva', turma: '6º Ano A' },
    { id: 2, nome: 'Maria Silva', turma: '4º Ano B' },
  ];

  // Mock de eventos do calendário para os pais
  const eventos = [
    {
      id: 1,
      titulo: 'Exercícios de Frações',
      descricao: 'Resolver os exercícios 1 a 10 da página 45.',
      tipo: 'atividade',
      data: '2025-02-25',
      hora: '23:59',
      turma: '6º Ano A',
      disciplina: 'Matemática',
      aluno: 'João Silva',
      status: 'pendente'
    },
    {
      id: 2,
      titulo: 'Prova Bimestral - Matemática',
      descricao: 'Conteúdo: frações, números decimais e operações.',
      tipo: 'prova',
      data: '2025-02-28',
      hora: '10:00',
      turma: '6º Ano A',
      disciplina: 'Matemática',
      aluno: 'João Silva',
      status: 'pendente'
    },
    {
      id: 3,
      titulo: 'Interpretação de Texto',
      descricao: 'Ler o texto e responder as questões.',
      tipo: 'atividade',
      data: '2025-02-26',
      hora: '23:59',
      turma: '6º Ano A',
      disciplina: 'Português',
      aluno: 'João Silva',
      status: 'concluida',
      nota: 8.5
    },
    {
      id: 4,
      titulo: 'Atividade de Leitura',
      descricao: 'Leitura do capítulo 3 do livro.',
      tipo: 'atividade',
      data: '2025-02-22',
      hora: '23:59',
      turma: '4º Ano B',
      disciplina: 'Português',
      aluno: 'Maria Silva',
      status: 'concluida',
      nota: 9.5
    },
    {
      id: 5,
      titulo: 'Reunião de Pais',
      descricao: 'Reunião bimestral com os responsáveis.',
      tipo: 'evento',
      data: '2025-02-27',
      hora: '19:00',
      turma: '6º Ano A',
      disciplina: 'Geral',
      aluno: 'Ambos'
    },
  ];

  const handleEventClick = (evento) => {
    setSelectedEvent(evento);
    setShowEventModal(true);
  };

  const filtrarEventos = eventos.filter(evento => {
    if (filterFilho === 'todos') return true;
    if (filterFilho === 'João') return evento.aluno === 'João Silva' || evento.aluno === 'Ambos';
    if (filterFilho === 'Maria') return evento.aluno === 'Maria Silva' || evento.aluno === 'Ambos';
    return true;
  });

  // Estatísticas por filho
  const statsJoao = {
    pendentes: eventos.filter(e => e.aluno === 'João Silva' && e.status === 'pendente').length,
    concluidas: eventos.filter(e => e.aluno === 'João Silva' && e.status === 'concluida').length
  };

  const statsMaria = {
    pendentes: eventos.filter(e => e.aluno === 'Maria Silva' && e.status === 'pendente').length,
    concluidas: eventos.filter(e => e.aluno === 'Maria Silva' && e.status === 'concluida').length
  };

  return (
    <Layout perfil="pai" nome="Carlos Silva" turmaInfo="Responsável por 2 alunos">
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <button style={styles.backButton} onClick={() => navigate('/pai')}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 style={styles.title}>📅 Calendário Escolar</h2>
              <p style={styles.subtitle}>Acompanhe as atividades e provas dos seus filhos</p>
            </div>
          </div>
        </div>

        {/* Aviso de visualização */}
        <div style={styles.avisoCard}>
          <Eye size={18} />
          <span>
            Você está no modo <strong>visualização</strong>. Acompanhe os prazos e eventos escolares dos seus filhos.
          </span>
        </div>

        {/* Cards dos filhos */}
        <div style={styles.filhosStats}>
          <div style={styles.filhoStatCard}>
            <div style={styles.filhoStatHeader}>
              <Users size={20} color="#3b82f6" />
              <strong>João Silva</strong>
              <span style={styles.filhoTurma}>6º Ano A</span>
            </div>
            <div style={styles.filhoStatGrid}>
              <div style={styles.filhoStatItem}>
                <span>Pendentes</span>
                <strong>{statsJoao.pendentes}</strong>
              </div>
              <div style={styles.filhoStatItem}>
                <span>Concluídas</span>
                <strong>{statsJoao.concluidas}</strong>
              </div>
            </div>
          </div>

          <div style={styles.filhoStatCard}>
            <div style={styles.filhoStatHeader}>
              <Users size={20} color="#10b981" />
              <strong>Maria Silva</strong>
              <span style={styles.filhoTurma}>4º Ano B</span>
            </div>
            <div style={styles.filhoStatGrid}>
              <div style={styles.filhoStatItem}>
                <span>Pendentes</span>
                <strong>{statsMaria.pendentes}</strong>
              </div>
              <div style={styles.filhoStatItem}>
                <span>Concluídas</span>
                <strong>{statsMaria.concluidas}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Filtro por filho */}
        <div style={styles.filterSection}>
          <label style={styles.filterLabel}>Filtrar por filho:</label>
          <select 
            style={styles.filterSelect}
            value={filterFilho}
            onChange={(e) => setFilterFilho(e.target.value)}
          >
            <option value="todos">Todos os filhos</option>
            <option value="João">João Silva</option>
            <option value="Maria">Maria Silva</option>
          </select>
        </div>

        {/* Calendário */}
        <Calendario 
          eventos={filtrarEventos} 
          onEventClick={handleEventClick}
          perfil="pai"
        />

        {/* Próximas Entregas */}
        <div style={styles.proximosSection}>
          <h3 style={styles.sectionTitle}>⏰ Próximas Entregas</h3>
          <div style={styles.proximosLista}>
            {filtrarEventos
              .filter(e => e.status === 'pendente')
              .sort((a, b) => new Date(a.data) - new Date(b.data))
              .map(evento => (
                <div 
                  key={evento.id} 
                  style={styles.proximoItem}
                  onClick={() => handleEventClick(evento)}
                >
                  <div style={{
                    ...styles.proximoIcone,
                    backgroundColor: evento.tipo === 'prova' ? '#f59e0b20' : '#3b82f620',
                    color: evento.tipo === 'prova' ? '#f59e0b' : '#3b82f6'
                  }}>
                    {evento.tipo === 'prova' ? '📝' : '📚'}
                  </div>
                  <div style={styles.proximoInfo}>
                    <strong>{evento.titulo}</strong>
                    <span style={styles.proximoMeta}>
                      {evento.aluno} • {evento.disciplina} • {new Date(evento.data).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <ChevronRight size={16} color="#9ca3af" />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Modal de Visualização de Evento */}
      {showEventModal && selectedEvent && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>{selectedEvent.titulo}</h3>
              <button 
                style={styles.modalClose}
                onClick={() => setShowEventModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div style={styles.modalContent}>
              <div style={styles.eventoDetail}>
                <div style={styles.eventoDetailRow}>
                  <Users size={16} color="#6b7280" />
                  <span>{selectedEvent.aluno}</span>
                </div>
                <div style={styles.eventoDetailRow}>
                  <CalendarIcon size={16} color="#6b7280" />
                  <span>{new Date(selectedEvent.data).toLocaleDateString('pt-BR')} • {selectedEvent.hora || 'Durante o dia'}</span>
                </div>
                <div style={styles.eventoDetailRow}>
                  <FileText size={16} color="#6b7280" />
                  <span>{selectedEvent.disciplina} • {selectedEvent.turma}</span>
                </div>
                <p style={styles.eventoDescricao}>{selectedEvent.descricao}</p>
                
                {selectedEvent.status === 'pendente' && (
                  <div style={styles.eventoAviso}>
                    <Clock size={16} color="#f59e0b" />
                    <span>Atividade pendente - Data limite: {new Date(selectedEvent.data).toLocaleDateString('pt-BR')}</span>
                  </div>
                )}

                {selectedEvent.nota && (
                  <div style={styles.eventoNota}>
                    <Award size={16} color="#10b981" />
                    <span>Nota obtida: <strong>{selectedEvent.nota}</strong></span>
                  </div>
                )}
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button 
                style={styles.closeButton}
                onClick={() => setShowEventModal(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

// Estilos
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  header: {
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
  avisoCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '15px 20px',
    backgroundColor: '#fef3c7',
    borderRadius: '8px',
    color: '#92400e',
    fontSize: '13px',
    marginBottom: '20px'
  },
  filhosStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
    marginBottom: '20px'
  },
  filhoStatCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  filhoStatHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '10px'
  },
  filhoTurma: {
    marginLeft: 'auto',
    fontSize: '11px',
    color: '#6b7280'
  },
  filhoStatGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
    textAlign: 'center'
  },
  filhoStatItem: {
    display: 'flex',
    flexDirection: 'column'
  },
  filterSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px'
  },
  filterLabel: {
    fontSize: '14px',
    color: '#4b5563'
  },
  filterSelect: {
    padding: '8px 15px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    fontSize: '13px',
    outline: 'none',
    minWidth: '150px'
  },
  proximosSection: {
    marginTop: '30px'
  },
  sectionTitle: {
    fontSize: '18px',
    margin: '0 0 15px',
    color: '#1f2937'
  },
  proximosLista: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  proximoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '12px',
    borderBottom: '1px solid #e5e7eb',
    cursor: 'pointer'
  },
  proximoIcone: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px'
  },
  proximoInfo: {
    flex: 1
  },
  proximoMeta: {
    display: 'block',
    fontSize: '11px',
    color: '#6b7280',
    marginTop: '2px'
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
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  modalTitle: {
    fontSize: '18px',
    margin: 0,
    color: '#1f2937'
  },
  modalClose: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '5px'
  },
  modalContent: {
    marginBottom: '20px'
  },
  eventoDetail: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  eventoDetailRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#4b5563'
  },
  eventoDescricao: {
    fontSize: '14px',
    color: '#4b5563',
    lineHeight: '1.6',
    margin: '10px 0'
  },
  eventoAviso: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px',
    backgroundColor: '#fef3c7',
    borderRadius: '6px',
    color: '#92400e'
  },
  eventoNota: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px',
    backgroundColor: '#d1fae5',
    borderRadius: '6px',
    color: '#10b981'
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '20px'
  },
  closeButton: {
    padding: '10px 20px',
    backgroundColor: '#f3f4f6',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};