import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: '#f8f9fa',
          color: '#333'
        }}>
          <h1 style={{ color: '#dc3545', fontSize: '2.5rem', marginBottom: '1rem' }}>¡Ups! Algo salió mal</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '600px' }}>
            Lo sentimos, ha ocurrido un error inesperado. Por favor, intente recargar la página o regrese a la página de inicio.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#0d6efd',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              <span>Recargar Página</span>
            </button>
            <Link
              to="/"
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#198754',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '0.375rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              <FaHome />
              <span>Ir al Inicio</span>
            </Link>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <details style={{ marginTop: '2rem', textAlign: 'left', maxWidth: '800px', width: '100%' }}>
              <summary style={{ cursor: 'pointer', color: '#6c757d', marginBottom: '0.5rem' }}>Detalles del error (solo desarrollo)</summary>
              <pre style={{
                backgroundColor: '#f8f9fa',
                padding: '1rem',
                borderRadius: '0.375rem',
                border: '1px solid #dee2e6',
                overflowX: 'auto',
                color: '#dc3545',
                fontSize: '0.875rem',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word'
              }}>
                {this.state.error?.toString()}
                {this.state.error?.stack && `\n\n${this.state.error.stack}`}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
