import React, { useState } from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaClock, FaTicketAlt, FaBus, FaWheelchair, FaParking, FaUtensils, FaCamera, FaInfoCircle } from 'react-icons/fa';
import { theme } from '../../styles/theme';
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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  background-color: ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.light};
`;

const Section = styled.section`
  margin-bottom: ${theme.spacing.xl};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: ${theme.typography.sizes.h2};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  svg {
    color: ${theme.colors.accent};
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const InfoCard = styled.div`
  background-color: white;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.light};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: ${theme.transitions.default};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.medium};
  }
`;

const InfoIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${theme.colors.primary}10;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.primary};
  font-size: 1.5rem;
`;

const InfoTitle = styled.h3`
  font-size: 1.2rem;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const InfoText = styled.p`
  color: ${theme.colors.text.dark};
  margin-bottom: 0;
`;

const PriceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: ${theme.spacing.lg} 0;
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  th {
    background-color: ${theme.colors.primary};
    color: white;
  }
  
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  tr:hover {
    background-color: #f1f1f1;
  }
`;

const Sidebar = styled.aside`
  @media (max-width: ${theme.breakpoints.desktop}) {
    order: -1;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 300px;
  background-color: #f0f0f0;
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.muted};
  font-size: 1.2rem;
`;

const HoursList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 ${theme.spacing.lg} 0;
  
  li {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 0;
    border-bottom: 1px solid #eee;
    
    &:last-child {
      border-bottom: none;
    }
    
    span:first-child {
      font-weight: ${theme.typography.weights.bold};
    }
  }
`;

const TipsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    display: flex;
    align-items: flex-start;
    margin-bottom: ${theme.spacing.md};
    
    svg {
      color: ${theme.colors.accent};
      margin-right: ${theme.spacing.sm};
      margin-top: 0.25rem;
      flex-shrink: 0;
    }
  }
`;

const VisitaPage = () => {
  const [activeTab, setActiveTab] = useState('horario');

  const horarios = [
    { dia: 'Martes a Viernes', horario: '9:00 - 18:00' },
    { dia: 'Sábado', horario: '10:00 - 20:00' },
    { dia: 'Domingo', horario: '10:00 - 18:00' },
    { dia: 'Lunes', horario: 'Cerrado' },
  ];

  const precios = [
    { categoria: 'Adultos', precio: '$500', descuento: '$400 (mayores de 65)' },
    { categoria: 'Estudiantes', precio: '$250', descuento: 'Con acreditación' },
    { categoria: 'Menores de 12 años', precio: 'Gratis', descuento: 'Acompañados de un adulto' },
    { categoria: 'Grupos educativos', precio: '$200', descuento: 'Por persona, con reserva previa' },
  ];

  return (
    <PageContainer>
      <Container>
        <HeroSection>
          <Title>Planifica tu Visita</Title>
          <Subtitle>
            Descubre todo lo que necesitas saber para disfrutar al máximo de tu experiencia en el Museo Regional Andino.
            Consulta horarios, precios, cómo llegar y recomendaciones para tu visita.
          </Subtitle>
        </HeroSection>

        <ContentGrid>
          <MainContent>
            <Section>
              <SectionTitle>
                <FaInfoCircle /> Información General
              </SectionTitle>
              
              <InfoGrid>
                <InfoCard>
                  <InfoIcon>
                    <FaClock />
                  </InfoIcon>
                  <InfoTitle>Horario</InfoTitle>
                  <InfoText>Martes a Domingo</InfoText>
                  <InfoText>9:00 - 18:00 hs</InfoText>
                </InfoCard>
                
                <InfoCard>
                  <InfoIcon>
                    <FaTicketAlt />
                  </InfoIcon>
                  <InfoTitle>Entradas</InfoTitle>
                  <InfoText>Adultos: $500</InfoText>
                  <InfoText>Menores: Gratis</InfoText>
                </InfoCard>
                
                <InfoCard>
                  <InfoIcon>
                    <FaBus />
                  </InfoIcon>
                  <InfoTitle>Cómo llegar</InfoTitle>
                  <InfoText>Líneas de colectivo: 12, 34, 56</InfoText>
                  <InfoText>Estación de tren a 3 cuadras</InfoText>
                </InfoCard>
              </InfoGrid>
            </Section>

            <Section>
              <SectionTitle>
                <FaClock /> Horarios
              </SectionTitle>
              
              <HoursList>
                {horarios.map((item, index) => (
                  <li key={index}>
                    <span>{item.dia}</span>
                    <span>{item.horario}</span>
                  </li>
                ))}
              </HoursList>
              
              <p style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
                * Último ingreso 30 minutos antes del cierre
              </p>
              
              <p>
                El museo permanece cerrado los días 1 de enero, 1 de mayo, 9 de julio y 25 de diciembre.
              </p>
            </Section>

            <Section>
              <SectionTitle>
                <FaTicketAlt /> Tarifas
              </SectionTitle>
              
              <PriceTable>
                <thead>
                  <tr>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Descuentos</th>
                  </tr>
                </thead>
                <tbody>
                  {precios.map((item, index) => (
                    <tr key={index}>
                      <td>{item.categoria}</td>
                      <td>{item.precio}</td>
                      <td>{item.descuento}</td>
                    </tr>
                  ))}
                </tbody>
              </PriceTable>
              
              <div style={{ 
                backgroundColor: '#e8f4fc', 
                padding: '1rem', 
                borderRadius: theme.borderRadius.sm,
                marginTop: theme.spacing.lg
              }}>
                <p style={{ margin: 0, color: theme.colors.primary }}>
                  <strong>Domingos:</strong> Entrada gratuita para todo público
                </p>
              </div>
            </Section>
          </MainContent>
          
          <Sidebar>
            <Section>
              <SectionTitle>
                <FaMapMarkerAlt /> Ubicación
              </SectionTitle>
              
              <MapContainer>
                [Mapa interactivo del museo]
              </MapContainer>
              
              <p style={{ marginBottom: theme.spacing.md }}>
                <strong>Dirección:</strong> Av. Principal 1234, Ciudad, Provincia
              </p>
              
              <p style={{ marginBottom: theme.spacing.lg }}>
                <strong>Teléfono:</strong> +54 123 456 7890
              </p>
              
              <Button variant="primary" fullWidth>
                Cómo llegar
              </Button>
            </Section>
            
            <Section>
              <SectionTitle>
                <FaInfoCircle /> Recomendaciones
              </SectionTitle>
              
              <TipsList>
                <li>
                  <FaInfoCircle />
                  <span>Presentar DNI o documento de identidad al ingresar.</span>
                </li>
                <li>
                  <FaCamera />
                  <span>Se permite tomar fotografías sin flash.</span>
                </li>
                <li>
                  <FaUtensils />
                  <span>Zona de comedor disponible en el primer piso.</span>
                </li>
                <li>
                  <FaWheelchair />
                  <span>Accesibilidad garantizada en todas las instalaciones.</span>
                </li>
                <li>
                  <FaParking />
                  <span>Estacionamiento gratuito para visitantes.</span>
                </li>
              </TipsList>
            </Section>
            
            <Section>
              <h3 style={{ color: theme.colors.primary, marginBottom: theme.spacing.md }}>
                Visitas Guiadas
              </h3>
              
              <p style={{ marginBottom: theme.spacing.md }}>
                Disfruta de visitas guiadas gratuitas todos los días a las 11:00 y 16:00 hs.
              </p>
              
              <Button variant="accent" fullWidth>
                Reservar Visita Guiada
              </Button>
            </Section>
          </Sidebar>
        </ContentGrid>
      </Container>
    </PageContainer>
  );
};

export default VisitaPage;
