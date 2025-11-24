import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import styled from 'styled-components';
import { FaLandmark, FaHistory, FaAward, FaQuoteLeft } from 'react-icons/fa';
import { theme } from '../styles/theme';

const PageContainer = styled.div`
  padding-bottom: ${theme.spacing.xl};
  background-color: ${theme.colors.background.general};
`;

const HeroSection = styled.section`
  background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${import.meta.env.BASE_URL}sala-hero.jpg');
  background-size: cover;
  background-position: center;
  height: 50vh;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  margin-bottom: ${theme.spacing.xl};
  position: relative;
`;

const HeroContent = styled.div`
  max-width: 900px;
  padding: 0 ${theme.spacing.md};
  animation: fadeIn 1s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  h1 {
    font-size: ${theme.typography.sizes.h2};
    margin-bottom: ${theme.spacing.md};
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    font-weight: ${theme.typography.weights.black};
  }

  p {
    font-size: ${theme.typography.sizes.subtitle};
    line-height: 1.6;
    opacity: 0.95;
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
  flex-wrap: wrap;
`;

const Badge = styled.span`
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const Section = styled.section`
  margin-bottom: ${theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: ${theme.typography.sizes.h2};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.lg};
  text-align: center;
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background-color: ${theme.colors.accent};
    margin: ${theme.spacing.sm} auto 0;
    border-radius: 2px;
  }
`;

const MissionCard = styled.div`
  background-color: white;
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.medium};
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.accent});
  }
  
  svg {
    font-size: 3rem;
    color: ${theme.colors.primary}40; /* Low opacity */
    margin-bottom: ${theme.spacing.md};
  }
  
  p {
    font-size: 1.2rem;
    line-height: 1.8;
    color: ${theme.colors.text.dark};
    max-width: 800px;
    margin: 0 auto;
    font-style: italic;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
`;

const HistoryCard = styled.div`
  background: white;
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.light};
  border-left: 4px solid ${theme.colors.primary};
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.medium};
  }
  
  h3 {
    color: ${theme.colors.primary};
    font-size: 1.4rem;
    margin-bottom: ${theme.spacing.sm};
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  p {
    color: ${theme.colors.text.medium};
    line-height: 1.6;
  }
`;

const CollectionCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${theme.shadows.medium};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.dark};
  }
  
  div.content {
    padding: ${theme.spacing.lg};
  }
  
  h3 {
    color: ${theme.colors.text.black};
    margin-bottom: ${theme.spacing.sm};
    font-size: 1.3rem;
  }
  
  p {
    color: ${theme.colors.text.medium};
    font-size: 0.95rem;
    line-height: 1.6;
  }
  
  div.icon-wrapper {
    background-color: ${theme.colors.primary};
    color: white;
    padding: 15px;
    display: inline-flex;
    border-radius: 0 0 15px 0;
    margin-bottom: ${theme.spacing.sm};
  }
`;

const ElMuseoPage = () => {
  const { t } = useLanguage();

  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <h1>{t('museum.hero.title')}</h1>
          <p>{t('museum.hero.subtitle')}</p>
          <BadgeContainer>
            <Badge><FaLandmark /> {t('museum.badge.founded')}</Badge>
            <Badge><FaHistory /> {t('museum.badge.history')}</Badge>
            <Badge><FaAward /> {t('museum.badge.monument')}</Badge>
          </BadgeContainer>
        </HeroContent>
      </HeroSection>

      <Container>
        <Section>
          <SectionTitle>{t('museum.mission.title')}</SectionTitle>
          <MissionCard>
            <FaQuoteLeft />
            <p>
              {t('museum.mission.content')}
            </p>
          </MissionCard>
        </Section>

        <Section>
          <SectionTitle>{t('museum.history.title')}</SectionTitle>
          <Grid>
            <HistoryCard>
              <h3><FaLandmark /> {t('museum.history.1998.title')}</h3>
              <p>{t('museum.history.1998.content')}</p>
            </HistoryCard>
            <HistoryCard>
              <h3><FaAward /> {t('museum.history.2018.title')}</h3>
              <p>{t('museum.history.2018.content')}</p>
            </HistoryCard>
            <HistoryCard>
              <h3><FaHistory /> {t('museum.history.2023.title')}</h3>
              <p>{t('museum.history.2023.content')}</p>
            </HistoryCard>
          </Grid>
        </Section>

        <Section>
          <SectionTitle>{t('museum.collection.title')}</SectionTitle>
          <Grid>
            <CollectionCard>
              <div className="icon-wrapper"><FaHistory size={24} /></div>
              <div className="content">
                <h3>{t('museum.collection.archeology.title')}</h3>
                <p>{t('museum.collection.archeology.content')}</p>
              </div>
            </CollectionCard>
            <CollectionCard>
              <div className="icon-wrapper"><FaLandmark size={24} /></div>
              <div className="content">
                <h3>{t('museum.collection.geology.title')}</h3>
                <p>{t('museum.collection.geology.content')}</p>
              </div>
            </CollectionCard>
            <CollectionCard>
              <div className="icon-wrapper"><FaHistory size={24} /></div>
              <div className="content">
                <h3>{t('museum.collection.textile.title')}</h3>
                <p>{t('museum.collection.textile.content')}</p>
              </div>
            </CollectionCard>
          </Grid>
        </Section>
      </Container>
    </PageContainer>
  );
};

export default ElMuseoPage;
