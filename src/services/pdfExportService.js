import { jsPDF } from 'jspdf';

/**
 * Genera y descarga un informe ejecutivo oficial en formato PDF para CCOO Castilla-La Mancha
 * con todos los datos oficiales del IPC, tablas provinciales, desglose de grupos y posicionamiento sindical.
 */
export function generateIpcPdfReport(data) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const primaryRed = [204, 0, 0];      // CCOO Rojo corporativo (#CC0000)
  const darkRed = [160, 0, 0];
  const darkText = [30, 41, 59];       // Slate 800
  const lightMuted = [100, 116, 139];   // Slate 500
  const lightBg = [248, 250, 252];     // Slate 50

  // 1. Cabecera Institucional CCOO CLM
  doc.setFillColor(...primaryRed);
  doc.rect(0, 0, 210, 28, 'F');

  // Recuadro Logo CCOO
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(12, 5, 28, 18, 2, 2, 'F');
  doc.setTextColor(...primaryRed);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text('CCOO', 26, 17, { align: 'center' });

  // Título cabecera
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Castilla-La Mancha', 46, 13);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('GABINETE DE ESTUDIOS ECONÓMICOS | OBSERVATORIO DE PRECIOS Y SALARIOS', 46, 20);

  // Fecha y periodo en la esquina derecha de la cabecera
  doc.setFontSize(8);
  doc.text(`Publicación: ${data.metadata.fechaPublicacion}`, 198, 13, { align: 'right' });
  doc.text(`Periodo: ${data.metadata.periodo}`, 198, 20, { align: 'right' });

  // 2. Título del Documento
  let y = 38;
  doc.setTextColor(...darkText);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text(`INFORME DE COYUNTURA: IPC ${data.metadata.periodo.toUpperCase()}`, 12, y);

  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...lightMuted);
  doc.text('Datos oficiales del Instituto Nacional de Estadística (INE) | Base 2025', 12, y);

  // 3. Tarjetas Resumen Ejecutivo (KPIs)
  y += 7;
  const colWidth = 43;
  const cardHeight = 22;

  // Tarjeta 1: CLM Anual
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(12, y, colWidth, cardHeight, 2, 2, 'FD');
  doc.setFontSize(8);
  doc.setTextColor(...darkRed);
  doc.setFont('helvetica', 'bold');
  doc.text('IPC CASTILLA-LA MANCHA', 16, y + 6);
  doc.setFontSize(16);
  doc.text(`+${data.resumen.clm.tasaAnual}%`, 16, y + 16);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text(`Mensual: +${data.resumen.clm.tasaMensual}%`, 16, y + 20);

  // Tarjeta 2: España Anual
  const x2 = 12 + colWidth + 4;
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(x2, y, colWidth, cardHeight, 2, 2, 'FD');
  doc.setFontSize(8);
  doc.setTextColor(...darkText);
  doc.setFont('helvetica', 'bold');
  doc.text('MEDIA ESPAÑA', x2 + 4, y + 6);
  doc.setFontSize(16);
  doc.text(`+${data.resumen.nacional.tasaAnual}%`, x2 + 4, y + 16);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text(`Mensual: +${data.resumen.nacional.tasaMensual}%`, x2 + 4, y + 20);

  // Tarjeta 3: Brecha CLM vs España
  const x3 = x2 + colWidth + 4;
  doc.setFillColor(254, 243, 199);
  doc.setDrawColor(253, 230, 138);
  doc.roundedRect(x3, y, colWidth, cardHeight, 2, 2, 'FD');
  doc.setFontSize(8);
  doc.setTextColor(180, 83, 9);
  doc.setFont('helvetica', 'bold');
  doc.text('BRECHA TERRITORIAL', x3 + 4, y + 6);
  doc.setFontSize(16);
  doc.text(`+${data.resumen.diferencialClm} pp`, x3 + 4, y + 16);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('Por encima de España', x3 + 4, y + 20);

  // Tarjeta 4: Subyacente
  const x4 = x3 + colWidth + 4;
  doc.setFillColor(243, 244, 246);
  doc.setDrawColor(229, 231, 235);
  doc.roundedRect(x4, y, colWidth, cardHeight, 2, 2, 'FD');
  doc.setFontSize(8);
  doc.setTextColor(...darkText);
  doc.setFont('helvetica', 'bold');
  doc.text('INFLACIÓN SUBYACENTE', x4 + 4, y + 6);
  doc.setFontSize(16);
  doc.text(`+${data.resumen.subyacenteNacional.tasaAnual}%`, x4 + 4, y + 16);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('Sin alimentos ni energía', x4 + 4, y + 20);

  // 4. Tabla de Provincias de Castilla-La Mancha
  y += cardHeight + 8;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkText);
  doc.text('1. Detalle por Provincias de Castilla-La Mancha', 12, y);

  y += 4;
  // Encabezado de tabla
  doc.setFillColor(241, 245, 249);
  doc.rect(12, y, 186, 7, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkText);
  doc.text('PROVINCIA', 16, y + 5);
  doc.text('VAR. ANUAL', 70, y + 5, { align: 'right' });
  doc.text('VAR. MENSUAL', 105, y + 5, { align: 'right' });
  doc.text('ACUMULADA 2026', 145, y + 5, { align: 'right' });
  doc.text('DIF. ESPAÑA', 188, y + 5, { align: 'right' });

  y += 7;
  doc.setFont('helvetica', 'normal');
  data.provinciasClm.forEach((prov, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(12, y, 186, 6, 'F');
    }
    doc.setTextColor(...darkText);
    doc.text(prov.nombre, 16, y + 4.5);
    
    // Tasa anual en negrita roja si > 5%
    doc.setFont('helvetica', 'bold');
    if (prov.tasaAnual >= 5.5) {
      doc.setTextColor(...primaryRed);
    } else {
      doc.setTextColor(...darkText);
    }
    doc.text(`+${prov.tasaAnual}%`, 70, y + 4.5, { align: 'right' });
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...darkText);
    doc.text(`+${prov.tasaMensual}%`, 105, y + 4.5, { align: 'right' });
    doc.text(`+${prov.tasaAcumulada}%`, 145, y + 4.5, { align: 'right' });
    
    doc.setFont('helvetica', 'bold');
    doc.text(prov.diferencialNacional > 0 ? `+${prov.diferencialNacional} pp` : `${prov.diferencialNacional} pp`, 188, y + 4.5, { align: 'right' });
    doc.setFont('helvetica', 'normal');

    y += 6;
  });

  // 5. Grupos ECOICOP Más Influyentes
  y += 5;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkText);
  doc.text('2. Cesta de la Compra y Grupos de Consumo en CLM', 12, y);

  y += 4;
  doc.setFillColor(241, 245, 249);
  doc.rect(12, y, 186, 6, 'F');
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text('GRUPO DE CONSUMO', 16, y + 4.5);
  doc.text('TASA ANUAL', 115, y + 4.5, { align: 'right' });
  doc.text('TASA MENSUAL', 145, y + 4.5, { align: 'right' });
  doc.text('NIVEL DE IMPACTO', 188, y + 4.5, { align: 'right' });

  y += 6;
  doc.setFont('helvetica', 'normal');
  data.gruposEcoicopClm.slice(0, 6).forEach((grp, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(12, y, 186, 5.5, 'F');
    }
    doc.setTextColor(...darkText);
    doc.setFontSize(7.5);
    doc.text(grp.nombre, 16, y + 4);
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(grp.tasaAnual > 5 ? primaryRed[0] : darkText[0], grp.tasaAnual > 5 ? primaryRed[1] : darkText[1], grp.tasaAnual > 5 ? primaryRed[2] : darkText[2]);
    doc.text(`+${grp.tasaAnual}%`, 115, y + 4, { align: 'right' });
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...darkText);
    doc.text(`${grp.tasaMensual >= 0 ? '+' : ''}${grp.tasaMensual}%`, 145, y + 4, { align: 'right' });
    doc.text(grp.impacto, 188, y + 4, { align: 'right' });

    y += 5.5;
  });

  // 6. Valoración Sindical CCOO Castilla-La Mancha
  y += 6;
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(239, 68, 68);
  doc.roundedRect(12, y, 186, 46, 2, 2, 'FD');

  doc.setTextColor(...primaryRed);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('3. VALORACIÓN SINDICAL DE CCOO CASTILLA-LA MANCHA', 16, y + 6);

  doc.setTextColor(...darkText);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  const splitTitle = doc.splitTextToSize(data.valoracionSindical.titular, 178);
  doc.text(splitTitle, 16, y + 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  
  let subY = y + 21;
  const reivindicaciones = [
    '• EXIGENCIA DEL V AENC: Subidas salariales acordes a la inflación real con cláusulas de revisión salarial efectivas.',
    '• CIUDAD REAL Y TOLEDO: Planes de choque específicos ante subidas del 5,9% y 5,7% que erosionan salarios de convenio.',
    '• VIVIENDA Y ENERGÍA (+11,2%): Medidas urgentes para abaratar la factura eléctrica y contener alquileres en CLM.',
    '• CESTA BÁSICA: Control estricto de márgenes en las grandes cadenas de distribución alimentaria.'
  ];

  reivindicaciones.forEach(item => {
    doc.text(item, 16, subY);
    subY += 5;
  });

  // 7. Pie de Página
  doc.setDrawColor(226, 232, 240);
  doc.line(12, 280, 198, 280);
  doc.setFontSize(7);
  doc.setTextColor(...lightMuted);
  doc.text('CCOO Castilla-La Mancha | Cuesta de Carlos V, 1 - 45001 Toledo | www.castillalamancha.ccoo.es', 12, 285);
  doc.text(`Fuente: INEbase (${data.metadata.base}) | Generado el ${new Date().toLocaleDateString('es-ES')}`, 198, 285, { align: 'right' });

  // Descargar archivo
  const filename = `Informe_IPC_CCOO_CLM_${data.metadata.periodo.replace(' ', '_')}.pdf`;
  doc.save(filename);
}
