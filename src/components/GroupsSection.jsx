import React, { useState } from 'react';
import { ShoppingCart, Search, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function GroupsSection({ data }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterImpact, setFilterImpact] = useState('ALL');

  const groups = data.gruposEcoicopClm.filter(grp => {
    const matchesSearch = grp.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterImpact === 'ALL') return matchesSearch;
    if (filterImpact === 'HIGH') return matchesSearch && (grp.impacto === 'Muy Alto' || grp.impacto === 'Muy Crítico' || grp.impacto === 'Alto');
    return matchesSearch;
  });

  return (
    <div className="content-section" id="groups-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">
            <ShoppingCart size={22} style={{ color: '#D60000' }} />
            Desglose por Grupos ECOICOP: La Cesta de la Compra en CLM
          </h2>
          <p className="section-subtitle">
            Análisis detallado de los 12 grupos de bienes y servicios oficiales del INE en Castilla-La Mancha.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Search bar */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search size={15} style={{ position: 'absolute', left: '10px', color: '#94A3B8' }} />
            <input 
              type="text" 
              placeholder="Buscar grupo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '0.45rem 0.85rem 0.45rem 2rem',
                border: '1px solid #CBD5E1',
                borderRadius: '8px',
                fontSize: '0.85rem',
                outline: 'none',
                width: '180px'
              }}
            />
          </div>

          <div className="chart-controls">
            <button 
              className={`chart-control-btn ${filterImpact === 'ALL' ? 'active' : ''}`}
              onClick={() => setFilterImpact('ALL')}
            >
              Todos (12)
            </button>
            <button 
              className={`chart-control-btn ${filterImpact === 'HIGH' ? 'active' : ''}`}
              onClick={() => setFilterImpact('HIGH')}
            >
              Mayor Impacto
            </button>
          </div>
        </div>
      </div>

      {/* Special Warning Banner on Energy and Housing */}
      <div style={{
        background: '#FEF2F2',
        border: '1px solid #FCA5A5',
        borderRadius: '12px',
        padding: '1rem 1.25rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem'
      }}>
        <AlertTriangle size={20} style={{ color: '#DC2626', flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong style={{ color: '#991B1B', display: 'block', marginBottom: '0.2rem' }}>
            Alerta Social: Vivienda y Energía (+11,2%) y Alimentos (+3,8%)
          </strong>
          <p style={{ fontSize: '0.825rem', color: '#7F1D1D' }}>
            Los dos grupos que concentran el gasto indispensable de las familias con rentas medias y bajas son los que más sufren el repunte de costes. En Castilla-La Mancha, el coste de los suministros energéticos y el gas supera con creces los incrementos salariales medios pactados en convenio.
          </p>
        </div>
      </div>

      {/* ECOICOP Groups List */}
      <div className="groups-list">
        {groups.map(grp => {
          const isPositiveMonthly = grp.tasaMensual >= 0;
          return (
            <div key={grp.id} className="group-row">
              <div className="group-info">
                <span className="group-badge-num">{grp.id}</span>
                <div>
                  <div className="group-title-text">{grp.nombre}</div>
                  <div className="group-desc-sub">{grp.descripcion}</div>
                </div>
              </div>

              <div className="group-values">
                <div style={{ textAlign: 'right' }}>
                  <div className="group-rate" style={{ color: grp.tasaAnual >= 5 ? '#D60000' : '#1E293B' }}>
                    +{grp.tasaAnual}%
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: isPositiveMonthly ? '#DC2626' : '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '2px'
                  }}>
                    {isPositiveMonthly ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    <span>{isPositiveMonthly ? `+${grp.tasaMensual}%` : `${grp.tasaMensual}%`} mensual</span>
                  </div>
                </div>

                <div 
                  className="group-impact-tag"
                  style={{
                    backgroundColor: 
                      grp.impacto === 'Muy Crítico' || grp.impacto === 'Muy Alto' ? '#FEE2E2' :
                      grp.impacto === 'Alto' ? '#FEF3C7' :
                      grp.impacto === 'Medio' ? '#EFF6FF' : '#F1F5F9',
                    color: 
                      grp.impacto === 'Muy Crítico' || grp.impacto === 'Muy Alto' ? '#991B1B' :
                      grp.impacto === 'Alto' ? '#92400E' :
                      grp.impacto === 'Medio' ? '#1E40AF' : '#475569'
                  }}
                >
                  {grp.impacto}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
