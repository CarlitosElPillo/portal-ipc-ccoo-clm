import React, { useState, useEffect } from 'react';
import SocialCardGenerator from './components/SocialCardGenerator';
import { FALLBACK_IPC_DATA } from './data/fallbackIpcData';
import { fetchIpcData } from './services/ineService';
import { RefreshCw, ExternalLink, Database, Calendar } from 'lucide-react';

export default function App() {
  const [data, setData] = useState(FALLBACK_IPC_DATA);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Carga inicial y sincronización con la API oficial del INE
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsRefreshing(true);
    try {
      const freshData = await fetchIpcData();
      setData(freshData);
    } catch (err) {
      console.warn('Error conectando con la API del INE, se mantiene caché oficial:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="site-wrapper">
      {/* Cabecera Limpia e Institucional */}
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand-wrapper">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #D60000 0%, #A50000 100%)',
                color: '#FFFFFF',
                fontWeight: 900,
                fontFamily: "'Outfit', sans-serif",
                fontSize: '24px',
                padding: '6px 14px',
                borderRadius: '8px',
                letterSpacing: '1px',
                boxShadow: '0 4px 10px rgba(214, 0, 0, 0.25)'
              }}>
                CCOO
              </div>
              <div className="brand-text">
                <div className="brand-title">
                  Castilla-La Mancha
                  <span className="brand-badge">GENERADOR DE TARJETAS IPC</span>
                </div>
                <div className="brand-subtitle">
                  Gabinete de Estudios Económicos • Datos Oficiales del INEbase ({data.metadata.base})
                </div>
              </div>
            </div>
          </div>

          <div className="header-actions">
            {/* Indicador de conexión */}
            <div className="live-indicator" title={data.isLive ? 'Conectado a la API Tempus del INE' : 'Datos oficiales verificados en base local'}>
              <span className="pulse-dot"></span>
              <span>{data.isLive ? 'INE API: EN VIVO' : 'INE OFICIAL'}</span>
            </div>

            {/* Botón de Actualizar Datos */}
            <button 
              className="btn btn-secondary" 
              onClick={loadData} 
              disabled={isRefreshing}
              title="Sincronizar con el servidor del INE"
            >
              <RefreshCw size={15} className={isRefreshing ? 'spin' : ''} />
              <span>{isRefreshing ? 'Actualizando...' : 'Actualizar Datos INE'}</span>
            </button>

            {/* Enlace oficial al INE */}
            <a 
              href={data.metadata.enlaceIne} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary"
              title="Abrir página oficial de resultados en el INE"
            >
              <ExternalLink size={15} style={{ color: '#D60000' }} />
              <span>Resultados INEbase</span>
            </a>
          </div>
        </div>
      </header>

      {/* Contenido Principal: ÚNICAMENTE EL GENERADOR DE TARJETAS */}
      <main className="container" style={{ paddingTop: '1.75rem', paddingBottom: '3.5rem' }}>
        {/* Banner Informativo Superior */}
        <div className="generator-top-info-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Calendar size={16} style={{ color: '#D60000' }} />
            <span>Últimos datos publicados: <strong>{data.metadata.periodo}</strong> ({data.metadata.fechaPublicacion})</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span>Media CLM: <strong style={{ color: '#D60000' }}>+{data.resumen.clm.tasaAnual}%</strong></span>
            <span>Media España: <strong style={{ color: '#2563EB' }}>+{data.resumen.nacional.tasaAnual}%</strong></span>
            <span>Diferencial: <strong style={{ color: '#B45309' }}>+{data.resumen.diferencialClm} pp</strong></span>
          </div>
        </div>

        {/* Generador de Tarjetas Exclusivo */}
        <SocialCardGenerator 
          data={data} 
          onRefresh={loadData}
          isRefreshing={isRefreshing}
        />
      </main>

      {/* Pie Institucional Minimalista */}
      <footer className="site-footer" style={{ marginTop: '2rem', padding: '2rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 800, color: '#FFFFFF' }}>CCOO Castilla-La Mancha</span>
            <span style={{ color: '#64748B' }}>• Cuesta de Carlos V, 1 (Toledo) • www.castillalamancha.ccoo.es</span>
          </div>
          <div style={{ color: '#64748B' }}>
            Fuente: INEbase (Operación 30138 - IPC Base 2025)
          </div>
        </div>
      </footer>
    </div>
  );
}
