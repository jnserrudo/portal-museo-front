import React from 'react';
import { COLORS } from '../../constants/colors';
import './ColeccionesSection.css'; // Importamos nuestros estilos

const ColeccionesSection = ({ openPieceModal }) => {
    
    const piezas = [
        {
            img: 'https://placehold.co/400x300/A0522D/F5F5DC?text=Plano+Original',
            fullImg: 'https://placehold.co/800x600/A0522D/F5F5DC?text=Plano+Original',
            title: 'Plano Original de Richard Maury',
            description: 'Un mapa detallado con las rutas y desafíos de la construcción. Material: Papel, Tinta. Año: 1920.'
        },
        {
            img: 'https://placehold.co/400x300/1E3A8A/F5F5DC?text=Reliquia+de+Vagon',
            fullImg: 'https://placehold.co/800x600/1E3A8A/F5F5DC?text=Reliquia+de+Vagon',
            title: 'Reliquia de Vagón Original',
            description: 'Fragmento metálico de un vagón utilizado en los viajes inaugurales. Material: Acero forjado. Año: 1948.'
        },
        {
            img: 'https://placehold.co/400x300/F4A460/2C1D17?text=Fotografia+Trabajadores',
            fullImg: 'https://placehold.co/800x600/F4A460/2C1D17?text=Fotografia+Trabajadores',
            title: 'Fotografía Histórica',
            description: 'Imagen de los trabajadores en la construcción del Viaducto. Un testimonio humano de la obra. Año: 1930s.'
        },
        {
            img: 'https://placehold.co/400x300/2C1D17/F5F5DC?text=Herramienta',
            fullImg: 'https://placehold.co/800x600/2C1D17/F5F5DC?text=Herramienta',
            title: 'Herramienta de Época',
            description: 'Pala de mano utilizada para la remoción de tierra y roca. Material: Madera y Hierro. Época: 1930.'
        }
    ];

    return (
        <section className="container colecciones-section">
            <div>
                <div className="breadcrumb">
                    <span>Inicio</span>
                    <span> / </span>
                    <span className="current">Sala Ramal C14</span>
                </div>
                <h1 className="main-title">Sala del Ramal C14: El Tren a las Nubes</h1>
                <h2 className="subtitle">Piezas Destacadas</h2>
                <div className="gallery-grid">
                    {piezas.map((pieza, index) => (
                        <div 
                            key={index}
                            className="gallery-item"
                            onClick={() => openPieceModal(pieza.fullImg, pieza.title, pieza.description)}
                        >
                            <img src={pieza.img} alt={`Miniatura de ${pieza.title}`} className="gallery-item-image" />
                            <div className="gallery-item-title">
                                <p>{pieza.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ColeccionesSection;