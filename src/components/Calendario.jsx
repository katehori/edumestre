import { useState } from 'react';
import { 
  ChevronLeft, ChevronRight, Calendar as CalendarIcon,
  Clock, FileText, Users, Award
} from 'lucide-react';

export default function Calendario({ eventos, onEventClick, perfil }) {
  const [mesAtual, setMesAtual] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const getDiasNoMes = (date) => {
    const ano = date.getFullYear();
    const mes = date.getMonth();
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    
    const dias = [];
    const primeiroDiaSemana = primeiroDia.getDay();
    
    // Dias do mês anterior
    for (let i = 0; i < primeiroDiaSemana; i++) {
      const dia = new Date(ano, mes, -i);
      dias.unshift({ date: dia, isCurrentMonth: false });
    }
    
    // Dias do mês atual
    for (let i = 1; i <= ultimoDia.getDate(); i++) {
      dias.push({ date: new Date(ano, mes, i), isCurrentMonth: true });
    }
    
    // Dias do próximo mês para completar 42 células (6 semanas)
    const diasRestantes = 42 - dias.length;
    for (let i = 1; i <= diasRestantes; i++) {
      dias.push({ date: new Date(ano, mes + 1, i), isCurrentMonth: false });
    }
    
    return dias;
  };

  const getEventosDoDia = (date) => {
    return eventos.filter(evento => {
      const eventoDate = new Date(evento.data);
      return eventoDate.toDateString() === date.toDateString();
    });
  };

  const handlePrevMonth = () => {
    setMesAtual(new Date(mesAtual.getFullYear(), mesAtual.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setMesAtual(new Date(mesAtual.getFullYear(), mesAtual.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setMesAtual(new Date());
  };

  const dias = getDiasNoMes(mesAtual);

  return (
    <div style={styles.container}>
      {/* Header do Calendário */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h2 style={styles.mesAno}>
            {meses[mesAtual.getMonth()]} {mesAtual.getFullYear()}
          </h2>
          <div style={styles.navigation}>
            <button style={styles.navButton} onClick={handlePrevMonth}>
              <ChevronLeft size={20} />
            </button>
            <button style={styles.navButton} onClick={handleNextMonth}>
              <ChevronRight size={20} />
            </button>
            <button style={styles.todayButton} onClick={handleToday}>
              Hoje
            </button>
          </div>
        </div>
        <div style={styles.legenda}>
          <div style={styles.legendaItem}>
            <span style={{...styles.legendaCor, backgroundColor: '#3b82f6'}} />
            <span>Atividades</span>
          </div>
          <div style={styles.legendaItem}>
            <span style={{...styles.legendaCor, backgroundColor: '#f59e0b'}} />
            <span>Provas</span>
          </div>
          <div style={styles.legendaItem}>
            <span style={{...styles.legendaCor, backgroundColor: '#10b981'}} />
            <span>Entregas</span>
          </div>
        </div>
      </div>

      {/* Dias da semana */}
      <div style={styles.diasSemana}>
        {diasSemana.map(dia => (
          <div key={dia} style={styles.diaSemana}>
            {dia}
          </div>
        ))}
      </div>

      {/* Grid de dias */}
      <div style={styles.grid}>
        {dias.map((dia, index) => {
          const eventosDoDia = getEventosDoDia(dia.date);
          const isToday = dia.date.toDateString() === new Date().toDateString();
          const isSelected = selectedDate && selectedDate.toDateString() === dia.date.toDateString();

          return (
            <div
              key={index}
              style={{
                ...styles.dia,
                ...(!dia.isCurrentMonth && styles.diaOutroMes),
                ...(isToday && styles.diaHoje),
                ...(isSelected && styles.diaSelecionado)
              }}
              onClick={() => setSelectedDate(dia.date)}
            >
              <span style={styles.diaNumero}>{dia.date.getDate()}</span>
              
              {eventosDoDia.length > 0 && (
                <div style={styles.eventos}>
                  {eventosDoDia.slice(0, 3).map((evento, i) => (
                    <div
                      key={i}
                      style={{
                        ...styles.evento,
                        backgroundColor: evento.tipo === 'prova' ? '#f59e0b20' : 
                                       evento.tipo === 'atividade' ? '#3b82f620' : '#10b98120',
                        borderLeft: `3px solid ${evento.tipo === 'prova' ? '#f59e0b' : 
                                                evento.tipo === 'atividade' ? '#3b82f6' : '#10b981'}`
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick?.(evento);
                      }}
                    >
                      <span style={styles.eventoTitulo}>{evento.titulo}</span>
                      {evento.turma && (
                        <span style={styles.eventoTurma}>{evento.turma}</span>
                      )}
                    </div>
                  ))}
                  {eventosDoDia.length > 3 && (
                    <span style={styles.maisEventos}>
                      +{eventosDoDia.length - 3} mais
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Eventos do dia selecionado */}
      {selectedDate && (
        <div style={styles.eventosDoDia}>
          <h3 style={styles.eventosDoDiaTitle}>
            Eventos de {selectedDate.toLocaleDateString('pt-BR')}
          </h3>
          <div style={styles.eventosLista}>
            {getEventosDoDia(selectedDate).map((evento, index) => (
              <div
                key={index}
                style={styles.eventoDetalhe}
                onClick={() => onEventClick?.(evento)}
              >
                <div style={styles.eventoDetalheHeader}>
                  <div style={{
                    ...styles.eventoDetalheIcone,
                    backgroundColor: evento.tipo === 'prova' ? '#f59e0b' : 
                                   evento.tipo === 'atividade' ? '#3b82f6' : '#10b981'
                  }}>
                    {evento.tipo === 'prova' ? '📝' : '📚'}
                  </div>
                  <div style={styles.eventoDetalheInfo}>
                    <strong>{evento.titulo}</strong>
                    <span style={styles.eventoDetalheMeta}>
                      {evento.turma} • {evento.disciplina}
                    </span>
                  </div>
                </div>
                <div style={styles.eventoDetalheFooter}>
                  <span style={styles.eventoDetalheHora}>
                    <Clock size={12} /> {evento.hora || 'Durante o dia'}
                  </span>
                  {perfil === 'professor' && (
                    <span style={styles.eventoDetalheEntregas}>
                      <Users size={12} /> {evento.entregas || 0}/{evento.totalAlunos || 0} entregas
                    </span>
                  )}
                  {perfil === 'aluno' && evento.nota && (
                    <span style={styles.eventoDetalheNota}>
                      <Award size={12} /> Nota: {evento.nota}
                    </span>
                  )}
                </div>
              </div>
            ))}
            {getEventosDoDia(selectedDate).length === 0 && (
              <p style={styles.semEventos}>Nenhum evento para este dia</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '15px'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  mesAno: {
    fontSize: '20px',
    margin: 0,
    color: '#1f2937'
  },
  navigation: {
    display: 'flex',
    gap: '5px'
  },
  navButton: {
    width: '35px',
    height: '35px',
    borderRadius: '17.5px',
    border: '1px solid #e5e7eb',
    backgroundColor: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  todayButton: {
    padding: '8px 15px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px'
  },
  legenda: {
    display: 'flex',
    gap: '15px'
  },
  legendaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '12px',
    color: '#6b7280'
  },
  legendaCor: {
    width: '12px',
    height: '12px',
    borderRadius: '3px'
  },
  diasSemana: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    marginBottom: '10px'
  },
  diaSemana: {
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: '500',
    color: '#6b7280',
    padding: '10px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '1px',
    backgroundColor: '#e5e7eb',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '20px'
  },
  dia: {
    minHeight: '120px',
    backgroundColor: 'white',
    padding: '8px',
    cursor: 'pointer',
    position: 'relative'
  },
  diaOutroMes: {
    backgroundColor: '#f9fafb',
    color: '#9ca3af'
  },
  diaHoje: {
    backgroundColor: '#dbeafe'
  },
  diaSelecionado: {
    border: '2px solid #3b82f6'
  },
  diaNumero: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '5px'
  },
  eventos: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px'
  },
  evento: {
    padding: '4px 6px',
    borderRadius: '4px',
    fontSize: '11px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  eventoTitulo: {
    display: 'block',
    fontWeight: '500'
  },
  eventoTurma: {
    fontSize: '10px',
    color: '#6b7280'
  },
  maisEventos: {
    fontSize: '10px',
    color: '#6b7280',
    padding: '2px 4px'
  },
  eventosDoDia: {
    borderTop: '1px solid #e5e7eb',
    paddingTop: '20px',
    marginTop: '10px'
  },
  eventosDoDiaTitle: {
    fontSize: '16px',
    margin: '0 0 15px',
    color: '#1f2937'
  },
  eventosLista: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  eventoDetalhe: {
    padding: '12px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  eventoDetalheHeader: {
    display: 'flex',
    gap: '10px',
    marginBottom: '8px'
  },
  eventoDetalheIcone: {
    width: '35px',
    height: '35px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '16px'
  },
  eventoDetalheInfo: {
    flex: 1
  },
  eventoDetalheMeta: {
    display: 'block',
    fontSize: '11px',
    color: '#6b7280',
    marginTop: '2px'
  },
  eventoDetalheFooter: {
    display: 'flex',
    gap: '15px',
    fontSize: '11px',
    color: '#6b7280',
    marginLeft: '45px'
  },
  eventoDetalheHora: {
    display: 'flex',
    alignItems: 'center',
    gap: '3px'
  },
  eventoDetalheEntregas: {
    display: 'flex',
    alignItems: 'center',
    gap: '3px'
  },
  eventoDetalheNota: {
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    color: '#f59e0b'
  },
  semEventos: {
    textAlign: 'center',
    padding: '20px',
    color: '#6b7280',
    fontSize: '13px'
  }
};