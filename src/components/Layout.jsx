import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, LogOut, Home, BookOpen, Users, Award, 
  Bell, ChevronDown, FileText, Calendar, MessageSquare, 
  QrCode, Settings, HelpCircle, User, Clock, Star
} from 'lucide-react';

export default function Layout({ children, perfil, nome, turmaInfo }) {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const getPerfilInfo = () => {
    switch(perfil) {
        case 'professor':
            return { 
                cor: '#2563eb', 
                icone: '👨‍🏫', 
                label: 'Professor',
                menuItems: [
                    { icon: <Home size={18} />, label: 'Dashboard', path: '/professor' },
                    { icon: <Users size={18} />, label: 'Minhas Turmas', path: '/professor/turmas' },
                    { icon: <FileText size={18} />, label: 'Publicações', path: '/professor/publicacoes' },
                    { icon: <Users size={18} />, label: 'Comunidade', path: '/professor/comunidade' },
                    { icon: <Calendar size={18} />, label: 'Calendário', path: '/professor/calendario' },
                    { icon: <Clock size={18} />, label: 'Atividades', path: '/professor/atividades' },
                    { icon: <MessageSquare size={18} />, label: 'WhatsApp', path: '/professor/whatsapp' },
                    { icon: <QrCode size={18} />, label: 'QR Codes', path: '/professor/qrcode' },
                    { icon: <User size={18} />, label: 'Meu Perfil', path: '/professor/perfil' }, // NOVO
                    { icon: <Settings size={18} />, label: 'Configurações', path: '/professor/configuracoes' },
                ]
        };
        case 'aluno':
            return { 
                cor: '#10b981', 
                icone: '👨‍🎓', 
                label: 'Aluno',
                menuItems: [
                    { icon: <Home size={18} />, label: 'Dashboard', path: '/aluno' },
                    { icon: <Users size={18} />, label: 'Minhas Turmas', path: '/aluno/turmas' },
                    { icon: <FileText size={18} />, label: 'Publicações', path: '/aluno/publicacoes' },
                    { icon: <Calendar size={18} />, label: 'Calendário', path: '/aluno/calendario' },
                    { icon: <Clock size={18} />, label: 'Atividades', path: '/aluno/atividades' },
                    { icon: <Award size={18} />, label: 'Ranking', path: '/aluno/ranking' },
                    { icon: <Star size={18} />, label: 'Conquistas', path: '/aluno/conquistas' },
                    { icon: <User size={18} />, label: 'Meu Perfil', path: '/aluno/perfil' }, // NOVO
                    { icon: <Settings size={18} />, label: 'Configurações', path: '/aluno/configuracoes' },
                ]
        };
        case 'pai':
            return { 
                cor: '#8b5cf6', 
                icone: '👪', 
                label: 'Responsável',
                menuItems: [
                    { icon: <Home size={18} />, label: 'Dashboard', path: '/pai' },
                    { icon: <Users size={18} />, label: 'Meus Filhos', path: '/pai/filhos' },
                    { icon: <FileText size={18} />, label: 'Publicações', path: '/pai/publicacoes' },
                    { icon: <Calendar size={18} />, label: 'Calendário', path: '/pai/calendario' },
                    { icon: <Clock size={18} />, label: 'Atividades', path: '/pai/atividades' },
                    { icon: <Award size={18} />, label: 'Desempenho', path: '/pai/desempenho' },
                    { icon: <User size={18} />, label: 'Meu Perfil', path: '/pai/perfil' }, // NOVO
                    { icon: <Settings size={18} />, label: 'Configurações', path: '/pai/configuracoes' },
                ]
        };
        default:
            return { cor: '#6b7280', icone: '👤', label: 'Visitante', menuItems: [] };
    }
  };

  const perfilInfo = getPerfilInfo();

  // Mock de notificações
  const notificacoes = [
    { id: 1, texto: 'Nova atividade: Frações', tempo: '5 min atrás', lida: false },
    { id: 2, texto: 'João entregou a atividade', tempo: '1 hora atrás', lida: false },
    { id: 3, texto: 'Reunião de pais amanhã', tempo: '2 horas atrás', lida: true },
  ];

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo} onClick={() => navigate('/')}>
            <GraduationCap size={32} color="#2563eb" />
            <h1 style={styles.logoText}>Edu<span style={{ color: '#2563eb' }}>Mestre</span></h1>
          </div>

          <div style={styles.userInfo}>
            {/* Notificações */}
            <div style={styles.notificationsContainer}>
              <button 
                style={styles.notificationButton}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={20} color="#4b5563" />
                {notificacoes.filter(n => !n.lida).length > 0 && (
                  <span style={styles.notificationBadge}>
                    {notificacoes.filter(n => !n.lida).length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div style={styles.notificationsDropdown}>
                  <div style={styles.notificationsHeader}>
                    <h4>Notificações</h4>
                    <button style={styles.markAllRead}>Marcar todas como lidas</button>
                  </div>
                  <div style={styles.notificationsList}>
                    {notificacoes.map(notif => (
                      <div key={notif.id} style={{
                        ...styles.notificationItem,
                        backgroundColor: notif.lida ? 'white' : '#dbeafe'
                      }}>
                        <div>
                          <p style={styles.notificationText}>{notif.texto}</p>
                          <span style={styles.notificationTime}>{notif.tempo}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={styles.notificationsFooter}>
                    <button style={styles.verTodasNotificacoes}>
                      Ver todas
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Perfil Badge */}
            <div style={{ ...styles.perfilBadge, backgroundColor: perfilInfo.cor + '20', color: perfilInfo.cor }}>
              <span style={styles.perfilIcon}>{perfilInfo.icone}</span>
              <span>{perfilInfo.label}</span>
            </div>
            
            {/* Dropdown Menu */}
            <div style={styles.dropdownContainer}>
              <button 
                style={styles.userButton}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div style={styles.userAvatar}>
                  {nome ? nome.charAt(0) : 'U'}
                </div>
                <div style={styles.userText}>
                  <strong>{nome || 'Usuário'}</strong>
                  {turmaInfo && <span style={styles.turmaInfo}>{turmaInfo}</span>}
                </div>
                <ChevronDown size={18} color="#6b7280" style={{
                  transform: showDropdown ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.3s'
                }} />
              </button>

              {showDropdown && (
                <div style={styles.dropdown}>
                  {/* Cabeçalho do dropdown */}
                  <div style={styles.dropdownHeader}>
                    <div style={styles.dropdownAvatar}>
                      {nome ? nome.charAt(0) : 'U'}
                    </div>
                    <div>
                      <strong style={styles.dropdownNome}>{nome || 'Usuário'}</strong>
                      <p style={styles.dropdownEmail}>{nome?.toLowerCase().replace(' ', '.')}@email.com</p>
                    </div>
                  </div>

                  {/* Menu de navegação */}
                  <div style={styles.dropdownMenu}>
                    {perfilInfo.menuItems.map((item, index) => (
                      <button
                        key={index}
                        style={styles.dropdownItem}
                        onClick={() => {
                          navigate(item.path);
                          setShowDropdown(false);
                        }}
                      >
                        <span style={styles.dropdownIcon}>{item.icon}</span>
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Linha divisória */}
                  <div style={styles.dropdownDivider} />

                  {/* Ajuda e Sair */}
                  <button 
                    style={styles.dropdownItem}
                    onClick={() => {
                      navigate('/ajuda');
                      setShowDropdown(false);
                    }}
                  >
                    <HelpCircle size={18} style={styles.dropdownIcon} />
                    Ajuda
                  </button>
                  
                  <button 
                    style={{...styles.dropdownItem, color: '#dc2626'}}
                    onClick={() => {
                      navigate('/');
                      setShowDropdown(false);
                    }}
                  >
                    <LogOut size={18} style={styles.dropdownIcon} />
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main style={styles.content}>
        {children}
      </main>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <p>© 2025 EduMestre - Plataforma de apoio a professores da rede pública</p>
          <div style={styles.footerLinks}>
            <span>Sobre</span>
            <span>•</span>
            <span>Termos</span>
            <span>•</span>
            <span>Contato</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f3f4f6'
  },
  header: {
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer'
  },
  logoText: {
    fontSize: '24px',
    margin: 0,
    color: '#1f2937'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  notificationsContainer: {
    position: 'relative'
  },
  notificationButton: {
    position: 'relative',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '8px',
    ':hover': {
      backgroundColor: '#f3f4f6'
    }
  },
  notificationBadge: {
    position: 'absolute',
    top: '0',
    right: '0',
    backgroundColor: '#ef4444',
    color: 'white',
    fontSize: '10px',
    padding: '2px 5px',
    borderRadius: '10px',
    minWidth: '18px',
    textAlign: 'center'
  },
  notificationsDropdown: {
    position: 'absolute',
    top: '45px',
    right: '0',
    width: '320px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    overflow: 'hidden',
    zIndex: 1000
  },
  notificationsHeader: {
    padding: '15px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  markAllRead: {
    background: 'none',
    border: 'none',
    color: '#2563eb',
    fontSize: '12px',
    cursor: 'pointer'
  },
  notificationsList: {
    maxHeight: '300px',
    overflow: 'auto'
  },
  notificationItem: {
    padding: '12px 15px',
    borderBottom: '1px solid #e5e7eb',
    cursor: 'pointer'
  },
  notificationText: {
    margin: '0 0 5px',
    fontSize: '13px',
    color: '#1f2937'
  },
  notificationTime: {
    fontSize: '11px',
    color: '#9ca3af'
  },
  notificationsFooter: {
    padding: '12px',
    textAlign: 'center',
    borderTop: '1px solid #e5e7eb'
  },
  verTodasNotificacoes: {
    background: 'none',
    border: 'none',
    color: '#2563eb',
    fontSize: '13px',
    cursor: 'pointer'
  },
  perfilBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 15px',
    borderRadius: '30px',
    fontSize: '14px',
    fontWeight: '500'
  },
  perfilIcon: {
    fontSize: '18px'
  },
  dropdownContainer: {
    position: 'relative'
  },
  userButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '5px 10px',
    backgroundColor: 'transparent',
    border: '1px solid #e5e7eb',
    borderRadius: '30px',
    cursor: 'pointer'
  },
  userAvatar: {
    width: '35px',
    height: '35px',
    borderRadius: '17.5px',
    backgroundColor: '#2563eb',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  userText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  turmaInfo: {
    fontSize: '11px',
    color: '#6b7280'
  },
  dropdown: {
    position: 'absolute',
    top: '60px',
    right: '0',
    width: '280px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    overflow: 'hidden',
    zIndex: 1000
  },
  dropdownHeader: {
    padding: '20px',
    backgroundColor: '#f9fafb',
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  dropdownAvatar: {
    width: '50px',
    height: '50px',
    borderRadius: '25px',
    backgroundColor: '#2563eb',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  dropdownNome: {
    display: 'block',
    fontSize: '15px',
    color: '#1f2937'
  },
  dropdownEmail: {
    fontSize: '12px',
    color: '#6b7280',
    margin: '3px 0 0'
  },
  dropdownMenu: {
    padding: '10px 0'
  },
  dropdownItem: {
    width: '100%',
    padding: '12px 20px',
    border: 'none',
    background: 'none',
    textAlign: 'left',
    fontSize: '14px',
    color: '#4b5563',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  dropdownIcon: {
    width: '20px',
    color: '#9ca3af'
  },
  dropdownDivider: {
    height: '1px',
    backgroundColor: '#e5e7eb',
    margin: '5px 0'
  },
  content: {
    flex: 1,
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '30px 20px',
    width: '100%'
  },
  footer: {
    backgroundColor: '#1f2937',
    color: '#9ca3af',
    padding: '20px 0',
    marginTop: 'auto'
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px'
  },
  footerLinks: {
    display: 'flex',
    gap: '15px'
  }
};