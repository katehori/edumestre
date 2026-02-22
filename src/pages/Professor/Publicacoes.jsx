import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import PublicacaoCard from '../../components/PublicacaoCard';
import {
  ArrowLeft, Plus, Search, Filter, X,
  Youtube, Link as LinkIcon, FileText, Image,
  Upload, Trash2, Save
} from 'lucide-react';

export default function Publicacoes() {
  const navigate = useNavigate();
  const [showCriarModal, setShowCriarModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPublicacao, setSelectedPublicacao] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTurma, setFilterTurma] = useState('todas');

  const [novaPublicacao, setNovaPublicacao] = useState({
    titulo: '',
    conteudo: '',
    turmaId: '',
    midias: []
  });

  const [midiaAtual, setMidiaAtual] = useState({
    tipo: 'link',
    url: '',
    nome: ''
  });

  // Mock de turmas do professor
  const turmas = [
    { id: 1, nome: '6º Ano A' },
    { id: 2, nome: '7º Ano B' },
    { id: 3, nome: '8º Ano C' },
  ];

  // Mock de publicações
  const [publicacoes, setPublicacoes] = useState([
    {
      id: 1,
      titulo: 'Conteúdo para a prova de Matemática',
      conteudo: 'Pessoal, segue o conteúdo que vai cair na prova bimestral: frações, números decimais e operações básicas. Estudar pelos capítulos 5, 6 e 7 do livro.',
      autor: 'Prof. Carlos Silva',
      autorCor: '#3b82f6',
      turma: '6º Ano A',
      turmaId: 1, // Adicionado turmaId
      data: '2 horas atrás',
      likes: 23,
      comentarios: [
        { autor: 'João Silva', texto: 'Obrigado professor!', data: '1h atrás' },
        { autor: 'Maria Santos', texto: 'Vai cair frações mistas?', data: '30min atrás' }
      ],
      usuarioCurtiu: true,
      midias: [
        { tipo: 'arquivo', nome: 'Conteúdo_Prova.pdf', tamanho: '2.5 MB' }
      ],
      visualizacoes: 45
    },
    {
      id: 2,
      titulo: 'Videoaula: Frações',
      conteudo: 'Segue uma videoaula explicando frações de forma simples e divertida!',
      autor: 'Prof. Carlos Silva',
      autorCor: '#3b82f6',
      turma: '6º Ano A',
      turmaId: 1, // Adicionado turmaId
      data: '1 dia atrás',
      likes: 45,
      comentarios: [
        { autor: 'Pedro Lima', texto: 'Ótimo vídeo!', data: '20h atrás' }
      ],
      usuarioCurtiu: false,
      midias: [
        { tipo: 'youtube', id: 'dQw4w9WgXcQ' }
      ],
      visualizacoes: 78
    },
    {
      id: 3,
      titulo: 'Material de apoio - Português',
      conteudo: 'Disponibilizei alguns links com exercícios de interpretação de texto.',
      autor: 'Prof. Carlos Silva',
      autorCor: '#3b82f6',
      turma: '7º Ano B',
      turmaId: 2, // Adicionado turmaId
      data: '3 dias atrás',
      likes: 12,
      comentarios: [],
      usuarioCurtiu: false,
      midias: [
        { tipo: 'link', url: 'https://www.todamateria.com.br/interpretacao-de-texto/' },
        { tipo: 'link', url: 'https://www.portugues.com.br/exercicios' }
      ],
      visualizacoes: 34
    },
    {
      id: 4,
      titulo: 'Atividade de Matemática - 7º Ano',
      conteudo: 'Atividade sobre equações de primeiro grau para ser entregue até sexta.',
      autor: 'Prof. Carlos Silva',
      autorCor: '#3b82f6',
      turma: '7º Ano B',
      turmaId: 2, // Adicionado turmaId
      data: '1 dia atrás',
      likes: 18,
      comentarios: [
        { autor: 'Ana Oliveira', texto: 'Professor, pode fazer em dupla?', data: '12h atrás' }
      ],
      usuarioCurtiu: false,
      midias: [
        { tipo: 'arquivo', nome: 'Atividade_Equacoes.pdf', tamanho: '1.2 MB' }
      ],
      visualizacoes: 25
    },
    {
      id: 5,
      titulo: 'Material de Apoio - 8º Ano',
      conteudo: 'Material complementar sobre geometria para o 8º ano.',
      autor: 'Prof. Carlos Silva',
      autorCor: '#3b82f6',
      turma: '8º Ano C',
      turmaId: 3, // Adicionado turmaId
      data: '5 dias atrás',
      likes: 9,
      comentarios: [],
      usuarioCurtiu: false,
      midias: [
        { tipo: 'link', url: 'https://www.geometria.com.br/material' }
      ],
      visualizacoes: 15
    },
  ]);

  const adicionarMidia = () => {
    if (midiaAtual.tipo === 'link' && midiaAtual.url) {
      setNovaPublicacao({
        ...novaPublicacao,
        midias: [...novaPublicacao.midias, { ...midiaAtual }]
      });
      setMidiaAtual({ tipo: 'link', url: '', nome: '' });
    } else if (midiaAtual.tipo === 'youtube' && midiaAtual.url) {
      setNovaPublicacao({
        ...novaPublicacao,
        midias: [...novaPublicacao.midias, { ...midiaAtual }]
      });
      setMidiaAtual({ tipo: 'link', url: '', nome: '' });
    } else if (midiaAtual.tipo === 'arquivo' && midiaAtual.nome) {
      setNovaPublicacao({
        ...novaPublicacao,
        midias: [...novaPublicacao.midias, { ...midiaAtual }]
      });
      setMidiaAtual({ tipo: 'link', url: '', nome: '' });
    }
  };

  const removerMidia = (index) => {
    const novasMidias = novaPublicacao.midias.filter((_, i) => i !== index);
    setNovaPublicacao({ ...novaPublicacao, midias: novasMidias });
  };

  const handleLike = (id) => {
    setPublicacoes(publicacoes.map(pub =>
      pub.id === id
        ? { ...pub, likes: pub.usuarioCurtiu ? pub.likes - 1 : pub.likes + 1, usuarioCurtiu: !pub.usuarioCurtiu }
        : pub
    ));
  };

  const handleComment = (id, texto) => {
    setPublicacoes(publicacoes.map(pub =>
      pub.id === id
        ? {
          ...pub,
          comentarios: [...pub.comentarios, {
            autor: 'João Silva',
            texto,
            data: 'agora mesmo'
          }]
        }
        : pub
    ));
  };

  const handleEdit = (publicacao) => {
    setSelectedPublicacao(publicacao);
    setNovaPublicacao(publicacao);
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    setSelectedPublicacao(publicacoes.find(p => p.id === id));
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setPublicacoes(publicacoes.filter(p => p.id !== selectedPublicacao.id));
    setShowDeleteModal(false);
    setSelectedPublicacao(null);
  };

  const handleSave = () => {
    if (showEditModal) {
      // Editar
      setPublicacoes(publicacoes.map(p =>
        p.id === selectedPublicacao.id
          ? { ...novaPublicacao, id: p.id }
          : p
      ));
      setShowEditModal(false);
    } else {
      // Criar nova
      const turmaSelecionada = turmas.find(t => t.id === parseInt(novaPublicacao.turmaId));
      const nova = {
        ...novaPublicacao,
        id: publicacoes.length + 1,
        autor: 'Prof. Carlos Silva',
        autorCor: '#3b82f6',
        turma: turmaSelecionada?.nome || '',
        data: 'agora mesmo',
        likes: 0,
        comentarios: [],
        usuarioCurtiu: false,
        visualizacoes: 0
      };
      setPublicacoes([nova, ...publicacoes]);
      setShowCriarModal(false);
    }
    setNovaPublicacao({ titulo: '', conteudo: '', turmaId: '', midias: [] });
  };

  // Função de filtro corrigida
  const filtrarPublicacoes = publicacoes.filter(pub => {
    // Filtro por texto
    const matchesSearch = searchTerm === '' ||
      pub.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.conteudo.toLowerCase().includes(searchTerm.toLowerCase());

    // Filtro por turma - corrigido para comparar corretamente
    const matchesTurma = filterTurma === 'todas' ||
      pub.turmaId === parseInt(filterTurma);

    return matchesSearch && matchesTurma;
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
              <h2 style={styles.title}>Publicações</h2>
              <p style={styles.subtitle}>Compartilhe conteúdos, vídeos e materiais com seus alunos</p>
            </div>
          </div>
          <button style={styles.novaPublicacaoBtn} onClick={() => setShowCriarModal(true)}>
            <Plus size={20} />
            Nova Publicação
          </button>
        </div>

        {/* Busca e Filtros - CORRIGIDO */}
        <div style={styles.searchContainer}>
          <div style={styles.searchWrapper}>
            <Search size={18} color="#9ca3af" style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar publicações..."
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            style={styles.filterSelect}
            value={filterTurma}
            onChange={(e) => setFilterTurma(e.target.value)}
          >
            <option value="todas">Todas as turmas</option>
            {turmas.map(t => (
              <option key={t.id} value={t.id}>{t.nome}</option>
            ))}
          </select>
        </div>

        {/* Estatísticas */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <span style={styles.statValue}>{publicacoes.length}</span>
            <span style={styles.statLabel}>Total de publicações</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statValue}>
              {publicacoes.reduce((acc, p) => acc + p.likes, 0)}
            </span>
            <span style={styles.statLabel}>Total de curtidas</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statValue}>
              {publicacoes.reduce((acc, p) => acc + (p.comentarios?.length || 0), 0)}
            </span>
            <span style={styles.statLabel}>Comentários</span>
          </div>
        </div>

        {/* Lista de Publicações */}
        <div style={styles.publicacoesList}>
          {filtrarPublicacoes.length > 0 ? (
            filtrarPublicacoes.map(publicacao => (
              <PublicacaoCard
                key={publicacao.id}
                publicacao={publicacao}
                perfil="professor"
                onLike={handleLike}
                onComment={handleComment}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div style={styles.emptyState}>
              <p>Nenhuma publicação encontrada</p>
              <button style={styles.criarPrimeiraBtn} onClick={() => setShowCriarModal(true)}>
                Criar primeira publicação
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Criar/Editar Publicação */}
      {(showCriarModal || showEditModal) && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                {showEditModal ? 'Editar Publicação' : 'Nova Publicação'}
              </h3>
              <button
                style={styles.modalClose}
                onClick={() => {
                  setShowCriarModal(false);
                  setShowEditModal(false);
                  setNovaPublicacao({ titulo: '', conteudo: '', turmaId: '', midias: [] });
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={styles.modalContent}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Turma *</label>
                <select
                  style={styles.select}
                  value={novaPublicacao.turmaId}
                  onChange={(e) => setNovaPublicacao({ ...novaPublicacao, turmaId: e.target.value })}
                >
                  <option value="">Selecione uma turma</option>
                  {turmas.map(t => (
                    <option key={t.id} value={t.id}>{t.nome}</option>
                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Título *</label>
                <input
                  type="text"
                  style={styles.input}
                  placeholder="Digite o título da publicação"
                  value={novaPublicacao.titulo}
                  onChange={(e) => setNovaPublicacao({ ...novaPublicacao, titulo: e.target.value })}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Conteúdo</label>
                <textarea
                  style={styles.textarea}
                  rows="4"
                  placeholder="Escreva o conteúdo da sua publicação..."
                  value={novaPublicacao.conteudo}
                  onChange={(e) => setNovaPublicacao({ ...novaPublicacao, conteudo: e.target.value })}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Adicionar Mídia</label>
                <div style={styles.midiaControls}>
                  <select
                    style={styles.midiaTipo}
                    value={midiaAtual.tipo}
                    onChange={(e) => setMidiaAtual({ ...midiaAtual, tipo: e.target.value })}
                  >
                    <option value="link">Link</option>
                    <option value="youtube">YouTube</option>
                    <option value="arquivo">Arquivo</option>
                  </select>

                  {midiaAtual.tipo === 'link' && (
                    <input
                      type="text"
                      style={styles.midiaInput}
                      placeholder="https://..."
                      value={midiaAtual.url}
                      onChange={(e) => setMidiaAtual({ ...midiaAtual, url: e.target.value })}
                    />
                  )}

                  {midiaAtual.tipo === 'youtube' && (
                    <input
                      type="text"
                      style={styles.midiaInput}
                      placeholder="ID do vídeo ou link completo"
                      value={midiaAtual.url}
                      onChange={(e) => setMidiaAtual({ ...midiaAtual, url: e.target.value })}
                    />
                  )}

                  {midiaAtual.tipo === 'arquivo' && (
                    <div style={styles.uploadArea}>
                      <input
                        type="file"
                        id="arquivo"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setMidiaAtual({
                              ...midiaAtual,
                              nome: file.name,
                              tamanho: `${(file.size / 1024 / 1024).toFixed(2)} MB`
                            });
                          }
                        }}
                      />
                      <label htmlFor="arquivo" style={styles.uploadLabel}>
                        <Upload size={16} />
                        {midiaAtual.nome || 'Escolher arquivo'}
                      </label>
                    </div>
                  )}

                  <button
                    style={styles.adicionarMidiaBtn}
                    onClick={adicionarMidia}
                    disabled={(midiaAtual.tipo === 'link' && !midiaAtual.url) ||
                      (midiaAtual.tipo === 'youtube' && !midiaAtual.url) ||
                      (midiaAtual.tipo === 'arquivo' && !midiaAtual.nome)}
                  >
                    Adicionar
                  </button>
                </div>

                {/* Lista de mídias adicionadas */}
                {novaPublicacao.midias.length > 0 && (
                  <div style={styles.midiasLista}>
                    {novaPublicacao.midias.map((midia, index) => (
                      <div key={index} style={styles.midiaItem}>
                        {midia.tipo === 'link' && <LinkIcon size={16} />}
                        {midia.tipo === 'youtube' && <Youtube size={16} color="#ef4444" />}
                        {midia.tipo === 'arquivo' && <FileText size={16} />}
                        <span style={styles.midiaNome}>
                          {midia.tipo === 'link' ? midia.url : midia.nome}
                        </span>
                        <button
                          style={styles.removerMidia}
                          onClick={() => removerMidia(index)}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button
                style={styles.cancelarBtn}
                onClick={() => {
                  setShowCriarModal(false);
                  setShowEditModal(false);
                  setNovaPublicacao({ titulo: '', conteudo: '', turmaId: '', midias: [] });
                }}
              >
                Cancelar
              </button>
              <button
                style={styles.salvarBtn}
                onClick={handleSave}
                disabled={!novaPublicacao.titulo || !novaPublicacao.turmaId}
              >
                <Save size={16} />
                {showEditModal ? 'Salvar Alterações' : 'Publicar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {showDeleteModal && (
        <div style={styles.modalOverlay}>
          <div style={{...styles.modal, maxWidth: '400px'}}>
            <h3 style={styles.modalTitle}>Excluir Publicação</h3>
            <p style={styles.modalText}>
              Tem certeza que deseja excluir a publicação "{selectedPublicacao?.titulo}"?
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
    maxWidth: '900px',
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
  novaPublicacaoBtn: {
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
  // CORREÇÃO PRINCIPAL: Container da busca com flexbox
  searchContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '25px',
    width: '100%'
  },
  // Wrapper para o input ocupar o espaço disponível
  searchWrapper: {
    flex: 1,
    position: 'relative',
    minWidth: 0 // Importante para evitar overflow
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
    flexShrink: 0,
    minWidth: '150px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
    marginBottom: '30px'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2563eb'
  },
  statLabel: {
    fontSize: '12px',
    color: '#6b7280'
  },
  publicacoesList: {
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
    padding: '5px',
    flexShrink: 0
  },
  modalContent: {
    marginBottom: '20px'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#4b5563',
    marginBottom: '8px'
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  select: {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  textarea: {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    resize: 'vertical'
  },
  midiaControls: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
    flexWrap: 'wrap'
  },
  midiaTipo: {
    width: '120px',
    padding: '10px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    fontSize: '13px',
    outline: 'none',
    flexShrink: 0
  },
  midiaInput: {
    flex: 1,
    minWidth: '200px',
    padding: '10px 15px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    fontSize: '13px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  uploadArea: {
    flex: 1,
    minWidth: '200px'
  },
  uploadLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px',
    backgroundColor: '#f3f4f6',
    border: '1px dashed #9ca3af',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  adicionarMidiaBtn: {
    padding: '10px 20px',
    backgroundColor: '#f3f4f6',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    flexShrink: 0,
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed'
    }
  },
  midiasLista: {
    marginTop: '10px'
  },
  midiaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    backgroundColor: '#f9fafb',
    borderRadius: '6px',
    marginBottom: '5px'
  },
  midiaNome: {
    flex: 1,
    fontSize: '12px',
    color: '#4b5563',
    wordBreak: 'break-all'
  },
  removerMidia: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '2px',
    flexShrink: 0
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '20px'
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
    fontSize: '13px',
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed'
    }
  },
  modalText: {
    fontSize: '14px',
    color: '#4b5563',
    marginBottom: '20px'
  }
};