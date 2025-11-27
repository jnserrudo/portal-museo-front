import React from 'react';
import { COLORS } from '../../constants/colors';
import './VisitaSection.css'; // Importamos nuestros estilos

const VisitaSection = () => (
    <section className="container visita-section">
        <div>
            <h1 className="main-title">Planifica Tu Visita</h1>
            
            <div className="info-card" style={{ borderColor: COLORS.TIERRA }}>
                <h2 className="card-title" style={{ color: COLORS.SKY }}>Horarios y Tarifas</h2>
                <table className="info-table">
                    <thead style={{ backgroundColor: COLORS.OCRE }}>
                        <tr>
                            <th>Tipo</th>
                            <th>Días</th>
                            <th>Horario</th>
                            <th>Costo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ fontWeight: '600', color: COLORS.TIERRA }}>Entrada General</td>
                            <td>Martes a Domingo</td>
                            <td>10:00 hs - 17:00 hs</td>
                            <td style={{ fontWeight: 'bold', fontSize: '1.25rem', color: COLORS.OCRE }}>$500</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: '600', color: COLORS.TIERRA }}>Lunes</td>
                            <td colSpan="3" style={{ fontWeight: 'bold', color: '#dc3545' }}>Cerrado (Mantenimiento)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="location-grid">
                <div className="info-card" style={{ borderColor: COLORS.SKY }}>
                    <h2 className="card-title" style={{ color: COLORS.SKY }}>Ubicación</h2>
                    <p>Ex Gobernación de Los Andes. Av. 9 de Julio s/n, San Antonio de los Cobres, Salta.</p>
                    <div className="location-map">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15252.88390623348!2d-66.368021!3d-24.234671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x940c618c7e997a61%3A0x88c983a5e1f0e21a!2sSan%20Antonio%20de%20los%20Cobres%2C%20Salta!5e0!3m2!1ses!2sar!4v1698246000000" 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
                <div className="info-card" style={{ borderColor: COLORS.OCRE }}>
                    <h2 className="card-title" style={{ color: COLORS.OCRE }}>Cómo Llegar desde Salta</h2>
                    <ul className="directions-list">
                        <li>
                             <svg style={{ marginTop: '4px', flexShrink: 0, color: COLORS.TIERRA }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 17h2c.6 0 1 .4 1 1v2h-4v-2c0-.6.4-1 1-1Z"/><path d="M12 17h2v2h-4v-2h2Z"/><path d="M5 17h2v2h-4v-2c0-.6.4-1 1-1Z"/><path d="M17 18v.01"/><path d="M7 18v.01"/><path d="M13 6H4l1.5 6h10L13 6Z"/></svg>
                            <div>
                                Por Ruta 51 (Vehículo Particular): Distancia 160 km. Tiempo estimado: 3 a 4 horas.
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
);

export default VisitaSection;