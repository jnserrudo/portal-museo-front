export const theme = {
  colors: {
    primary: '#8B5A2B', // Marrón Principal (Navbar)
    primaryHover: '#a67c52', // Marrón Claro (Hover)
    accent: '#e3c2a1', // Beige Claro (Fondos)
    text: {
      light: '#f8f9fa', // Blanco Roto (texto claro)
      dark: '#343a40', // Gris Oscuro (texto secundario)
      muted: '#6c757d', // Gris Claro (texto deshabilitado)
      black: '#000000', // Negro (texto principal)
    },
    background: {
      light: '#ffffff', // Blanco Puro
      darkOverlay: 'rgba(0, 0, 0, 0.6)', // Overlay Oscuro
      section: '#e3c2a1', // Beige Claro (Fondos)
      general: '#f8f9fa', // Blanco Roto (fondo general)
      navbar: '#8B5A2B', // Marrón Principal (Navbar)
      button: '#f5f5dc', // Beige Suave (Botones)
    },
  },
  shadows: {
    light: '0 2px 8px rgba(0, 0, 0, 0.1)', // Sombra Suave
    medium: '0 4px 12px rgba(0, 0, 0, 0.15)',
    dark: '0 8px 20px rgba(0, 0, 0, 0.25)',
  },
  typography: {
    fontFamily: '"Museo Sans", sans-serif',
    weights: {
      regular: 500,
      bold: 700,
      black: 900,
    },
    sizes: {
      base: '1rem',
      h1: 'clamp(2.8rem, 8vw, 5rem)',
      h2: 'clamp(2rem, 6vw, 3.5rem)',
      h3: 'clamp(1.5rem, 4vw, 2.5rem)',
      subtitle: 'clamp(1rem, 3vw, 1.4rem)',
      welcome: 'clamp(1.5rem, 4vw, 2.2rem)',
    },
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '2rem',
    lg: '3rem',
    xl: '4rem',
  },
  borderRadius: {
    sm: '8px',
    md: '15px',
    lg: '20px',
  },
  transitions: {
    default: 'all 0.3s ease',
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    large: '1440px',
  },
};

export default theme;
