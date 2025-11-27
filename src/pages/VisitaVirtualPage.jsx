import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import styled from 'styled-components';
import { FaPlay, FaImage, FaTimes, FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa';
import { theme } from '../styles/theme';

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
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.medium};
  }
  
  svg {
    font-size: 1.2rem;
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
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary};
  font-size: 1.5rem;
`;

const MediaType = styled.div`
  position: absolute;
  top: ${theme.spacing.sm};
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
  const [filter, setFilter] = useState('all'); // 'all', 'images', 'videos'
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
    const images = [
      { type: 'image', src: `${baseUrl}visita-virtual/G0011623.JPG`, alt: 'Vista del Museo 1' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0011624.JPG`, alt: 'Vista del Museo 2' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0011625.JPG`, alt: 'Vista del Museo 3' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0011626.JPG`, alt: 'Vista del Museo 4' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0011627.JPG`, alt: 'Vista del Museo 5' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0011628.JPG`, alt: 'Vista del Museo 6' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0011629.JPG`, alt: 'Vista del Museo 7' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0011630.JPG`, alt: 'Vista del Museo 8' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0021632.JPG`, alt: 'Vista del Museo 9' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0021633.JPG`, alt: 'Vista del Museo 10' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0021634.JPG`, alt: 'Vista del Museo 11' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0021635.JPG`, alt: 'Vista del Museo 12' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0021636.JPG`, alt: 'Vista del Museo 13' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0021637.JPG`, alt: 'Vista del Museo 14' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0021638.JPG`, alt: 'Vista del Museo 15' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0021639.JPG`, alt: 'Vista del Museo 16' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0021640.JPG`, alt: 'Vista del Museo 17' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0021641.JPG`, alt: 'Vista del Museo 18' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0031644.JPG`, alt: 'Vista del Museo 19' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0031645.JPG`, alt: 'Vista del Museo 20' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0031646.JPG`, alt: 'Vista del Museo 21' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0041653.JPG`, alt: 'Vista del Museo 22' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0041654.JPG`, alt: 'Vista del Museo 23' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0041655.JPG`, alt: 'Vista del Museo 24' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0041656.JPG`, alt: 'Vista del Museo 25' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0041657.JPG`, alt: 'Vista del Museo 26' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0041658.JPG`, alt: 'Vista del Museo 27' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0041659.JPG`, alt: 'Vista del Museo 28' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0041660.JPG`, alt: 'Vista del Museo 29' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0041661.JPG`, alt: 'Vista del Museo 30' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0041662.JPG`, alt: 'Vista del Museo 31' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0051664.JPG`, alt: 'Vista del Museo 32' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0051665.JPG`, alt: 'Vista del Museo 33' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0051666.JPG`, alt: 'Vista del Museo 34' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0051667.JPG`, alt: 'Vista del Museo 35' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0051668.JPG`, alt: 'Vista del Museo 36' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0051669.JPG`, alt: 'Vista del Museo 37' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0051670.JPG`, alt: 'Vista del Museo 38' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0051671.JPG`, alt: 'Vista del Museo 39' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0061673.JPG`, alt: 'Vista del Museo 40' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0061674.JPG`, alt: 'Vista del Museo 41' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0061675.JPG`, alt: 'Vista del Museo 42' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0061676.JPG`, alt: 'Vista del Museo 43' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0061677.JPG`, alt: 'Vista del Museo 44' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0071679.JPG`, alt: 'Vista del Museo 45' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0071680.JPG`, alt: 'Vista del Museo 46' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0071681.JPG`, alt: 'Vista del Museo 47' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0071682.JPG`, alt: 'Vista del Museo 48' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0081684.JPG`, alt: 'Vista del Museo 49' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0081685.JPG`, alt: 'Vista del Museo 50' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0081686.JPG`, alt: 'Vista del Museo 51' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0081687.JPG`, alt: 'Vista del Museo 52' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0081688.JPG`, alt: 'Vista del Museo 53' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0091690.JPG`, alt: 'Vista del Museo 54' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0091691.JPG`, alt: 'Vista del Museo 55' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0091692.JPG`, alt: 'Vista del Museo 56' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0091693.JPG`, alt: 'Vista del Museo 57' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0091694.JPG`, alt: 'Vista del Museo 58' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0091695.JPG`, alt: 'Vista del Museo 59' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0101697.JPG`, alt: 'Vista del Museo 60' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0101698.JPG`, alt: 'Vista del Museo 61' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0101699.JPG`, alt: 'Vista del Museo 62' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0101700.JPG`, alt: 'Vista del Museo 63' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0101701.JPG`, alt: 'Vista del Museo 64' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0111703.JPG`, alt: 'Vista del Museo 65' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0111704.JPG`, alt: 'Vista del Museo 66' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0111705.JPG`, alt: 'Vista del Museo 67' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0111706.JPG`, alt: 'Vista del Museo 68' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0121708.JPG`, alt: 'Vista del Museo 69' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0121709.JPG`, alt: 'Vista del Museo 70' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0131711.JPG`, alt: 'Vista del Museo 71' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0131712.JPG`, alt: 'Vista del Museo 72' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0141714.JPG`, alt: 'Vista del Museo 73' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0141715.JPG`, alt: 'Vista del Museo 74' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0151717.JPG`, alt: 'Vista del Museo 75' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0151718.JPG`, alt: 'Vista del Museo 76' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0161720.JPG`, alt: 'Vista del Museo 77' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0161721.JPG`, alt: 'Vista del Museo 78' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0161722.JPG`, alt: 'Vista del Museo 79' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0161723.JPG`, alt: 'Vista del Museo 80' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0161724.JPG`, alt: 'Vista del Museo 81' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0161725.JPG`, alt: 'Vista del Museo 82' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0161726.JPG`, alt: 'Vista del Museo 83' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0161727.JPG`, alt: 'Vista del Museo 84' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0161728.JPG`, alt: 'Vista del Museo 85' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0161729.JPG`, alt: 'Vista del Museo 86' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0161730.JPG`, alt: 'Vista del Museo 87' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0161731.JPG`, alt: 'Vista del Museo 88' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0171733.JPG`, alt: 'Vista del Museo 89' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0171734.JPG`, alt: 'Vista del Museo 90' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0171735.JPG`, alt: 'Vista del Museo 91' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0171736.JPG`, alt: 'Vista del Museo 92' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0171737.JPG`, alt: 'Vista del Museo 93' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0171738.JPG`, alt: 'Vista del Museo 94' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0181740.JPG`, alt: 'Vista del Museo 95' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0181741.JPG`, alt: 'Vista del Museo 96' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0181742.JPG`, alt: 'Vista del Museo 97' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0181743.JPG`, alt: 'Vista del Museo 98' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0181744.JPG`, alt: 'Vista del Museo 99' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0181745.JPG`, alt: 'Vista del Museo 100' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0191747.JPG`, alt: 'Vista del Museo 101' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0201749.JPG`, alt: 'Vista del Museo 102' },
      { type: 'image', src: `${baseUrl}visita-virtual/G0201750.JPG`, alt: 'Vista del Museo 103' },
      { type: 'image', src: `${baseUrl}visita-virtual/GOPR1648.JPG`, alt: 'Vista del Museo 104' },
      { type: 'image', src: `${baseUrl}visita-virtual/GOPR1649.JPG`, alt: 'Vista del Museo 105' },
      { type: 'image', src: `${baseUrl}visita-virtual/GOPR1650.JPG`, alt: 'Vista del Museo 106' },
      { type: 'image', src: `${baseUrl}visita-virtual/GOPR1651.JPG`, alt: 'Vista del Museo 107' },
      { type: 'image', src: `${baseUrl}visita-virtual/GOPR1718.JPG`, alt: 'Vista del Museo 108' },
      { type: 'image', src: `${baseUrl}visita-virtual/GOPR1731.JPG`, alt: 'Vista del Museo 109' },
      { type: 'image', src: `${baseUrl}visita-virtual/GOPR1738.JPG`, alt: 'Vista del Museo 110' },
      { type: 'image', src: `${baseUrl}visita-virtual/GOPR1745.JPG`, alt: 'Vista del Museo 111' },
      { type: 'image', src: `${baseUrl}visita-virtual/GOPR1748.JPG`, alt: 'Vista del Museo 112' },
    ];
    
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
