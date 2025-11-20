import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const StyledButton = styled.button.attrs({
  // Prevenir que fullWidth se pase al elemento DOM
  fullWidth: undefined
})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: ${theme.typography.fontFamily};
  font-weight: ${theme.typography.weights.bold};
  font-size: ${theme.typography.sizes.base};
  padding: 0.8rem 1.8rem;
  border-radius: ${theme.borderRadius.sm};
  border: none;
  cursor: pointer;
  transition: ${theme.transitions.default};
  text-decoration: none;
  text-align: center;

  /* Variantes */
  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return `
          background-color: ${theme.colors.primary};
          color: ${theme.colors.text.light};
          &:hover {
            background-color: ${theme.colors.primaryHover};
            transform: translateY(-3px);
            box-shadow: ${theme.shadows.medium};
          }
        `;
      case 'accent':
        return `
          background-color: ${theme.colors.accent};
          color: ${theme.colors.text.dark};
          &:hover {
            background-color: #d69a3d;
            transform: translateY(-3px);
            box-shadow: ${theme.shadows.medium};
          }
        `;
      case 'outline':
        return `
          background: transparent;
          border: 2px solid ${theme.colors.primary};
          color: ${theme.colors.primary};
          &:hover {
            background: ${theme.colors.primary};
            color: ${theme.colors.text.light};
            transform: translateY(-3px);
          }
        `;
      default:
        return `
          background-color: ${theme.colors.primary};
          color: ${theme.colors.text.light};
          &:hover {
            background-color: ${theme.colors.primaryHover};
            transform: translateY(-3px);
            box-shadow: ${theme.shadows.medium};
          }
        `;
    }
  }}

  /* Tamaños */
  ${({ size }) => {
    switch (size) {
      case 'small':
        return 'padding: 0.5rem 1rem; font-size: 0.875rem;';
      case 'large':
        return 'padding: 1rem 2.5rem; font-size: 1.1rem;';
      default:
        return '';
    }
  }}

  /* Ancho completo - usando un nombre de prop personalizado para evitar conflictos */
  ${props => props.$fullWidth && 'width: 100%;'}

  /* Deshabilitado */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }
`;

const Button = React.forwardRef(({ 
  children, 
  variant = 'primary', 
  size, 
  fullWidth = false, 
  disabled = false,
  as,
  to,
  onClick,
  type = 'button',
  className,
  ...props 
}, ref) => {
  return (
    <StyledButton
      ref={ref}
      as={as}
      to={to}
      variant={variant}
      size={size}
      $fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={className}
      {...props}
    >
      {children}
    </StyledButton>
  );
});

export default Button;
