import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { FaMountain, FaGem, FaLeaf, FaHistory, FaTrain, FaLandmark, FaMapMarkerAlt, FaHandPointer, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, useAnimation, useMotionValue } from 'framer-motion';

const PageContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  background-color: ${theme.colors.background.light};
`;

const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${theme.spacing.xl} ${theme.spacing.md} ${theme.spacing.xxl};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.lg} ${theme.spacing.sm} ${theme.spacing.xl};
  }
`;

const CarouselSection = styled.section`
  margin-bottom: ${theme.spacing.xxl};
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 1rem 0;
`;

const CarouselHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
`;

const CarouselTitle = styled.h1`
  color: ${theme.colors.primary};
  font-size: 3rem;
  margin-bottom: ${theme.spacing.sm};
  font-weight: 800;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CarouselSubtitle = styled.p`
  color: ${theme.colors.text.dark};
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto ${theme.spacing.md};
`;

const DragHint = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${theme.colors.accent};
  font-size: 0.95rem;
  font-weight: 700;
  opacity: 0.8;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% { opacity: 0.4; transform: scale(0.98); }
    50% { opacity: 1; transform: scale(1.02); }
    100% { opacity: 0.4; transform: scale(0.98); }
  }
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.4);
  color: white;
  border: 1px solid rgba(255,255,255,0.1);
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  
  &:hover {
    background: ${theme.colors.accent};
    border-color: ${theme.colors.accent};
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 8px 16px rgba(139, 90, 43, 0.5);
  }
  
  &:active {
    transform: translateY(-50%) scale(0.95);
  }
  
  svg {
    font-size: 1.5rem;
    ${props => props.$direction === 'left' ? 'margin-right: 3px;' : 'margin-left: 3px;'}
  }
  
  ${props => props.$direction === 'left' ? 'left: 10px;' : 'right: 10px;'}
  
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    
    svg {
      font-size: 1.2rem;
    }
  }
`;

const CarouselInner = styled(motion.div)`
  display: flex;
  gap: ${theme.spacing.xl};
  padding: ${theme.spacing.sm} 1rem;
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }
`;

const CarouselItem = styled(motion.a)`
  min-width: 320px;
  height: 450px;
  border-radius: ${theme.borderRadius.lg};
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%), url(${props => props.$image}) center/cover no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${theme.spacing.xl};
  text-decoration: none;
  box-shadow: ${theme.shadows.medium};
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
  
  @media (max-width: 768px) {
    min-width: 260px;
    height: 380px;
  }
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  
  &:hover::before, &:active::before {
    opacity: 1;
  }
  
  &:hover {
    box-shadow: 0 15px 30px rgba(139, 90, 43, 0.4);
    border-color: ${theme.colors.accent};
  }
  
  span {
    color: white;
    font-weight: 800;
    font-size: 1.5rem;
    position: relative;
    z-index: 2;
    text-shadow: 2px 2px 8px rgba(0,0,0,0.9);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    line-height: 1.2;
  }
  
  svg {
    font-size: 1.8rem;
    color: ${theme.colors.accent};
    filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.8));
  }
`;

const SalaSection = styled.section`
  margin-bottom: ${theme.spacing.xxl};
  scroll-margin-top: 100px;
  padding: ${theme.spacing.xl};
  background-color: white;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.medium};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.md};
    margin-bottom: ${theme.spacing.xl};
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

const SalaContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xl};
  align-items: start;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const SalaContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${theme.colors.text.dark};
  text-align: justify;
  
  p {
    margin-bottom: 1rem;
  }
`;

const SalaImage = styled.div`
  width: 100%;
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${theme.shadows.medium};
  position: sticky;
  top: 100px;
  align-self: start;
  
  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    position: relative;
    top: 0;
  }
`;

const SalasPage = () => {
  const { t } = useLanguage();
  const carouselOuterRef = useRef(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const x = useMotionValue(0);
  const controls = useAnimation();
  const autoScrollTimeoutRef = useRef(null);
  const isMounted = useRef(true);

  const salas = [
    {
      id: 'experiencia-inmersiva',
      title: t('salas.immersive.title'),
      icon: <FaMountain />,
      image: `${import.meta.env.BASE_URL}salas/portal_sala_experiencia_inmersiva.png`,
      detailImage: `${import.meta.env.BASE_URL}salas/portal_sala_experiencia_inmersiva.png`,
      content: t('salas.immersive.content')
    },
    {
      id: 'sala-geologia',
      title: t('salas.geology.title'),
      icon: <FaGem />,
      image: `${import.meta.env.BASE_URL}geologia.jpg`,
      detailImage: `${import.meta.env.BASE_URL}salas/portal_sala_geologia.JPG`,
      content: t('salas.geology.content')
    },
    {
      id: 'sala-biodiversidad',
      title: t('salas.biodiversity.title'),
      icon: <FaLeaf />,
      image: `${import.meta.env.BASE_URL}biodiversidad.jpg`,
      detailImage: `${import.meta.env.BASE_URL}salas/portal_sala_biodiversidad.JPG`,
      content: t('salas.biodiversity.content')
    },
    {
      id: 'sala-arqueologia',
      title: t('salas.archeology.title'),
      icon: <FaHistory />,
      image: `${import.meta.env.BASE_URL}arqueologia.JPG`,
      detailImage: `${import.meta.env.BASE_URL}salas/portal_sala_arqueologia.JPG`,
      content: t('salas.archeology.content')
    },
    {
      id: 'sala-mineria',
      title: t('salas.mining.title'),
      icon: <FaGem />,
      image: `${import.meta.env.BASE_URL}minerologia_y_mineria.jpg`,
      detailImage: `${import.meta.env.BASE_URL}salas/portal_sala_mineria.JPG`,
      content: t('salas.mining.content')
    },
    {
      id: 'sala-ramal-c14',
      title: t('salas.c14.title'),
      icon: <FaTrain />,
      image: `${import.meta.env.BASE_URL}ramalc14_tarjeta.jpg`,
      detailImage: `${import.meta.env.BASE_URL}salas/portal_sala_ramal.JPG`,
      content: t('salas.c14.content')
    },
    {
      id: 'sala-historia',
      title: t('salas.history.title'),
      icon: <FaLandmark />,
      image: `${import.meta.env.BASE_URL}historia_museo.JPG`,
      detailImage: `${import.meta.env.BASE_URL}salas/portal_sala_historia.JPG`,
      content: t('salas.history.content')
    },
    {
      id: 'sala-territorio',
      title: t('salas.territory.title'),
      icon: <FaMapMarkerAlt />,
      image: `${import.meta.env.BASE_URL}territorio_andes_tarjeta.JPG`,
      detailImage: `${import.meta.env.BASE_URL}salas/portal_sala_territorio_andes.JPG`,
      content: t('salas.territory.content')
    },
    {
      id: 'sala-gobernacion',
      title: t('salas.governance.title'),
      icon: <FaLandmark />,
      image: `${import.meta.env.BASE_URL}historia_museo.png`,
      detailImage: `${import.meta.env.BASE_URL}salas/portal_sala_gobernacion_andes.JPG`,
      content: t('salas.governance.content')
    },
    {
      id: 'sala-sac-hoy',
      title: t('salas.sac.title'),
      icon: <FaMapMarkerAlt />,
      image: `${import.meta.env.BASE_URL}territorio_andes.jpg`,
      detailImage: `${import.meta.env.BASE_URL}salas/portal_sala_san_antonio.JPG`,
      content: t('salas.sac.content')
    }
  ];

  useEffect(() => {
    isMounted.current = true;
    window.scrollTo(0, 0);
    
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }

    return () => { isMounted.current = false; };
  }, []);

  useEffect(() => {
    const measureWidth = () => {
      if (carouselOuterRef.current) {
        setCarouselWidth(carouselOuterRef.current.scrollWidth - carouselOuterRef.current.offsetWidth);
      }
    };
    
    measureWidth();
    // Re-measure after images load to ensure proper width parsing
    setTimeout(measureWidth, 500);
    window.addEventListener('resize', measureWidth);
    return () => window.removeEventListener('resize', measureWidth);
  }, []);

  const playAutoScroll = (direction = -1) => {
    if (carouselWidth > 0 && isMounted.current) {
      const currentX = x.get();
      const target = direction === -1 ? -carouselWidth : 0;
      const distanceToTravel = Math.abs(target - currentX);
      const totalDistance = carouselWidth;
      const totalDuration = 60; // seconds for a full complete swipe width
      
      const duration = totalDistance > 0 ? (distanceToTravel / totalDistance) * totalDuration : totalDuration;

      if (duration > 0.5) {
        controls.start({
          x: target,
          transition: { 
            duration: duration,
            ease: "linear",
          }
        }).then(() => {
           if (isMounted.current) playAutoScroll(direction === -1 ? 1 : -1);
        });
      } else {
        // If we're already at edge, reverse immediately
        if (isMounted.current) playAutoScroll(direction === -1 ? 1 : -1);
      }
    }
  };

  const scheduleAutoScroll = (delay = 3000) => {
    if (autoScrollTimeoutRef.current) clearTimeout(autoScrollTimeoutRef.current);
    autoScrollTimeoutRef.current = setTimeout(() => {
      if (isMounted.current) {
        const currentX = x.get();
        // keep heading left generally, unless we are pinned at the left edge
        const dir = currentX <= -carouselWidth + 20 ? 1 : -1;
        playAutoScroll(dir);
      }
    }, delay);
  };

  useEffect(() => {
    if (carouselWidth > 0) {
      playAutoScroll();
    }
    return () => { 
      controls.stop(); 
      if (autoScrollTimeoutRef.current) clearTimeout(autoScrollTimeoutRef.current);
    };
  }, [carouselWidth]);

  const handleArrowClick = (direction) => {
    controls.stop();
    if (autoScrollTimeoutRef.current) clearTimeout(autoScrollTimeoutRef.current);
    
    const currentX = x.get();
    // Approximate card width + gap depending on viewport breakpoints
    const cardScrollAmount = window.innerWidth < 768 ? 260 + 24 : 320 + 32; 
    let targetX = direction === 'left' ? currentX + cardScrollAmount : currentX - cardScrollAmount;
    
    targetX = Math.max(-carouselWidth, Math.min(0, targetX));
    
    controls.start({
      x: targetX,
      transition: { duration: 0.6, ease: "easeOut" }
    }).then(() => {
      scheduleAutoScroll(2500);
    });
  };

  return (
    <PageContainer>
      <ContentContainer>
        <CarouselSection>
          <CarouselHeader>
            <CarouselTitle>Salas y Experiencia Inmersiva</CarouselTitle>
            <CarouselSubtitle>Desplázate para recorrer la historia, geología y cultura de la Puna a través de nuestras salas temáticas.</CarouselSubtitle>
            <DragHint>
              <FaHandPointer /> Arrastra para explorar
            </DragHint>
          </CarouselHeader>

          <CarouselWrapper>
            <ArrowButton 
              $direction="left" 
              onClick={() => handleArrowClick('left')} 
              aria-label="Anterior"
            >
              <FaChevronLeft />
            </ArrowButton>
            
            <motion.div ref={carouselOuterRef} style={{ overflow: 'hidden', padding: '10px 0' }}>
              <CarouselInner
                drag="x"
                dragConstraints={{ right: 0, left: -carouselWidth }}
                style={{ x }}
                animate={controls}
                onDragStart={() => {
                  controls.stop();
                  if (autoScrollTimeoutRef.current) clearTimeout(autoScrollTimeoutRef.current);
                }}
                onDragEnd={() => scheduleAutoScroll(1500)} // Resume auto-scroll quickly after a manual swipe completes
                whileTap={{ cursor: "grabbing" }}
              >
                {salas.map((sala) => (
                  <CarouselItem key={sala.id} href={`#${sala.id}`} $image={sala.image}>
                    <motion.span whileHover={{ scale: 1.05 }}>
                      {sala.icon} {sala.title}
                    </motion.span>
                  </CarouselItem>
                ))}
              </CarouselInner>
            </motion.div>

            <ArrowButton 
              $direction="right" 
              onClick={() => handleArrowClick('right')} 
              aria-label="Siguiente"
            >
              <FaChevronRight />
            </ArrowButton>
          </CarouselWrapper>
        </CarouselSection>

        {salas.map((sala) => (
          <SalaSection key={sala.id} id={sala.id}>
            <SalaHeader>
              <SalaIcon>{sala.icon}</SalaIcon>
              <SalaTitle>{sala.title}</SalaTitle>
            </SalaHeader>
            <SalaContentWrapper>
              <SalaContent>
                {typeof sala.content === 'string' ? sala.content.split('\n').map((paragraph, index) => (
                  paragraph.trim() ? <p key={index}>{paragraph}</p> : null
                )) : sala.content}
              </SalaContent>
              <SalaImage>
                <img src={sala.detailImage} alt={sala.title} />
              </SalaImage>
            </SalaContentWrapper>
          </SalaSection>
        ))}
      </ContentContainer>
    </PageContainer>
  );
};

export default SalasPage;
