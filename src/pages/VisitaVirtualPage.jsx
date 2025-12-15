import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import styled from 'styled-components';
import { FaPlay, FaImage, FaTimes, FaChevronLeft, FaChevronRight, FaExpand, FaMapMarkerAlt } from 'react-icons/fa';
import { theme } from '../styles/theme';
import VirtualTourView from '../components/virtual-tour/VirtualTourView';
import VideoTourView from '../components/virtual-tour/VideoTourView';
import { museumMap } from '../data/museumMap';
import { videoTourData } from '../data/videoTourData';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.background.general};
`;

const HeroSection = styled.section`
  background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${import.meta.env.BASE_URL}museo_frente.jpg');
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
    font-size: ${theme.typography.sizes.h1};
    margin-bottom: ${theme.spacing.md};
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    font-weight: ${theme.typography.weights.black};
    color: white;
  }
  
  p {
    font-size: ${theme.typography.sizes.subtitle};
    line-height: 1.6;
    opacity: 0.95;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md} ${theme.spacing.xxl};
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
  flex-wrap: wrap;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing.sm};
    padding: 0 ${theme.spacing.xs};
  }
`;

const FilterButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border: 2px solid ${props => props.$active ? theme.colors.primary : theme.colors.border};
  background-color: ${props => props.$active ? theme.colors.primary : 'white'};
  color: ${props => props.$active ? 'white' : theme.colors.text.dark};
  border-radius: 50px;
  font-weight: ${theme.typography.weights.bold};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  min-height: 44px;
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.medium};
  }
  
  svg {
    font-size: 1.2rem;
    flex-shrink: 0;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xs} ${theme.spacing.md};
    font-size: 0.85rem;
    
    svg {
      font-size: 1rem;
    }
  }
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const MediaCard = styled.div`
  position: relative;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${theme.colors.background.light};
  aspect-ratio: 16/9;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.dark};
  }
`;

const MediaPreview = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  
  img, video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MediaOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${MediaCard}:hover & {
    opacity: 1;
  }
`;

const PlayIcon = styled.div`
  right: ${theme.spacing.sm};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.85rem;
  font-weight: ${theme.typography.weights.bold};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const MediaType = styled.div`
  position: absolute;
  top: ${theme.spacing.sm};
  left: ${theme.spacing.sm};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: ${theme.typography.weights.bold};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  z-index: 2;
`;

const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.95);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
`;

const LightboxContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  
  img, video {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
  }
`;

const LightboxButton = styled.button`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${theme.colors.primary};
  font-size: 1.5rem;
  
  &:hover {
    background-color: white;
    transform: scale(1.1);
  }
`;

const CloseButton = styled(LightboxButton)`
  top: 20px;
  right: 20px;
`;

const PrevButton = styled(LightboxButton)`
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  
  &:hover {
    transform: translateY(-50%) scale(1.1);
  }
`;

const NextButton = styled(LightboxButton)`
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  
  &:hover {
    transform: translateY(-50%) scale(1.1);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.text.muted};
  
  svg {
    font-size: 4rem;
    margin-bottom: ${theme.spacing.md};
    opacity: 0.5;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: ${theme.spacing.sm};
  }
  
  p {
    font-size: 1.1rem;
  }
`;

const VisitaVirtualPage = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('tour'); // 'tour', 'video-tour', 'images', 'videos', 'all'
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Array de contenido multimedia - Visita Virtual con GoPro
  // 20 videos + 112 imágenes del recorrido
  const mediaContent = useMemo(() => {
    const baseUrl = import.meta.env.BASE_URL;
    
    // Videos de la visita virtual (GoPro)
    const videos = [
      { type: 'video', src: `${baseUrl}visita-virtual/GOPR1597.MP4`, alt: 'Recorrido Virtual - Parte 1' },
      { type: 'video', src: `${baseUrl}visita-virtual/GOPR1601.MP4`, alt: 'Recorrido Virtual - Parte 2' },
      { type: 'video', src: `${baseUrl}visita-virtual/GOPR1604.MP4`, alt: 'Recorrido Virtual - Parte 3' },
      { type: 'video', src: `${baseUrl}visita-virtual/GOPR1605.MP4`, alt: 'Recorrido Virtual - Parte 4' },
      { type: 'video', src: `${baseUrl}visita-virtual/GOPR1609.MP4`, alt: 'Recorrido Virtual - Parte 5' },
      { type: 'video', src: `${baseUrl}visita-virtual/GOPR1611.MP4`, alt: 'Recorrido Virtual - Parte 6' },
      { type: 'video', src: `${baseUrl}visita-virtual/GOPR1617.MP4`, alt: 'Recorrido Virtual - Parte 7' },
      { type: 'video', src: `${baseUrl}visita-virtual/GOPR1622.MP4`, alt: 'Recorrido Virtual - Parte 8' },
      { type: 'video', src: `${baseUrl}visita-virtual/GOPR1642.MP4`, alt: 'Recorrido Virtual - Parte 9' },
      { type: 'video', src: `${baseUrl}visita-virtual/GOPR1647.MP4`, alt: 'Recorrido Virtual - Parte 10' },
      { type: 'video', src: `${baseUrl}visita-virtual/GOPR1663.MP4`, alt: 'Recorrido Virtual - Parte 11' },
      { type: 'video', src: `${baseUrl}visita-virtual/GOPR1672.MP4`, alt: 'Recorrido Virtual - Parte 12' },
      { type: 'video', src: `${baseUrl}visita-virtual/GOPR1678.MP4`, alt: 'Recorrido Virtual - Parte 13' },
      { type: 'video', src: `${baseUrl}visita-virtual/GOPR1689.MP4`, alt: 'Recorrido Virtual - Parte 14' },
      { type: 'video', src: `${baseUrl}visita-virtual/GOPR1707.MP4`, alt: 'Recorrido Virtual - Parte 15' },
      { type: 'video', src: `${baseUrl}visita-virtual/GOPR1710.MP4`, alt: 'Recorrido Virtual - Parte 16' },
      { type: 'video', src: `${baseUrl}visita-virtual/GOPR1713.MP4`, alt: 'Recorrido Virtual - Parte 17' },
      { type: 'video', src: `${baseUrl}visita-virtual/GOPR1716.MP4`, alt: 'Recorrido Virtual - Parte 18' },
      { type: 'video', src: `${baseUrl}visita-virtual/GOPR1746.MP4`, alt: 'Recorrido Virtual - Parte 19' },
      { type: 'video', src: `${baseUrl}visita-virtual/GOPR1751.MP4`, alt: 'Recorrido Virtual - Parte 20' },
    ];
    
    // Imágenes de la visita virtual (GoPro)
    const images = museumMap.map(item => ({
      type: 'image',
      src: item.src,
      alt: item.title
    }));
    
    // Retornar videos primero, luego imágenes
    return [...videos, ...images];
  }, []);

  const filteredContent = useMemo(() => {
    if (filter === 'all') return mediaContent;
    if (filter === 'images') return mediaContent.filter(item => item.type === 'image');
    if (filter === 'videos') return mediaContent.filter(item => item.type === 'video');
    return mediaContent;
  }, [mediaContent, filter]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const goToPrevious = () => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredContent.length - 1));
  };

  const goToNext = () => {
    setLightboxIndex((prev) => (prev < filteredContent.length - 1 ? prev + 1 : 0));
  };

  const imageCount = mediaContent.filter(item => item.type === 'image').length;
  const videoCount = mediaContent.filter(item => item.type === 'video').length;

  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <h1>{t('virtualTour.hero.title')}</h1>
          <p>{t('virtualTour.hero.subtitle')}</p>
        </HeroContent>
      </HeroSection>

      <Container>
        <FilterSection>
          <FilterButton $active={filter === 'tour'} onClick={() => setFilter('tour')}>
            <FaMapMarkerAlt />
            Recorrido Interactivo
          </FilterButton>
          <FilterButton $active={filter === 'video-tour'} onClick={() => setFilter('video-tour')}>
            <FaPlay />
            {t('virtualTour.filter.videoTour')}
          </FilterButton>
          <FilterButton $active={filter === 'all'} onClick={() => setFilter('all')}>
            <FaExpand />
            {t('virtualTour.filter.all')} ({mediaContent.length})
          </FilterButton>
          <FilterButton $active={filter === 'images'} onClick={() => setFilter('images')}>
            <FaImage />
            {t('virtualTour.filter.images')} ({imageCount})
          </FilterButton>
          <FilterButton $active={filter === 'videos'} onClick={() => setFilter('videos')}>
            <FaPlay />
            {t('virtualTour.filter.videos')} ({videoCount})
          </FilterButton>
        </FilterSection>

        {filter === 'tour' ? (
          <VirtualTourView museumMap={museumMap} />
        ) : filter === 'video-tour' ? (
          <VideoTourView videoData={videoTourData} />
        ) : (
          <>
            {filteredContent.length === 0 ? (
              <EmptyState>
                <FaImage />
                <h3>{t('virtualTour.empty.title')}</h3>
                <p>{t('virtualTour.empty.message')}</p>
              </EmptyState>
            ) : (
              <Gallery>
                {filteredContent.map((item, index) => (
                  <MediaCard key={index} onClick={() => openLightbox(index)}>
                    <MediaPreview>
                      {item.type === 'image' ? (
                        <img src={item.src} alt={item.alt} loading="lazy" />
                      ) : (
                        <video src={item.src} preload="metadata" />
                      )}
                    </MediaPreview>
                    <MediaType>
                      {item.type === 'image' ? <FaImage /> : <FaPlay />}
                      {item.type === 'image' ? t('virtualTour.type.image') : t('virtualTour.type.video')}
                    </MediaType>
                    {item.type === 'video' && (
                      <MediaOverlay>
                        <PlayIcon>
                          <FaPlay />
                        </PlayIcon>
                      </MediaOverlay>
                    )}
                  </MediaCard>
                ))}
              </Gallery>
            )}
          </>
        )}
      </Container>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <LightboxOverlay onClick={closeLightbox}>
          <LightboxContent onClick={(e) => e.stopPropagation()}>
            {filteredContent[lightboxIndex].type === 'image' ? (
              <img src={filteredContent[lightboxIndex].src} alt={filteredContent[lightboxIndex].alt} />
            ) : (
              <video src={filteredContent[lightboxIndex].src} controls autoPlay />
            )}
          </LightboxContent>
          
          <CloseButton onClick={closeLightbox}>
            <FaTimes />
          </CloseButton>
          
          {filteredContent.length > 1 && (
            <>
              <PrevButton onClick={(e) => { e.stopPropagation(); goToPrevious(); }}>
                <FaChevronLeft />
              </PrevButton>
              <NextButton onClick={(e) => { e.stopPropagation(); goToNext(); }}>
                <FaChevronRight />
              </NextButton>
            </>
          )}
        </LightboxOverlay>
      )}
    </PageContainer>
  );
};

export default VisitaVirtualPage;
