import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import AtividadeCard from '../../components/AtividadeCard';
import {
  ArrowLeft, Plus, Search, X, Save,
  FileText, Clock, Users,
  Trash2, CheckCircle
} from 'lucide-react';

export default function Atividades() {
  const navigate = useNavigate();
  const [showCriarModal, setShowCriarModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAtividade, setSelectedAtividade] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState('todas');
  const [filterTurma, setFilterTurma] = useState('todas');
  const [activeTab, setActiveTab] = useState('ativas');

  const [novaAtividade, setNovaAtividade] = useState({
    titulo: '',
    descricao: '',
    tipo: 'atividade',
    turmaId: '',
    dataLimite: '',
    questoes: [],
    arquivos: []
  });

  const [novaQuestao, setNovaQuestao] = useState({
    enunciado: '',
    tipo: 'discursiva',
    opcoes: ['', ''],
    valor: 1
  });

  // Mock de turmas
  const turmas = [
    { id: 1, nome: '6º Ano A', disciplina: 'Matemática' },
    { id: 2, nome: '7º Ano B', disciplina: 'Matemática' },
    { id: 3, nome: '8º Ano C', disciplina: 'Matemática' },
  ];

  // Mock de atividades
  const [atividades, setAtividades] = useState([
    {
      id: 1,
      titulo: 'Exercícios de Frações',
      descricao: 'Resolver os exercícios 1 a 10 da página 45.',
      tipo: 'atividade',
      turma: '6º Ano A',
      disciplina: 'Matemática',
      dataLimite: '25/02/2025',
      status: 'ativa',
      entregas: 28,
      totalAlunos: 32,
      questoes: [],
      cor: '#3b82f6'
    },
    {
      id: 2,
      titulo: 'Prova Bimestral - Matemática',
      descricao: 'Conteúdo: frações, números decimais e operações.',
      tipo: 'prova',
      turma: '6º Ano A',
      disciplina: 'Matemática',
      dataLimite: '28/02/2025',
      status: 'ativa',
      entregas: 0,
      totalAlunos: 32,
      questoes: [
        { enunciado: 'Quanto é 1/2 + 1/4?', tipo: 'objetiva', opcoes: ['3/4', '2/6', '3/6', '1/6'], valor: 2 },
        { enunciado: 'Explique o que são frações equivalentes.', tipo: 'discursiva', valor: 3 }
      ],
      cor: '#f59e0b'
    },
    {
      id: 3,
      titulo: 'Lista de Exercícios - Geometria',
      descricao: 'Exercícios sobre áreas e perímetros.',
      tipo: 'atividade',
      turma: '7º Ano B',
      disciplina: 'Matemática',
      dataLimite: '20/02/2025',
      status: 'concluida',
      entregas: 28,
      totalAlunos: 28,
      questoes: [],
      cor: '#10b981'
    },
  ]);

  const adicionarQuestao = () => {
    setNovaAtividade({
      ...novaAtividade,
      questoes: [...novaAtividade.questoes, { ...novaQuestao, id: Date.now() }]
    });
    setNovaQuestao({
      enunciado: '',
      tipo: 'discursiva',
      opcoes: ['', ''],
      valor: 1
    });
  };

  const removerQuestao = (id) => {
    setNovaAtividade({
      ...novaAtividade,
      questoes: novaAtividade.questoes.filter(q => q.id !== id)
    });
  };

  const handleEdit = (atividade) => {
    setSelectedAtividade(atividade);
    setNovaAtividade(atividade);
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    setSelectedAtividade(atividades.find(a => a.id === id));
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setAtividades(atividades.filter(a => a.id !== selectedAtividade.id));
    setShowDeleteModal(false);
    setSelectedAtividade(null);
  };

  const handleVisualizar = (id) => {
    navigate(`/professor/atividade/${id}`);
  };

  const handleSave = () => {
    if (showEditModal) {
      setAtividades(atividades.map(a =>
        a.id === selectedAtividade.id ? { ...novaAtividade, id: a.id } : a
      ));
      setShowEditModal(false);
    } else {
      const nova = {
        ...novaAtividade,
        id: atividades.length + 1,
        entregas: 0,
        totalAlunos: 32,
        status: 'ativa',
        cor: novaAtividade.tipo === 'prova' ? '#f59e0b' : '#3b82f6'
      };
      setAtividades([nova, ...atividades]);
      setShowCriarModal(false);
    }
    setNovaAtividade({
      titulo: '',
      descricao: '',
      tipo: 'atividade',
      turmaId: '',
      dataLimite: '',
      questoes: [],
      arquivos: []
    });
  };

  const filtrarAtividades = atividades.filter(ativ => {
    const matchesSearch = ativ.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTipo = filterTipo === 'todas' || ativ.tipo === filterTipo;
    const matchesTurma = filterTurma === 'todas' || ativ.turma === filterTurma;
    const matchesTab = activeTab === 'ativas' ? ativ.status === 'ativa' : ativ.status === 'concluida';
    return matchesSearch && matchesTipo && matchesTurma && matchesTab;
  });

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
              <h2 style={styles.title}>📚 Atividades e Provas</h2>
              <p style={styles.subtitle}>Gerencie atividades, exercícios e avaliações</p>
            </div>
          </div>
          <button style={styles.novaAtividadeBtn} onClick={() => setShowCriarModal(true)}>
            <Plus size={20} />
            Nova Atividade
          </button>
        </div>

        {/* Estatísticas */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <FileText size={24} color="#3b82f6" />
            <div>
              <span style={styles.statLabel}>Atividades</span>
              <strong style={styles.statValue}>{atividades.filter(a => a.tipo === 'atividade').length}</strong>
            </div>
          </div>
          <div style={styles.statCard}>
            <FileText size={24} color="#f59e0b" />
            <div>
              <span style={styles.statLabel}>Provas</span>
              <strong style={styles.statValue}>{atividades.filter(a => a.tipo === 'prova').length}</strong>
            </div>
          </div>
          <div style={styles.statCard}>
            <Users size={24} color="#10b981" />
            <div>
              <span style={styles.statLabel}>Entregas</span>
              <strong style={styles.statValue}>56</strong>
            </div>
          </div>
        </div>

        {/* Busca e Filtros - CORRIGIDO */}
        <div style={styles.searchContainer}>
          <div style={styles.searchWrapper}>
            <Search size={18} color="#9ca3af" style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar atividades..."
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            style={styles.filterSelect}
            value={filterTipo}
            onChange={(e) => setFilterTipo(e.target.value)}
          >
            <option value="todas">Todos os tipos</option>
            <option value="atividade">Atividades</option>
            <option value="prova">Provas</option>
          </select>
          <select
            style={styles.filterSelect}
            value={filterTurma}
            onChange={(e) => setFilterTurma(e.target.value)}
          >
            <option value="todas">Todas as turmas</option>
            {turmas.map(t => (
              <option key={t.id} value={t.nome}>{t.nome}</option>
            ))}
          </select>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button
            style={{...styles.tab, ...(activeTab === 'ativas' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('ativas')}
          >
            <Clock size={16} />
            Ativas
          </button>
          <button
            style={{...styles.tab, ...(activeTab === 'concluidas' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('concluidas')}
          >
            <CheckCircle size={16} />
            Concluídas
          </button>
        </div>

        {/* Lista de Atividades */}
        <div style={styles.atividadesList}>
          {filtrarAtividades.map(atividade => (
            <AtividadeCard
              key={atividade.id}
              atividade={atividade}
              perfil="professor"
              onEdit={handleEdit}
              onDelete={handleDelete}
              onVisualizar={handleVisualizar}
            />
          ))}

          {filtrarAtividades.length === 0 && (
            <div style={styles.emptyState}>
              <p>Nenhuma atividade encontrada</p>
              <button style={styles.criarPrimeiraBtn} onClick={() => setShowCriarModal(true)}>
                Criar primeira atividade
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Criar/Editar Atividade */}
      {(showCriarModal || showEditModal) && (
        <div style={styles.modalOverlay}>
          <div style={{...styles.modal, maxWidth: '700px'}}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                {showEditModal ? 'Editar Atividade' : 'Nova Atividade'}
              </h3>
              <button
                style={styles.modalClose}
                onClick={() => {
                  setShowCriarModal(false);
                  setShowEditModal(false);
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={styles.modalContent}>
              {/* Informações básicas */}
              <div style={styles.formSection}>
                <h4 style={styles.sectionTitle}>Informações Básicas</h4>

                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Tipo</label>
                    <select
                      style={styles.select}
                      value={novaAtividade.tipo}
                      onChange={(e) => setNovaAtividade({ ...novaAtividade, tipo: e.target.value })}
                    >
                      <option value="atividade">Atividade</option>
                      <option value="prova">Prova</option>
                    </select>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Turma</label>
                    <select
                      style={styles.select}
                      value={novaAtividade.turmaId}
                      onChange={(e) => setNovaAtividade({ ...novaAtividade, turmaId: e.target.value })}
                    >
                      <option value="">Selecione</option>
                      {turmas.map(t => (
                        <option key={t.id} value={t.id}>{t.nome}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Título</label>
                  <input
                    type="text"
                    style={styles.input}
                    placeholder="Digite o título"
                    value={novaAtividade.titulo}
                    onChange={(e) => setNovaAtividade({ ...novaAtividade, titulo: e.target.value })}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Descrição</label>
                  <textarea
                    style={styles.textarea}
                    rows="3"
                    placeholder="Descreva a atividade..."
                    value={novaAtividade.descricao}
                    onChange={(e) => setNovaAtividade({ ...novaAtividade, descricao: e.target.value })}
                  />
                </div>

                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Data Limite</label>
                    <input
                      type="date"
                      style={styles.input}
                      value={novaAtividade.dataLimite}
                      onChange={(e) => setNovaAtividade({ ...novaAtividade, dataLimite: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Questões (apenas para provas) */}
              {novaAtividade.tipo === 'prova' && (
                <div style={styles.formSection}>
                  <h4 style={styles.sectionTitle}>Questões da Prova</h4>

                  {/* Lista de questões existentes */}
                  {novaAtividade.questoes.map((questao, index) => (
                    <div key={questao.id} style={styles.questaoItem}>
                      <div style={styles.questaoHeader}>
                        <strong>Questão {index + 1}</strong>
                        <button
                          style={styles.removeQuestao}
                          onClick={() => removerQuestao(questao.id)}
                        >
                          <Trash2 size={14} color="#dc2626" />
                        </button>
                      </div>
                      <p style={styles.questaoEnunciado}>{questao.enunciado}</p>
                      <span style={styles.questaoTipo}>
                        {questao.tipo === 'objetiva' ? 'Múltipla escolha' : 'Discursiva'} - {questao.valor} pts
                      </span>
                    </div>
                  ))}

                  {/* Form para nova questão */}
                  <div style={styles.novaQuestao}>
                    <h5 style={styles.subtitle}>Adicionar Questão</h5>

                    <div style={styles.formRow}>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Tipo</label>
                        <select
                          style={styles.select}
                          value={novaQuestao.tipo}
                          onChange={(e) => setNovaQuestao({ ...novaQuestao, tipo: e.target.value })}
                        >
                          <option value="discursiva">Discursiva</option>
                          <option value="objetiva">Múltipla escolha</option>
                        </select>
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.label}>Valor (pontos)</label>
                        <input
                          type="number"
                          style={styles.input}
                          value={novaQuestao.valor}
                          onChange={(e) => setNovaQuestao({ ...novaQuestao, valor: parseFloat(e.target.value) })}
                          min="0.5"
                          step="0.5"
                        />
                      </div>
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Enunciado</label>
                      <textarea
                        style={styles.textarea}
                        rows="2"
                        placeholder="Digite o enunciado da questão..."
                        value={novaQuestao.enunciado}
                        onChange={(e) => setNovaQuestao({ ...novaQuestao, enunciado: e.target.value })}
                      />
                    </div>

                    {novaQuestao.tipo === 'objetiva' && (
                      <div style={styles.opcoesContainer}>
                        <label style={styles.label}>Opções</label>
                        {novaQuestao.opcoes.map((opcao, index) => (
                          <div key={index} style={styles.opcaoRow}>
                            <input
                              type="text"
                              style={styles.opcaoInput}
                              placeholder={`Opção ${String.fromCharCode(65 + index)}`}
                              value={opcao}
                              onChange={(e) => {
                                const novasOpcoes = [...novaQuestao.opcoes];
                                novasOpcoes[index] = e.target.value;
                                setNovaQuestao({ ...novaQuestao, opcoes: novasOpcoes });
                              }}
                            />
                            {index === novaQuestao.opcoes.length - 1 && (
                              <button
                                style={styles.addOpcao}
                                onClick={() => setNovaQuestao({
                                  ...novaQuestao,
                                  opcoes: [...novaQuestao.opcoes, '']
                                })}
                              >
                                +
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    <button style={styles.adicionarQuestaoBtn} onClick={adicionarQuestao}>
                      <Plus size={16} />
                      Adicionar Questão
                    </button>
                  </div>
                </div>
              )}

              {/* Arquivos anexos */}
              <div style={styles.formSection}>
                <h4 style={styles.sectionTitle}>Arquivos Anexos</h4>
                <div style={styles.uploadArea}>
                  <input type="file" id="arquivo" style={{ display: 'none' }} multiple />
                  <label htmlFor="arquivo" style={styles.uploadLabel}>
                    <Plus size={20} />
                    <div>
                      <strong>Clique para fazer upload</strong>
                      <p>PDF, DOC, JPG (max 10MB)</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.cancelarBtn} onClick={() => {
                setShowCriarModal(false);
                setShowEditModal(false);
              }}>
                Cancelar
              </button>
              <button style={styles.salvarBtn} onClick={handleSave}>
                <Save size={16} />
                {showEditModal ? 'Salvar Alterações' : 'Publicar Atividade'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteModal && (
        <div style={styles.modalOverlay}>
          <div style={{...styles.modal, maxWidth: '400px'}}>
            <h3 style={styles.modalTitle}>Excluir Atividade</h3>
            <p style={styles.modalText}>
              Tem certeza que deseja excluir a atividade "{selectedAtividade?.titulo}"?
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
    maxWidth: '1000px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px',
    flexWrap: 'wrap',
    gap: '15px'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    flexWrap: 'wrap'
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
    justifyContent: 'center',
    flexShrink: 0
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
  novaAtividadeBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    flexShrink: 0
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
  // CORREÇÃO PRINCIPAL: Container da busca com flexbox
  searchContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    width: '100%',
    flexWrap: 'wrap'
  },
  // Wrapper para o input ocupar o espaço disponível
  searchWrapper: {
    flex: 1,
    position: 'relative',
    minWidth: '250px' // Largura mínima para o input
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1
  },
  searchInput: {
    width: '100%',
    padding: '12px 12px 12px 40px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  filterSelect: {
    padding: '0 20px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    cursor: 'pointer',
    minWidth: '150px',
    height: '45px',
    flexShrink: 0
  },
  tabs: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    borderBottom: '2px solid #e5e7eb',
    flexWrap: 'wrap'
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#6b7280',
    borderBottom: '2px solid transparent',
    marginBottom: '-2px',
    flexShrink: 0
  },
  activeTab: {
    color: '#2563eb',
    borderBottom: '2px solid #2563eb'
  },
  atividadesList: {
    marginBottom: '30px'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: 'white',
    borderRadius: '12px'
  },
  criarPrimeiraBtn: {
    marginTop: '15px',
    padding: '12px 24px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
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
    maxWidth: '700px',
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
    padding: '5px',
    flexShrink: 0
  },
  modalContent: {
    marginBottom: '20px'
  },
  formSection: {
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '1px solid #e5e7eb'
  },
  sectionTitle: {
    fontSize: '16px',
    margin: '0 0 15px',
    color: '#1f2937'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    marginBottom: '15px'
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
    outline: 'none',
    boxSizing: 'border-box'
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    fontSize: '13px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  textarea: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    fontSize: '13px',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    resize: 'vertical'
  },
  questaoItem: {
    backgroundColor: '#f9fafb',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '10px'
  },
  questaoHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  removeQuestao: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    flexShrink: 0
  },
  questaoEnunciado: {
    margin: '0 0 5px',
    fontSize: '13px',
    color: '#1f2937'
  },
  questaoTipo: {
    fontSize: '11px',
    color: '#6b7280'
  },
  novaQuestao: {
    backgroundColor: '#f3f4f6',
    padding: '15px',
    borderRadius: '8px',
    marginTop: '15px'
  },
  opcoesContainer: {
    marginBottom: '15px'
  },
  opcaoRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
    flexWrap: 'wrap'
  },
  opcaoInput: {
    flex: 1,
    minWidth: '200px',
    padding: '8px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    fontSize: '13px',
    boxSizing: 'border-box'
  },
  addOpcao: {
    width: '35px',
    height: '35px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '18px',
    flexShrink: 0
  },
  adicionarQuestaoBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px'
  },
  uploadArea: {
    border: '2px dashed #e5e7eb',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center'
  },
  uploadLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    cursor: 'pointer',
    flexWrap: 'wrap'
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '20px',
    flexWrap: 'wrap'
  },
  cancelarBtn: {
    padding: '10px 20px',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px'
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
    cursor: 'pointer',
    fontSize: '13px'
  },
  modalText: {
    fontSize: '14px',
    color: '#4b5563',
    marginBottom: '20px'
  }
};