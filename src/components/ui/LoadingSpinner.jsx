import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../styles/theme';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: ${({ fullScreen }) => fullScreen ? '100vh' : '200px'};
  padding: ${theme.spacing.xl};
`;

const Spinner = styled.div`
  display: inline-block;
  width: ${({ size }) => {
    switch (size) {
      case 'small': return '30px';
      case 'large': return '80px';
      default: return '50px';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'small': return '30px';
      case 'large': return '80px';
      default: return '50px';
    }
  }};
  border: 4px solid rgba(139, 90, 43, 0.2);
  border-radius: 50%;
  border-top: 4px solid ${theme.colors.primary};
  border-right: 4px solid ${theme.colors.primary};
  animation: ${spin} 0.8s linear infinite;
  box-shadow: 0 0 10px rgba(139, 90, 43, 0.1);
`;

const LoadingSpinner = ({ size = 'medium', className, fullScreen = false }) => {
  return (
    <SpinnerContainer fullScreen={fullScreen} className={className}>
      <Spinner size={size} />
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
