import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TrendingUp, BarChart2 } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ChartSection({ data }) {
  const [showSubyacente, setShowSubyacente] = useState(true);
  const historico = data.historicoMensual || [];

  const labels = historico.map(h => h.mes);
  const dataClm = historico.map(h => h.clm);
  const dataEspana = historico.map(h => h.espana);
  const dataSubyacente = historico.map(h => h.subyacente);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Castilla-La Mancha (Tasa Anual %)',
        data: dataClm,
        borderColor: '#D60000',
        backgroundColor: 'rgba(214, 0, 0, 0.08)',
        borderWidth: 3.5,
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#D60000',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8
      },
      {
        label: 'Total España (Tasa Anual %)',
        data: dataEspana,
        borderColor: '#2563EB',
        backgroundColor: 'transparent',
        borderWidth: 2.5,
        borderDash: [4, 4],
        tension: 0.35,
        pointBackgroundColor: '#2563EB',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 7
      },
      ...(showSubyacente
        ? [
            {
              label: 'Inflación Subyacente España (%)',
              data: dataSubyacente,
              borderColor: '#D97706',
              backgroundColor: 'transparent',
              borderWidth: 2,
              borderDash: [2, 2],
              tension: 0.35,
              pointBackgroundColor: '#D97706',
              pointBorderColor: '#FFFFFF',
              pointBorderWidth: 1.5,
              pointRadius: 3,
              pointHoverRadius: 6
            }
          ]
        : [])
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          font: {
            family: "'Inter', sans-serif",
            size: 12,
            weight: '600'
          },
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: '#0F172A',
        titleFont: {
          family: "'Outfit', sans-serif",
          size: 13,
          weight: 'bold'
        },
        bodyFont: {
          family: "'Inter', sans-serif",
          size: 12
        },
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function (context) {
            return ` ${context.dataset.label}: ${context.parsed.y}%`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 11
          },
          color: '#64748B'
        }
      },
      y: {
        grid: {
          color: '#E2E8F0',
          drawBorder: false
        },
        ticks: {
          font: {
            family: "'JetBrains Mono', monospace",
            size: 11
          },
          color: '#64748B',
          callback: function (value) {
            return value + '%';
          }
        }
      }
    }
  };

  return (
    <div className="content-section" id="chart-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">
            <TrendingUp size={22} style={{ color: '#D60000' }} />
            Evolución Temporal del IPC: Castilla-La Mancha vs España
          </h2>
          <p className="section-subtitle">
            Trayectoria interanual en los últimos 12 meses. Observa cómo Castilla-La Mancha mantiene un diferencial constante por encima de la media estatal.
          </p>
        </div>

        <div className="chart-controls">
          <button 
            className={`chart-control-btn ${showSubyacente ? 'active' : ''}`}
            onClick={() => setShowSubyacente(!showSubyacente)}
          >
            {showSubyacente ? 'Ocultar Subyacente' : 'Mostrar Subyacente'}
          </button>
        </div>
      </div>

      <div className="chart-container-box">
        <Line data={chartData} options={chartOptions} />
      </div>

      <div style={{
        marginTop: '1.25rem',
        padding: '0.9rem 1.25rem',
        background: '#FFF5F5',
        border: '1px solid #FECACA',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        fontSize: '0.85rem'
      }}>
        <div style={{ color: '#991B1B' }}>
          <strong>Conclusión del Gabinete Económico:</strong> Castilla-La Mancha acumula 9 meses consecutivos con tasas de inflación superiores a la media española, provocando un mayor deterioro del poder adquisitivo en la región.
        </div>
        <div style={{ color: '#7F1D1D', fontWeight: 700 }}>
          Diferencial actual: +0,6 pp
        </div>
      </div>
    </div>
  );
}
