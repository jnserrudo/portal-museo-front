import React, { useState, useEffect, useRef } from 'react';
import { COLORS } from '../constants/colors';
import './EventCarousel.css';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import Modal from './Modal';

const EventCarousel = ({ events }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current && scrollRef.current.querySelector('.event-card-wrapper')) {
            const cardElement = scrollRef.current.querySelector('.event-card-wrapper');
            const scrollAmount = cardElement.offsetWidth * currentIndex;
            scrollRef.current.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    }, [currentIndex, events.length]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
    };

    if (!events || events.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', backgroundColor: '#f9fafb', borderRadius: '0.75rem', boxShadow: 'inset 0 2px 4px 0 rgba(0,0,0,0.05)', maxWidth: '800px', margin: '3rem auto' }}>
                <p style={{ fontSize: '1.25rem', fontFamily: 'serif', color: '#4b5563' }}>
                    <span style={{ fontWeight: 'bold', color: COLORS.OCRE }}>¡Sin eventos por ahora!</span> Vuelve pronto para conocer nuestras novedades.
                </p>
            </div>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'Fecha no definida';
        try {
            return format(parseISO(dateString), "d 'de' MMMM 'de' yyyy", { locale: es });
        } catch (error) {
            console.error('Error al formatear la fecha:', error);
            return 'Fecha inválida';
        }
    };
    
    // Función para obtener la URL base según el entorno
    const getBaseUrl = () => {
        // En desarrollo, usar localhost
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'http://localhost:3000';
        }
        // En producción, usar la URL base de las variables de entorno o la ruta relativa
        return import.meta.env.VITE_UPLOADS_BASE_URL || '';
    };

    // Función para obtener la URL de la imagen principal del evento
    const getEventImage = (event) => {
        if (event.imagenUrls && event.imagenUrls.length > 0) {
            let imageUrl = event.imagenUrls[0];
            
            // Si ya es una URL completa, devolverla tal cual
            if (imageUrl.startsWith('http')) {
                return imageUrl;
            }
            
            // Si la URL comienza con /uploads o contiene uploads
            if (imageUrl.includes('uploads')) {
                // Limpiar la ruta
                imageUrl = imageUrl.replace(/^\/api/, '').replace(/^\/+/, '/');
                // Si no comienza con /, agregarlo
                if (!imageUrl.startsWith('/')) {
                    imageUrl = `/${imageUrl}`;
                }
                // Construir la URL completa
                return `${getBaseUrl()}${imageUrl}`;
            }
            
            // Si la URL no comienza con /, agregarlo
            if (!imageUrl.startsWith('/')) {
                imageUrl = `/${imageUrl}`;
            }
            
            // Si es una ruta relativa, asumir que está en /uploads
            if (!imageUrl.startsWith('/uploads')) {
                imageUrl = `/uploads${imageUrl}`;
            }
            
            // Construir la URL completa
            return `${getBaseUrl()}${imageUrl}`;
        }
        // Si no hay imágenes, devolver una imagen por defecto
        return 'https://placehold.co/600x300/f5f5dc/2c1d17?text=Sin+imagen';
    };

    const handleViewDetails = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    return (
        <section className="carousel-section">
            <h2 className="carousel-title">Agenda y Noticias Recientes</h2>
            <div className="carousel-container">
                {/* Modal de detalles del evento */}
                {selectedEvent && (
                    <Modal 
                        isOpen={isModalOpen} 
                        onClose={closeModal}
                        title={selectedEvent.titulo}
                    >
                        <div className="event-detail-container">
                            <div className="event-detail-images">
                                {selectedEvent.imagenUrls && selectedEvent.imagenUrls.length > 0 ? (
                                    <img 
                                        src={getEventImage(selectedEvent)} 
                                        alt={selectedEvent.titulo}
                                        className="event-detail-image"
                                    />
                                ) : (
                                    <div className="no-image">
                                        <span>Sin imagen</span>
                                    </div>
                                )}
                            </div>
                            <div className="event-detail-content">
                                <div className="event-detail-meta">
                                    <div className="event-detail-date">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                        <span>{formatDate(selectedEvent.fecha)}</span>
                                    </div>
                                    {selectedEvent.lugar && (
                                        <div className="event-detail-location">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                <circle cx="12" cy="10" r="3"></circle>
                                            </svg>
                                            <span>{selectedEvent.lugar}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="event-detail-description">
                                    {selectedEvent.descripcion}
                                </div>
                            </div>
                        </div>
                    </Modal>
                )}
                
                <div ref={scrollRef} className="carousel-scroll-area">
                    {events.map((event) => (
                        <div key={event.id} className="event-card-wrapper">
                            <div className="event-card">
                                <div className="event-image-container">
                                    <img 
                                        src={getEventImage(event)} 
                                        alt={event.titulo} 
                                        className="event-image"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://placehold.co/600x300/f5f5dc/2c1d17?text=Imagen+no+disponible';
                                        }}
                                    />
                                </div>
                                <div className="event-card-content">
                                    <p className="event-card-date">
                                        {formatDate(event.fecha)}
                                        {event.lugar && (
                                            <span className="event-location">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                    <circle cx="12" cy="10" r="3"></circle>
                                                </svg>
                                                {event.lugar}
                                            </span>
                                        )}
                                    </p>
                                    <h3 className="event-card-title">{event.titulo}</h3>
                                    <p className="event-card-description">
                                        {event.descripcion?.length > 150 
                                            ? `${event.descripcion.substring(0, 150)}...` 
                                            : event.descripcion}
                                    </p>
                                </div>
                                <div className="event-card-footer">
                                    <button 
                                        className="event-card-link"
                                        onClick={() => handleViewDetails(event)}
                                    >
                                        Ver más detalles
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m9 18 6-6-6-6"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {events.length > 3 && (
                    <>
                        <button onClick={prevSlide} className="carousel-nav-button prev">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
                        </button>
                        <button onClick={nextSlide} className="carousel-nav-button next">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                        </button>
                    </>
                )}
                
                <div className="carousel-dots">
                    {events.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

// Asegúrate de que esta constante coincida con tu configuración
const API_BASE_URL = 'http://195.200.0.39:3000/api';

export default EventCarousel;