import React, { useState } from 'react';
import { Calculator, ArrowRight, DollarSign, Percent, ShieldCheck } from 'lucide-react';

export default function WageCalculator({ data }) {
  const [salarioBruto, setSalarioBruto] = useState(1650);
  const [subidaPactada, setSubidaPactada] = useState(2.5);
  const [provinciaSelect, setProvinciaSelect] = useState('CLM');

  // Inflación según selección
  let inflacionRef = data.resumen.clm.tasaAnual;
  if (provinciaSelect !== 'CLM') {
    const provObj = data.provinciasClm.find(p => p.nombre === provinciaSelect);
    if (provObj) inflacionRef = provObj.tasaAnual;
  }

  // Cálculos sindicales
  const perdidaPorcentual = Number((inflacionRef - subidaPactada).toFixed(1));
  const salarioAnual = salarioBruto * 14; // 14 pagas estándar
  
  // Pérdida anual en euros
  const perdidaAnualEuros = Math.round((salarioAnual * (perdidaPorcentual / 100)));
  const subidaMensualNecesaria = Math.round((salarioBruto * (inflacionRef / 100)));

  return (
    <div className="calc-box" id="calculator-section">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
        <Calculator size={24} style={{ color: '#F87171' }} />
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF' }}>
          Calculadora Sindical de Pérdida de Poder Adquisitivo
        </h2>
      </div>
      <p style={{ color: '#94A3B8', fontSize: '0.9rem' }}>
        Comprueba cómo afecta la inflación oficial del INE a tu nómina o convenio colectivo en Castilla-La Mancha y conoce la subida necesaria para no perder poder de compra.
      </p>

      <div className="calc-grid">
        {/* Inputs */}
        <div className="calc-inputs">
          <div className="form-group">
            <label>Salario Bruto Mensual (14 pagas)</label>
            <div className="form-input-wrap">
              <input 
                type="number" 
                className="form-input"
                value={salarioBruto}
                onChange={(e) => setSalarioBruto(Math.max(0, Number(e.target.value)))}
                min="0"
                step="50"
              />
              <span className="form-input-unit">€ / mes</span>
            </div>
          </div>

          <div className="form-group">
            <label>Subida Salarial Aplicada / Ofrecida en Convenio</label>
            <div className="form-input-wrap">
              <input 
                type="number" 
                className="form-input"
                value={subidaPactada}
                onChange={(e) => setSubidaPactada(Number(e.target.value))}
                step="0.1"
              />
              <span className="form-input-unit">%</span>
            </div>
          </div>

          <div className="form-group">
            <label>Ámbito Territorial del IPC de Referencia</label>
            <select 
              className="form-input"
              value={provinciaSelect}
              onChange={(e) => setProvinciaSelect(e.target.value)}
              style={{ cursor: 'pointer' }}
            >
              <option value="CLM">Media de Castilla-La Mancha (+{data.resumen.clm.tasaAnual}%)</option>
              {data.provinciasClm.map(p => (
                <option key={p.nombre} value={p.nombre}>
                  {p.nombre} (+{p.tasaAnual}%)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Card */}
        <div className="calc-results-card">
          <div className="calc-result-metric">
            <div className="calc-result-label">Pérdida neta de poder de compra en 2026</div>
            <div className={`calc-result-value ${perdidaPorcentual <= 0 ? 'positive' : ''}`}>
              {perdidaPorcentual > 0 ? `-${perdidaPorcentual}%` : `+${Math.abs(perdidaPorcentual)}%`}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#CBD5E1', marginTop: '0.25rem' }}>
              {perdidaPorcentual > 0 ? (
                <span>Tus ingresos crecen menos que el coste de la vida (+{inflacionRef}% IPC)</span>
              ) : (
                <span style={{ color: '#34D399' }}>El convenio mantiene o mejora el poder adquisitivo</span>
              )}
            </div>
          </div>

          <div style={{
            background: 'rgba(0, 0, 0, 0.25)',
            borderRadius: '10px',
            padding: '1rem',
            margin: '0.75rem 0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <span style={{ color: '#94A3B8' }}>Pérdida anual estimada:</span>
              <strong style={{ color: perdidaAnualEuros > 0 ? '#F87171' : '#34D399', fontSize: '1.1rem' }}>
                {perdidaAnualEuros > 0 ? `-${perdidaAnualEuros.toLocaleString('es-ES')} € / año` : '0 €'}
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: '#94A3B8' }}>Incremento mensual justo (AENC):</span>
              <strong style={{ color: '#F8FAFC', fontSize: '1rem' }}>
                +{subidaMensualNecesaria.toLocaleString('es-ES')} € / mes
              </strong>
            </div>
          </div>

          <div className="calc-note">
            <ShieldCheck size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom', color: '#F87171' }} />
            Exigencia de CCOO CLM: Incluir siempre <strong>cláusula de revisión salarial retroactiva</strong> en el convenio colectivo para regularizar las tablas a final de año.
          </div>
        </div>
      </div>
    </div>
  );
}
