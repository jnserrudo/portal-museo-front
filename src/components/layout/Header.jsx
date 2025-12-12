import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Link, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaCog, FaPlus } from 'react-icons/fa';
import { theme } from '../../styles/theme';
import * as eventService from '../../api/eventService';
import Button from '../ui/Button';
import LoginModal from '../auth/LoginModal';
import { AuthContext } from '../../context/AuthContext';
import Modal from '../Modal';
import EventForm from '../EventForm';
import { toast } from 'react-toastify';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${theme.colors.background.navbar};
  box-shadow: ${theme.shadows.medium};
  z-index: 1000;
  padding: 0.4rem 0;
  transition: all 0.3s ease;
  border-bottom: 1px solid ${theme.colors.primaryHover};
  
  /* Asegura que el contenido no se oculte detrás del header */
  & + * {
    margin-top: 60px; /* Reducido para acercar el contenido */
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  height: 100%;
  position: relative;
`;

const Logo = styled(Link)`
  color: ${theme.colors.text.light};
  font-size: 1.4rem;
  font-weight: ${theme.typography.weights.bold};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.2rem 0;
  white-space: nowrap;
  margin-right: 1rem;
  flex-shrink: 0;
  z-index: 1001; /* Ensure logo stays above mobile menu if needed, or menu is below */

  img {
    height: 36px;
    width: auto;
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1.3rem;
    
    img {
      height: 32px;
    }
  }
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: space-between;
  width: 100%;

  @media (max-width: ${theme.breakpoints.tablet}) {
    position: fixed;
    top: 60px; /* Altura del header aprox */
    left: 0;
    width: 100%;
    height: calc(100vh - 60px);
    background-color: ${theme.colors.background.navbar};
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 2rem 1rem;
    transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease-in-out;
    box-shadow: ${theme.shadows.medium};
    overflow-y: auto;
    z-index: 999;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 0.3rem;
  margin: 0;
  padding: 0;
  align-items: center;
  flex-grow: 1;
  justify-content: center;

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    width: 100%;
    gap: 1rem;
    flex-grow: 0;
    margin-bottom: 2rem;
  }
`;

const NavItem = styled.li`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${theme.colors.accent};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const NavLink = styled(Link)`
  color: ${theme.colors.text.light};
  text-decoration: none;
  font-weight: ${theme.typography.weights.medium};
  font-size: 0.9rem;
  padding: 0.4rem 0.6rem;
  border-radius: ${theme.borderRadius.sm};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  white-space: nowrap;
  gap: 0.3rem;
  line-height: 1.2;

  &:hover {
    background-color: ${theme.colors.primaryHover};
    transform: translateY(-2px);
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${theme.colors.primaryHover};
      font-weight: ${theme.typography.weights.bold};
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    `}
    
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1.1rem;
    padding: 0.8rem 1.5rem;
    width: 100%;
    justify-content: center;
    
    &:hover {
      transform: none;
    }
  }
`;

const MobileMenuButton = styled.button`
  background: ${theme.colors.primaryHover};
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: ${theme.colors.text.light};
  font-size: 1.2rem;
  cursor: pointer;
  display: none;
  padding: 0.4rem 0.6rem;
  border-radius: ${theme.borderRadius.sm};
  transition: all 0.2s ease;
  z-index: 1002;

  &:hover {
    background: ${theme.colors.primary};
    transform: translateY(-1px);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  align-items: center;
  flex-shrink: 0;
  flex-wrap: wrap;
  justify-content: flex-end;

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    width: 100%;
    justify-content: center;
    gap: 1rem;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.colors.text.light};
  font-size: 0.9rem;
  padding: 0.4rem 0.8rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: ${theme.borderRadius.sm};
  
  svg {
    font-size: 1rem;
  }
  
  span {
    font-weight: ${theme.typography.weights.medium};
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-bottom: 0.5rem;
  }
`;

const Header = ({ isAdmin, onLoginClick, onLogout, onRefreshEvents }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, login, logout, user } = useContext(AuthContext);
  const { t, language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = { pathname: window.location.pathname };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    closeMenu(); // Cerrar el menú móvil si está abierto
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLogin = async (password) => {
    try {
      const success = await login(password);
      if (success) {
        console.log('Inicio de sesión exitoso');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return false;
    }
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    setIsAdminModalOpen(false);
    // Redirigir a la página de inicio después de cerrar sesión
    navigate('/');
  };

  // Cargar eventos
  const fetchEvents = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await eventService.getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Error al cargar eventos:', error);
      toast.error('Error al cargar los eventos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdminModalOpen) {
      fetchEvents();
    }
  }, [isAdminModalOpen, fetchEvents]);

  // Función para guardar un evento
  const handleSaveEvent = async (eventData, explicitId = null) => {
    try {
      let result;
      // Use explicit ID if provided, otherwise try to extract from FormData/Object
      let id = explicitId;
      
      if (!id) {
        const isFormData = eventData instanceof FormData;
        id = isFormData ? eventData.get('id') : eventData.id;
      }

      console.log('Header.jsx handleSaveEvent called. Explicit ID:', explicitId, 'Final ID:', id);

      if (id !== null && id !== undefined && id !== '') {
        // Actualizar evento existente
        result = await eventService.updateEvent(id, eventData);
        // Toast handled in eventService
      } else {
        // Crear nuevo evento
        result = await eventService.createEvent(eventData);
        // Toast handled in eventService
      }
      
      // Refresh events list immediately
      await fetchEvents();
      
      return result;
    } catch (error) {
      console.error('Error al guardar el evento:', error);
      // Toast handled in eventService for errors too usually, but keeping this as fallback if needed, 
      // though eventService throws after toast.
      // To avoid double error toast, we can rely on eventService or check if error was already handled.
      // eventService throws error, so we might want to catch it here but not toast again if eventService did.
      // For now, let's keep it simple and assume eventService handles the main success/error toasts.
      throw error;
    }
  };

  // Función para eliminar un evento
  const handleDeleteEvent = async (id) => {
    try {
      const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este evento?');
      if (!confirmDelete) return false;
      
      await eventService.deleteEvent(id);
      toast.success('Evento eliminado correctamente');
      
      // Refresh events list immediately
      await fetchEvents();
      
      // Refresh global events list
      if (onRefreshEvents) {
        onRefreshEvents();
      }
      
      return true;
    } catch (error) {
      console.error('Error al eliminar el evento:', error);
      toast.error(error.message || 'Error al eliminar el evento');
      throw error;
    }
  };

  // Función para manejar el éxito al guardar
  const handleSaveSuccess = () => {
    // Close modal
    setIsAdminModalOpen(false);
    // Refresh events list (although handleSaveEvent already does it, this is a safety net)
    fetchEvents();
    
    // Refresh global events list
    if (onRefreshEvents) {
      onRefreshEvents();
    }
  };

  return (
    <HeaderContainer style={{ 
      padding: isScrolled ? '0.5rem 0' : '1rem 0',
      backgroundColor: isScrolled ? 'rgba(139, 90, 43, 0.95)' : theme.colors.background.navbar
    }}>
      <Nav>
        <Logo to="/">
          <img src={`${import.meta.env.BASE_URL}logo-museo.png`} alt="Museo Regional Andino" />
          <span>{t('header.title')}</span>
        </Logo>
        
        <MobileMenuButton onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>

        <MenuContainer $isOpen={isMenuOpen}>
          <NavLinks>
            <NavLink to="/" $active={location.pathname === '/'} onClick={closeMenu}>{t('nav.home')}</NavLink>
            <NavLink to="/el-museo" $active={location.pathname === '/el-museo'} onClick={closeMenu}>{t('nav.museum')}</NavLink>
            <NavLink to="/salas" $active={location.pathname === '/salas'} onClick={closeMenu}>{t('nav.rooms')}</NavLink>
            <NavLink to="/eventos" $active={location.pathname === '/eventos'} onClick={closeMenu}>{t('nav.events')}</NavLink>
            <NavLink to="/visita" $active={location.pathname === '/visita'} onClick={closeMenu}>{t('nav.visit')}</NavLink>
            <NavLink to="/visita-virtual" $active={location.pathname === '/visita-virtual'} onClick={closeMenu}>{t('nav.virtualTour')}</NavLink>
            <NavLink to="/contacto" $active={location.pathname === '/contacto'} onClick={closeMenu}>{t('nav.contact')}</NavLink>
          </NavLinks>

          <AuthButtons>
            <Button 
              variant="outline" 
              size="small" 
              onClick={toggleLanguage}
              style={{ 
                marginRight: '10px', 
                minWidth: '40px',
                color: 'white',
                borderColor: 'white',
                backgroundColor: 'transparent'
              }}
            >
              {language === 'es' ? 'EN' : 'ES'}
            </Button>

            {isAuthenticated ? (
              <>
                <UserInfo>
                  <FaUser />
                  <span>{user?.nombre || 'Admin'}</span>
                </UserInfo>
                <Button 
                  variant="outline" 
                  size="small" 
                  onClick={() => setIsAdminModalOpen(true)}
                  style={{ 
                    marginRight: '10px',
                    color: 'white',
                    borderColor: 'white',
                    backgroundColor: 'transparent'
                  }}
                >
                  {t('auth.admin')}
                </Button>
                <Button 
                  variant="secondary" 
                  size="small" 
                  onClick={handleLogout}
                >
                  {t('auth.logout')}
                </Button>
              </>
            ) : (
              <Button 
                variant="outline" 
                size="small" 
                onClick={openLoginModal}
                style={{ 
                  color: theme.colors.text.light, 
                  borderColor: theme.colors.text.light,
                  '&:hover': {
                    backgroundColor: theme.colors.text.light,
                    color: theme.colors.text.dark
                  }
                }}
              >
                <FaUser style={{ marginRight: '0.5rem' }} />
                {t('auth.login')}
              </Button>
            )}
          </AuthButtons>
        </MenuContainer>
        
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={closeLoginModal}
          onLogin={handleLogin}
        />

        {/* Modal de Administración de Eventos */}
        <Modal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
          title={t('auth.admin')}
          size="lg"
        >
          <div style={{ maxHeight: '70vh', overflowY: 'auto', padding: '1rem' }}>
            {isLoading ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>{t('common.loading')}</p>
              </div>
            ) : (
              <EventForm 
                events={events}
                onSave={handleSaveEvent}
                onDelete={handleDeleteEvent}
                onSaveSuccess={handleSaveSuccess}
              />
            )}
          </div>
        </Modal>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
