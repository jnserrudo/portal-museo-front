import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.2s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Dialog = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.dark};
  max-width: 500px;
  width: 90%;
  padding: ${theme.spacing.xl};
  position: relative;
  animation: slideUp 0.3s ease-out;
  
  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  background: none;
  border: none;
  color: ${theme.colors.text.dark};
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${theme.colors.background.general};
    color: ${theme.colors.primary};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props => props.type === 'danger' ? '#fee2e2' : '#dbeafe'};
  color: ${props => props.type === 'danger' ? '#dc2626' : '#2563eb'};
  margin: 0 auto ${theme.spacing.lg};
  
  svg {
    font-size: 28px;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: ${theme.colors.text.dark};
  margin: 0 0 ${theme.spacing.md} 0;
  text-align: center;
  font-weight: ${theme.typography.weights.bold};
`;

const Message = styled.p`
  color: ${theme.colors.text.dark};
  font-size: 1rem;
  line-height: 1.6;
  margin: 0 0 ${theme.spacing.xl} 0;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  font-weight: ${theme.typography.weights.semibold};
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  min-width: 120px;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background-color: ${theme.colors.background.general};
  color: ${theme.colors.text.dark};
  border: 1px solid ${theme.colors.border || '#ddd'};
  
  &:hover:not(:disabled) {
    background-color: #e5e7eb;
  }
`;

const ConfirmButton = styled(Button)`
  background-color: ${props => props.type === 'danger' ? '#dc2626' : theme.colors.primary};
  color: white;
  
  &:hover:not(:disabled) {
    background-color: ${props => props.type === 'danger' ? '#b91c1c' : theme.colors.accent};
  }
`;

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = '¿Estás seguro?',
  message = '¿Deseas continuar con esta acción?',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'danger' // 'danger' or 'info'
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Dialog>
        <CloseButton onClick={onClose}>
          <FaTimes size={20} />
        </CloseButton>
        
        <IconWrapper type={type}>
          <FaExclamationTriangle />
        </IconWrapper>
        
        <Title>{title}</Title>
        <Message>{message}</Message>
        
        <ButtonGroup>
          <CancelButton onClick={onClose}>
            {cancelText}
          </CancelButton>
          <ConfirmButton type={type} onClick={handleConfirm}>
            {confirmText}
          </ConfirmButton>
        </ButtonGroup>
      </Dialog>
    </Overlay>
  );
};

export default ConfirmDialog;
