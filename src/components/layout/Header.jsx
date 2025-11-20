import React, { useState, useEffect, useContext } from 'react';
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  height: 100%;
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

const NavLinks = styled.ul.attrs({
  // Esto asegura que el prop isOpen no se pase al elemento DOM
  isOpen: props => props.$isOpen ? 'true' : undefined
})`
  display: flex;
  list-style: none;
  gap: 0.3rem;
  margin: 0;
  padding: 0;
  align-items: center;

  @media (max-width: ${theme.breakpoints.tablet}) {
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: ${theme.colors.background.navbar};
    flex-direction: column;
    align-items: stretch;
    padding: 0.5rem 0;
    transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-150%)'};
    transition: transform 0.3s ease-in-out;
    box-shadow: ${theme.shadows.medium};
    max-height: calc(100vh - 60px);
    overflow-y: auto;
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

  &:hover {
    background: ${theme.colors.primary};
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  align-items: center;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

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
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error al cargar eventos:', error);
        toast.error('Error al cargar los eventos');
      } finally {
        setIsLoading(false);
      }
    };

    if (isAdminModalOpen) {
      fetchEvents();
    }
  }, [isAdminModalOpen]);

  // Función para guardar un evento
  const handleSaveEvent = async (eventData) => {
    try {
      let result;
      if (eventData.id) {
        // Actualizar evento existente
        result = await eventService.updateEvent(eventData.id, eventData);
        toast.success('Evento actualizado correctamente');
      } else {
        // Crear nuevo evento
        result = await eventService.createEvent(eventData);
        toast.success('Evento creado correctamente');
      }
      return result;
    } catch (error) {
      console.error('Error al guardar el evento:', error);
      toast.error(error.message || 'Error al guardar el evento');
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
      return true;
    } catch (error) {
      console.error('Error al eliminar el evento:', error);
      toast.error(error.message || 'Error al eliminar el evento');
      throw error;
    }
  };

  // Función para manejar el éxito al guardar
  const handleSaveSuccess = () => {
    // Recargar los eventos después de guardar
    eventService.getEvents()
      .then(data => setEvents(data))
      .catch(err => console.error('Error al actualizar la lista de eventos:', err));
  };

  return (
    <HeaderContainer style={{ 
      padding: isScrolled ? '0.5rem 0' : '1rem 0',
      backgroundColor: isScrolled ? 'rgba(139, 90, 43, 0.95)' : theme.colors.background.navbar
    }}>
      <Nav>
        <Logo to="/">
          <img src="/logo-museo.png" alt="Museo Regional Andino" />
          <span>Museo Regional Andino</span>
        </Logo>

        <MobileMenuButton onClick={toggleMenu} aria-label="Menú">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>

        <NavLinks $isOpen={isMenuOpen}>
          <NavItem>
            <NavLink to="/" onClick={closeMenu}>Inicio</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/el-museo" onClick={closeMenu}>El Museo</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/coleccion" onClick={closeMenu}>Colección</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/visita" onClick={closeMenu}>Visita</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/tecnologia" onClick={closeMenu}>Tecnología</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/eventos" onClick={closeMenu}>Eventos</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/contacto" onClick={closeMenu}>Contacto</NavLink>
          </NavItem>
        </NavLinks>

        <AuthButtons>
          {isAuthenticated ? (
            <>
              <Button 
                variant="outline"
                size="small"
                style={{ 
                  color: theme.colors.text.light, 
                  borderColor: theme.colors.text.light,
                  marginRight: '0.5rem',
                  '&:hover': {
                    backgroundColor: theme.colors.text.light,
                    color: theme.colors.text.dark
                  }
                }}
                onClick={() => {
                  closeMenu();
                  setIsAdminModalOpen(true);
                }}
              >
                <FaCog style={{ marginRight: '0.5rem' }} />
                Administrar Eventos
              </Button>
              <Button 
                variant="outline" 
                size="small" 
                onClick={handleLogout}
                style={{ 
                  color: theme.colors.text.light, 
                  borderColor: theme.colors.text.light,
                  '&:hover': {
                    backgroundColor: theme.colors.text.light,
                    color: theme.colors.text.dark
                  }
                }}
              >
                <FaSignOutAlt style={{ marginRight: '0.5rem' }} />
                Cerrar Sesión
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
              Iniciar Sesión
            </Button>
          )}
        </AuthButtons>
        
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={closeLoginModal}
          onLogin={handleLogin}
        />

        {/* Modal de Administración de Eventos */}
        <Modal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
          title="Administrar Eventos"
          size="lg"
        >
          <div style={{ maxHeight: '70vh', overflowY: 'auto', padding: '1rem' }}>
            {isLoading ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>Cargando eventos...</p>
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
