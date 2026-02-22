import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, MessageCircle, Share2, MoreVertical, 
  Edit2, Trash2, Eye, Download, Link as LinkIcon,
  Youtube, FileText, Image, ChevronDown, ChevronUp
} from 'lucide-react';

export default function PublicacaoCard({ 
  publicacao, 
  perfil, 
  onLike, 
  onComment, 
  onEdit, 
  onDelete,
}) {
  const [showComments, setShowComments] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [novoComentario, setNovoComentario] = useState('');
  const navigate = useNavigate();

  const getIconByType = (tipo) => {
    switch(tipo) {
      case 'youtube':
        return <Youtube size={20} color="#ef4444" />;
      case 'arquivo':
        return <FileText size={20} color="#3b82f6" />;
      case 'link':
        return <LinkIcon size={20} color="#10b981" />;
      case 'imagem':
        return <Image size={20} color="#8b5cf6" />;
      default:
        return <FileText size={20} color="#6b7280" />;
    }
  };

  const handleLike = () => {
    if (perfil === 'pai') return; // Pai não pode dar like
    onLike?.(publicacao.id);
  };

  const handleComment = () => {
    if (perfil === 'pai') return; // Pai não pode comentar
    if (novoComentario.trim()) {
      onComment?.(publicacao.id, novoComentario);
      setNovoComentario('');
    }
  };

  return (
    <div style={styles.card}>
      {/* Header da Publicação */}
      <div style={styles.header}>
        <div style={styles.autorInfo}>
          <div style={{...styles.avatar, backgroundColor: publicacao.autorCor || '#3b82f6'}}>
            {publicacao.autor?.charAt(0)}
          </div>
          <div>
            <strong style={styles.autorNome}>{publicacao.autor}</strong>
            <div style={styles.publicacaoMeta}>
              <span style={styles.turmaNome}>{publicacao.turma}</span>
              <span style={styles.dataPublicacao}>• {publicacao.data}</span>
            </div>
          </div>
        </div>
        
        {(perfil === 'professor' || publicacao.podeEditar) && (
          <div style={styles.optionsContainer}>
            <button 
              style={styles.optionsButton}
              onClick={() => setShowOptions(!showOptions)}
            >
              <MoreVertical size={18} />
            </button>
            {showOptions && (
              <div style={styles.optionsMenu}>
                <button style={styles.optionItem} onClick={() => onEdit?.(publicacao)}>
                  <Edit2 size={14} /> Editar
                </button>
                <button style={{...styles.optionItem, color: '#dc2626'}} onClick={() => onDelete?.(publicacao.id)}>
                  <Trash2 size={14} /> Excluir
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Conteúdo da Publicação */}
      <div style={styles.content}>
        <h3 style={styles.titulo}>{publicacao.titulo}</h3>
        <p style={styles.texto}>{publicacao.conteudo}</p>

        {/* Mídias */}
        {publicacao.midias && publicacao.midias.length > 0 && (
          <div style={styles.midias}>
            {publicacao.midias.map((midia, index) => (
              <div key={index} style={styles.midiaItem}>
                {midia.tipo === 'youtube' && (
                  <div style={styles.videoEmbed}>
                    <iframe
                      width="100%"
                      height="200"
                      src={`https://www.youtube.com/embed/${midia.id}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
                {midia.tipo === 'link' && (
                  <a href={midia.url} target="_blank" rel="noopener noreferrer" style={styles.linkCard}>
                    {getIconByType('link')}
                    <span style={styles.linkUrl}>{midia.url}</span>
                    <LinkIcon size={14} color="#9ca3af" />
                  </a>
                )}
                {midia.tipo === 'arquivo' && (
                  <div style={styles.arquivoCard}>
                    {getIconByType('arquivo')}
                    <div style={styles.arquivoInfo}>
                      <strong>{midia.nome}</strong>
                      <span>{midia.tamanho}</span>
                    </div>
                    <button style={styles.downloadButton}>
                      <Download size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Estatísticas */}
      <div style={styles.stats}>
        <span style={styles.stat}>
          <Heart size={14} color="#ef4444" />
          {publicacao.likes} curtidas
        </span>
        <span style={styles.stat}>
          <MessageCircle size={14} />
          {publicacao.comentarios?.length || 0} comentários
        </span>
        {publicacao.visualizacoes && (
          <span style={styles.stat}>
            <Eye size={14} />
            {publicacao.visualizacoes} visualizações
          </span>
        )}
      </div>

      {/* Ações */}
      <div style={styles.acoes}>
        <button 
          style={{
            ...styles.acaoButton,
            color: publicacao.usuarioCurtiu ? '#ef4444' : '#6b7280',
            cursor: perfil === 'pai' ? 'not-allowed' : 'pointer',
            opacity: perfil === 'pai' ? 0.5 : 1
          }}
          onClick={handleLike}
          disabled={perfil === 'pai'}
        >
          <Heart size={18} fill={publicacao.usuarioCurtiu ? '#ef4444' : 'none'} />
          Curtir
        </button>
        <button 
          style={styles.acaoButton}
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle size={18} />
          Comentar
        </button>
      </div>

      {/* Seção de Comentários */}
      {showComments && (
        <div style={styles.comentariosSection}>
          {/* Lista de comentários */}
          {publicacao.comentarios && publicacao.comentarios.length > 0 && (
            <div style={styles.comentariosLista}>
              {publicacao.comentarios.map((comentario, index) => (
                <div key={index} style={styles.comentarioItem}>
                  <div style={styles.comentarioAvatar}>
                    {comentario.autor?.charAt(0)}
                  </div>
                  <div style={styles.comentarioContent}>
                    <div style={styles.comentarioHeader}>
                      <strong>{comentario.autor}</strong>
                      <span style={styles.comentarioData}>{comentario.data}</span>
                    </div>
                    <p style={styles.comentarioTexto}>{comentario.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Input de novo comentário (apenas professor/aluno) */}
          {perfil !== 'pai' && (
            <div style={styles.novoComentario}>
              <input
                type="text"
                placeholder="Escreva um comentário..."
                style={styles.comentarioInput}
                value={novoComentario}
                onChange={(e) => setNovoComentario(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleComment()}
              />
              <button style={styles.enviarComentario} onClick={handleComment}>
                Enviar
              </button>
            </div>
          )}

          {/* Mensagem para pais */}
          {perfil === 'pai' && (
            <p style={styles.paiMensagem}>
              <Eye size={14} /> Você está no modo visualização. Apenas professores e alunos podem comentar.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    marginBottom: '20px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '15px'
  },
  autorInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  avatar: {
    width: '45px',
    height: '45px',
    borderRadius: '22.5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold'
  },
  autorNome: {
    fontSize: '15px',
    color: '#1f2937'
  },
  publicacaoMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '2px'
  },
  turmaNome: {
    fontSize: '12px',
    color: '#3b82f6',
    backgroundColor: '#dbeafe',
    padding: '2px 8px',
    borderRadius: '20px'
  },
  dataPublicacao: {
    fontSize: '11px',
    color: '#9ca3af'
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
  titulo: {
    fontSize: '18px',
    margin: '0 0 10px',
    color: '#1f2937'
  },
  texto: {
    fontSize: '14px',
    color: '#4b5563',
    lineHeight: '1.6',
    margin: '0 0 15px'
  },
  midias: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  midiaItem: {
    width: '100%'
  },
  videoEmbed: {
    borderRadius: '8px',
    overflow: 'hidden'
  },
  linkCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    backgroundColor: '#f3f4f6',
    borderRadius: '6px',
    textDecoration: 'none',
    color: '#4b5563'
  },
  linkUrl: {
    flex: 1,
    fontSize: '13px'
  },
  arquivoCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    backgroundColor: '#f3f4f6',
    borderRadius: '6px'
  },
  arquivoInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  downloadButton: {
    padding: '6px',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  stats: {
    display: 'flex',
    gap: '20px',
    padding: '10px 0',
    borderTop: '1px solid #e5e7eb',
    borderBottom: '1px solid #e5e7eb',
    marginBottom: '10px'
  },
  stat: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '12px',
    color: '#6b7280'
  },
  acoes: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '5px',
    marginBottom: '15px'
  },
  acaoButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '8px',
    backgroundColor: '#f3f4f6',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    color: '#4b5563'
  },
  comentariosSection: {
    borderTop: '1px solid #e5e7eb',
    paddingTop: '15px'
  },
  comentariosLista: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '15px'
  },
  comentarioItem: {
    display: 'flex',
    gap: '10px'
  },
  comentarioAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '16px',
    backgroundColor: '#e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#4b5563'
  },
  comentarioContent: {
    flex: 1
  },
  comentarioHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5px'
  },
  comentarioData: {
    fontSize: '11px',
    color: '#9ca3af'
  },
  comentarioTexto: {
    margin: 0,
    fontSize: '13px',
    color: '#4b5563'
  },
  novoComentario: {
    display: 'flex',
    gap: '10px'
  },
  comentarioInput: {
    flex: 1,
    padding: '10px 15px',
    border: '1px solid #e5e7eb',
    borderRadius: '20px',
    fontSize: '13px',
    outline: 'none'
  },
  enviarComentario: {
    padding: '8px 20px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '13px'
  },
  paiMensagem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px',
    backgroundColor: '#fef3c7',
    borderRadius: '6px',
    fontSize: '12px',
    color: '#92400e',
    margin: 0
  }
};