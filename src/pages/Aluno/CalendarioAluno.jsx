import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import Calendario from '../../components/Calendario';
import { 
  ArrowLeft, Calendar as CalendarIcon, Clock, 
  FileText, Award, AlertCircle, ChevronRight,
  CheckCircle, X
} from 'lucide-react';

export default function CalendarioAluno() {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);

  // Mock de eventos do calendário para o aluno
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
      status: 'pendente',
      nota: 8.5
    },
    {
      id: 4,
      titulo: 'Trabalho de Ciências',
      descricao: 'Pesquisa sobre o sistema solar.',
      tipo: 'atividade',
      data: '2025-02-20',
      hora: '23:59',
      turma: '6º Ano A',
      disciplina: 'Ciências',
      status: 'concluida',
      nota: 9.0
    },
  ];

  const handleEventClick = (evento) => {
    setSelectedEvent(evento);
    setShowEventModal(true);
  };

  const handleVerAtividade = () => {
    if (selectedEvent) {
      setShowEventModal(false);
      navigate(`/aluno/atividade/${selectedEvent.id}`);
    }
  };

  // Agrupar eventos por status
  const pendentes = eventos.filter(e => e.status === 'pendente').length;
  const concluidas = eventos.filter(e => e.status === 'concluida').length;
  const proximas = eventos.filter(e => {
    const hoje = new Date();
    const dataEvento = new Date(e.data);
    return e.status === 'pendente' && dataEvento >= hoje;
  }).length;

  return (
    <Layout perfil="aluno" nome="João Silva" turmaInfo="6º Ano A">
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <button style={styles.backButton} onClick={() => navigate('/aluno')}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 style={styles.title}>📅 Meu Calendário</h2>
              <p style={styles.subtitle}>Acompanhe suas atividades, provas e prazos</p>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <Clock size={24} color="#f59e0b" />
            <div>
              <span style={styles.statLabel}>Pendentes</span>
              <strong style={styles.statValue}>{pendentes}</strong>
            </div>
          </div>
          <div style={styles.statCard}>
            <CheckCircle size={24} color="#10b981" />
            <div>
              <span style={styles.statLabel}>Concluídas</span>
              <strong style={styles.statValue}>{concluidas}</strong>
            </div>
          </div>
          <div style={styles.statCard}>
            <CalendarIcon size={24} color="#3b82f6" />
            <div>
              <span style={styles.statLabel}>Próximos 7 dias</span>
              <strong style={styles.statValue}>{proximas}</strong>
            </div>
          </div>
        </div>

        {/* Calendário */}
        <Calendario 
          eventos={eventos} 
          onEventClick={handleEventClick}
          perfil="aluno"
        />

        {/* Próximas Entregas */}
        <div style={styles.proximosSection}>
          <h3 style={styles.sectionTitle}>⏰ Próximas Entregas</h3>
          <div style={styles.proximosLista}>
            {eventos
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
                      {evento.disciplina} • {new Date(evento.data).toLocaleDateString('pt-BR')}
                      {evento.hora && ` • ${evento.hora}`}
                    </span>
                  </div>
                  <ChevronRight size={16} color="#9ca3af" />
                </div>
              ))}
          </div>
        </div>

        {/* Dica */}
        <div style={styles.dicaCard}>
          <AlertCircle size={18} color="#3b82f6" />
          <span>
            Clique em qualquer data no calendário para ver os eventos do dia
          </span>
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
                    <AlertCircle size={16} color="#f59e0b" />
                    <span>Esta atividade ainda não foi entregue</span>
                  </div>
                )}

                {selectedEvent.nota && (
                  <div style={styles.eventoNota}>
                    <Award size={16} color="#f59e0b" />
                    <span>Nota obtida: <strong>{selectedEvent.nota}</strong></span>
                  </div>
                )}
              </div>
            </div>

            <div style={styles.modalFooter}>
              {selectedEvent.status === 'pendente' && selectedEvent.tipo !== 'evento' && (
                <button 
                  style={styles.entregarBtn}
                  onClick={handleVerAtividade}
                >
                  Ir para Atividade
                </button>
              )}
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

// Reutilizar estilos do calendário do professor com algumas modificações
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
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
    marginBottom: '25px'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  statLabel: {
    fontSize: '12px',
    color: '#6b7280',
    display: 'block'
  },
  statValue: {
    fontSize: '20px',
    color: '#1f2937'
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
  dicaCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '15px 20px',
    backgroundColor: '#dbeafe',
    borderRadius: '8px',
    marginTop: '20px',
    color: '#2563eb'
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
  entregarBtn: {
    padding: '10px 20px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  closeButton: {
    padding: '10px 20px',
    backgroundColor: '#f3f4f6',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};