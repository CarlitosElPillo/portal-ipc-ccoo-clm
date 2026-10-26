import React from 'react';
import { TrendingUp, ArrowUpRight, Scale, Flame, Activity, Zap } from 'lucide-react';

export default function KpiSection({ data }) {
  const { resumen, metadata } = data;
  const { clm, nacional, subyacenteNacional, energiaYAlimentosNoElab } = resumen;

  return (
    <div className="kpi-grid">
      {/* KPI 1: Castilla-La Mancha (Principal) */}
      <div className="kpi-card highlight">
        <div>
          <div className="kpi-header">
            <span className="kpi-label">Castilla-La Mancha</span>
            <div className="kpi-icon-wrap">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number">+{clm.tasaAnual}%</span>
            <span className="kpi-badge badge-alert">
              <ArrowUpRight size={13} />
              Interanual
            </span>
          </div>
          <p className="kpi-subtext">
            Tasa de variación del IPC en el último año ({metadata.periodo}). Seis décimas superior a la media de España.
          </p>
        </div>
        <div className="kpi-footer-metric">
          <span>Variación mensual: <strong>+{clm.tasaMensual}%</strong></span>
          <span>Acumulada 2026: <strong>+{clm.tasaAcumulada}%</strong></span>
        </div>
      </div>

      {/* KPI 2: Media España */}
      <div className="kpi-card">
        <div>
          <div className="kpi-header">
            <span className="kpi-label">Total Nacional (España)</span>
            <div className="kpi-icon-wrap">
              <Activity size={20} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number">+{nacional.tasaAnual}%</span>
            <span className="kpi-badge badge-info">
              Índice General
            </span>
          </div>
          <p className="kpi-subtext">
            Media estatal del índice general publicada por el INE para {metadata.periodo}.
          </p>
        </div>
        <div className="kpi-footer-metric">
          <span>Variación mensual: <strong>+{nacional.tasaMensual}%</strong></span>
          <span>Acumulada 2026: <strong>+{nacional.tasaAcumulada}%</strong></span>
        </div>
      </div>

      {/* KPI 3: Brecha Territorial CLM vs España */}
      <div className="kpi-card">
        <div>
          <div className="kpi-header">
            <span className="kpi-label">Diferencial Territorial</span>
            <div className="kpi-icon-wrap" style={{ background: '#FEF3C7', color: '#B45309' }}>
              <Scale size={20} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number" style={{ color: '#B45309' }}>
              +{resumen.diferencialClm} pp
            </span>
            <span className="kpi-badge badge-warn">
              Sobrecoste CLM
            </span>
          </div>
          <p className="kpi-subtext">
            Brecha en perjuicio de Castilla-La Mancha respecto a la media de España, que agrava la merma salarial.
          </p>
        </div>
        <div className="kpi-footer-metric">
          <span>Alerta CCOO: <strong>Pérdida de poder adquisitivo</strong></span>
        </div>
      </div>

      {/* KPI 4: Inflación Subyacente */}
      <div className="kpi-card">
        <div>
          <div className="kpi-header">
            <span className="kpi-label">Inflación Subyacente</span>
            <div className="kpi-icon-wrap">
              <Zap size={20} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number">+{subyacenteNacional.tasaAnual}%</span>
            <span className="kpi-badge badge-info">Estructural</span>
          </div>
          <p className="kpi-subtext">
            Índice general sin alimentos no elaborados ni energía. Mide la inflación subyacente de fondo en bienes y servicios.
          </p>
        </div>
        <div className="kpi-footer-metric">
          <span>Variación mensual: <strong>{subyacenteNacional.tasaMensual}%</strong></span>
          <span>Acumulada: <strong>+{subyacenteNacional.tasaAcumulada}%</strong></span>
        </div>
      </div>

      {/* KPI 5: Alimentos Frescos y Energía */}
      <div className="kpi-card" style={{ gridColumn: 'span 2' }}>
        <div>
          <div className="kpi-header">
            <span className="kpi-label">Componentes Críticos: Alimentos no elaborados + Energía</span>
            <div className="kpi-icon-wrap" style={{ background: '#FEE2E2', color: '#DC2626' }}>
              <Flame size={20} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number" style={{ color: '#DC2626' }}>
              +{energiaYAlimentosNoElab.tasaAnual}%
            </span>
            <span className="kpi-badge badge-alert">
              Impacto Extremo en Familias
            </span>
          </div>
          <p className="kpi-subtext">
            Los precios de los suministros energéticos (electricidad, gas, combustibles) y alimentos frescos se han disparado un +15,2% en el último año, asfixiando las rentas trabajadoras y salarios medios.
          </p>
        </div>
        <div className="kpi-footer-metric">
          <span>Productos Energéticos aislados: <strong>+{resumen.productosEnergeticos?.tasaAnual || 21.7}%</strong></span>
          <span>Subida mensual en un solo mes: <strong>+{energiaYAlimentosNoElab.tasaMensual}%</strong></span>
        </div>
      </div>
    </div>
  );
}
