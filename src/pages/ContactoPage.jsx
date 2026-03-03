import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import styled from 'styled-components';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaFacebook, FaPaperPlane, FaYoutube } from 'react-icons/fa';
import { theme } from '../styles/theme';
import Button from '../components/ui/Button';
import { toast, ToastContainer } from 'react-toastify';

const PageContainer = styled.div`
  padding-bottom: ${theme.spacing.xl};
  background-color: ${theme.colors.background.general};
`;

const HeroSection = styled.section`
  background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${import.meta.env.BASE_URL}museo_frente.jpg');
  background-size: cover;
  background-position: center;
  height: 40vh;
  min-height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding-bottom: 80px; /* Space for overlap */
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding-bottom: 40px;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 ${theme.spacing.md};

  h1 {
    font-size: ${theme.typography.sizes.h1};
    margin-bottom: ${theme.spacing.sm};
    text-shadow: 2px 2px 8px rgba(0,0,0,0.5);
    color: white;
    font-weight: ${theme.typography.weights.black};
  }

  p {
    font-size: ${theme.typography.sizes.welcome};
    opacity: 0.9;
    font-weight: ${theme.typography.weights.regular};
  }
`;

const Container = styled.div`
  max-width: 1400px;
  width: 95%;
  margin: 0 auto;
  position: relative;
  z-index: 10;
  margin-top: -80px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 92%;
    margin-top: -40px;
  }
`;

const ContactCard = styled.div`
  display: flex;
  flex-direction: row;
  background: white;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.dark};
  overflow: hidden;
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.desktop}) {
    flex-direction: column;
  }
`;

const InfoPanel = styled.div`
  background: ${theme.colors.primary};
  color: white;
  flex: 1;
  padding: ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.lg};
  }
`;

const InfoTitle = styled.h2`
  color: white;
  font-size: 2.2rem;
  margin-bottom: ${theme.spacing.lg};
  font-weight: ${theme.typography.weights.bold};
`;

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  
  li {
    display: flex;
    align-items: flex-start;
    gap: ${theme.spacing.md};
    font-size: 1.15rem;
    
    a {
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      transition: color 0.3s;
      
      &:hover {
        color: white;
        text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
      }
    }

    span {
      color: rgba(255, 255, 255, 0.9);
      line-height: 1.4;
    }
    
    svg {
      color: ${theme.colors.accent};
      font-size: 1.6rem;
      flex-shrink: 0;
      margin-top: 2px;
    }
  }
`;

const SocialSection = styled.div`
  margin-top: ${theme.spacing.xl};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  
  h3 {
    color: white;
    font-size: 1.3rem;
    margin-bottom: ${theme.spacing.md};
    font-weight: ${theme.typography.weights.regular};
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    transition: all 0.3s ease;
    font-size: 1.4rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    
    &:hover {
      transform: translateY(-3px);
      background-color: white;
      color: ${theme.colors.primary};
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
  }
`;

const FormPanel = styled.div`
  flex: 1.5;
  background: white;
  padding: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.lg};
  }
`;

const FormTitle = styled.h2`
  color: ${theme.colors.text.dark};
  font-size: 2.2rem;
  margin-bottom: ${theme.spacing.xl};
  font-weight: ${theme.typography.weights.bold};
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};
  
  label {
    display: block;
    margin-bottom: ${theme.spacing.xs};
    color: ${theme.colors.text.dark};
    font-weight: 600;
    font-size: 0.95rem;
  }
  
  input, textarea {
    width: 100%;
    padding: 14px 16px;
    border: 2px solid #e1e1e1;
    border-radius: ${theme.borderRadius.sm};
    font-size: 1rem;
    transition: all 0.3s;
    font-family: inherit;
    background-color: #fafafa;
    
    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      background-color: white;
      box-shadow: 0 0 0 4px ${theme.colors.primary}15;
    }

    &::placeholder {
      color: #aaa;
    }
  }
  
  textarea {
    min-height: 160px;
    resize: vertical;
  }
`;

const MapSection = styled.div`
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.medium};
  height: 450px;
  width: 100%;
  position: relative;
  margin-bottom: ${theme.spacing.xl};
  
  iframe {
    width: 100%;
    height: 100%;
    border: 0;
    position: absolute;
    top: 0;
    left: 0;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 350px;
  }
`;

const ContactoPage = () => {
  const { t } = useLanguage();
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    console.log('🚀 [CONTACTO] Iniciando envío de formulario...');
    console.log('📋 [CONTACTO] Datos del formulario:', formData);
    
    setLoading(true);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const endpoint = `${apiUrl}/api/email/enviar`;
    
    const payload = {
      nombreCompleto: formData.nombre,
      emailRemitente: formData.email,
      asunto: formData.asunto,
      mensaje: formData.mensaje
    };
    
    console.log('🌐 [CONTACTO] URL del endpoint:', endpoint);
    console.log('📦 [CONTACTO] Payload a enviar:', payload);

    try {
      console.log('⏳ [CONTACTO] Enviando petición fetch...');
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      console.log('📡 [CONTACTO] Respuesta recibida - Status:', response.status);
      console.log('📡 [CONTACTO] Respuesta recibida - OK:', response.ok);
      console.log('📡 [CONTACTO] Headers de respuesta:', Object.fromEntries(response.headers.entries()));

      const data = await response.json();
      console.log('📄 [CONTACTO] Data parseada:', data);

      if (data.success) {
        console.log('✅ [CONTACTO] Email enviado exitosamente');
        setLoading(false);
        toast.success('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
      } else {
        console.error('❌ [CONTACTO] Error del servidor:', data.message);
        setLoading(false);
        toast.error(data.message || 'Hubo un error al enviar el mensaje. Intenta nuevamente.', {
          position: "top-center",
          autoClose: 5000,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error('💥 [CONTACTO] Error en catch:', error);
      console.error('💥 [CONTACTO] Error name:', error.name);
      console.error('💥 [CONTACTO] Error message:', error.message);
      console.error('💥 [CONTACTO] Error stack:', error.stack);
      
      setLoading(false);
      toast.error('Error de conexión con el servidor. Por favor, intenta nuevamente.', {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
      });
    }
  };

  return (
    <PageContainer>
      <ToastContainer />
      <HeroSection>
        <HeroContent>
          <h1>{t('contact.hero.title')}</h1>
          <p>{t('contact.hero.subtitle')}</p>
        </HeroContent>
      </HeroSection>

      <Container>
        <ContactCard>
          <InfoPanel>
            <div>
              <InfoTitle>{t('contact.info.title')}</InfoTitle>
              <ContactList>
                <li>
                  <FaMapMarkerAlt />
                  <span>Av. San Martín 22, San Antonio de los Cobres, Salta</span>
                </li>
                <li>
                  <FaPhone />
                  <a href="tel:+543875020900">(387) 5020900</a>
                </li>
                <li>
                  <FaEnvelope />
                  <a href="mailto:museoregionalandino@gmail.com">museoregionalandino@gmail.com</a>
                </li>
              </ContactList>
            </div>

            <SocialSection>
              <h3>{t('contact.social.title')}</h3>
              <SocialIcons>
                <a href="https://www.facebook.com/people/Museo-Regional-Andino/100075671035620/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href="https://www.instagram.com/museoandino/?hl=es" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="https://www.youtube.com/@museoregionalandino4593" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <FaYoutube />
                </a>
              </SocialIcons>
            </SocialSection>
          </InfoPanel>

          <FormPanel>
            <FormTitle>{t('contact.form.title')}</FormTitle>
            <form ref={form} onSubmit={sendEmail}>
              <FormGroup>
                <label htmlFor="nombre">{t('contact.form.name.label')}</label>
                <input 
                  type="text" 
                  id="nombre"
                  name="nombre" 
                  value={formData.nombre}
                  onChange={handleChange}
                  required 
                  placeholder={t('contact.form.name.placeholder')} 
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="email">{t('contact.form.email.label')}</label>
                <input 
                  type="email" 
                  id="email"
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  placeholder={t('contact.form.email.placeholder')} 
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="asunto">{t('contact.form.subject.label')}</label>
                <input 
                  type="text" 
                  id="asunto"
                  name="asunto" 
                  value={formData.asunto}
                  onChange={handleChange}
                  required 
                  placeholder={t('contact.form.subject.placeholder')} 
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="mensaje">{t('contact.form.message.label')}</label>
                <textarea 
                  id="mensaje"
                  name="mensaje" 
                  value={formData.mensaje}
                  onChange={handleChange}
                  required 
                  placeholder={t('contact.form.message.placeholder')}
                ></textarea>
              </FormGroup>
              <Button 
                variant="primary" 
                fullWidth 
                type="submit" 
                disabled={loading}
                startIcon={!loading && <FaPaperPlane />}
                style={{ padding: '16px', fontSize: '1.1rem', marginTop: '10px' }}
              >
                {loading ? t('common.loading') : t('contact.form.submit')}
              </Button>
            </form>
          </FormPanel>
        </ContactCard>

        <MapSection>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3636.567890123456!2d-66.3854321!3d-24.2256789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94047a5890123456%3A0x1234567890abcdef!2sSan%20Antonio%20de%20los%20Cobres%2C%20Salta!5e0!3m2!1ses!2sar!4v1633024800000!5m2!1ses!2sar" 
            allowFullScreen="" 
            loading="lazy"
            title="Ubicación del Museo"
          ></iframe>
        </MapSection>

      </Container>
    </PageContainer>
  );
};

export default ContactoPage;
