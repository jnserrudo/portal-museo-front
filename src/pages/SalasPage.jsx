import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { FaMountain, FaGem, FaLeaf, FaHistory, FaTrain, FaLandmark, FaMapMarkerAlt } from 'react-icons/fa';

// Definir la imagen fuera del componente estilizado para mayor seguridad
const heroImage = `${import.meta.env.BASE_URL}sala-hero.jpg`;

const PageContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  background-color: ${theme.colors.background.light};
`;

const HeroSection = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroImage}) center/cover no-repeat;
  height: 40vh;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${theme.colors.text.light};
  margin-bottom: ${theme.spacing.xl};
  background-color: ${theme.colors.primary}; /* Fallback */
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: ${theme.spacing.md};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ContentContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md} ${theme.spacing.xxl};
`;

const IntroSection = styled.div`
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
  padding: ${theme.spacing.lg};
  background-color: ${theme.colors.background.section};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.light};
`;

const IntroText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${theme.colors.text.dark};
  margin-bottom: ${theme.spacing.md};
`;

const SalaSection = styled.section`
  margin-bottom: ${theme.spacing.xxl};
  scroll-margin-top: 100px; /* Para compensar el header fijo */
  padding: ${theme.spacing.xl};
  background-color: white;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.medium};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const SalaHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
  border-bottom: 2px solid ${theme.colors.accent};
  padding-bottom: ${theme.spacing.sm};
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const SalaIcon = styled.div`
  font-size: 2.5rem;
  color: ${theme.colors.primary};
  margin-right: ${theme.spacing.md};
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: ${theme.spacing.sm};
  }
`;

const SalaTitle = styled.h2`
  color: ${theme.colors.primary};
  font-size: 2rem;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SalaContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${theme.colors.text.muted};
  
  strong {
    color: ${theme.colors.primary};
    font-weight: 600;
  }
`;

const NavigationMenu = styled.nav`
  position: sticky;
  top: 80px;
  background: linear-gradient(135deg, ${theme.colors.primary}15 0%, ${theme.colors.accent}25 100%);
  padding: ${theme.spacing.lg} ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.medium}, inset 0 1px 0 rgba(255,255,255,0.5);
  z-index: 90;
  overflow: visible;
  position: relative;
`;

const MenuTitle = styled.div`
  display: block;
  text-align: center;
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.primary};
  font-size: 0.9rem;
  margin-bottom: ${theme.spacing.sm};
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const ScrollContainer = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;
  
  /* Hide scrollbar but keep functionality */
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Animated scroll indicators - only on larger screens */
  @media (min-width: 768px) {
    &::before,
    &::after {
      content: '→';
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.5rem;
      font-weight: bold;
      color: ${theme.colors.primary};
      z-index: 2;
      animation: pulse 2s ease-in-out infinite;
      pointer-events: none;
    }
    
    &::before {
      content: '←';
      left: -10px;
      opacity: 0.3;
    }
    
    &::after {
      right: -10px;
      opacity: 0.7;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 0.3; transform: translateY(-50%) scale(1); }
      50% { opacity: 1; transform: translateY(-50%) scale(1.2); }
    }
  }
`;

const MenuList = styled.ul`
  display: flex;
  list-style: none;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  margin: 0;
  white-space: nowrap;
  position: relative;
`;

const MenuItem = styled.li`
  flex: 0 0 auto;
`;

const MenuLink = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-decoration: none;
  width: 200px;
  height: 140px;
  border-radius: ${theme.borderRadius.md};
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.7) 100%
  ), url('${props => props.$image}');
  background-size: cover;
  background-position: center;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  padding: ${theme.spacing.md};
  
  /* Title overlay */
  span {
    color: white;
    font-weight: 700;
    font-size: 0.9rem;
    text-align: center;
    z-index: 2;
    position: relative;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
    line-height: 1.2;
  }
  
  /* Hover effects */
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-8px) scale(1.05);
      box-shadow: 0 8px 24px rgba(139, 90, 43, 0.4);
      
      &::before {
        opacity: 1;
      }
    }
  }
  
  /* Overlay effect on hover */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(139, 90, 43, 0.3) 0%,
      rgba(139, 90, 43, 0.6) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }
  
  &:active {
    transform: translateY(-4px) scale(1.02);
  }
  
  /* Mobile adjustments */
  @media (max-width: 768px) {
    width: 160px;
    height: 120px;
    padding: ${theme.spacing.sm};
    
    span {
      font-size: 0.85rem;
    }
  }
`;

const SalasPage = () => {
  const { t } = useLanguage();

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    
    // Check for hash in URL and scroll to it if present
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  const salas = [
    {
      id: 'experiencia-inmersiva',
      title: t('salas.immersive.title'),
      icon: <FaMountain />,
      image: `${import.meta.env.BASE_URL}geologia.jpg`,
      content: <span dangerouslySetInnerHTML={{ __html: t('salas.immersive.content') }} />
    },
    {
      id: 'sala-geologia',
      title: t('salas.geology.title'),
      icon: <FaGem />,
      image: `${import.meta.env.BASE_URL}geologia.jpg`,
      content: <span dangerouslySetInnerHTML={{ __html: t('salas.geology.content') }} />
    },
    {
      id: 'sala-biodiversidad',
      title: t('salas.biodiversity.title'),
      icon: <FaLeaf />,
      image: `${import.meta.env.BASE_URL}biodiversidad.jpg`,
      content: <span dangerouslySetInnerHTML={{ __html: t('salas.biodiversity.content') }} />
    },
    {
      id: 'sala-arqueologia',
      title: t('salas.archeology.title'),
      icon: <FaHistory />,
      image: `${import.meta.env.BASE_URL}arqueologia.JPG`,
      content: <span dangerouslySetInnerHTML={{ __html: t('salas.archeology.content') }} />
    },
    {
      id: 'sala-mineria',
      title: t('salas.mining.title'),
      icon: <FaGem />,
      image: `${import.meta.env.BASE_URL}minerologia_y_mineria.jpg`,
      content: <span dangerouslySetInnerHTML={{ __html: t('salas.mining.content') }} />
    },
    {
      id: 'sala-ramal-c14',
      title: t('salas.c14.title'),
      icon: <FaTrain />,
      image: `${import.meta.env.BASE_URL}ramalc14_tarjeta.jpg`,
      content: <span dangerouslySetInnerHTML={{ __html: t('salas.c14.content') }} />
    },
    {
      id: 'sala-historia',
      title: t('salas.history.title'),
      icon: <FaLandmark />,
      image: `${import.meta.env.BASE_URL}historia_museo.JPG`,
      content: <span dangerouslySetInnerHTML={{ __html: t('salas.history.content') }} />
    },
    {
      id: 'sala-territorio',
      title: t('salas.territory.title'),
      icon: <FaMapMarkerAlt />,
      image: `${import.meta.env.BASE_URL}territorio_andes_tarjeta.JPG`,
      content: <span dangerouslySetInnerHTML={{ __html: t('salas.territory.content') }} />
    },
    {
      id: 'sala-gobernacion',
      title: t('salas.governance.title'),
      icon: <FaLandmark />,
      image: `${import.meta.env.BASE_URL}historia_museo.png`,
      content: <span dangerouslySetInnerHTML={{ __html: t('salas.governance.content') }} />
    },
    {
      id: 'sala-sac-hoy',
      title: t('salas.sac.title'),
      icon: <FaMapMarkerAlt />,
      image: `${import.meta.env.BASE_URL}territorio_andes.jpg`,
      content: <span dangerouslySetInnerHTML={{ __html: t('salas.sac.content') }} />
    }
  ];

  return (
    <PageContainer id="seccion-salas-principal">
      <HeroSection>
        <div style={{ maxWidth: '800px', padding: '0 20px', zIndex: 1 }}>
          <HeroTitle>{t('salas.hero.title')}</HeroTitle>
          <p style={{ fontSize: '1.2rem' }}>
            {t('salas.hero.subtitle')}
          </p>
        </div>
      </HeroSection>

      <ContentContainer>
        <IntroSection>
          <IntroText dangerouslySetInnerHTML={{ __html: t('salas.intro') }} />
        </IntroSection>

        <NavigationMenu>
          <MenuTitle>{t('salas.nav.title')}</MenuTitle>
          <ScrollContainer>
            <MenuList>
              {salas.map(sala => (
                <MenuItem key={sala.id}>
                  <MenuLink href={`#${sala.id}`} $image={sala.image}>
                    <span>{sala.title}</span>
                  </MenuLink>
                </MenuItem>
              ))}
            </MenuList>
          </ScrollContainer>
        </NavigationMenu>

        {salas.map((sala) => (
          <SalaSection key={sala.id} id={sala.id}>
            <SalaHeader>
              <SalaIcon>{sala.icon}</SalaIcon>
              <SalaTitle>{sala.title}</SalaTitle>
            </SalaHeader>
            <SalaContent>
              {sala.content}
            </SalaContent>
          </SalaSection>
        ))}
      </ContentContainer>
    </PageContainer>
  );
};

export default SalasPage;
