// Datos oficiales del Instituto Nacional de Estadística (INE)
// Operación: Índice de Precios de Consumo (IPC) - Base 2025
// Última publicación disponible: Septiembre 2026 (publicado el 14 de octubre de 2026)
// Sede oficial: INEbase / Nivel y condiciones de vida (IPC) / Índices de precios de consumo y vivienda

export const FALLBACK_IPC_DATA = {
  metadata: {
    periodo: "Septiembre 2026",
    fechaPublicacion: "14/10/2026",
    base: "Base 2025",
    proximaPublicacion: "13/11/2026",
    fuenteOficial: "Instituto Nacional de Estadística (INE)",
    enlaceIne: "https://www.ine.es/dyngs/INEbase/es/operacion.htm?c=Estadistica_C&cid=1254736176802&menu=resultados&idp=1254735976607",
    notaPrensaUrl: "https://www.ine.es/dyngs/Prensa/IPC0926.htm",
    tablasExcelUrl: "https://www.ine.es/prensa/anexo_tablas/es/IPC0926.xlsx",
    sindicato: "CCOO Castilla-La Mancha",
    gabinete: "Gabinete de Estudios Económicos y Sindicales"
  },
  
  resumen: {
    clm: {
      tasaAnual: 5.5,
      tasaMensual: 0.5,
      tasaAcumulada: 3.9,
      indice: 105.208
    },
    nacional: {
      tasaAnual: 4.9,
      tasaMensual: 0.3,
      tasaAcumulada: 3.6,
      indice: 104.810
    },
    diferencialClm: 0.6, // CLM está 0.6 puntos por encima de la media española
    subyacenteNacional: {
      tasaAnual: 3.1,
      tasaMensual: -0.2,
      tasaAcumulada: 2.0,
      indice: 103.363,
      descripcion: "Índice general sin alimentos no elaborados ni productos energéticos"
    },
    energiaYAlimentosNoElab: {
      tasaAnual: 15.2,
      tasaMensual: 2.9,
      descripcion: "Componentes más volátiles (Alimentos frescos + Electricidad/Combustibles)"
    },
    productosEnergeticos: {
      tasaAnual: 21.7,
      tasaMensual: 4.0,
      descripcion: "Electricidad, gasolinas y gas"
    }
  },

  provinciasClm: [
    {
      nombre: "Ciudad Real",
      codigo: "IPC306415",
      tasaAnual: 5.9,
      tasaMensual: 0.7,
      tasaAcumulada: 4.4,
      diferencialNacional: 1.0,
      alerta: "Máxima tensión inflacionista en la región",
      capital: "Ciudad Real"
    },
    {
      nombre: "Toledo",
      codigo: "IPC308151",
      tasaAnual: 5.7,
      tasaMensual: 0.5,
      tasaAcumulada: 4.1,
      diferencialNacional: 0.8,
      alerta: "Fuerte impacto en vivienda y transporte periurbano",
      capital: "Toledo"
    },
    {
      nombre: "Cuenca",
      codigo: "IPC306583",
      tasaAnual: 5.6,
      tasaMensual: 0.7,
      tasaAcumulada: 4.2,
      diferencialNacional: 0.7,
      alerta: "Incremento significativo en suministros y cesta básica",
      capital: "Cuenca"
    },
    {
      nombre: "Albacete",
      codigo: "IPC305799",
      tasaAnual: 4.9,
      tasaMensual: 0.4,
      tasaAcumulada: 3.0,
      diferencialNacional: 0.0,
      alerta: "En línea con la media del Estado",
      capital: "Albacete"
    },
    {
      nombre: "Guadalajara",
      codigo: "IPC306751",
      tasaAnual: 4.9,
      tasaMensual: 0.2,
      tasaAcumulada: 3.6,
      diferencialNacional: 0.0,
      alerta: "Menor repunte mensual respecto al resto de la comunidad",
      capital: "Guadalajara"
    }
  ],

  // 12 Grupos ECOICOP en Castilla-La Mancha (clasificación oficial INE)
  gruposEcoicopClm: [
    {
      id: "04",
      nombre: "Vivienda, agua, electricidad, gas y combustibles",
      tasaAnual: 11.2,
      tasaMensual: 2.1,
      impacto: "Muy Alto",
      descripcion: "Gran impacto por el repunte de tarifas de electricidad y gas doméstico",
      color: "#ef4444"
    },
    {
      id: "07",
      nombre: "Transporte",
      tasaAnual: 5.4,
      tasaMensual: -0.3,
      impacto: "Alto",
      descripcion: "Coste de carburantes y transporte de mercancías",
      color: "#f97316"
    },
    {
      id: "11",
      nombre: "Restaurantes y hoteles",
      tasaAnual: 5.1,
      tasaMensual: -0.6,
      impacto: "Alto",
      descripcion: "Mantenimiento de precios en restauración y hostelería",
      color: "#f59e0b"
    },
    {
      id: "02",
      nombre: "Bebidas alcohólicas y tabaco",
      tasaAnual: 4.2,
      tasaMensual: 0.1,
      impacto: "Medio",
      descripcion: "Incremento por impuestos especiales e insumos",
      color: "#eab308"
    },
    {
      id: "01",
      nombre: "Alimentos y bebidas no alcohólicas",
      tasaAnual: 3.8,
      tasaMensual: 0.2,
      impacto: "Muy Crítico",
      descripcion: "Afecta de forma desproporcionada a las rentas más bajas y clase trabajadora",
      color: "#84cc16"
    },
    {
      id: "12",
      nombre: "Otros bienes y servicios",
      tasaAnual: 3.6,
      tasaMensual: 0.3,
      impacto: "Medio",
      descripcion: "Seguros, servicios financieros y cuidado personal",
      color: "#10b981"
    },
    {
      id: "09",
      nombre: "Ocio y cultura",
      tasaAnual: 2.9,
      tasaMensual: -1.2,
      impacto: "Bajo",
      descripcion: "Efecto fin de temporada estival en paquetes turísticos",
      color: "#06b6d4"
    },
    {
      id: "10",
      nombre: "Enseñanza",
      tasaAnual: 2.7,
      tasaMensual: 1.4,
      impacto: "Medio",
      descripcion: "Inicio del curso escolar y matrículas",
      color: "#3b82f6"
    },
    {
      id: "06",
      nombre: "Sanidad",
      tasaAnual: 1.9,
      tasaMensual: 0.1,
      impacto: "Bajo",
      descripcion: "Servicios médicos y medicamentos",
      color: "#6366f1"
    },
    {
      id: "05",
      nombre: "Muebles y artículos del hogar",
      tasaAnual: 1.8,
      tasaMensual: 0.2,
      impacto: "Bajo",
      descripcion: "Bienes duraderos y equipamiento para el hogar",
      color: "#8b5cf6"
    },
    {
      id: "03",
      nombre: "Vestido y calzado",
      tasaAnual: 1.1,
      tasaMensual: 3.5,
      impacto: "Estacional",
      descripcion: "Entrada de la campaña otoño-invierno",
      color: "#ec4899"
    },
    {
      id: "08",
      nombre: "Comunicaciones",
      tasaAnual: 0.2,
      tasaMensual: -0.1,
      impacto: "Mínimo",
      descripcion: "Tarifas de telefonía e internet",
      color: "#64748b"
    }
  ],

  // Serie histórica de los últimos 12 meses (Castilla-La Mancha vs España)
  historicoMensual: [
    { mes: "Oct 25", clm: 2.8, espana: 2.5, subyacente: 2.5 },
    { mes: "Nov 25", clm: 2.7, espana: 2.4, subyacente: 2.4 },
    { mes: "Dic 25", clm: 2.7, espana: 2.8, subyacente: 2.5 },
    { mes: "Ene 26", clm: 3.4, espana: 3.0, subyacente: 2.7 },
    { mes: "Feb 26", clm: 3.8, espana: 3.2, subyacente: 2.8 },
    { mes: "Mar 26", clm: 4.2, espana: 3.6, subyacente: 2.9 },
    { mes: "Abr 26", clm: 4.6, espana: 3.9, subyacente: 3.0 },
    { mes: "May 26", clm: 4.9, espana: 4.1, subyacente: 3.0 },
    { mes: "Jun 26", clm: 5.1, espana: 4.4, subyacente: 3.0 },
    { mes: "Jul 26", clm: 5.3, espana: 4.6, subyacente: 3.1 },
    { mes: "Ago 26", clm: 5.2, espana: 4.7, subyacente: 3.1 },
    { mes: "Sep 26", clm: 5.5, espana: 4.9, subyacente: 3.1 }
  ],

  // Posicionamiento Sindical de CCOO Castilla-La Mancha
  valoracionSindical: {
    titular: "CCOO CLM exige que los convenios colectivos blinden el poder adquisitivo ante una inflación regional del 5,5%, seis décimas sobre la media española",
    subtitulo: "La brecha territorial castiga con especial severidad a Ciudad Real (5,9%) y Toledo (5,7%), mientras los costes energéticos y la cesta básica ahogan a las familias trabajadoras.",
    puntosClave: [
      {
        titulo: "Brecha negativa para Castilla-La Mancha",
        texto: "Con una tasa anual del 5,5%, Castilla-La Mancha se consolida como una de las comunidades autónomas con mayores tensiones inflacionistas del país, superando en 0,6 puntos la media estatal (4,9%)."
      },
      {
        titulo: "Cláusulas de garantía salarial innegociables",
        texto: "Desde CCOO CLM exigimos el cumplimiento estricto del V AENC y la incorporación indispensable de cláusulas de revisión salarial ligadas al IPC en todas las mesas de negociación abierta."
      },
      {
        titulo: "Disparidad provincial injustificada",
        texto: "Ciudad Real (5,9%) y Toledo (5,7%) lideran la carestía de la vida en la región, lo que exige planes provinciales de estímulo y revisión de las tablas salariales de los convenios de sector."
      },
      {
        titulo: "El drama de la vivienda y la energía",
        texto: "El grupo de vivienda, electricidad y combustibles se ha disparado un 11,2% anual, convirtiéndose en el principal drenaje de las economías de los hogares con sueldos medios y bajos."
      }
    ],
    propuestas: [
      "Subidas salariales medias pactadas de al menos el 4% - 5% con cláusula de ajuste.",
      "Control y fiscalización de los márgenes empresariales desorbitados en la distribución alimentaria.",
      "Ampliación del bono social térmico y ayudas regionales directas a las familias vulnerables de CLM.",
      "Impulso del transporte público colectivo gratuito o bonificado en los corredores laborales (Toledo-Madrid, Guadalajara-Madrid, Albacete, etc.)."
    ]
  }
};
