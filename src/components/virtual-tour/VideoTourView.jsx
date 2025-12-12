import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaExpand, FaCompress, FaRedo } from 'react-icons/fa';
import { theme } from '../../styles/theme';

const VideoContainer = styled.div`
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

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: ${props => props.$isFullscreen ? '100%' : '1200px'};
  margin: 0 auto;
  aspect-ratio: ${props => props.$isFullscreen ? 'auto' : '16/9'};
  height: ${props => props.$isFullscreen ? '100%' : 'auto'};
  background-color: #000;
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const InfoOverlay = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 12px 18px;
  border-radius: 8px;
  backdrop-filter: blur(8px);
  z-index: 10;

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

    h3 {
      font-size: 0.9rem;
    }

    p {
      font-size: 0.75rem;
    }
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: rgba(0,0,0,0.9);
  width: 100%;
  justify-content: center;
  align-items: center;
  color: white;
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.75rem;
    gap: 0.5rem;
  }
`;

const ControlButton = styled.button`
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  font-size: 1rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

const ProgressInfo = styled.div`
  flex: 1;
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.9;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.8rem;
    width: 100%;
    order: -1;
  }
`;

const VideoTourView = ({ videoData, initialVideoId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const currentVideo = videoData[currentIndex];

  // Auto-advance to next video when current ends
  const handleVideoEnd = () => {
    if (currentIndex < videoData.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  // Play/Pause toggle
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Navigate to previous video
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsPlaying(true);
    }
  };

  // Navigate to next video
  const handleNext = () => {
    if (currentIndex < videoData.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsPlaying(true);
    }
  };

  // Restart tour
  const handleRestart = () => {
    setCurrentIndex(0);
    setIsPlaying(true);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current?.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  // Auto-play when video changes
  useEffect(() => {
    if (videoRef.current && isPlaying) {
      videoRef.current.play().catch(err => {
        console.log('Autoplay prevented:', err);
        setIsPlaying(false);
      });
    }
  }, [currentIndex, isPlaying]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        togglePlayPause();
      }
      if (e.key === 'ArrowRight') {
        handleNext();
      }
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      }
      if (e.key === 'f' && !e.ctrlKey) {
        toggleFullscreen();
      }
      if (e.key === 'Escape' && isFullscreen) {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, currentIndex, isFullscreen]);

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

  return (
    <VideoContainer ref={containerRef} $isFullscreen={isFullscreen}>
      <VideoWrapper $isFullscreen={isFullscreen}>
        <StyledVideo
          ref={videoRef}
          src={currentVideo.src}
          onEnded={handleVideoEnd}
          onClick={togglePlayPause}
          playsInline
        />
        
        <InfoOverlay>
          <h3>{currentVideo.title}</h3>
          <p>Video {currentIndex + 1} de {videoData.length}</p>
        </InfoOverlay>
      </VideoWrapper>
      
      <Controls>
        <ControlButton onClick={handleRestart} title="Reiniciar recorrido">
          <FaRedo />
        </ControlButton>

        <ControlButton 
          onClick={handlePrevious} 
          disabled={currentIndex === 0}
          title="Video anterior"
        >
          <FaStepBackward />
        </ControlButton>
        
        <ControlButton onClick={togglePlayPause} title={isPlaying ? "Pausar" : "Reproducir"}>
          {isPlaying ? <FaPause /> : <FaPlay />}
          {isPlaying ? 'Pausar' : 'Reproducir'}
        </ControlButton>
        
        <ControlButton 
          onClick={handleNext} 
          disabled={currentIndex === videoData.length - 1}
          title="Video siguiente"
        >
          <FaStepForward />
        </ControlButton>

        <ProgressInfo>
          Video {currentIndex + 1} de {videoData.length}
        </ProgressInfo>
        
        <ControlButton onClick={toggleFullscreen} title="Pantalla completa">
          {isFullscreen ? <FaCompress /> : <FaExpand />}
          {isFullscreen ? 'Salir' : 'Pantalla Completa'}
        </ControlButton>
      </Controls>
    </VideoContainer>
  );
};

export default VideoTourView;
