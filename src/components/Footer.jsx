import React from 'react';
import { ExternalLink, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer({ data }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Institutional */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
              <div style={{
                background: '#D60000',
                color: '#FFFFFF',
                fontWeight: 900,
                fontFamily: "'Outfit', sans-serif",
                fontSize: '18px',
                padding: '3px 10px',
                borderRadius: '6px'
              }}>
                CCOO
              </div>
              <span className="footer-brand-title" style={{ margin: 0 }}>
                Castilla-La Mancha
              </span>
            </div>
            
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#94A3B8', marginBottom: '1rem', maxWidth: '420px' }}>
              Portal de Seguimiento del Índice de Precios de Consumo (IPC). Elaborado por el Gabinete de Estudios Económicos y la Secretaría de Acción Sindical de CCOO CLM para el seguimiento de la negociación colectiva y la defensa del poder adquisitivo.
            </p>

            <div style={{ fontSize: '0.8rem', color: '#CBD5E1', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={14} style={{ color: '#D60000' }} />
                <span>Sede Regional: Cuesta de Carlos V, 1 — 45001 Toledo</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={14} style={{ color: '#D60000' }} />
                <span>Teléfono: (+34) 925 28 34 00</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={14} style={{ color: '#D60000' }} />
                <span>comunicacion@clm.ccoo.es</span>
              </div>
            </div>
          </div>

          {/* Column 2: Sedes Provinciales */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, marginBottom: '0.85rem' }}>
              Sedes Provinciales en CLM
            </h4>
            <ul className="footer-links-list">
              <li><a href="https://albacete.ccoo.es" target="_blank" rel="noopener noreferrer">CCOO Albacete (C/ Marqués de Villores, 10)</a></li>
              <li><a href="https://ciudadreal.ccoo.es" target="_blank" rel="noopener noreferrer">CCOO Ciudad Real (C/ Alarcos, 24)</a></li>
              <li><a href="https://cuenca.ccoo.es" target="_blank" rel="noopener noreferrer">CCOO Cuenca (C/ Cardenal Gil de Albornoz, 1)</a></li>
              <li><a href="https://guadalajara.ccoo.es" target="_blank" rel="noopener noreferrer">CCOO Guadalajara (Paseo Fernández Iparraguirre, 18)</a></li>
              <li><a href="https://toledo.ccoo.es" target="_blank" rel="noopener noreferrer">CCOO Toledo (C/ Cuesta de Carlos V, 1)</a></li>
            </ul>
          </div>

          {/* Column 3: Fuentes & Legal */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, marginBottom: '0.85rem' }}>
              Fuentes Oficiales
            </h4>
            <ul className="footer-links-list">
              <li>
                <a href={data.metadata.enlaceIne} target="_blank" rel="noopener noreferrer">
                  INEbase • IPC Resultados Oficiales
                </a>
              </li>
              <li>
                <a href="https://servicios.ine.es" target="_blank" rel="noopener noreferrer">
                  API REST Tempus3 (INE)
                </a>
              </li>
              <li>
                <a href="https://www.castillalamancha.ccoo.es" target="_blank" rel="noopener noreferrer">
                  Portal Web CCOO CLM
                </a>
              </li>
              <li>
                <a href="https://ces.castillalamancha.es" target="_blank" rel="noopener noreferrer">
                  Consejo Económico y Social (CES CLM)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} CCOO Castilla-La Mancha. Todos los derechos reservados.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', color: '#64748B' }}>
            <span>Operación estadística INE: 30138</span>
            <span>Clasificación ECOICOP</span>
            <span>Base 2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
