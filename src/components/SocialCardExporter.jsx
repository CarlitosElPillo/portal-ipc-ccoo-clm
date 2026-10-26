import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Download, Share2, Sparkles, Check, Image as ImageIcon } from 'lucide-react';

export default function SocialCardExporter({ data }) {
  const cardRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [customTitle, setCustomTitle] = useState(
    `La inflación en CLM (+${data.resumen.clm.tasaAnual}%) supera en 0,6 puntos la media estatal`
  );

  const handleExportPng = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // High resolution (Retina / HD)
        backgroundColor: '#111827',
        useCORS: true,
        logging: false
      });

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `CCOO_CLM_IPC_${data.metadata.periodo.replace(' ', '_')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Error exportando imagen:', err);
      alert('Error al generar la imagen. Por favor intenta de nuevo.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="social-export-container" id="social-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ImageIcon size={22} style={{ color: '#D60000' }} />
            Generador de Tarjetas Visuales para Redes Sociales y Delegados
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            Genera una infografía oficial de alta resolución lista para compartir en X/Twitter, WhatsApp, notas de prensa y tablones sindicales.
          </p>
        </div>

        <button 
          className="btn btn-primary"
          onClick={handleExportPng}
          disabled={isExporting}
          style={{ padding: '0.65rem 1.25rem' }}
        >
          {downloadSuccess ? (
            <>
              <Check size={18} />
              <span>¡Imagen Descargada!</span>
            </>
          ) : (
            <>
              <Download size={18} className={isExporting ? 'spin' : ''} />
              <span>{isExporting ? 'Generando PNG...' : 'Descargar Imagen PNG (HD)'}</span>
            </>
          )}
        </button>
      </div>

      {/* Customizable title input */}
      <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
          Personalizar titular de la tarjeta:
        </span>
        <input 
          type="text"
          value={customTitle}
          onChange={(e) => setCustomTitle(e.target.value)}
          style={{
            flex: 1,
            minWidth: '280px',
            padding: '0.45rem 0.85rem',
            border: '1px solid #CBD5E1',
            borderRadius: '8px',
            fontSize: '0.9rem'
          }}
        />
      </div>

      {/* Target Canvas for html2canvas */}
      <div className="social-card-canvas" ref={cardRef}>
        {/* Header of the visual card */}
        <div className="social-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              background: '#D60000',
              color: '#FFFFFF',
              fontWeight: 900,
              fontFamily: "'Outfit', sans-serif",
              fontSize: '22px',
              padding: '4px 12px',
              borderRadius: '6px',
              letterSpacing: '1px'
            }}>
              CCOO
            </div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1 }}>
                Castilla-La Mancha
              </div>
              <div style={{ fontSize: '0.7rem', color: '#EF4444', fontWeight: 700, letterSpacing: '1px' }}>
                OBSERVATORIO DE PRECIOS Y SALARIOS
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.85rem', color: '#F87171', fontWeight: 700 }}>
              IPC {data.metadata.periodo.toUpperCase()}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
              Fuente: INEbase (Base 2025)
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="social-card-headline">
          «{customTitle}»
        </div>

        {/* Big Numbers Row */}
        <div className="social-card-stats">
          <div className="social-stat-item" style={{ borderTop: '3px solid #D60000' }}>
            <div className="social-stat-label">Castilla-La Mancha</div>
            <div className="social-stat-number">+{data.resumen.clm.tasaAnual}%</div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Mensual: +{data.resumen.clm.tasaMensual}%</div>
          </div>

          <div className="social-stat-item" style={{ borderTop: '3px solid #3B82F6' }}>
            <div className="social-stat-label">Media Estatal (España)</div>
            <div className="social-stat-number" style={{ color: '#60A5FA' }}>+{data.resumen.nacional.tasaAnual}%</div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Mensual: +{data.resumen.nacional.tasaMensual}%</div>
          </div>

          <div className="social-stat-item" style={{ borderTop: '3px solid #F59E0B' }}>
            <div className="social-stat-label">Diferencial CLM</div>
            <div className="social-stat-number" style={{ color: '#FBBF24' }}>+{data.resumen.diferencialClm} pp</div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Mayor inflación regional</div>
          </div>
        </div>

        {/* Provincial breakdown strip */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700, marginBottom: '0.5rem' }}>
            IPC Interanual por Provincias de CLM:
          </div>
          <div className="social-card-prov-row">
            {data.provinciasClm.map(p => (
              <div key={p.nombre} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#CBD5E1' }}>{p.nombre}</div>
                <div style={{ fontWeight: 800, color: p.tasaAnual >= 5.5 ? '#F87171' : '#FFFFFF', fontSize: '1rem' }}>
                  +{p.tasaAnual}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer of the card */}
        <div className="social-card-footer">
          <div style={{ color: '#E2E8F0', fontWeight: 600 }}>
            ✊ Por la subida de salarios y cláusulas de garantía en convenio
          </div>
          <div style={{ color: '#94A3B8' }}>
            www.castillalamancha.ccoo.es
          </div>
        </div>
      </div>
    </div>
  );
}
