import React, { useState } from 'react';
import { MapPin, AlertCircle, ArrowUpRight, BarChart3 } from 'lucide-react';
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, Tooltip, Legend);

export default function ProvincesSection({ data }) {
  const [sortBy, setSortBy] = useState('tasaAnual'); // 'tasaAnual' or 'nombre'

  const provincias = [...data.provinciasClm].sort((a, b) => {
    if (sortBy === 'tasaAnual') return b.tasaAnual - a.tasaAnual;
    return a.nombre.localeCompare(b.nombre);
  });

  const nacTasa = data.resumen.nacional.tasaAnual;
  const clmTasa = data.resumen.clm.tasaAnual;

  // Chart data for horizontal bars
  const barChartData = {
    labels: [
      ...provincias.map(p => p.nombre),
      '--- Media CLM ---',
      '--- Media España ---'
    ],
    datasets: [
      {
        label: 'Tasa Interanual (%)',
        data: [
          ...provincias.map(p => p.tasaAnual),
          clmTasa,
          nacTasa
        ],
        backgroundColor: [
          ...provincias.map(p => p.tasaAnual >= 5.5 ? '#D60000' : '#EA580C'),
          '#991B1B',
          '#2563EB'
        ],
        borderRadius: 6,
        borderWidth: 0
      }
    ]
  };

  const barChartOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#0F172A',
        callbacks: {
          label: (context) => ` Tasa anual: +${context.parsed.x}%`
        }
      }
    },
    scales: {
      x: {
        grid: { color: '#E2E8F0' },
        ticks: {
          callback: (val) => val + '%',
          font: { family: "'JetBrains Mono', monospace", size: 11 }
        }
      },
      y: {
        grid: { display: false },
        ticks: {
          font: { family: "'Inter', sans-serif", size: 12, weight: '600' }
        }
      }
    }
  };

  return (
    <div className="content-section" id="provinces-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">
            <MapPin size={22} style={{ color: '#D60000' }} />
            Radiografía Provincial en Castilla-La Mancha
          </h2>
          <p className="section-subtitle">
            Comparativa de la inflación interanual y mensual en las cinco provincias de la región ({data.metadata.periodo}).
          </p>
        </div>

        <div className="chart-controls">
          <button 
            className={`chart-control-btn ${sortBy === 'tasaAnual' ? 'active' : ''}`}
            onClick={() => setSortBy('tasaAnual')}
          >
            Mayor Inflación
          </button>
          <button 
            className={`chart-control-btn ${sortBy === 'nombre' ? 'active' : ''}`}
            onClick={() => setSortBy('nombre')}
          >
            Alfabético
          </button>
        </div>
      </div>

      {/* Horizontal Comparative Chart */}
      <div style={{ height: '240px', marginBottom: '2rem' }}>
        <Bar data={barChartData} options={barChartOptions} />
      </div>

      {/* Province Cards Grid */}
      <div className="provinces-grid">
        {provincias.map(prov => {
          const isHigh = prov.tasaAnual >= 5.5;
          return (
            <div 
              key={prov.nombre} 
              className={`province-card ${isHigh ? 'alert-province' : ''}`}
            >
              <div className="province-name">
                <span>{prov.nombre}</span>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.45rem',
                  borderRadius: '4px',
                  background: isHigh ? '#FEE2E2' : '#F1F5F9',
                  color: isHigh ? '#B91C1C' : '#475569'
                }}>
                  {prov.diferencialNacional > 0 ? `+${prov.diferencialNacional} pp vs España` : 'En media'}
                </span>
              </div>

              <div className="province-metric-main">
                +{prov.tasaAnual}%
              </div>

              <div className="province-details-row">
                <span>Variación mensual:</span>
                <strong>+{prov.tasaMensual}%</strong>
              </div>
              <div className="province-details-row">
                <span>Acumulado 2026:</span>
                <strong>+{prov.tasaAcumulada}%</strong>
              </div>

              <div style={{
                marginTop: '0.75rem',
                fontSize: '0.75rem',
                color: isHigh ? '#991B1B' : '#64748B',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <AlertCircle size={13} style={{ flexShrink: 0 }} />
                <span>{prov.alerta}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
