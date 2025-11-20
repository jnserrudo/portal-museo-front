import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import Button from '../ui/Button';
import { FaLock } from 'react-icons/fa';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const ModalContent = styled.div`
  background-color: ${theme.colors.background.general};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.md};
  width: 100%;
  max-width: 400px;
  box-shadow: ${theme.shadows.large};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
`;

const ModalTitle = styled.h3`
  margin: 0;
  color: ${theme.colors.primary};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${theme.colors.text.dark};
  padding: 0.5rem;
  line-height: 1;
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${theme.spacing.xs};
  color: ${theme.colors.text.dark};
  font-weight: ${theme.typography.weights.medium};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.primary}20;
  }
`;

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) return;
    
    setError('');
    setIsLoading(true);
    
    try {
      const success = await onLogin(password);
      if (success) {
        // Limpiar el formulario después de un inicio de sesión exitoso
        setPassword('');
        onClose();
      } else {
        setError('Contraseña incorrecta. Por favor, intente nuevamente.');
      }
    } catch (err) {
      setError('Ocurrió un error al intentar iniciar sesión.');
      console.error('Error en inicio de sesión:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Acceso Administrativo</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <div style={{ textAlign: 'center', marginBottom: theme.spacing.md }}>
              <FaLock size={40} color={theme.colors.primary} style={{ marginBottom: theme.spacing.sm }} />
              <p style={{ margin: '0.5rem 0', color: theme.colors.text.dark }}>
                Ingrese la contraseña de administrador
              </p>
            </div>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Ingrese la contraseña"
              autoFocus
              style={{
                textAlign: 'center',
                fontSize: '1rem',
                padding: '0.75rem 1rem'
              }}
            />
            {error && (
              <div style={{
                color: '#dc3545',
                fontSize: '0.875rem',
                marginTop: '0.5rem',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}
          </FormGroup>
          <Button 
            type="submit" 
            variant="primary" 
            fullWidth
            disabled={isLoading}
            style={{
              marginTop: theme.spacing.md,
              padding: '0.75rem',
              fontSize: '1rem',
              fontWeight: theme.typography.weights.medium,
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LoginModal;
