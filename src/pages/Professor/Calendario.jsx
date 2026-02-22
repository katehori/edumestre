import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import Calendario from '../../components/Calendario';
import { 
  ArrowLeft, Plus, X, Save, Trash2, Edit2,
  Calendar as CalendarIcon, Clock, Users, FileText
} from 'lucide-react';

export default function CalendarioProfessor() {
  const navigate = useNavigate();
  const [showEventModal, setShowEventModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const [novoEvento, setNovoEvento] = useState({
    titulo: '',
    descricao: '',
    tipo: 'atividade',
    data: '',
    hora: '',
    turmaId: '',
    disciplina: '',
    atividadeId: null
  });

  // Mock de turmas
  const turmas = [
    { id: 1, nome: '6º Ano A', disciplina: 'Matemática' },
    { id: 2, nome: '7º Ano B', disciplina: 'Matemática' },
    { id: 3, nome: '8º Ano C', disciplina: 'Matemática' },
    { id: 4, nome: '6º Ano A', disciplina: 'Português' },
  ];

  // Mock de atividades para vincular
  const atividades = [
    { id: 1, titulo: 'Exercícios de Frações', turma: '6º Ano A', data: '2026-02-25' },
    { id: 2, titulo: 'Prova Bimestral', turma: '6º Ano A', data: '2026-02-28' },
    { id: 3, titulo: 'Lista de Geometria', turma: '7º Ano B', data: '2026-02-26' },
  ];

  // Mock de eventos do calendário
  const [eventos, setEventos] = useState([
    {
      id: 1,
      titulo: 'Exercícios de Frações',
      descricao: 'Resolver os exercícios 1 a 10 da página 45.',
      tipo: 'atividade',
      data: '2026-02-25',
      hora: '23:59',
      turma: '6º Ano A',
      disciplina: 'Matemática',
      atividadeId: 1,
      entregas: 28,
      totalAlunos: 32
    },
    {
      id: 2,
      titulo: 'Prova Bimestral - Matemática',
      descricao: 'Conteúdo: frações, números decimais e operações.',
      tipo: 'prova',
      data: '2026-02-28',
      hora: '10:00',
      turma: '6º Ano A',
      disciplina: 'Matemática',
      atividadeId: 2,
      entregas: 0,
      totalAlunos: 32
    },
    {
      id: 3,
      titulo: 'Lista de Geometria',
      descricao: 'Exercícios sobre áreas e perímetros.',
      tipo: 'atividade',
      data: '2026-02-26',
      hora: '23:59',
      turma: '7º Ano B',
      disciplina: 'Matemática',
      atividadeId: 3,
      entregas: 15,
      totalAlunos: 28
    },
    {
      id: 4,
      titulo: 'Reunião de Pais',
      descricao: 'Reunião bimestral com os responsáveis.',
      tipo: 'evento',
      data: '2026-02-27',
      hora: '19:00',
      turma: '6º Ano A',
      disciplina: 'Geral'
    },
  ]);

  const handleEventClick = (evento) => {
    setSelectedEvent(evento);
    setShowEventModal(true);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setNovoEvento({
      ...novoEvento,
      data: date.toISOString().split('T')[0]
    });
    setShowEditModal(true);
  };

  const handleEdit = (evento) => {
    setSelectedEvent(evento);
    setNovoEvento(evento);
    setShowEditModal(true);
    setShowEventModal(false);
  };

  const handleDelete = (evento) => {
    setSelectedEvent(evento);
    setShowDeleteModal(true);
    setShowEventModal(false);
  };

  const confirmDelete = () => {
    setEventos(eventos.filter(e => e.id !== selectedEvent.id));
    setShowDeleteModal(false);
    setSelectedEvent(null);
  };

  const handleSave = () => {
    if (selectedEvent) {
      // Editar
      setEventos(eventos.map(e => 
        e.id === selectedEvent.id ? { ...novoEvento, id: e.id } : e
      ));
      setShowEditModal(false);
    } else {
      // Criar novo
      const novo = {
        ...novoEvento,
        id: eventos.length + 1,
        entregas: 0,
        totalAlunos: 32
      };
      setEventos([...eventos, novo]);
      setShowEditModal(false);
    }
    setSelectedEvent(null);
    setNovoEvento({
      titulo: '',
      descricao: '',
      tipo: 'atividade',
      data: '',
      hora: '',
      turmaId: '',
      disciplina: '',
      atividadeId: null
    });
  };

  const handleVinculacaoAtividade = (atividadeId) => {
    const atividade = atividades.find(a => a.id === parseInt(atividadeId));
    if (atividade) {
      setNovoEvento({
        ...novoEvento,
        titulo: atividade.titulo,
        data: atividade.data,
        turma: atividade.turma,
        atividadeId: atividade.id
      });
    }
  };

  return (
    <Layout perfil="professor" nome="Prof. Carlos Silva">
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <button style={styles.backButton} onClick={() => navigate('/professor')}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 style={styles.title}>📅 Calendário Acadêmico</h2>
              <p style={styles.subtitle}>Gerencie prazos, provas e eventos importantes</p>
            </div>
          </div>
          <button style={styles.novoEventoBtn} onClick={() => {
            setSelectedEvent(null);
            setNovoEvento({
              titulo: '',
              descricao: '',
              tipo: 'atividade',
              data: new Date().toISOString().split('T')[0],
              hora: '',
              turmaId: '',
              disciplina: '',
              atividadeId: null
            });
            setShowEditModal(true);
          }}>
            <Plus size={20} />
            Novo Evento
          </button>
        </div>

        {/* Estatísticas */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <CalendarIcon size={24} color="#3b82f6" />
            <div>
              <span style={styles.statLabel}>Eventos este mês</span>
              <strong style={styles.statValue}>12</strong>
            </div>
          </div>
          <div style={styles.statCard}>
            <FileText size={24} color="#f59e0b" />
            <div>
              <span style={styles.statLabel}>Atividades</span>
              <strong style={styles.statValue}>8</strong>
            </div>
          </div>
          <div style={styles.statCard}>
            <Clock size={24} color="#10b981" />
            <div>
              <span style={styles.statLabel}>Próximos 7 dias</span>
              <strong style={styles.statValue}>5</strong>
            </div>
          </div>
        </div>

        {/* Eventos Próximos */}
        <div style={styles.proximosSection}>
          <h3 style={styles.sectionTitle}>Próximos 7 dias</h3>
          <div style={styles.proximosLista}>
            {eventos
              .filter(e => new Date(e.data) >= new Date())
              .sort((a, b) => new Date(a.data) - new Date(b.data))
              .slice(0, 5)
              .map(evento => (
                <div 
                  key={evento.id} 
                  style={styles.proximoItem}
                  onClick={() => handleEventClick(evento)}
                >
                  <div style={{
                    ...styles.proximoIcone,
                    backgroundColor: evento.tipo === 'prova' ? '#f59e0b20' : 
                                   evento.tipo === 'atividade' ? '#3b82f620' : '#10b98120',
                    color: evento.tipo === 'prova' ? '#f59e0b' : 
                          evento.tipo === 'atividade' ? '#3b82f6' : '#10b981'
                  }}>
                    {evento.tipo === 'prova' ? '📝' : '📚'}
                  </div>
                  <div style={styles.proximoInfo}>
                    <strong>{evento.titulo}</strong>
                    <span style={styles.proximoMeta}>
                      {evento.turma} • {new Date(evento.data).toLocaleDateString('pt-BR')} • {evento.hora || 'Durante o dia'}
                    </span>
                  </div>
                  {evento.tipo !== 'evento' && (
                    <span style={styles.proximoEntregas}>
                      {evento.entregas}/{evento.totalAlunos} entregas
                    </span>
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* Calendário */}
        <Calendario 
          eventos={eventos} 
          onEventClick={handleEventClick}
          perfil="professor"
        />
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
                  <Users size={16} color="#6b7280" />
                  <span>{selectedEvent.turma} • {selectedEvent.disciplina}</span>
                </div>
                <p style={styles.eventoDescricao}>{selectedEvent.descricao}</p>
                
                {selectedEvent.tipo !== 'evento' && (
                  <div style={styles.eventoStats}>
                    <div style={styles.eventoStat}>
                      <span>Entregas</span>
                      <strong>{selectedEvent.entregas}/{selectedEvent.totalAlunos}</strong>
                    </div>
                    <div style={styles.eventoStat}>
                      <span>Progresso</span>
                      <strong>{Math.round((selectedEvent.entregas/selectedEvent.totalAlunos)*100)}%</strong>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button 
                style={styles.editButton}
                onClick={() => handleEdit(selectedEvent)}
              >
                <Edit2 size={16} />
                Editar
              </button>
              <button 
                style={styles.deleteButton}
                onClick={() => handleDelete(selectedEvent)}
              >
                <Trash2 size={16} />
                Excluir
              </button>
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

      {/* Modal de Criar/Editar Evento */}
      {showEditModal && (
        <div style={styles.modalOverlay}>
          <div style={{...styles.modal, maxWidth: '500px'}}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                {selectedEvent ? 'Editar Evento' : 'Novo Evento'}
              </h3>
              <button 
                style={styles.modalClose}
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedEvent(null);
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={styles.modalContent}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Tipo de Evento</label>
                <select
                  style={styles.select}
                  value={novoEvento.tipo}
                  onChange={(e) => setNovoEvento({ ...novoEvento, tipo: e.target.value })}
                >
                  <option value="atividade">Atividade</option>
                  <option value="prova">Prova</option>
                  <option value="evento">Evento Geral</option>
                </select>
              </div>

              {novoEvento.tipo !== 'evento' && (
                <div style={styles.formGroup}>
                  <label style={styles.label}>Vincular Atividade Existente</label>
                  <select
                    style={styles.select}
                    onChange={(e) => handleVinculacaoAtividade(e.target.value)}
                  >
                    <option value="">Selecione uma atividade</option>
                    {atividades.map(ativ => (
                      <option key={ativ.id} value={ativ.id}>
                        {ativ.titulo} - {ativ.turma}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div style={styles.formGroup}>
                <label style={styles.label}>Título</label>
                <input
                  type="text"
                  style={styles.input}
                  placeholder="Digite o título do evento"
                  value={novoEvento.titulo}
                  onChange={(e) => setNovoEvento({ ...novoEvento, titulo: e.target.value })}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Descrição</label>
                <textarea
                  style={styles.textarea}
                  rows="3"
                  placeholder="Descreva o evento..."
                  value={novoEvento.descricao}
                  onChange={(e) => setNovoEvento({ ...novoEvento, descricao: e.target.value })}
                />
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Data</label>
                  <input
                    type="date"
                    style={styles.input}
                    value={novoEvento.data}
                    onChange={(e) => setNovoEvento({ ...novoEvento, data: e.target.value })}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Hora (opcional)</label>
                  <input
                    type="time"
                    style={styles.input}
                    value={novoEvento.hora}
                    onChange={(e) => setNovoEvento({ ...novoEvento, hora: e.target.value })}
                  />
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Turma</label>
                  <select
                    style={styles.select}
                    value={novoEvento.turmaId}
                    onChange={(e) => {
                      const turma = turmas.find(t => t.id === parseInt(e.target.value));
                      setNovoEvento({ 
                        ...novoEvento, 
                        turmaId: e.target.value,
                        turma: turma?.nome,
                        disciplina: turma?.disciplina
                      });
                    }}
                  >
                    <option value="">Selecione</option>
                    {turmas.map(t => (
                      <option key={t.id} value={t.id}>{t.nome} - {t.disciplina}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.cancelarBtn} onClick={() => {
                setShowEditModal(false);
                setSelectedEvent(null);
              }}>
                Cancelar
              </button>
              <button style={styles.salvarBtn} onClick={handleSave}>
                <Save size={16} />
                {selectedEvent ? 'Salvar Alterações' : 'Criar Evento'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteModal && selectedEvent && (
        <div style={styles.modalOverlay}>
          <div style={{...styles.modal, maxWidth: '400px'}}>
            <h3 style={styles.modalTitle}>Excluir Evento</h3>
            <p style={styles.modalText}>
              Tem certeza que deseja excluir o evento "{selectedEvent.titulo}"?
              Esta ação não pode ser desfeita.
            </p>
            <div style={styles.modalFooter}>
              <button style={styles.cancelarBtn} onClick={() => setShowDeleteModal(false)}>
                Cancelar
              </button>
              <button style={{...styles.salvarBtn, backgroundColor: '#dc2626'}} onClick={confirmDelete}>
                <Trash2 size={16} />
                Excluir
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
    maxWidth: '1200px',
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
  novoEventoBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
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
    marginBottom: '30px',
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
  proximoEntregas: {
    fontSize: '12px',
    color: '#3b82f6'
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
    maxWidth: '600px',
    width: '90%',
    maxHeight: '90vh',
    overflow: 'auto'
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
  eventoStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
    marginTop: '15px'
  },
  eventoStat: {
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#f3f4f6',
    borderRadius: '8px'
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '20px'
  },
  editButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: '#f59e0b',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  deleteButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: '#dc2626',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  closeButton: {
    padding: '8px 16px',
    backgroundColor: '#f3f4f6',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  formGroup: {
    marginBottom: '15px'
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
  select: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    fontSize: '13px',
    outline: 'none'
  },
  textarea: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    fontSize: '13px',
    outline: 'none',
    fontFamily: 'inherit'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    marginBottom: '15px'
  },
  cancelarBtn: {
    padding: '10px 20px',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  salvarBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  modalText: {
    fontSize: '14px',
    color: '#4b5563',
    marginBottom: '20px'
  }
};