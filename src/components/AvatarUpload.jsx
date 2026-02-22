import { useState, useRef } from 'react';
import { Camera, Upload, X } from 'lucide-react';

export default function AvatarUpload({ currentAvatar, nome, onAvatarChange }) {
  const [preview, setPreview] = useState(currentAvatar);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onAvatarChange?.(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setShowModal(false);
  };

  const handleRemove = () => {
    setPreview(null);
    onAvatarChange?.(null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.avatarContainer}>
        {preview ? (
          <img src={preview} alt="Avatar" style={styles.avatar} />
        ) : (
          <div style={styles.avatarPlaceholder}>
            {nome ? nome.charAt(0).toUpperCase() : 'U'}
          </div>
        )}
        
        <button style={styles.editButton} onClick={() => setShowModal(true)}>
          <Camera size={16} />
        </button>
      </div>

      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Alterar Foto</h3>
              <button style={styles.closeButton} onClick={() => setShowModal(false)}>
                <X size={18} />
              </button>
            </div>
            
            <div style={styles.modalContent}>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileSelect}
              />
              
              <button 
                style={styles.optionButton}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={20} />
                <div>
                  <strong>Fazer upload</strong>
                  <span>JPG, PNG ou GIF até 5MB</span>
                </div>
              </button>

              {preview && (
                <button style={styles.optionButton} onClick={handleRemove}>
                  <X size={20} color="#dc2626" />
                  <div>
                    <strong>Remover foto</strong>
                    <span>Voltar para o avatar padrão</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px'
  },
  avatarContainer: {
    position: 'relative',
    width: '120px',
    height: '120px'
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: '60px',
    objectFit: 'cover',
    border: '3px solid #e5e7eb'
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: '60px',
    backgroundColor: '#2563eb',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
    fontWeight: 'bold',
    border: '3px solid #e5e7eb'
  },
  editButton: {
    position: 'absolute',
    bottom: '5px',
    right: '5px',
    width: '35px',
    height: '35px',
    borderRadius: '17.5px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
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
    padding: '20px',
    maxWidth: '400px',
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
  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '5px'
  },
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  optionButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px',
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left'
  }
};