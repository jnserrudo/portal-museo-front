import React from 'react';
import { COLORS } from '../../constants/colors';
import EventCarousel from '../../components/EventCarousel';
import * as eventService from '../../api/eventService';
import './HomeSection.css'; // Importamos nuestros estilos

const HomeSection = ({ events = [], isLoading = false }) => {
    // Filtrar solo los eventos publicados
    const publishedEvents = Array.isArray(events) 
        ? events.filter(event => event.publicado)
        : [];

    return (
    <section id="home-section">
        
        {/* HERO / SLIDER Principal */}
        <div className="hero-section" style={{ 
            backgroundImage: "url('https://placehold.co/1920x800/1E3A8A/F5F5DC?text=Imagen+de+Edificio+o+Textiles+Andinos')",
            backgroundColor: COLORS.SKY
        }}>
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <p className="hero-subtitle">BIENVENIDOS AL</p>
                <h1 className="hero-title">Museo Regional Andino</h1>
                <p className="hero-tagline">
                    San Antonio de los Cobres | "Custodios de la memoria puneña a 3.775 msnm."
                </p>
                <div className="hero-buttons">
                    <button className="hero-button" style={{ backgroundColor: COLORS.OCRE }}>
                        Planifica tu Viaje
                    </button>
                    <button className="hero-button" style={{ backgroundColor: COLORS.TIERRA }}>
                        Descubre el Patrimonio
                    </button>
                </div>
            </div>
        </div>

        {/* Carrusel de Eventos */}
        {isLoading ? (
             <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                 <p>Cargando eventos...</p>
             </div>
        ) : (
            <EventCarousel events={events} />
        )}
        
        {/* Bloque de Bienvenida */}
        <div className="container welcome-section">
            <h2 className="section-title">Bienvenidos al Corazón de Los Andes</h2>
            <div className="section-text">
                <p>
                    El Museo Regional Andino se erige en la histórica Ex Gobernación de Los Andes, un testimonio vivo de la gesta y la cultura de la Puna Salteña.
                    A 3.775 metros sobre el nivel del mar, custodiamos un patrimonio invaluable que narra la historia desde las culturas ancestrales hasta la epopeya del Ramal C14 y el Tren a las Nubes.
                </p>
            </div>
        </div>

        {/* Bloque "La Voz de la Puna" */}
        <div className="container community-section">
            <div className="community-grid">
                <div>
                    <h2 className="section-title" style={{textAlign: 'left', fontSize: '2.25rem'}}>La Voz de la Puna</h2>
                    <p style={{marginBottom: '1.5rem'}}>
                        Nuestro Gabinete de Curiosidades es un espacio dedicado a la vida comunitaria y a los saberes ancestrales. Aquí, las propias comunidades cuentan sus historias, usos y tradiciones.
                    </p>
                    <div className="quote-block">
                        <p className="quote-text">"Los textiles no son solo hilos, son la memoria de la tierra y del tiempo. Cada diseño, un rezo."</p>
                        <p className="quote-author">- Doña Juana, tejedora de San Antonio</p>
                    </div>
                </div>
                <div className="community-image">
                    <img src="https://placehold.co/800x600/2C1D17/F5F5DC?text=Gabinete+de+Curiosidades" alt="Imagen de Curiosidades Andinas" />
                </div>
            </div>
        </div>

    </section>
    );
};

export default HomeSection;