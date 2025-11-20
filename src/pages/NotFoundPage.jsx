import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaArrowLeft, FaSearch, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { theme } from '../styles/theme';
import Button from '../components/ui/Button';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  text-align: center;
  background-color: ${theme.colors.background.general};
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: 900;
  color: ${theme.colors.primary};
  margin: 0;
  line-height: 1;
  position: relative;
  margin-bottom: ${theme.spacing.lg};
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.accent});
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: ${theme.colors.text.dark};
  margin: 0 0 ${theme.spacing.md} 0;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.25rem;
  color: ${theme.colors.text.medium};
  max-width: 600px;
  margin: 0 auto ${theme.spacing.xl};
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Illustration = styled.div`
  width: 300px;
  height: 200px;
  margin: 0 auto ${theme.spacing.xl};
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23046ba3"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M13 7h-2v6h6v-2h-4z"/></svg>') no-repeat center;
  background-size: contain;
  opacity: 0.8;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
  justify-content: center;
  margin-top: ${theme.spacing.lg};
  
  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    
    button {
      width: 100%;
    }
  }
`;

const SearchContainer = styled.div`
  max-width: 500px;
  width: 100%;
  position: relative;
  margin: ${theme.spacing.xl} auto 0;
  
  input {
    width: 100%;
    padding: ${theme.spacing.md} ${theme.spacing.xl} ${theme.spacing.md} ${theme.spacing.xl};
    border: 2px solid ${theme.colors.border};
    border-radius: 50px;
    font-size: 1rem;
    transition: ${theme.transitions.default};
    padding-left: ${theme.spacing.xl};
    
    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 3px ${theme.colors.primary}20;
    }
  }
  
  svg {
    position: absolute;
    left: ${theme.spacing.md};
    top: 50%;
    transform: translateY(-50%);
    color: ${theme.colors.text.light};
  }
`;

const LinksContainer = styled.div`
  margin-top: ${theme.spacing.xl};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${theme.spacing.lg};
  
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    font-weight: 500;
    transition: ${theme.transitions.default};
    display: inline-flex;
    align-items: center;
    
    &:hover {
      color: ${theme.colors.primaryDark};
      text-decoration: underline;
    }
    
    svg {
      margin-right: ${theme.spacing.xs};
    }
  }
`;

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <NotFoundContainer>
      <ErrorCode>404</ErrorCode>
      <Title>¡Página no encontrada!</Title>
      <Description>
        La página que estás buscando no existe o ha sido movida. 
        Intenta con una búsqueda o navega a la página de inicio.
      </Description>
      
      <Illustration aria-hidden="true" />
      
      <ButtonGroup>
        <Button 
          variant="primary" 
          onClick={() => navigate('/')}
          startIcon={<FaHome />}
        >
          Ir al Inicio
        </Button>
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          startIcon={<FaArrowLeft />}
        >
          Volver Atrás
        </Button>
      </ButtonGroup>
      
      <SearchContainer>
        <FaSearch />
        <input 
          type="text" 
          placeholder="Buscar en el sitio..." 
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              // Aquí iría la lógica de búsqueda
              console.log('Buscando:', e.target.value);
            }
          }}
        />
      </SearchContainer>
      
      <LinksContainer>
        <a href="/el-museo">
          <FaHome /> Sobre el Museo
        </a>
        <a href="/coleccion">
          <FaSearch /> Explorar Colección
        </a>
        <a href="/visita">
          <FaMapMarkerAlt /> Planificar Visita
        </a>
        <a href="/contacto">
          <FaEnvelope /> Contacto
        </a>
      </LinksContainer>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
