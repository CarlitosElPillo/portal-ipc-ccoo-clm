import React from 'react';
import { ShieldAlert, CheckCircle2, FileText, Megaphone, Users, Award } from 'lucide-react';

export default function UnionAnalysis({ data }) {
  const { valoracionSindical, resumen } = data;

  return (
    <div className="content-section" id="union-section" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF8F8 100%)', borderColor: '#FECACA' }}>
      <div className="union-header-tag">
        <Megaphone size={16} />
        <span>Gabinete Económico • Posicionamiento CCOO Castilla-La Mancha</span>
      </div>

      <h2 className="union-headline">
        {valoracionSindical.titular}
      </h2>

      <p style={{ fontSize: '1.05rem', color: '#475569', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        {valoracionSindical.subtitulo}
      </p>

      {/* Grid of Key Points */}
      <div className="union-grid">
        {valoracionSindical.puntosClave.map((punto, idx) => (
          <div key={idx} className="union-card">
            <h3 className="union-card-title">
              <span style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#FEE2E2',
                color: '#D60000',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: 800
              }}>
                {idx + 1}
              </span>
              <span>{punto.titulo}</span>
            </h3>
            <p className="union-card-text">
              {punto.texto}
            </p>
          </div>
        ))}
      </div>

      {/* Demands List */}
      <div className="demands-list">
        <h3 className="demands-title">
          <Award size={20} />
          <span>Demandas Sindicales para la Negociación Colectiva en Castilla-La Mancha</span>
        </h3>

        <ul className="demands-items">
          {valoracionSindical.propuestas.map((propuesta, idx) => (
            <li key={idx}>
              <CheckCircle2 size={18} className="demand-check" />
              <span>{propuesta}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Users size={20} style={{ color: '#D60000' }} />
          <span style={{ fontSize: '0.85rem', color: '#334155' }}>
            <strong>Secretaría de Acción Sindical de CCOO CLM:</strong> «No permitiremos que la inflación vuelva a pagarla la clase trabajadora».
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
          Toledo, Albacete, Ciudad Real, Cuenca, Guadalajara
        </span>
      </div>
    </div>
  );
}
