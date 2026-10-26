import React from 'react';
import { RefreshCw, Download, Image as ImageIcon, ExternalLink, ShieldCheck } from 'lucide-react';
import { generateIpcPdfReport } from '../services/pdfExportService';

export default function Header({ data, onRefresh, isRefreshing, onScrollToSection }) {
  const handlePdfDownload = () => {
    generateIpcPdfReport(data);
  };

  return (
    <header className="site-header">
      <div class="container header-inner">
        <div className="brand-wrapper">
          <div className="brand-logo-wrap" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #D60000 0%, #A50000 100%)',
              color: '#FFFFFF',
              fontWeight: 900,
              fontFamily: "'Outfit', sans-serif",
              fontSize: '24px',
              padding: '6px 14px',
              borderRadius: '8px',
              letterSpacing: '1px',
              boxShadow: '0 4px 10px rgba(214, 0, 0, 0.3)'
            }}>
              CCOO
            </div>
            <div className="brand-text">
              <div className="brand-title">
                Castilla-La Mancha
                <span className="brand-badge">IPC OFICIAL</span>
              </div>
              <div className="brand-subtitle">
                Gabinete de Estudios Económicos • Observatorio de Precios y Salarios
              </div>
            </div>
          </div>
        </div>

        <div className="header-actions">
          {/* Live Status Indicator */}
          <div className="live-indicator" title={data.isLive ? 'Conectado a la API Tempus del INE' : 'Datos oficiales verificados en base local'}>
            <span className="pulse-dot"></span>
            <span>{data.isLive ? 'INE API: EN VIVO' : 'INE OFICIAL'}</span>
          </div>

          {/* Refresh Button */}
          <button 
            className="btn btn-secondary" 
            onClick={onRefresh} 
            disabled={isRefreshing}
            title="Sincronizar con el servidor del Instituto Nacional de Estadística"
          >
            <RefreshCw size={15} className={isRefreshing ? 'spin' : ''} />
            <span>{isRefreshing ? 'Sincronizando...' : 'Actualizar'}</span>
          </button>

          {/* Social Card Button */}
          <button 
            className="btn btn-outline-red" 
            onClick={() => onScrollToSection('social-card')}
            title="Generar tarjeta de resumen para redes sociales y WhatsApp"
          >
            <ImageIcon size={15} />
            <span>Tarjeta RRSS</span>
          </button>

          {/* PDF Report Export */}
          <button 
            className="btn btn-primary" 
            onClick={handlePdfDownload}
            title="Descargar informe oficial completo en PDF con membrete de CCOO CLM"
          >
            <Download size={15} />
            <span>Descargar PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
}
