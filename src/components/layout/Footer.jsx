import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import { theme } from '../../styles/theme';

const FooterContainer = styled.footer`
  background-color: ${theme.colors.background.navbar};
  color: ${theme.colors.text.light};
  padding: ${theme.spacing.xl} 0 0;
  margin-top: auto;
  border-top: 1px solid ${theme.colors.primaryHover};
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const FooterSection = styled.div`
  h3 {
    color: ${theme.colors.text.light};
    margin-bottom: ${theme.spacing.md};
    font-size: 1.25rem;
    font-weight: ${theme.typography.weights.bold};
    position: relative;
    padding-bottom: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40px;
      height: 2px;
      background-color: ${theme.colors.primaryHover};
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 60px;
    }
  }
`;

const FooterLogo = styled(Link)`
  color: ${theme.colors.text.light};
  font-size: 1.5rem;
  font-weight: ${theme.typography.weights.black};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: ${theme.spacing.md};

  img {
    height: 40px;
    width: auto;
  }
`;

const FooterText = styled.p`
  margin-bottom: ${theme.spacing.md};
  line-height: 1.7;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: ${theme.colors.text.light};
  transition: ${theme.transitions.default};

  &:hover {
    background-color: ${theme.colors.accent};
    color: ${theme.colors.text.dark};
    transform: translateY(-3px);
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: ${theme.spacing.sm};
    transition: transform 0.2s ease;

    &:hover {
      transform: translateX(5px);
    }
  }

  a {
    color: ${theme.colors.text.light};
    text-decoration: none;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.25rem 0;
    position: relative;

    &::before {
      content: '→';
      opacity: 0;
      transition: all 0.2s ease;
      position: absolute;
      left: -15px;
    }

    &:hover {
      color: ${theme.colors.text.light};
      font-weight: ${theme.typography.weights.bold};
      padding-left: 15px;

      &::before {
        opacity: 1;
        left: 0;
      }
    }
  }
`;

const FooterLinkItem = styled.li`
  margin-bottom: ${theme.spacing.sm};
`;

const FooterLink = styled(Link)`
  color: ${theme.colors.text.light};
  text-decoration: none;
  transition: ${theme.transitions.default};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: ${theme.colors.accent};
    padding-left: 5px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${theme.borderRadius.sm};
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }

  svg {
    color: ${theme.colors.primaryHover};
    margin-top: 4px;
    flex-shrink: 0;
    font-size: 1.1rem;
  }

  span {
    flex: 1;
    line-height: 1.5;
  }
`;

const OpeningHours = styled.div`
  margin-top: ${theme.spacing.lg};
  background: rgba(0, 0, 0, 0.1);
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
`;

const HoursItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.1);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  span:first-child {
    font-weight: ${theme.typography.weights.bold};
    color: ${theme.colors.text.light};
  }

  span:last-child {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding: ${theme.spacing.lg} 0;
  margin-top: ${theme.spacing.xl};
  background: rgba(0, 0, 0, 0.2);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.5px;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterLogo to="/">
            <img src={`${import.meta.env.BASE_URL}logo-museo.png`} alt="Museo Regional Andino" />
            <span>Museo Regional Andino</span>
          </FooterLogo>
          <FooterText>
            Un espacio cultural dedicado a preservar y compartir el rico patrimonio andino a través de exposiciones, eventos y experiencias educativas.
          </FooterText>
          <SocialLinks>
            <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </SocialLink>
            <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialLink>
            <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialLink>
            <SocialLink href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>Enlaces Rápidos</h3>
          <FooterLinks>
            <FooterLinkItem>
              <FooterLink to="/el-museo">Sobre Nosotros</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink to="/coleccion">Nuestra Colección</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink to="/visita">Planifica tu Visita</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink to="/eventos">Eventos</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink to="/tecnologia">Tecnología</FooterLink>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLink to="/contacto">Contacto</FooterLink>
            </FooterLinkItem>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <h3>Horario</h3>
          <OpeningHours>
            <HoursItem>
              <span>Martes a Domingos:</span>
              <span>10:00 - 18:00</span>
            </HoursItem>
            <HoursItem>
              <span>Lunes:</span>
              <span>Cerrado</span>
            </HoursItem>
          </OpeningHours>
        </FooterSection>

        <FooterSection>
          <h3>Contacto</h3>
          <ContactInfo>
            <ContactItem>
              <FaMapMarkerAlt />
              <span>Av. Brígido Zabaleta, San Antonio de los Cobres, Salta</span>
            </ContactItem>
            <ContactItem>
              <FaPhone />
              <span>(387) 5020900</span>
            </ContactItem>
            <ContactItem>
              <FaEnvelope />
              <span>museoregionalandino@gmail.com</span>
            </ContactItem>
          </ContactInfo>
        </FooterSection>
      </FooterContent>

      <Copyright>
        &copy; {currentYear} Museo Regional Andino. Todos los derechos reservados.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
