import React from 'react';
import { Newspaper, ExternalLink, FileSpreadsheet, Calendar, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';

export default function NewsSection({ data }) {
  const { metadata } = data;

  const noticias = [
    {
      id: 1,
      fecha: metadata.fechaPublicacion,
      titular: `El IPC de ${metadata.periodo} sitúa la tasa anual de Castilla-La Mancha en el ${data.resumen.clm.tasaAnual}%`,
      fuente: 'Instituto Nacional de Estadística (INE)',
      resumen: `El INE ha publicado los resultados definitivos del Índice de Precios de Consumo (Base 2025). Castilla-La Mancha registra una variación mensual del +${data.resumen.clm.tasaMensual}% y una tasa anual del +${data.resumen.clm.tasaAnual}%, seis décimas superior a la media de España (+${data.resumen.nacional.tasaAnual}%).`,
      enlace: metadata.notaPrensaUrl,
      tipo: 'Nota de Prensa Oficial'
    },
    {
      id: 2,
      fecha: 'Septiembre 2026',
      titular: 'CCOO CLM advierte de que el encarecimiento de la energía y la cesta de la compra lastra la economía de las familias',
      fuente: 'Gabinete de Prensa CCOO Castilla-La Mancha',
      resumen: 'El sindicato subraya la necesidad inaplazable de que la patronal regional cumpla los compromisos salariales y acepte cláusulas de revisión retroactivas en todos los convenios provinciales y autonómicos.',
      enlace: '#union-section',
      tipo: 'Comunicado Sindical'
    },
    {
      id: 3,
      fecha: 'Base 2025',
      titular: 'Nueva Base 2025 del IPC: Mejor cobertura de precios online y nuevos hábitos de consumo',
      fuente: 'Metodología INEbase',
      resumen: 'El INE ha renovado la cesta de la compra para recoger con mayor precisión el comercio electrónico, los servicios de streaming y las nuevas fuentes de energía, mejorando la muestra provincial en Castilla-La Mancha.',
      enlace: 'https://www.ine.es/dyngs/INEbase/es/operacion.htm?c=Estadistica_C&cid=1254736176802&menu=metodologia&idp=1254735976607',
      tipo: 'Metodología Técnica'
    }
  ];

  return (
    <div className="content-section" id="news-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">
            <Newspaper size={22} style={{ color: '#D60000' }} />
            Últimas Noticias y Publicaciones Oficiales del IPC
          </h2>
          <p className="section-subtitle">
            Notas de prensa, análisis del gabinete sindical y calendario de actualización oficial del INE.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <a 
            href={metadata.enlaceIne} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-secondary"
            style={{ fontSize: '0.8rem' }}
          >
            <ExternalLink size={14} />
            <span>Ver en INEbase</span>
          </a>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {noticias.map(noticia => (
          <div key={noticia.id} style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'all 0.2s ease'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '4px',
                  background: noticia.tipo === 'Comunicado Sindical' ? '#FEE2E2' : '#E0F2FE',
                  color: noticia.tipo === 'Comunicado Sindical' ? '#B91C1C' : '#0369A1'
                }}>
                  {noticia.tipo}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{noticia.fecha}</span>
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem', lineHeight: 1.35 }}>
                {noticia.titular}
              </h3>

              <p style={{ fontSize: '0.825rem', color: '#475569', lineHeight: 1.5, marginBottom: '1rem' }}>
                {noticia.resumen}
              </p>
            </div>

            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{noticia.fuente}</span>
              <a 
                href={noticia.enlace}
                target={noticia.enlace.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#D60000',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <span>Leer más</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Calendario de Próximas Salidas del INE */}
      <div style={{
        marginTop: '1.5rem',
        padding: '1rem 1.25rem',
        background: '#F1F5F9',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Calendar size={20} style={{ color: '#D60000' }} />
          <div>
            <strong style={{ fontSize: '0.9rem', color: '#0F172A' }}>Próxima cita oficial en el calendario del INE:</strong>
            <div style={{ fontSize: '0.8rem', color: '#475569' }}>
              Publicación del dato adelantado: 29 de octubre de 2026 • Resultados definitivos: {metadata.proximaPublicacion}
            </div>
          </div>
        </div>
        <span style={{ fontSize: '0.75rem', color: '#64748B', fontStyle: 'italic' }}>
          Los datos se actualizan automáticamente en este portal
        </span>
      </div>
    </div>
  );
}
