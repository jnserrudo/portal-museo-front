import React, { useState } from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { theme } from '../styles/theme';
import Button from '../components/ui/Button';

const PageContainer = styled.div`
  padding: ${theme.spacing.xl} 0;
  background-color: ${theme.colors.background.general};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${theme.typography.sizes.h1};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
`;

const Subtitle = styled.p`
  font-size: ${theme.typography.sizes.welcome};
  color: ${theme.colors.text.dark};
  max-width: 800px;
  margin: 0 auto ${theme.spacing.xl};
  line-height: 1.6;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  h2 {
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.lg};
    font-size: 1.75rem;
    position: relative;
    padding-bottom: ${theme.spacing.sm};
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 3px;
      background-color: ${theme.colors.accent};
    }
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.lg};
  
  svg {
    color: ${theme.colors.accent};
    font-size: 1.5rem;
    margin-right: ${theme.spacing.md};
    margin-top: 4px;
    flex-shrink: 0;
  }
  
  div {
    h3 {
      margin: 0 0 ${theme.spacing.xs} 0;
      color: ${theme.colors.primary};
      font-size: 1.1rem;
    }
    
    p, a {
      margin: 0;
      color: ${theme.colors.text.dark};
      line-height: 1.6;
      text-decoration: none;
      display: block;
      
      &:hover {
        color: ${theme.colors.primary};
      }
    }
  }
`;

const SocialMedia = styled.div`
  margin-top: ${theme.spacing.xl};
  
  h3 {
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.md};
  }
  
  div {
    display: flex;
    gap: ${theme.spacing.md};
    
    a {
      color: ${theme.colors.text.dark};
      font-size: 1.5rem;
      transition: ${theme.transitions.default};
      
      &:hover {
        color: ${theme.colors.primary};
        transform: translateY(-3px);
      }
    }
  }
`;

const FormContainer = styled.div`
  background-color: white;
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.light};
  
  h2 {
    color: ${theme.colors.primary};
    margin-top: 0;
    margin-bottom: ${theme.spacing.lg};
    font-size: 1.75rem;
    position: relative;
    padding-bottom: ${theme.spacing.sm};
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 3px;
      background-color: ${theme.colors.accent};
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};
  
  label {
    display: block;
    margin-bottom: ${theme.spacing.xs};
    color: ${theme.colors.text.dark};
    font-weight: 500;
  }
  
  input, textarea, select {
    width: 100%;
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.borderRadius.sm};
    font-size: 1rem;
    transition: ${theme.transitions.default};
    font-family: inherit;
    
    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 2px ${theme.colors.primary}20;
    }
  }
  
  textarea {
    min-height: 120px;
    resize: vertical;
  }
`;

const MapContainer = styled.div`
  height: 400px;
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${theme.shadows.medium};
  margin: ${theme.spacing.xl} 0;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const ContactoPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', formData);
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <PageContainer>
      <Container>
        <HeroSection>
          <Title>Contacto</Title>
          <Subtitle>
            Estamos aquí para responder tus preguntas y escuchar tus comentarios. 
            No dudes en ponerte en contacto con nosotros a través del formulario o la información de contacto proporcionada.
          </Subtitle>
        </HeroSection>

        <Content>
          <ContactInfo>
            <h2>Información de Contacto</h2>
            
            <InfoItem>
              <FaMapMarkerAlt />
              <div>
                <h3>Dirección</h3>
                <p>Av. San Martín 1234</p>
                <p>San Salvador de Jujuy, Jujuy, Argentina</p>
              </div>
            </InfoItem>
            
            <InfoItem>
              <FaPhone />
              <div>
                <h3>Teléfono</h3>
                <p>+54 388 422-1234</p>
                <p>+54 9 388 512-3456 (WhatsApp)</p>
              </div>
            </InfoItem>
            
            <InfoItem>
              <FaEnvelope />
              <div>
                <h3>Correo Electrónico</h3>
                <a href="mailto:info@museoregionalandino.com">info@museoregionalandino.com</a>
                <a href="mailto:visitas@museoregionalandino.com">visitas@museoregionalandino.com</a>
              </div>
            </InfoItem>
            
            <InfoItem>
              <FaClock />
              <div>
                <h3>Horario de Atención</h3>
                <p>Martes a Viernes: 9:00 - 20:00 hs</p>
                <p>Sábados y Domingos: 10:00 - 18:00 hs</p>
                <p>Lunes: Cerrado</p>
              </div>
            </InfoItem>
            
            <SocialMedia>
              <h3>Síguenos en Redes Sociales</h3>
              <div>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <FaYoutube />
                </a>
              </div>
            </SocialMedia>
          </ContactInfo>
          
          <FormContainer>
            <h2>Envíanos un Mensaje</h2>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <label htmlFor="name">Nombre Completo *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="email">Correo Electrónico *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="phone">Teléfono</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="subject">Asunto *</label>
                <select 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="consulta">Consulta General</option>
                  <option value="visita-guiada">Visita Guiada</option>
                  <option value="eventos">Eventos Especiales</option>
                  <option value="prensa">Prensa</option>
                  <option value="donaciones">Donaciones</option>
                  <option value="otro">Otro</option>
                </select>
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="message">Mensaje *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </FormGroup>
              
              <Button type="submit" fullWidth>
                Enviar Mensaje
              </Button>
            </form>
          </FormContainer>
        </Content>
        
        <MapContainer>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3639.120880599204!2d-65.3053882849862!3d-24.194179884366663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941b0f4e8bd7aa0f%3A0x4f1c3d1e3b0e9a0a!2sSan%20Salvador%20de%20Jujuy%2C%20Jujuy!5e0!3m2!1sen!2sar!4v1620000000000!5m2!1sen!2sar" 
            allowFullScreen="" 
            loading="lazy"
            title="Ubicación del Museo Regional Andino"
          ></iframe>
        </MapContainer>
      </Container>
    </PageContainer>
  );
};

export default ContactoPage;
