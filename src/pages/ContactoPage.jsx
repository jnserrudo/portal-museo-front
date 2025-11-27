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
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  margin-bottom: ${theme.spacing.xl};
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 ${theme.spacing.md};

  h1 {
    font-size: ${theme.typography.sizes.h2};
    margin-bottom: ${theme.spacing.sm};
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    color: white;
  }

  p {
    font-size: ${theme.typography.sizes.subtitle};
    opacity: 0.9;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const SplitLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const InfoCard = styled.div`
  background: white;
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.medium};
  border-left: 4px solid ${theme.colors.primary};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.md};
  }
`;

const InfoTitle = styled.h2`
  color: ${theme.colors.primary};
  font-size: 1.8rem;
  margin-bottom: ${theme.spacing.md};
`;

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.md};
    margin-bottom: ${theme.spacing.md};
    font-size: 1.1rem;
    color: ${theme.colors.text.dark};
    
    a {
      color: ${theme.colors.text.dark};
      text-decoration: none;
      transition: color 0.2s;
      
      &:hover {
        color: ${theme.colors.primary};
      }
    }
    
    svg {
      color: ${theme.colors.primary};
      font-size: 1.5rem;
      flex-shrink: 0;
    }
  }
`;

const SocialSection = styled.div`
  margin-top: ${theme.spacing.md};
  
  h3 {
    color: ${theme.colors.text.dark};
    margin-bottom: ${theme.spacing.md};
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: white;
    color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.light};
    transition: all 0.3s ease;
    font-size: 1.5rem;
    
    &:hover {
      transform: translateY(-3px);
      background-color: ${theme.colors.primary};
      color: white;
      box-shadow: ${theme.shadows.medium};
    }
  }
`;

const FormColumn = styled.div`
  background: white;
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.medium};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.md};
  }
`;

const FormTitle = styled.h2`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.md};
  
  label {
    display: block;
    margin-bottom: ${theme.spacing.xs};
    color: ${theme.colors.text.dark};
    font-weight: 600;
  }
  
  input, textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid ${theme.colors.border || '#ddd'};
    border-radius: ${theme.borderRadius.sm};
    font-size: 1rem;
    transition: border-color 0.3s;
    font-family: inherit;
    
    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 2px ${theme.colors.primary}20;
    }
  }
  
  textarea {
    min-height: 150px;
    resize: vertical;
  }
`;

const MapSection = styled.div`
  margin-top: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${theme.shadows.medium};
  height: 400px;
  
  iframe {
    width: 100%;
    height: 100%;
    border: 0;
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
        <SplitLayout>
          <InfoColumn>
            <InfoCard>
              <InfoTitle>{t('contact.info.title')}</InfoTitle>
              <ContactList>
                <li>
                  <FaMapMarkerAlt />
                  <span>Av. San Martín s/n, San Antonio de los Cobres, Salta</span>
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

              <SocialSection>
                <InfoTitle>{t('contact.social.title')}</InfoTitle>
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
            </InfoCard>

            <MapSection>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3636.567890123456!2d-66.3854321!3d-24.2256789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94047a5890123456%3A0x1234567890abcdef!2sSan%20Antonio%20de%20los%20Cobres%2C%20Salta!5e0!3m2!1ses!2sar!4v1633024800000!5m2!1ses!2sar" 
                allowFullScreen="" 
                loading="lazy"
                title="Ubicación del Museo"
              ></iframe>
            </MapSection>
          </InfoColumn>

          <FormColumn>
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
              >
                {loading ? t('common.loading') : t('contact.form.submit')}
              </Button>
            </form>
          </FormColumn>
        </SplitLayout>
      </Container>
    </PageContainer>
  );
};

export default ContactoPage;
