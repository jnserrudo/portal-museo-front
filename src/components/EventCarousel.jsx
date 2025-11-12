import React, { useState, useEffect, useRef } from 'react';
import { COLORS } from '../constants/colors';
import './EventCarousel.css';

const EventCarousel = ({ events }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
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
        return new Date(dateString).toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    return (
        <section className="carousel-section">
            <h2 className="carousel-title">Agenda y Noticias Recientes</h2>
            <div className="carousel-container">
                
                <div ref={scrollRef} className="carousel-scroll-area">
                    {events.map((event) => (
                        <div key={event.id} className="event-card-wrapper">
                            <div className="event-card">
                                <div className="event-card-content">
                                    <p className="event-card-date">{formatDate(event.date)}</p>
                                    <h3 className="event-card-title">{event.title}</h3>
                                    <p className="event-card-description">{event.description}</p>
                                </div>
                                <div className="event-card-footer">
                                    <a href="#" className="event-card-link">Ver Detalle &rarr;</a>
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

export default EventCarousel;