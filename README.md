# Generador de Tarjetas del IPC — CCOO Castilla-La Mancha

Portal web interactivo desarrollado para **CCOO Castilla-La Mancha** que consulta en tiempo real los datos oficiales del **Índice de Precios de Consumo (IPC)** publicados por el **Instituto Nacional de Estadística (INE)** y genera infografías y tarjetas visuales oficiales en **formato claro de alto contraste** para su difusión en redes sociales (WhatsApp, X / Twitter, Instagram) y medios de comunicación.

---

## 🚀 Características Principales

- **Conexión en Vivo con la API Oficial del INE**: Consulta directa a las tablas oficiales de INEbase (`76140` para datos autonómicos y estatales, y `76143` para datos provinciales), con sistema de respaldo automático en caso de caída del servidor externo.
- **Formato Claro de Alta Nitidez**: Diseño 100% en fondo claro (`#FFFFFF`), eliminando fondos oscuros para que todos los textos, gráficos y datos se distingan con total claridad tanto en pantalla como al imprimir o compartir por mensajería.
- **Diferencial Provincial con la Media Estatal**: Desglose individualizado para las 5 provincias de Castilla-La Mancha (**Albacete, Ciudad Real, Cuenca, Guadalajara y Toledo**), calculando y mostrando visualmente la diferencia exacta en puntos porcentuales con respecto a la media de España.
- **Personalización en Tiempo Real**:
  - Titular destacado editable con sugerencias rápidas en un clic.
  - Lema sindical y pie personalizable.
  - Formato adaptable: **Horizontal (16:9)** para notas de prensa y X/WhatsApp, o **Cuadrado (1:1)** para Instagram.
  - Conmutadores para mostrar/ocultar la inflación subyacente y el impacto en la cesta básica (alimentos frescos y energía).
- **Exportación Directa**:
  - 📥 **Descargar Imagen PNG (HD)**: Renderizado en ultra alta resolución (escala 2.5x).
  - 📄 **Exportar en PDF**: Documento A4 maquetado listo para archivar o imprimir.
  - 📋 **Copiar al Portapapeles**: Copia directa de la imagen para pegar directamente en chats o documentos.

---

## 🛠️ Tecnologías Utilizadas

- **React 18**
- **Vite**
- **Vanilla CSS** (Diseño moderno, accesible y adaptativo)
- **Lucide React** (Iconografía)
- **html2canvas** (Generación de infografías en PNG)
- **jsPDF** (Generación de informes en PDF)
- **API REST Tempus3 del INE** (Datos oficiales en tiempo real)

---

## 💻 Instalación y Uso Local

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/CarlitosElPillo/portal-ipc-ccoo-clm.git
   cd portal-ipc-ccoo-clm
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000/](http://localhost:3000/) en tu navegador.

4. **Compilar para producción**:
   ```bash
   npm run build
   ```

---

## 🏛️ Fuente de los Datos

- **Organismo**: Instituto Nacional de Estadística (INE).
- **Operación**: Índice de Precios de Consumo (IPC) — Base 2025 (Código operación: 30138).
- **Enlace oficial**: [INEbase / Nivel y condiciones de vida (IPC) / Resultados](https://www.ine.es/dyngs/INEbase/es/operacion.htm?c=Estadistica_C&cid=1254736176802&menu=resultados&idp=1254735976607).

---

Desarrollado para **CCOO Castilla-La Mancha** • Gabinete de Estudios Económicos y Secretaría de Comunicación y Acción Sindical.
