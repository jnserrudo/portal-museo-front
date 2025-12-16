import React, { useState, useMemo, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaStepBackward, FaStepForward, FaFastBackward, FaFastForward, FaExpand, FaCompress, FaRedo, FaMapMarkedAlt, FaTimes } from 'react-icons/fa';
import { theme } from '../../styles/theme';

// Animaciones
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideInFromRight = keyframes`
  from { 
    opacity: 0;
    transform: translateX(50px);
  }
  to { 
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInFromLeft = keyframes`
  from { 
    opacity: 0;
    transform: translateX(-50px);
  }
  to { 
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 0 0 15px rgba(0,0,0,0.6), 0 0 30px rgba(139, 69, 19, 0.4);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.05);
    box-shadow: 0 0 20px rgba(0,0,0,0.8), 0 0 40px rgba(139, 69, 19, 0.6);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TourContainer = styled.div`
  width: 100%;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.$isFullscreen ? '0' : theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${props => props.$isFullscreen ? 'none' : '0 20px 60px rgba(0,0,0,0.5)'};
  position: ${props => props.$isFullscreen ? 'fixed' : 'relative'};
  top: ${props => props.$isFullscreen ? '0' : 'auto'};
  left: ${props => props.$isFullscreen ? '0' : 'auto'};
  right: ${props => props.$isFullscreen ? '0' : 'auto'};
  bottom: ${props => props.$isFullscreen ? '0' : 'auto'};
  z-index: ${props => props.$isFullscreen ? '10000' : '1'};
  height: ${props => props.$isFullscreen ? '100vh' : 'auto'};
`;

const TourWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: ${props => props.$isFullscreen ? '100%' : '1200px'};
  margin: 0 auto;
  aspect-ratio: ${props => props.$isFullscreen ? 'auto' : '4/3'};
  height: ${props => props.$isFullscreen ? '100%' : 'auto'};
  background: linear-gradient(145deg, #1a1a1a, #0f0f0f);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TourImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: opacity 0.4s ease-in-out, transform 0.4s ease-out;
  transform: ${props => {
    if (props.$entering === 'right') return 'translateX(30px)';
    if (props.$entering === 'left') return 'translateX(-30px)';
    return 'translateX(0)';
  }};
  opacity: ${props => props.$entering ? 0 : 1};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    object-fit: contain;
  }
`;

const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: ${props => props.$isLoading ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 20;
  backdrop-filter: blur(5px);
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(139, 69, 19, 0.2);
  border-top-color: ${theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const HotspotButton = styled.button`
  position: absolute;
  width: ${props => props.$isFullscreen ? '60px' : '45px'};
  height: ${props => props.$isFullscreen ? '60px' : '45px'};
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
  border: 3px solid ${theme.colors.primary};
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  animation: ${pulse} 2s ease-in-out infinite;
  font-size: ${props => props.$isFullscreen ? '1.5rem' : '1.1rem'};

  &:hover {
    animation: none;
    transform: translate(-50%, -50%) scale(1.25);
    background: linear-gradient(135deg, ${theme.colors.primary} 0%, #a0522d 100%);
    color: white;
    box-shadow: 0 0 30px rgba(139, 69, 19, 0.8), 0 0 50px rgba(139, 69, 19, 0.4);
  }

  &:active {
    transform: translate(-50%, -50%) scale(1.15);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 38px;
    height: 38px;
    font-size: 0.95rem;
    border-width: 2px;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(139, 69, 19, 0.5);
  z-index: 100;
  
  ${HotspotButton}:hover & {
    opacity: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: rgba(0, 0, 0, 0.9);
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.2rem;
  background: linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.98) 100%);
  width: 100%;
  justify-content: space-between;
  align-items: center;
  color: white;
  flex-wrap: wrap;
  border-top: 1px solid rgba(139, 69, 19, 0.3);

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.8rem 0.6rem;
    gap: 0.8rem;
    font-size: 0.85rem;
    flex-direction: column;
    align-items: stretch;
  }
`;

const ControlGroup = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  flex-wrap: wrap;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: space-between;
  }
`;

const ControlButton = styled.button`
  background: linear-gradient(135deg, rgba(139, 69, 19, 0.2) 0%, rgba(139, 69, 19, 0.1) 100%);
  border: 1px solid rgba(139, 69, 19, 0.4);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  min-height: 44px;
  backdrop-filter: blur(10px);
  font-weight: ${theme.typography.weights.medium};

  &:hover {
    background: linear-gradient(135deg, rgba(139, 69, 19, 0.4) 0%, rgba(139, 69, 19, 0.3) 100%);
    border-color: rgba(139, 69, 19, 0.6);
    box-shadow: 0 4px 12px rgba(139, 69, 19, 0.3);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.7rem 1rem;
    font-size: 0.85rem;
    flex: 1;
    
    svg {
      font-size: 1rem;
    }
  }
`;

const InfoPanel = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%);
  color: white;
  padding: 16px 20px;
  border-radius: 12px;
  z-index: 5;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(139, 69, 19, 0.4);
  max-width: 350px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  animation: ${slideDown} 0.5s ease-out;

  h3 {
    margin: 0 0 8px 0;
    font-size: 1.2rem;
    background: linear-gradient(135deg, ${theme.colors.accent} 0%, #d4a574 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: ${theme.typography.weights.bold};
  }
  
  p {
    margin: 5px 0 0;
    font-size: 0.9rem;
    opacity: 0.9;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    top: 10px;
    left: 10px;
    right: 10px;
    padding: 10px 14px;
    max-width: calc(100% - 20px);

    h3 {
      font-size: 0.95rem;
    }

    p {
      font-size: 0.75rem;
    }
  }
`;

const ProgressBarContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 200px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    order: -1;
    padding-bottom: 0.6rem;
    border-bottom: 1px solid rgba(139, 69, 19, 0.3);
    margin-bottom: 0.4rem;
  }
`;

const ProgressLabel = styled.div`
  font-size: 0.85rem;
  opacity: 0.9;
  font-weight: ${theme.typography.weights.medium};
  text-align: center;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${theme.colors.primary} 0%, #d4a574 100%);
  border-radius: 10px;
  transition: width 0.5s ease;
  width: ${props => props.$progress}%;
  position: relative;
  box-shadow: 0 0 10px rgba(139, 69, 19, 0.6);
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: ${shimmer} 2s infinite;
  }
`;

const MappingInfo = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: rgba(255, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 4px;
  font-family: monospace;
  z-index: 100;
  pointer-events: none;
  font-size: 0.8rem;
`;

const MinimapButton = styled(ControlButton)`
  background: ${props => props.$active 
    ? 'linear-gradient(135deg, rgba(139, 69, 19, 0.5) 0%, rgba(139, 69, 19, 0.4) 100%)' 
    : 'linear-gradient(135deg, rgba(139, 69, 19, 0.2) 0%, rgba(139, 69, 19, 0.1) 100%)'};
  border-color: ${props => props.$active ? 'rgba(139, 69, 19, 0.7)' : 'rgba(139, 69, 19, 0.4)'};
`;

const MinimapOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 20000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s ease;
  padding: 20px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0;
    align-items: flex-start;
  }
`;

const MinimapContainer = styled.div`
  background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
  border-radius: 16px;
  padding: 24px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  border: 2px solid rgba(139, 69, 19, 0.5);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
  position: relative;
  width: 100%;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    max-width: 100vw;
    max-height: 100vh;
    height: 100vh;
    border-radius: 0;
    border: none;
    padding: 12px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

const MinimapHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid rgba(139, 69, 19, 0.3);
  position: sticky;
  top: 0;
  background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
  z-index: 10;
  
  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: ${theme.colors.accent};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: 12px;
    padding-bottom: 12px;
    
    h2 {
      font-size: 1.1rem;
    }
  }
`;

const MinimapCloseButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

const MinimapGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  padding-bottom: 20px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding-bottom: 80px;
  }
`;

const MinimapItem = styled.div`
  position: relative;
  aspect-ratio: 4/3;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid ${props => props.$isCurrent ? theme.colors.primary : 'transparent'};
  transition: all 0.3s ease;
  background: #000;
  min-height: 80px;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 24px rgba(139, 69, 19, 0.4);
    border-color: ${theme.colors.accent};
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: ${props => props.$isCurrent ? 1 : 0.7};
    transition: opacity 0.3s ease;
  }
  
  &:hover img {
    opacity: 1;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    border-width: 2px;
    border-radius: 6px;
    min-height: 100px;
    
    &:hover {
      transform: none;
    }
    
    &:active {
      transform: scale(0.95);
      opacity: 0.8;
    }
  }
`;

const MinimapItemLabel = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.7) 70%, transparent);
  color: white;
  padding: 12px 6px 6px;
  font-size: 0.7rem;
  text-align: center;
  font-weight: ${theme.typography.weights.medium};
  line-height: 1.2;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.65rem;
    padding: 10px 4px 4px;
  }
`;

const VirtualTourView = ({ museumMap, initialImageId }) => {
  const [currentImageId, setCurrentImageId] = useState(initialImageId || museumMap[0]?.id);
  const [isMappingMode, setIsMappingMode] = useState(false);
  const [lastCoords, setLastCoords] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEntering, setIsEntering] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMinimap, setShowMinimap] = useState(false);
  const containerRef = useRef(null);

  const currentIndex = useMemo(() => 
    museumMap.findIndex(item => item.id === currentImageId),
    [currentImageId, museumMap]
  );

  const currentImage = useMemo(() => 
    museumMap[currentIndex] || museumMap[0], 
    [currentIndex, museumMap]
  );

  const progress = useMemo(() => 
    ((currentIndex + 1) / museumMap.length) * 100,
    [currentIndex, museumMap.length]
  );

  // Preload next and previous images
  useEffect(() => {
    const preloadImages = [];
    
    // Preload next image
    if (currentIndex < museumMap.length - 1) {
      const nextImg = new Image();
      nextImg.src = museumMap[currentIndex + 1].src;
      preloadImages.push(nextImg);
    }
    
    // Preload previous image
    if (currentIndex > 0) {
      const prevImg = new Image();
      prevImg.src = museumMap[currentIndex - 1].src;
      preloadImages.push(prevImg);
    }
    
    return () => {
      preloadImages.forEach(img => {
        img.src = '';
      });
    };
  }, [currentIndex, museumMap]);

  const handleNavigate = (targetId) => {
    if (targetId) {
      const targetIndex = museumMap.findIndex(item => item.id === targetId);
      const direction = targetIndex > currentIndex ? 'right' : 'left';
      
      setIsLoading(true);
      setIsEntering(direction);
      
      // Preload target image
      const targetImage = new Image();
      targetImage.src = museumMap[targetIndex].src;
      
      targetImage.onload = () => {
        setTimeout(() => {
          setCurrentImageId(targetId);
          setIsLoading(false);
          setTimeout(() => setIsEntering(null), 50);
        }, 100);
      };
      
      // Fallback in case image is already cached
      if (targetImage.complete) {
        setTimeout(() => {
          setCurrentImageId(targetId);
          setIsLoading(false);
          setTimeout(() => setIsEntering(null), 50);
        }, 100);
      }
    }
  };

  const handleRestart = () => {
    if (museumMap.length > 0) {
      handleNavigate(museumMap[0].id);
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current?.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current?.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const toggleMinimap = () => {
    setShowMinimap(!showMinimap);
  };

  const getCoords = (e) => {
    if (!isMappingMode) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPercent = ((x / rect.width) * 100).toFixed(2);
    const yPercent = ((y / rect.height) * 100).toFixed(2);
    
    const coords = { x: xPercent, y: yPercent };
    setLastCoords(coords);
    
    console.log(`Hotspot for ${currentImageId}: [${xPercent}, ${yPercent}]`);
    navigator.clipboard.writeText(`coords: [${xPercent}, ${yPercent}],`);
  };

  const getTooltipText = (icon) => {
    switch(icon) {
      case 'prev': return 'Vista Anterior';
      case 'next': return 'Vista Siguiente';
      case 'prev-room': return 'Sala Anterior';
      case 'next-room': return 'Sala Siguiente';
      default: return 'Navegar';
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'm' && e.ctrlKey) {
        setIsMappingMode(prev => !prev);
      }
      if (e.key === 'f' && !e.ctrlKey) {
        toggleFullscreen();
      }
      if (e.key === 'Escape') {
        if (showMinimap) {
          setShowMinimap(false);
        } else if (isFullscreen) {
          toggleFullscreen();
        }
      }
      if (e.key === 'ArrowRight' && currentIndex < museumMap.length - 1) {
        handleNavigate(museumMap[currentIndex + 1].id);
      }
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        handleNavigate(museumMap[currentIndex - 1].id);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, museumMap, isFullscreen, showMinimap]);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  if (!currentImage) return <div>Cargando...</div>;

  return (
    <>
      <TourContainer ref={containerRef} $isFullscreen={isFullscreen}>
        <TourWrapper 
          onClick={isMappingMode ? getCoords : null} 
          style={{ cursor: isMappingMode ? 'crosshair' : 'default' }}
          $isFullscreen={isFullscreen}
        >
          <TourImage 
            src={currentImage.src} 
            alt={currentImage.title}
            $entering={isEntering}
          />
          
          <LoadingOverlay $isLoading={isLoading}>
            <Spinner />
          </LoadingOverlay>
          
          <InfoPanel>
            <h3>{currentImage.title}</h3>
            <p>📍 {currentIndex + 1} de {museumMap.length}</p>
            {isMappingMode && <p>🎯 Modo Mapeo: Ctrl+M para salir</p>}
          </InfoPanel>

          {currentImage.hotspots && currentImage.hotspots.map((hotspot, index) => {
            let adjustedX = hotspot.coords[0];
            let adjustedY = hotspot.coords[1];
            
            if (window.innerWidth <= 768) {
              const isAtBottom = adjustedY > 80;
              
              if (isAtBottom) {
                if (hotspot.icon === 'prev-room') {
                  adjustedX = 20;
                } else if (hotspot.icon === 'prev') {
                  adjustedX = 40;
                } else if (hotspot.icon === 'next') {
                  adjustedX = 60;
                } else if (hotspot.icon === 'next-room') {
                  adjustedX = 80;
                }
              }
            }
            
            return (
              <HotspotButton
                key={`${hotspot.targetId}-${index}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate(hotspot.targetId);
                }}
                style={{
                  left: `${adjustedX}%`,
                  top: `${adjustedY}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                $isFullscreen={isFullscreen}
              >
                <Tooltip>{getTooltipText(hotspot.icon)}</Tooltip>
                {hotspot.icon === 'prev' ? <FaStepBackward /> : 
                 hotspot.icon === 'next' ? <FaStepForward /> : 
                 hotspot.icon === 'prev-room' ? <FaFastBackward /> : 
                 hotspot.icon === 'next-room' ? <FaFastForward /> : 
                 <FaStepForward />}
              </HotspotButton>
            );
          })}

          {isMappingMode && lastCoords && (
            <MappingInfo>
              Last Click: [{lastCoords.x}, {lastCoords.y}]<br/>
              (Copiado al portapapeles)
            </MappingInfo>
          )}
        </TourWrapper>
        
        <Controls>
          <ProgressBarContainer>
            <ProgressLabel>
              Imagen {currentIndex + 1} de {museumMap.length}
            </ProgressLabel>
            <ProgressBar>
              <ProgressFill $progress={progress} />
            </ProgressBar>
          </ProgressBarContainer>
          
          <ControlGroup>
            <ControlButton onClick={handleRestart}>
              <FaRedo />
              Reiniciar
            </ControlButton>
            
            <MinimapButton onClick={toggleMinimap} $active={showMinimap}>
              <FaMapMarkedAlt />
              Mapa
            </MinimapButton>
            
            <ControlButton onClick={toggleFullscreen}>
              {isFullscreen ? <FaCompress /> : <FaExpand />}
              {isFullscreen ? 'Salir' : 'Pantalla Completa'}
            </ControlButton>
          </ControlGroup>
        </Controls>
      </TourContainer>

      {showMinimap && (
        <MinimapOverlay onClick={() => setShowMinimap(false)}>
          <MinimapContainer onClick={(e) => e.stopPropagation()}>
            <MinimapHeader>
              <h2>Navegación Rápida</h2>
              <MinimapCloseButton onClick={() => setShowMinimap(false)}>
                <FaTimes />
              </MinimapCloseButton>
            </MinimapHeader>
            <MinimapGrid>
              {museumMap.map((item, index) => (
                <MinimapItem
                  key={item.id}
                  $isCurrent={item.id === currentImageId}
                  onClick={() => {
                    handleNavigate(item.id);
                    setShowMinimap(false);
                  }}
                >
                  <img src={item.src} alt={item.title} loading="lazy" />
                  <MinimapItemLabel>
                    {index + 1}. {item.title}
                  </MinimapItemLabel>
                </MinimapItem>
              ))}
            </MinimapGrid>
          </MinimapContainer>
        </MinimapOverlay>
      )}
    </>
  );
};

export default VirtualTourView;
