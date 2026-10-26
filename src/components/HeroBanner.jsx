import React from 'react';
import { Calendar, Database, ExternalLink, FileSpreadsheet, Newspaper, AlertTriangle } from 'lucide-react';

export default function HeroBanner({ data }) {
  const { metadata, resumen } = data;

  return (
    <div className="hero-banner">
      <div className="hero-content">
        <div className="hero-main">
          <div className="hero-tag">
            <Database size={13} />
            <span>Fuente: INEbase • Resultados Oficiales ({metadata.base})</span>
          </div>

          <h1 className="hero-title">
            Observatorio del IPC en Castilla-La Mancha
          </h1>

          <p className="hero-description">
            Seguimiento mensual de los precios de consumo, evolución del coste de la vida y análisis del poder adquisitivo de la clase trabajadora en las cinco provincias de nuestra comunidad autónoma.
          </p>

          <div className="hero-meta-badges">
            <div className="meta-badge-item">
              <Calendar size={15} style={{ color: '#F87171' }} />
              <span>Último periodo publicado: <strong>{metadata.periodo}</strong></span>
            </div>
            <div className="meta-badge-item">
              <span>Publicado por el INE: <strong>{metadata.fechaPublicacion}</strong></span>
            </div>
            <div className="meta-badge-item">
              <span>Próxima publicación: <strong>{metadata.proximaPublicacion}</strong></span>
            </div>
          </div>
        </div>

        {/* Action cards in hero */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          minWidth: '260px'
        }}>
          <a 
            href={metadata.enlaceIne} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ justifyContent: 'space-between' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ExternalLink size={15} style={{ color: '#D60000' }} />
              <span>Portal INEbase Oficial</span>
            </span>
            <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>Web</span>
          </a>

          <a 
            href={metadata.notaPrensaUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ justifyContent: 'space-between' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Newspaper size={15} style={{ color: '#D60000' }} />
              <span>Nota de Prensa INE</span>
            </span>
            <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>PDF</span>
          </a>

          <a 
            href={metadata.tablasExcelUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ justifyContent: 'space-between' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileSpreadsheet size={15} style={{ color: '#10B981' }} />
              <span>Anexo Tablas Estadísticas</span>
            </span>
            <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>XLSX</span>
          </a>
        </div>
      </div>
    </div>
  );
}
