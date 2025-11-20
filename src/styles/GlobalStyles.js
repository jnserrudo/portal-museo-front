import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Museo+Sans:wght@400;500;700;900&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: inherit;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${theme.typography.fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-weight: ${theme.typography.weights.regular};
    color: ${theme.colors.text.dark};
    background-color: ${theme.colors.background.general};
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.typography.fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-weight: ${theme.typography.weights.bold};
    line-height: 1.2;
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.text.dark};
    letter-spacing: -0.02em;
  }

  h1 {
    font-size: ${theme.typography.sizes.h1};
  }

  h2 {
    font-size: ${theme.typography.sizes.h2};
  }

  h3 {
    font-size: ${theme.typography.sizes.h3};
  }

  p {
    margin-bottom: ${theme.spacing.sm};
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: ${theme.transitions.default};

    &:hover {
      color: ${theme.colors.primaryHover};
    }
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${theme.spacing.md};
  }

  .section {
    padding: ${theme.spacing.xl} 0;
  }

  .section-title {
    text-align: center;
    margin-bottom: ${theme.spacing.lg};
    color: ${theme.colors.primary};
  }

  .btn {
    display: inline-block;
    background-color: ${theme.colors.primary};
    color: ${theme.colors.text.light};
    padding: 0.8rem 1.8rem;
    border-radius: ${theme.borderRadius.sm};
    font-weight: ${theme.typography.weights.bold};
    border: none;
    cursor: pointer;
    transition: ${theme.transitions.default};
    text-align: center;

    &:hover {
      background-color: ${theme.colors.primaryHover};
      transform: translateY(-3px);
      box-shadow: ${theme.shadows.medium};
    }

    &--accent {
      background-color: ${theme.colors.accent};
      color: ${theme.colors.text.dark};

      &:hover {
        background-color: #d69a3d;
      }
    }

    &--outline {
      background: transparent;
      border: 2px solid ${theme.colors.primary};
      color: ${theme.colors.primary};

      &:hover {
        background: ${theme.colors.primary};
        color: ${theme.colors.text.light};
      }
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    html {
      font-size: 14px;
    }
    
    .section {
      padding: ${theme.spacing.lg} 0;
    }
  }
`;

export default GlobalStyles;
