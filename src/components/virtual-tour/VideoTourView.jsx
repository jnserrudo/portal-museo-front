import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Asegura que el video llene el contenedor sin bordes negros */
  opacity: ${props => props.$isVisible ? 1 : 0};
  transition: opacity 0.5s ease;
  position: absolute;
  top: 0;
  left: 0;
`;

// Esta capa ayuda a que las transiciones o recargas no muestren el fondo brusco, oscureciendo levemente
const Overlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(to top, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 20%);
  z-index: 10;
`;

const VideoTourView = ({ videoData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Usamos dos referencias de video para hacer crossfade/seamless switch
  const activeVideoRef = useRef(null);
  const nextVideoRef = useRef(null);
  const [activePlayer, setActivePlayer] = useState(1); // 1 o 2

  const currentVideo = videoData[currentIndex];
  // Predecir el siguiente video, si es el último vuelve al primero (loop)
  const nextIndex = (currentIndex + 1) % videoData.length;
  const nextVideo = videoData[nextIndex];

  useEffect(() => {
    // Al cargar el componente o cambiar el índice, preparar reproducción a velocidad 1.2x
    const playVideo = async () => {
      try {
        if (activePlayer === 1 && activeVideoRef.current) {
          activeVideoRef.current.muted = true;
          activeVideoRef.current.playbackRate = 1.2;
          await activeVideoRef.current.play();
        } else if (activePlayer === 2 && nextVideoRef.current) {
          nextVideoRef.current.muted = true;
          nextVideoRef.current.playbackRate = 1.2;
          await nextVideoRef.current.play();
        }
      } catch (err) {
        console.warn("Autoplay prevenido por el navegador, requiere interacción previa.", err);
      }
    };
    
    playVideo();
  }, [currentIndex, activePlayer]);

  const handleVideoEnd = () => {
    // Cuando el video actual termina, cambiar al otro reproductor
    const newIndex = (currentIndex + 1) % videoData.length;
    setCurrentIndex(newIndex);
    setActivePlayer(activePlayer === 1 ? 2 : 1);
  };

  return (
    <VideoContainer>
      <VideoWrapper>
        <StyledVideo
          ref={activeVideoRef}
          src={activePlayer === 1 ? currentVideo.src : nextVideo.src}
          $isVisible={activePlayer === 1}
          onEnded={activePlayer === 1 ? handleVideoEnd : undefined}
          muted
          playsInline
          autoPlay={activePlayer === 1}
          preload="auto"
        />
        
        <StyledVideo
          ref={nextVideoRef}
          src={activePlayer === 2 ? currentVideo.src : nextVideo.src}
          $isVisible={activePlayer === 2}
          onEnded={activePlayer === 2 ? handleVideoEnd : undefined}
          muted
          playsInline
          autoPlay={activePlayer === 2}
          preload="auto"
        />

        <Overlay />
      </VideoWrapper>
    </VideoContainer>
  );
};

export default VideoTourView;
