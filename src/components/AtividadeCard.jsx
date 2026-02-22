import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, Calendar, Clock, CheckCircle, XCircle, 
  Download, Eye, Edit2, Trash2, MoreVertical,
  Award, AlertCircle, Users
} from 'lucide-react';

export default function AtividadeCard({ 
  atividade, 
  perfil, 
  onEdit, 
  onDelete,
  onVisualizar 
}) {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);

  // Garantir que atividade existe
  if (!atividade) return null;

  const getStatusInfo = () => {
    const hoje = new Date();
    const dataLimite = atividade.dataLimite ? new Date(atividade.dataLimite) : null;
    
    if (atividade.status === 'concluida') {
      return { 
        label: 'Concluída', 
        color: '#10b981', 
        bg: '#d1fae5',
        icon: <CheckCircle size={14} />
      };
    }
    
    if (atividade.status === 'entregue') {
      return { 
        label: 'Entregue', 
        color: '#f59e0b', 
        bg: '#fef3c7',
        icon: <Clock size={14} />
      };
    }
    
    if (dataLimite && hoje > dataLimite) {
      return { 
        label: 'Atrasada', 
        color: '#dc2626', 
        bg: '#fee2e2',
        icon: <AlertCircle size={14} />
      };
    }
    
    return { 
      label: 'Pendente', 
      color: '#3b82f6', 
      bg: '#dbeafe',
      icon: <Clock size={14} />
    };
  };

  const statusInfo = getStatusInfo();

  const handleClick = () => {
    if (perfil === 'professor') {
      onVisualizar?.(atividade.id);
    } else if (perfil === 'aluno') {
      navigate(`/aluno/atividade/${atividade.id}`);
    } else if (perfil === 'pai') {
      navigate(`/pai/atividade/${atividade.id}`);
    }
  };

  return (
    <div style={styles.card} onClick={handleClick}>
      <div style={styles.header}>
        <div style={styles.tituloSection}>
          <div style={{...styles.tipoIcone, backgroundColor: atividade.cor ? atividade.cor + '20' : '#3b82f620', color: atividade.cor || '#3b82f6'}}>
            {atividade.tipo === 'prova' ? '📝' : '📚'}
          </div>
          <div>
            <h3 style={styles.titulo}>{atividade.titulo || 'Sem título'}</h3>
            <div style={styles.metaInfo}>
              <span style={styles.turma}>{atividade.turma || 'Turma não definida'}</span>
              <span style={styles.disciplina}>{atividade.disciplina || ''}</span>
            </div>
          </div>
        </div>

        {(perfil === 'professor') && (
          <div style={styles.optionsContainer}>
            <button 
              style={styles.optionsButton}
              onClick={(e) => {
                e.stopPropagation();
                setShowOptions(!showOptions);
              }}
            >
              <MoreVertical size={18} />
            </button>
            {showOptions && (
              <div style={styles.optionsMenu}>
                <button style={styles.optionItem} onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(atividade);
                }}>
                  <Edit2 size={14} /> Editar
                </button>
                <button style={{...styles.optionItem, color: '#dc2626'}} onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(atividade.id);
                }}>
                  <Trash2 size={14} /> Excluir
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={styles.content}>
        <p style={styles.descricao}>{atividade.descricao || 'Sem descrição'}</p>

        <div style={styles.detalhes}>
          {atividade.dataLimite && (
            <div style={styles.detalheItem}>
              <Calendar size={14} color="#6b7280" />
              <span>Data limite: {atividade.dataLimite}</span>
            </div>
          )}
          
          {atividade.tipo === 'prova' && atividade.questoes && (
            <div style={styles.detalheItem}>
              <FileText size={14} color="#6b7280" />
              <span>{atividade.questoes.length} questões</span>
            </div>
          )}

          {perfil === 'professor' && atividade.entregas !== undefined && atividade.totalAlunos !== undefined && (
            <div style={styles.detalheItem}>
              <Users size={14} color="#6b7280" />
              <span>{atividade.entregas}/{atividade.totalAlunos} entregas</span>
            </div>
          )}

          {perfil === 'aluno' && atividade.nota && (
            <div style={styles.detalheItem}>
              <Award size={14} color="#f59e0b" />
              <span>Nota: {atividade.nota}</span>
            </div>
          )}
        </div>

        {perfil === 'professor' && atividade.entregas !== undefined && atividade.totalAlunos !== undefined && (
          <div style={styles.progressoContainer}>
            <div style={styles.progressoInfo}>
              <span>Progresso de entregas</span>
              <span>{Math.round((atividade.entregas/atividade.totalAlunos)*100)}%</span>
            </div>
            <div style={styles.progressoBar}>
              <div style={{
                ...styles.progressoFill,
                width: `${(atividade.entregas/atividade.totalAlunos)*100}%`,
                backgroundColor: atividade.cor || '#3b82f6'
              }} />
            </div>
          </div>
        )}
      </div>

      <div style={styles.footer}>
        <span style={{...styles.statusBadge, backgroundColor: statusInfo.bg, color: statusInfo.color}}>
          {statusInfo.icon}
          {statusInfo.label}
        </span>

        {perfil === 'pai' && atividade.dataLimitePassou && (
          <span style={styles.visualizacaoTag}>
            <Eye size={14} /> Disponível para visualização
          </span>
        )}

        {perfil === 'aluno' && atividade.status === 'pendente' && (
          <button style={styles.entregarBtn} onClick={(e) => {
            e.stopPropagation();
            navigate(`/aluno/atividade/${atividade.id}/entregar`);
          }}>
            Entregar Atividade
          </button>
        )}

        {perfil === 'aluno' && atividade.status === 'entregue' && (
          <button style={styles.verEntregaBtn}>
            Ver Entrega
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    marginBottom: '15px',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '15px'
  },
  tituloSection: {
    display: 'flex',
    gap: '12px'
  },
  tipoIcone: {
    width: '45px',
    height: '45px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px'
  },
  titulo: {
    margin: '0 0 5px',
    fontSize: '16px',
    color: '#1f2937'
  },
  metaInfo: {
    display: 'flex',
    gap: '8px'
  },
  turma: {
    fontSize: '12px',
    color: '#3b82f6',
    backgroundColor: '#dbeafe',
    padding: '2px 8px',
    borderRadius: '20px'
  },
  disciplina: {
    fontSize: '12px',
    color: '#6b7280'
  },
  optionsContainer: {
    position: 'relative'
  },
  optionsButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '5px'
  },
  optionsMenu: {
    position: 'absolute',
    right: 0,
    top: '30px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    padding: '5px 0',
    zIndex: 10,
    minWidth: '120px'
  },
  optionItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    padding: '8px 15px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: '13px',
    textAlign: 'left'
  },
  content: {
    marginBottom: '15px'
  },
  descricao: {
    fontSize: '14px',
    color: '#4b5563',
    margin: '0 0 15px'
  },
  detalhes: {
    display: 'flex',
    gap: '20px',
    marginBottom: '15px',
    flexWrap: 'wrap'
  },
  detalheItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '12px',
    color: '#6b7280'
  },
  progressoContainer: {
    marginTop: '10px'
  },
  progressoInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    color: '#6b7280',
    marginBottom: '5px'
  },
  progressoBar: {
    height: '6px',
    backgroundColor: '#e5e7eb',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  progressoFill: {
    height: '100%',
    transition: 'width 0.3s'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #e5e7eb',
    paddingTop: '15px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px'
  },
  visualizacaoTag: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '12px',
    color: '#3b82f6'
  },
  entregarBtn: {
    padding: '6px 15px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px'
  },
  verEntregaBtn: {
    padding: '6px 15px',
    backgroundColor: '#f3f4f6',
    color: '#4b5563',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px'
  }
};