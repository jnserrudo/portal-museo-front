import React from 'react';
import styled from 'styled-components';
import { FaHistory, FaLandmark, FaUsers, FaAward } from 'react-icons/fa';
import { theme } from '../../styles/theme';

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

const ContentSection = styled.section`
  margin-bottom: ${theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: ${theme.typography.sizes.h2};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.lg};
  text-align: center;
  position: relative;
  padding-bottom: ${theme.spacing.sm};
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: ${theme.colors.accent};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const Card = styled.div`
  background-color: ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.light};
  transition: ${theme.transitions.default};
  text-align: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.medium};
  }
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  color: ${theme.colors.accent};
  margin-bottom: ${theme.spacing.md};
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const CardText = styled.p`
  color: ${theme.colors.text.dark};
  line-height: 1.6;
`;

const HistorySection = styled.div`
  background-color: ${theme.colors.background.light};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.light};
`;

const HistoryContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  
  p {
    margin-bottom: ${theme.spacing.md};
    line-height: 1.8;
  }
`;

const ElMuseoPage = () => {
  return (
    <PageContainer>
      <Container>
        <HeroSection>
          <Title>El Museo Regional Andino</Title>
          <Subtitle>
            Un espacio dedicado a preservar, investigar y difundir el patrimonio cultural de la región andina,
            ofreciendo una experiencia educativa y enriquecedora para todos nuestros visitantes.
          </Subtitle>
        </HeroSection>

        <ContentSection>
          <SectionTitle>Nuestra Misión</SectionTitle>
          <Grid>
            <Card>
              <IconWrapper>
                <FaHistory />
              </IconWrapper>
              <CardTitle>Preservar</CardTitle>
              <CardText>
                Conservamos y protegemos el patrimonio cultural y natural de la región andina para las generaciones presentes y futuras.
              </CardText>
            </Card>
            
            <Card>
              <IconWrapper>
                <FaLandmark />
              </IconWrapper>
              <CardTitle>Investigar</CardTitle>
              <CardText>
                Desarrollamos investigaciones científicas que contribuyen al conocimiento y valoración de nuestro patrimonio cultural.
              </CardText>
            </Card>
            
            <Card>
              <IconWrapper>
                <FaUsers />
              </IconWrapper>
              <CardTitle>Difundir</CardTitle>
              <CardText>
                Compartimos el conocimiento a través de exposiciones, publicaciones y programas educativos para todos los públicos.
              </CardText>
            </Card>
          </Grid>
        </ContentSection>

        <ContentSection>
          <SectionTitle>Nuestra Historia</SectionTitle>
          <HistorySection>
            <HistoryContent>
              <p>
                Fundado en 1985, el Museo Regional Andino nació con el propósito de rescatar y preservar el rico patrimonio cultural de la región andina. 
                Desde sus inicios, se ha consolidado como un referente en la conservación y difusión de la historia, el arte y las tradiciones de nuestras comunidades.
              </p>
              <p>
                A lo largo de los años, el museo ha crecido tanto en su colección como en su impacto social, ofreciendo exposiciones temporales y permanentes 
                que muestran la riqueza cultural de la región, desde tiempos prehispánicos hasta la actualidad.
              </p>
              <p>
                En 2020, el museo fue declarado Monumento Histórico Nacional en reconocimiento a su labor en la preservación del patrimonio cultural y su contribución 
                a la educación y la cultura en la región.
              </p>
            </HistoryContent>
          </HistorySection>
        </ContentSection>

        <ContentSection>
          <SectionTitle>Reconocimientos</SectionTitle>
          <Grid>
            <Card>
              <IconWrapper>
                <FaAward />
              </IconWrapper>
              <CardTitle>Premio Nacional de Patrimonio</CardTitle>
              <CardText>
                Galardonados en 2022 por nuestra destacada labor en la preservación del patrimonio cultural inmaterial de la región andina.
              </CardText>
            </Card>
            
            <Card>
              <IconWrapper>
                <FaAward />
              </IconWrapper>
              <CardTitle>Sello de Excelencia Turística</CardTitle>
              <CardText>
                Reconocimiento otorgado en 2021 por ofrecer una experiencia turística de calidad y accesible para todos los visitantes.
              </CardText>
            </Card>
            
            <Card>
              <IconWrapper>
                <FaAward />
              </IconWrapper>
              <CardTitle>Premio a la Innovación Educativa</CardTitle>
              <CardText>
                Distinción recibida en 2023 por nuestros programas educativos innovadores dirigidos a estudiantes de todas las edades.
              </CardText>
            </Card>
          </Grid>
        </ContentSection>
      </Container>
    </PageContainer>
  );
};

export default ElMuseoPage;
