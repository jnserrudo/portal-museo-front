import React, { useState, useMemo, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaStepBackward, FaStepForward, FaFastBackward, FaFastForward, FaExpand, FaCompress, FaRedo } from 'react-icons/fa';
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

const TourContainer = styled.div`
  width: 100%;
  background-color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.$isFullscreen ? '0' : theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.large};
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
  background-color: #1a1a1a;
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

const HotspotButton = styled.button`
  position: absolute;
  width: ${props => props.$isFullscreen ? '60px' : '40px'};
  height: ${props => props.$isFullscreen ? '60px' : '40px'};
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  border: 2px solid ${theme.colors.primary};
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  box-shadow: 0 0 15px rgba(0,0,0,0.6);
  font-size: ${props => props.$isFullscreen ? '1.5rem' : '1rem'};

  &:hover {
    transform: translate(-50%, -50%) scale(1.2);
    background-color: ${theme.colors.primary};
    color: white;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
  }

  &:active {
    transform: translate(-50%, -50%) scale(1.1);
  }


  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: rgba(0,0,0,0.9);
  width: 100%;
  justify-content: space-between;
  align-items: center;
  color: white;
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.75rem;
    gap: 0.5rem;
    font-size: 0.85rem;
  }
`;

const ControlButton = styled.button`
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const InfoPanel = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 12px 18px;
  border-radius: 8px;
  z-index: 5;
  backdrop-filter: blur(8px);
  max-width: 300px;

  h3 {
    margin: 0;
    font-size: 1.1rem;
    color: ${theme.colors.accent};
  }
  
  p {
    margin: 5px 0 0;
    font-size: 0.85rem;
    opacity: 0.9;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    top: 10px;
    left: 10px;
    padding: 8px 12px;
    max-width: 200px;

    h3 {
      font-size: 0.9rem;
    }

    p {
      font-size: 0.75rem;
    }
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

const ProgressIndicator = styled.div`
  flex: 1;
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.8;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.75rem;
    width: 100%;
    order: -1;
  }
`;

const VirtualTourView = ({ museumMap, initialImageId }) => {
  const [currentImageId, setCurrentImageId] = useState(initialImageId || museumMap[0]?.id);
  const [isMappingMode, setIsMappingMode] = useState(false);
  const [lastCoords, setLastCoords] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEntering, setIsEntering] = useState(null);
  const containerRef = useRef(null);

  const currentIndex = useMemo(() => 
    museumMap.findIndex(item => item.id === currentImageId),
    [currentImageId, museumMap]
  );

  const currentImage = useMemo(() => 
    museumMap[currentIndex] || museumMap[0], 
    [currentIndex, museumMap]
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
      
      // Trigger entering animation
      setIsEntering(direction);
      
      // Preload target image
      const targetImage = new Image();
      targetImage.src = museumMap[targetIndex].src;
      
      targetImage.onload = () => {
        // Small delay to show the entering animation
        setTimeout(() => {
          setCurrentImageId(targetId);
          // Reset entering state after image changes
          setTimeout(() => setIsEntering(null), 50);
        }, 100);
      };
      
      // Fallback in case image is already cached
      if (targetImage.complete) {
        setTimeout(() => {
          setCurrentImageId(targetId);
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

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'm' && e.ctrlKey) {
        setIsMappingMode(prev => !prev);
      }
      if (e.key === 'f' && !e.ctrlKey) {
        toggleFullscreen();
      }
      if (e.key === 'Escape' && isFullscreen) {
        toggleFullscreen();
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
  }, [currentIndex, museumMap, isFullscreen]);

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
        
        <InfoPanel>
          <h3>{currentImage.title}</h3>
          <p>{currentIndex + 1} de {museumMap.length}</p>
          {isMappingMode && <p>Modo Mapeo: Ctrl+M para salir</p>}
        </InfoPanel>

        {currentImage.hotspots && currentImage.hotspots.map((hotspot, index) => (
          <HotspotButton
            key={`${hotspot.targetId}-${index}`}
            onClick={(e) => {
              e.stopPropagation();
              handleNavigate(hotspot.targetId);
            }}
            style={{
              left: `${hotspot.coords[0]}%`,
              top: `${hotspot.coords[1]}%`,
              transform: 'translate(-50%, -50%)',
            }}
            $isFullscreen={isFullscreen}
          >
            {hotspot.icon === 'prev' ? <FaStepBackward /> : 
             hotspot.icon === 'next' ? <FaStepForward /> : 
             hotspot.icon === 'prev-room' ? <FaFastBackward /> : 
             hotspot.icon === 'next-room' ? <FaFastForward /> : 
             <FaStepForward />}
          </HotspotButton>
        ))}

        {isMappingMode && lastCoords && (
          <MappingInfo>
            Last Click: [{lastCoords.x}, {lastCoords.y}]<br/>
            (Copiado al portapapeles)
          </MappingInfo>
        )}
      </TourWrapper>
      
      <Controls>
        <ProgressIndicator>
          Imagen {currentIndex + 1} de {museumMap.length}
        </ProgressIndicator>
        
        <ControlButton onClick={handleRestart}>
          <FaRedo />
          Reiniciar
        </ControlButton>
        
        <ControlButton onClick={toggleFullscreen}>
          {isFullscreen ? <FaCompress /> : <FaExpand />}
          {isFullscreen ? 'Salir' : 'Pantalla Completa'}
        </ControlButton>
      </Controls>
    </TourContainer>
  );
};

export default VirtualTourView;
