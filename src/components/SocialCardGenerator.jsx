import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { 
  Download, 
  FileText, 
  Copy, 
  Check, 
  Sparkles, 
  Settings2, 
  RotateCcw, 
  TrendingUp, 
  Scale, 
  Share2, 
  Flame, 
  Building2,
  Calendar,
  Layers,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

export default function SocialCardGenerator({ data, onRefresh, isRefreshing }) {
  const cardRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Opciones de personalización
  const [headline, setHeadline] = useState('');
  const [isCustomHeadline, setIsCustomHeadline] = useState(false);
  const [slogan, setSlogan] = useState('✊ Exigimos cláusulas de garantía salarial en todos los convenios colectivos');
  const [cardFormat, setCardFormat] = useState('horizontal'); // 'horizontal' (16:9) o 'square' (1:1)
  const [showEnergyStrip, setShowEnergyStrip] = useState(true);
  const [showSubyacente, setShowSubyacente] = useState(true);

  // Sincronizar el titular si llegan datos nuevos en vivo del INE
  React.useEffect(() => {
    if (!isCustomHeadline && data?.resumen) {
      const diffFormatted = Math.abs(data.resumen.diferencialClm).toFixed(1).replace('.', ',');
      const clmFormatted = data.resumen.clm.tasaAnual.toString().replace('.', ',');
      setHeadline(`La inflación en CLM (+${clmFormatted}%) supera en ${diffFormatted} puntos la media estatal`);
    }
  }, [data, isCustomHeadline]);

  const nacTasa = data.resumen.nacional.tasaAnual;
  const clmTasa = data.resumen.clm.tasaAnual;

  // Titulares predefinidos rápidos para facilitar la labor de comunicación
  const titularesSugeridos = [
    `La inflación en CLM (+${clmTasa}%) supera en 0,6 puntos la media estatal`,
    `Ciudad Real (+5,9%) y Toledo (+5,7%) lideran la carestía de la vida en la región`,
    `CCOO CLM exige que los convenios blinden el poder adquisitivo ante la subida de precios`,
    `La subida del 11,2% en vivienda y energía asfixia a las familias trabajadoras de CLM`
  ];

  // Exportar como Imagen PNG de Alta Resolución
  const handleExportPng = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2.5, // Ultra alta resolución para que todo se distinga perfectamente
        backgroundColor: '#FFFFFF',
        useCORS: true,
        logging: false
      });

      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = image;
      const cleanPeriodo = data.metadata.periodo.replace(/\s+/g, '_');
      link.download = `Tarjeta_IPC_CCOO_CLM_${cleanPeriodo}_${cardFormat}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Error generando imagen PNG:', err);
      alert('Hubo un error al generar la imagen. Inténtalo de nuevo.');
    } finally {
      setIsExporting(false);
    }
  };

  // Copiar imagen al portapapeles directamente
  const handleCopyImage = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: '#FFFFFF',
        useCORS: true,
        logging: false
      });

      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 3000);
        } catch (clipErr) {
          console.warn('Portapapeles no soportado:', clipErr);
          alert('Copiado no disponible en este navegador. Usa el botón Descargar PNG.');
        }
      });
    } catch (err) {
      console.error('Error copiando imagen:', err);
    }
  };

  // Exportar como PDF imprimible
  const handleExportPdf = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: '#FFFFFF',
        useCORS: true,
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      const isSquare = cardFormat === 'square';
      const pdf = new jsPDF({
        orientation: isSquare ? 'portrait' : 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Membrete en PDF
      pdf.setFillColor(214, 0, 0);
      pdf.rect(0, 0, pageWidth, 8, 'F');

      const margin = 15;
      const targetWidth = pageWidth - (margin * 2);
      const imgHeight = (canvas.height * targetWidth) / canvas.width;

      const yPos = (pageHeight - imgHeight) / 2;
      pdf.addImage(imgData, 'PNG', margin, Math.max(14, yPos), targetWidth, imgHeight);

      // Pie del PDF
      pdf.setFontSize(8);
      pdf.setTextColor(100, 116, 139);
      pdf.text(
        `CCOO Castilla-La Mancha • Observatorio de Precios y Salarios • Datos Oficiales INE (${data.metadata.base})`,
        margin,
        pageHeight - 6
      );

      const cleanPeriodo = data.metadata.periodo.replace(/\s+/g, '_');
      pdf.save(`Resumen_IPC_CCOO_CLM_${cleanPeriodo}.pdf`);

      setPdfSuccess(true);
      setTimeout(() => setPdfSuccess(false), 3000);
    } catch (err) {
      console.error('Error exportando PDF:', err);
      alert('Hubo un error al generar el PDF.');
    } finally {
      setIsExporting(false);
    }
  };

  // Restaurar titular original
  const handleReset = () => {
    setIsCustomHeadline(false);
    if (data?.resumen) {
      const diffFormatted = Math.abs(data.resumen.diferencialClm).toFixed(1).replace('.', ',');
      const clmFormatted = data.resumen.clm.tasaAnual.toString().replace('.', ',');
      setHeadline(`La inflación en CLM (+${clmFormatted}%) supera en ${diffFormatted} puntos la media estatal`);
    }
    setSlogan('✊ Exigimos cláusulas de garantía salarial en todos los convenios colectivos');
    setShowEnergyStrip(true);
    setShowSubyacente(true);
  };

  return (
    <div className="card-generator-layout">
      {/* Panel Superior de Control y Personalización */}
      <div className="generator-controls-card">
        <div className="generator-controls-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div className="control-icon-circle">
              <Settings2 size={20} style={{ color: '#D60000' }} />
            </div>
            <div>
              <h2 className="controls-main-title">Personalizador de la Tarjeta Gráfica</h2>
              <p className="controls-main-desc">
                Adapta el titular, formato y contenido. Toda la tarjeta se genera en <strong>formato claro de alto contraste</strong> para máxima distinción visual.
              </p>
            </div>
          </div>

          {/* Botones de acción principales */}
          <div className="action-buttons-group">
            <button 
              className="btn btn-primary"
              onClick={handleExportPng}
              disabled={isExporting}
              title="Descargar imagen PNG lista para publicar en redes sociales"
            >
              {downloadSuccess ? (
                <>
                  <Check size={16} />
                  <span>¡PNG Descargado!</span>
                </>
              ) : (
                <>
                  <Download size={16} />
                  <span>Descargar PNG (HD)</span>
                </>
              )}
            </button>

            <button 
              className="btn btn-secondary"
              onClick={handleExportPdf}
              disabled={isExporting}
              title="Exportar documento en PDF"
            >
              {pdfSuccess ? (
                <>
                  <Check size={16} style={{ color: '#059669' }} />
                  <span>¡PDF Guardado!</span>
                </>
              ) : (
                <>
                  <FileText size={16} style={{ color: '#D60000' }} />
                  <span>Exportar PDF</span>
                </>
              )}
            </button>

            <button 
              className="btn btn-secondary"
              onClick={handleCopyImage}
              title="Copiar imagen directamente al portapapeles para pegar en WhatsApp o Twitter"
            >
              {copySuccess ? (
                <>
                  <Check size={16} style={{ color: '#059669' }} />
                  <span>¡Copiada!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copiar Imagen</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Formulario de opciones */}
        <div className="controls-grid">
          {/* Campo 1: Titular */}
          <div className="control-field" style={{ gridColumn: 'span 2' }}>
            <label className="field-label">
              <span>Titular Principal de la Tarjeta</span>
              <button className="text-btn-reset" onClick={handleReset} title="Restablecer valores originales">
                <RotateCcw size={12} />
                <span>Restablecer</span>
              </button>
            </label>
            <input 
              type="text"
              className="field-input"
              value={headline}
              onChange={(e) => {
                setHeadline(e.target.value);
                setIsCustomHeadline(true);
              }}
              placeholder="Escribe el titular destacado..."
            />
            {/* Sugerencias rápidas */}
            <div className="quick-suggestions-row">
              <span className="suggestions-label">Ideas rápidas:</span>
              {titularesSugeridos.map((sug, i) => (
                <button 
                  key={i} 
                  type="button" 
                  className="suggestion-chip"
                  onClick={() => {
                    setHeadline(sug);
                    setIsCustomHeadline(true);
                  }}
                >
                  {sug.length > 40 ? sug.substring(0, 40) + '...' : sug}
                </button>
              ))}
            </div>
          </div>

          {/* Campo 2: Lema / Pie sindical */}
          <div className="control-field">
            <label className="field-label">Lema Sindical o Mensaje al Pie</label>
            <input 
              type="text"
              className="field-input"
              value={slogan}
              onChange={(e) => setSlogan(e.target.value)}
              placeholder="Lema o reivindicación de CCOO..."
            />
          </div>

          {/* Campo 3: Selector de Formato y opciones */}
          <div className="control-field">
            <label className="field-label">Formato Visual y Elementos</label>
            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
              <div className="segmented-control">
                <button 
                  type="button" 
                  className={`segment-btn ${cardFormat === 'horizontal' ? 'active' : ''}`}
                  onClick={() => setCardFormat('horizontal')}
                >
                  Horizontal (16:9)
                </button>
                <button 
                  type="button" 
                  className={`segment-btn ${cardFormat === 'square' ? 'active' : ''}`}
                  onClick={() => setCardFormat('square')}
                >
                  Cuadrado (1:1)
                </button>
              </div>

              <label className="checkbox-toggle-label">
                <input 
                  type="checkbox" 
                  checked={showEnergyStrip} 
                  onChange={(e) => setShowEnergyStrip(e.target.checked)} 
                />
                <span>Cesta básica</span>
              </label>

              <label className="checkbox-toggle-label">
                <input 
                  type="checkbox" 
                  checked={showSubyacente} 
                  onChange={(e) => setShowSubyacente(e.target.checked)} 
                />
                <span>Subyacente</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* ÁREA DE PREVISUALIZACIÓN Y LIENZO DE LA TARJETA (FORMATO CLARO Y NÍTIDO) */}
      <div className="card-preview-area">
        <div className="preview-label-tag">
          <span>Vista Previa en Vivo (Formato Claro de Alta Nitidez)</span>
          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
            {cardFormat === 'horizontal' ? 'Optimizado para WhatsApp, X y Notas de Prensa (16:9)' : 'Formato Cuadrado para Redes (1:1)'}
          </span>
        </div>

        {/* =========================================================================
            LIENZO EXPORTABLE: 100% FONDO CLARO (#FFFFFF), MÁXIMA DISTINCIÓN
            ========================================================================= */}
        <div 
          ref={cardRef}
          className={`light-social-card ${cardFormat === 'square' ? 'format-square' : 'format-horizontal'}`}
        >
          {/* Barra superior de acento rojo CCOO */}
          <div className="card-top-red-bar"></div>

          {/* 1. Cabecera Oficial */}
          <div className="light-card-header">
            <div className="header-brand-box">
              {/* Bloque Rojo CCOO */}
              <div className="ccoo-logo-solid">
                CCOO
              </div>
              <div className="brand-text-column">
                <div className="brand-region-name">
                  Castilla-La Mancha
                </div>
                <div className="brand-department-name">
                  GABINETE DE ESTUDIOS ECONÓMICOS • OBSERVATORIO DE PRECIOS Y SALARIOS
                </div>
              </div>
            </div>

            <div className="header-meta-box">
              <div className="meta-period-pill">
                <Calendar size={13} style={{ color: '#D60000' }} />
                <span>IPC {data.metadata.periodo.toUpperCase()}</span>
              </div>
              <div className="meta-ine-source">
                Fuente: Instituto Nacional de Estadística (INEbase • Base 2025)
              </div>
            </div>
          </div>

          {/* 2. Titular Principal */}
          <div className="light-card-headline-box">
            <h1 className="light-card-headline-text">
              «{headline}»
            </h1>
          </div>

          {/* 3. Bloque de Datos Generales (Castilla-La Mancha vs España y Diferencial) */}
          <div className="light-kpis-row">
            {/* KPI 1: Castilla-La Mancha (Destacado) */}
            <div className="light-kpi-box primary-clm">
              <div className="light-kpi-header">
                <span className="light-kpi-tag-red">Comunidad Autónoma</span>
                <span className="light-kpi-badge-rate">Interanual</span>
              </div>
              <div className="light-kpi-title">Castilla-La Mancha</div>
              <div className="light-kpi-big-value red-value">
                +{clmTasa.toString().replace('.', ',')}%
              </div>
              <div className="light-kpi-submetrics">
                <span>Mensual: <strong>+{data.resumen.clm.tasaMensual.toString().replace('.', ',')}%</strong></span>
                <span>Acumulado: <strong>+{data.resumen.clm.tasaAcumulada.toString().replace('.', ',')}%</strong></span>
              </div>
            </div>

            {/* KPI 2: Total España */}
            <div className="light-kpi-box state-espana">
              <div className="light-kpi-header">
                <span className="light-kpi-tag-blue">Referencia Estatal</span>
                <span className="light-kpi-badge-rate-blue">Media España</span>
              </div>
              <div className="light-kpi-title">Total Nacional</div>
              <div className="light-kpi-big-value blue-value">
                +{nacTasa.toString().replace('.', ',')}%
              </div>
              <div className="light-kpi-submetrics">
                <span>Mensual: <strong>+{data.resumen.nacional.tasaMensual.toString().replace('.', ',')}%</strong></span>
                <span>Acumulado: <strong>+{data.resumen.nacional.tasaAcumulada.toString().replace('.', ',')}%</strong></span>
              </div>
            </div>

            {/* KPI 3: Diferencial Castilla-La Mancha vs España */}
            <div className="light-kpi-box diff-box">
              <div className="light-kpi-header">
                <span className="light-kpi-tag-amber">Brecha Territorial</span>
                <Scale size={14} style={{ color: '#B45309' }} />
              </div>
              <div className="light-kpi-title">Diferencial Regional</div>
              <div className="light-kpi-big-value amber-value">
                +{Math.abs(data.resumen.diferencialClm).toFixed(1).replace('.', ',')} pp
              </div>
              <div className="light-kpi-submetrics" style={{ color: '#92400E', fontWeight: 600 }}>
                Castilla-La Mancha soporta mayor inflación que España
              </div>
            </div>

            {/* KPI 4: Inflación Subyacente (Opcional según toggle) */}
            {showSubyacente && (
              <div className="light-kpi-box subyacente-box">
                <div className="light-kpi-header">
                  <span className="light-kpi-tag-gray">Inflación Estructural</span>
                </div>
                <div className="light-kpi-title">Subyacente Nacional</div>
                <div className="light-kpi-big-value gray-value">
                  +{data.resumen.subyacenteNacional.tasaAnual.toString().replace('.', ',')}%
                </div>
                <div className="light-kpi-submetrics">
                  Sin alimentos frescos ni productos energéticos
                </div>
              </div>
            )}
          </div>

          {/* 4. SECCIÓN CRUCIAL SOLICITADA POR EL USUARIO:
                 DESGLOSE DE CADA UNA DE LAS 5 PROVINCIAS CON SU DIFERENCIA RESPECTO A LA ESTATAL */}
          <div className="provincial-differential-section">
            <div className="provincial-section-title-row">
              <span className="provincial-section-title">
                <Building2 size={16} style={{ color: '#D60000' }} />
                DESGLOSE POR PROVINCIAS DE CASTILLA-LA MANCHA Y DIFERENCIA CON LA MEDIA ESTATAL (+{nacTasa.toString().replace('.', ',')}%)
              </span>
              <span className="provincial-count-badge">5 Provincias</span>
            </div>

            <div className="provincial-cards-row">
              {data.provinciasClm.map(prov => {
                // Cálculo de la diferencia exacta de cada provincia con la tasa estatal
                const diffVal = Number((prov.tasaAnual - nacTasa).toFixed(1));
                const isHigher = diffVal > 0;
                const isLower = diffVal < 0;
                const isEqual = diffVal === 0;

                const diffFormatted = isHigher
                  ? `+${diffVal.toString().replace('.', ',')} pp`
                  : isLower
                  ? `${diffVal.toString().replace('.', ',')} pp`
                  : `= 0,0 pp`;

                return (
                  <div 
                    key={prov.nombre} 
                    className={`prov-item-card ${isHigher ? 'prov-higher' : 'prov-equal'}`}
                  >
                    {/* Nombre de la provincia */}
                    <div className="prov-item-name">
                      {prov.nombre}
                    </div>

                    {/* Tasa interanual provincial */}
                    <div className="prov-item-rate">
                      +{prov.tasaAnual.toString().replace('.', ',')}%
                    </div>

                    {/* Variación mensual */}
                    <div className="prov-item-monthly">
                      Mensual: +{prov.tasaMensual.toString().replace('.', ',')}%
                    </div>

                    {/* BADGE CLARA DE DIFERENCIA CON LA ESTATAL */}
                    <div className={`prov-diff-badge ${isHigher ? 'diff-badge-higher' : 'diff-badge-neutral'}`}>
                      <div className="diff-badge-icon">
                        {isHigher && <ArrowUp size={12} />}
                        {isLower && <ArrowDown size={12} />}
                        {isEqual && <Minus size={12} />}
                      </div>
                      <div className="diff-badge-text">
                        <strong>{diffFormatted}</strong> vs Estatal
                      </div>
                    </div>

                    {/* Indicación textual comprensible */}
                    <div className="prov-status-note">
                      {isHigher ? (
                        <span style={{ color: '#991B1B' }}>Sobre la media estatal</span>
                      ) : (
                        <span style={{ color: '#475569' }}>Igual a la media estatal</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. Tira de Alerta de Precios Básicos (Opcional) */}
          {showEnergyStrip && (
            <div className="light-energy-strip">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#991B1B', fontWeight: 700 }}>
                <Flame size={15} style={{ color: '#DC2626' }} />
                <span>IMPACTO EN LA CESTA BÁSICA:</span>
              </div>
              <div className="energy-strip-items">
                <span className="strip-item">
                  Vivienda y Suministros (Electricidad/Gas): <strong>+11,2%</strong>
                </span>
                <span className="strip-divider">•</span>
                <span className="strip-item">
                  Alimentos no elaborados + Energía: <strong>+15,2%</strong>
                </span>
                <span className="strip-divider">•</span>
                <span className="strip-item">
                  Alimentos y Bebidas: <strong>+3,8%</strong>
                </span>
              </div>
            </div>
          )}

          {/* 6. Pie Oficial de la Tarjeta */}
          <div className="light-card-footer">
            <div className="footer-slogan-text">
              {slogan}
            </div>
            <div className="footer-web-tag">
              www.castillalamancha.ccoo.es
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
