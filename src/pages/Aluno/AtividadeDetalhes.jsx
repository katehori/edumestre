import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import { 
  ArrowLeft, Calendar, Clock, FileText,
  Upload, CheckCircle, Save, X
} from 'lucide-react';

export default function AtividadeDetalhes() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [respostas, setRespostas] = useState({});
  const [arquivos, setArquivos] = useState([]);
  const [enviado, setEnviado] = useState(false);

  // Mock da atividade
  const atividade = {
    id: 1,
    titulo: 'Prova Bimestral - Matemática',
    descricao: 'Conteúdo: frações, números decimais e operações básicas.',
    tipo: 'prova',
    disciplina: 'Matemática',
    turma: '6º Ano A',
    professor: 'Prof. Carlos Silva',
    dataLimite: '25/02/2025',
    status: 'pendente',
    questoes: [
      { 
        id: 1, 
        enunciado: 'Quanto é 1/2 + 1/4?', 
        tipo: 'objetiva', 
        opcoes: ['3/4', '2/6', '3/6', '1/6'],
        valor: 2
      },
      { 
        id: 2, 
        enunciado: 'Calcule: 0,75 + 1,25', 
        tipo: 'discursiva', 
        valor: 3 
      },
      { 
        id: 3, 
        enunciado: 'Explique o que são frações equivalentes e dê um exemplo.', 
        tipo: 'discursiva', 
        valor: 5 
      },
    ]
  };

  const handleRespostaChange = (questaoId, valor) => {
    setRespostas({
      ...respostas,
      [questaoId]: valor
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setArquivos([...arquivos, ...files]);
  };

  const removeArquivo = (index) => {
    setArquivos(arquivos.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Validar se todas as questões foram respondidas
    if (atividade.tipo === 'prova' && Object.keys(respostas).length < atividade.questoes.length) {
      alert('Responda todas as questões antes de enviar');
      return;
    }

    setEnviado(true);
    alert('Atividade enviada com sucesso!');
    navigate('/aluno/atividades');
  };

  const calcularProgresso = () => {
    return Math.round((Object.keys(respostas).length / atividade.questoes.length) * 100);
  };

  return (
    <Layout perfil="aluno" nome="João Silva" turmaInfo="6º Ano A">
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <button style={styles.backButton} onClick={() => navigate('/aluno/atividades')}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 style={styles.title}>{atividade.titulo}</h2>
              <p style={styles.subtitle}>{atividade.disciplina} • {atividade.turma}</p>
            </div>
          </div>
        </div>

        {/* Informações da Atividade */}
        <div style={styles.infoCard}>
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <Calendar size={18} color="#6b7280" />
              <div>
                <span style={styles.infoLabel}>Data limite</span>
                <strong style={styles.infoValue}>{atividade.dataLimite}</strong>
              </div>
            </div>
            <div style={styles.infoItem}>
              <Clock size={18} color="#6b7280" />
              <div>
                <span style={styles.infoLabel}>Status</span>
                <span style={{
                  ...styles.statusBadge,
                  backgroundColor: atividade.status === 'pendente' ? '#fee2e2' : '#d1fae5',
                  color: atividade.status === 'pendente' ? '#dc2626' : '#10b981'
                }}>
                  {atividade.status === 'pendente' ? 'Pendente' : 'Concluída'}
                </span>
              </div>
            </div>
            <div style={styles.infoItem}>
              <FileText size={18} color="#6b7280" />
              <div>
                <span style={styles.infoLabel}>Questões</span>
                <strong style={styles.infoValue}>{atividade.questoes.length}</strong>
              </div>
            </div>
          </div>
          <p style={styles.descricao}>{atividade.descricao}</p>
        </div>

        {/* Barra de Progresso */}
        <div style={styles.progressoCard}>
          <div style={styles.progressoHeader}>
            <span>Progresso</span>
            <span>{calcularProgresso()}% concluído</span>
          </div>
          <div style={styles.progressoBar}>
            <div style={{...styles.progressoFill, width: `${calcularProgresso()}%`}} />
          </div>
        </div>

        {/* Questões */}
        <div style={styles.questoesSection}>
          <h3 style={styles.sectionTitle}>Questões</h3>
          
          {atividade.questoes.map((questao, index) => (
            <div key={questao.id} style={styles.questaoCard}>
              <div style={styles.questaoHeader}>
                <span style={styles.questaoNumero}>Questão {index + 1}</span>
                <span style={styles.questaoValor}>{questao.valor} pontos</span>
              </div>
              
              <p style={styles.questaoEnunciado}>{questao.enunciado}</p>

              {questao.tipo === 'objetiva' ? (
                <div style={styles.opcoes}>
                  {questao.opcoes.map((opcao, i) => (
                    <label key={i} style={styles.opcaoLabel}>
                      <input
                        type="radio"
                        name={`questao-${questao.id}`}
                        value={opcao}
                        checked={respostas[questao.id] === opcao}
                        onChange={(e) => handleRespostaChange(questao.id, e.target.value)}
                        style={styles.radio}
                      />
                      <span style={styles.opcaoTexto}>{opcao}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <textarea
                  style={styles.textarea}
                  rows="4"
                  placeholder="Digite sua resposta..."
                  value={respostas[questao.id] || ''}
                  onChange={(e) => handleRespostaChange(questao.id, e.target.value)}
                />
              )}

              {respostas[questao.id] && (
                <span style={styles.respondidaTag}>
                  <CheckCircle size={14} color="#10b981" /> Respondida
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Anexos */}
        <div style={styles.anexosSection}>
          <h3 style={styles.sectionTitle}>Anexos</h3>
          
          <div style={styles.uploadArea}>
            <input
              type="file"
              id="arquivo"
              style={{ display: 'none' }}
              multiple
              onChange={handleFileUpload}
            />
            <label htmlFor="arquivo" style={styles.uploadLabel}>
              <Upload size={20} />
              <div>
                <strong>Clique para anexar arquivos</strong>
                <p>PDF, DOC, JPG, PNG (max 10MB)</p>
              </div>
            </label>
          </div>

          {arquivos.length > 0 && (
            <div style={styles.arquivosLista}>
              {arquivos.map((arquivo, index) => (
                <div key={index} style={styles.arquivoItem}>
                  <FileText size={16} color="#3b82f6" />
                  <span style={styles.arquivoNome}>{arquivo.name}</span>
                  <span style={styles.arquivoTamanho}>
                    {(arquivo.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                  <button 
                    style={styles.removeArquivo}
                    onClick={() => removeArquivo(index)}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Botões de Ação */}
        <div style={styles.actions}>
          <button style={styles.cancelarBtn} onClick={() => navigate('/aluno/atividades')}>
            Cancelar
          </button>
          <button 
            style={styles.enviarBtn}
            onClick={handleSubmit}
            disabled={enviado}
          >
            <Save size={16} />
            {enviado ? 'Enviado' : 'Entregar Atividade'}
          </button>
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
  infoCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
    marginBottom: '15px'
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  infoLabel: {
    fontSize: '11px',
    color: '#6b7280',
    display: 'block'
  },
  infoValue: {
    fontSize: '14px',
    color: '#1f2937'
  },
  statusBadge: {
    padding: '4px 8px',
    borderRadius: '20px',
    fontSize: '12px'
  },
  descricao: {
    margin: 0,
    fontSize: '14px',
    color: '#4b5563',
    lineHeight: '1.6'
  },
  progressoCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '15px',
    marginBottom: '20px'
  },
  progressoHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: '#6b7280',
    marginBottom: '8px'
  },
  progressoBar: {
    height: '8px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  progressoFill: {
    height: '100%',
    backgroundColor: '#2563eb',
    transition: 'width 0.3s'
  },
  questoesSection: {
    marginBottom: '30px'
  },
  sectionTitle: {
    fontSize: '16px',
    margin: '0 0 15px',
    color: '#1f2937'
  },
  questaoCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    position: 'relative'
  },
  questaoHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px'
  },
  questaoNumero: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#2563eb'
  },
  questaoValor: {
    fontSize: '12px',
    color: '#6b7280'
  },
  questaoEnunciado: {
    fontSize: '15px',
    color: '#1f2937',
    marginBottom: '15px'
  },
  opcoes: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  opcaoLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer'
  },
  radio: {
    width: '18px',
    height: '18px',
    cursor: 'pointer'
  },
  opcaoTexto: {
    fontSize: '14px',
    color: '#4b5563'
  },
  textarea: {
    width: '100%',
    padding: '12px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    fontFamily: 'inherit'
  },
  respondidaTag: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '11px',
    color: '#10b981'
  },
  anexosSection: {
    marginBottom: '30px'
  },
  uploadArea: {
    border: '2px dashed #e5e7eb',
    borderRadius: '8px',
    padding: '30px',
    textAlign: 'center',
    marginBottom: '15px'
  },
  uploadLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    cursor: 'pointer'
  },
  arquivosLista: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  arquivoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px'
  },
  arquivoNome: {
    flex: 1,
    fontSize: '13px',
    color: '#1f2937'
  },
  arquivoTamanho: {
    fontSize: '11px',
    color: '#6b7280'
  },
  removeArquivo: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    color: '#dc2626'
  },
  actions: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end'
  },
  cancelarBtn: {
    padding: '12px 24px',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  enviarBtn: {
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
  }
};