import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

const MainContent = styled.main`
  flex: 1 0 auto;
  padding-top: 0; /* Eliminado el padding superior */
  margin-top: 0; /* Aseguramos que no haya margen superior */
  background-color: ${({ theme }) => theme.colors.background.general};
  width: 100%;
`;

const Layout = ({ children, isAdmin, onLoginClick, onLogout, onRefreshEvents }) => {
  return (
    <LayoutContainer>
      <Header 
        isAdmin={isAdmin} 
        onLoginClick={onLoginClick} 
        onLogout={onLogout} 
        onRefreshEvents={onRefreshEvents} 
      />
      <MainContent>
        {children}
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
