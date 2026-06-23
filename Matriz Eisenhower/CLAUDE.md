# Proyecto: Matriz de Eisenhower — Entrevistas de Admisión UTEDE

## Objetivo
Construir una herramienta web de una sola página (SPA estática, sin backend)
donde un candidato de admisión llena una Matriz de Eisenhower interactiva
durante su entrevista, y al finalizar descarga el resultado como imagen PNG.

## Stack técnico (obligatorio)
- HTML5 + CSS3 + JavaScript vanilla. NO usar React, Vue, ni ningún framework.
- NO usar bundlers ni paso de build (Vite, webpack, etc.). El sitio debe
  poder abrirse directamente con index.html o servirse como archivos estáticos.
- Para exportar a imagen, usar la librería html2canvas vía CDN:
  https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js
- No usar localStorage, sessionStorage, ni ningún backend. No hay persistencia
  de datos: el candidato llena, descarga la imagen y se acabó el flujo.

## Estructura de archivos
/
├── index.html
├── style.css
├── script.js
└── assets/
    └── logoUtede.png   (yo copiaré este archivo manualmente)

## Identidad visual
Logo: assets/logoUtede.png (logo "IUtedé", chevrones azul marino/azul/blanco
junto al wordmark "IUtedé").

Paleta de color (extraída del logo, usar EXACTAMENTE estos valores):
- --color-navy: #29245C       (azul marino oscuro — texto principal, header)
- --color-blue: #0F70B7       (azul medio — acentos, botones, bordes activos)
- --color-blue-light: #4A9FD8 (azul claro — hover states, detalles)
- --color-white: #FFFFFF
- --color-bg: #F4F6FA         (fondo general, gris muy claro azulado)
- --color-text: #1A1A2E       (texto sobre fondo claro)

Colores por cuadrante (deben distinguirse claramente entre sí, alto contraste,
coherentes con la paleta de marca — no usar rojo/verde semáforo genérico):
- Hacer (urgente + importante): tono más intenso de --color-blue
- Decidir (importante, no urgente): --color-navy
- Delegar (urgente, no importante): --color-blue-light
- Eliminar (ni urgente ni importante): gris neutro, ej. #D8DCE5 con texto #1A1A2E

Tipografía: usar una sans-serif moderna del sistema (system-ui, -apple-system,
"Segoe UI", Roboto, sans-serif) o importar "Inter" desde Google Fonts.
Pesos: 600-700 para títulos/etiquetas, 400 para el texto que escribe el usuario.

## Layout y componentes

### Header
- Logo UTEDE (assets/logoUtede.png) alineado a la izquierda, altura ~48px,
  proporción intacta.
- Título: "Matriz de Eisenhower" — claro y centrado o junto al logo.
- Fondo blanco o --color-bg, con un borde inferior sutil o sombra ligera
  para separarlo del contenido.

### Matriz (núcleo de la app)
- Grid CSS de 2x2, cuadrado o casi cuadrado, centrado en la pantalla,
  con espacio generoso (no debe sentirse apretado).
- Eje X (horizontal, debajo de la matriz o como etiqueta superior):
  "Importancia →" (de baja a alta, izquierda a derecha)
- Eje Y (vertical, lateral): "Urgencia ↑" (de baja a alta, abajo a arriba)
- Las flechas/etiquetas de los ejes deben ser visualmente claras pero discretas
  (no deben competir visualmente con el contenido de los cuadrantes).

Los 4 cuadrantes, cada uno con:
- Un encabezado fijo con el nombre del cuadrante (Hacer / Decidir / Delegar /
  Eliminar) en tipografía bold, parte superior del cuadrante.
- Un subtítulo pequeño y opcional aclarando el criterio, por ejemplo:
  - Hacer: "Urgente e importante"
  - Decidir: "Importante, no urgente"
  - Delegar: "Urgente, no importante"
  - Eliminar: "Ni urgente ni importante"
- Un área de texto editable (textarea sin bordes visibles, integrada al
  diseño del cuadrante) donde el candidato escribe libremente. Debe permitir
  múltiples líneas, autoajustar su tamaño con el contenido, y tener un
  placeholder tenue tipo "Escribe aquí…".
- Cada cuadrante usa su color de fondo asignado (ver paleta arriba) con
  suficiente contraste para que el texto escrito sea legible.

Ubicación de los cuadrantes en el grid (orden estándar Eisenhower):
- Superior izquierda: Hacer (alta urgencia, alta importancia)
- Superior derecha: Decidir (baja urgencia, alta importancia)
- Inferior izquierda: Delegar (alta urgencia, baja importancia)
- Inferior derecha: Eliminar (baja urgencia, baja importancia)

### Botón de descarga
- Botón fijo y visible (por ejemplo debajo de la matriz, o flotante en
  esquina inferior derecha en desktop), texto "Descargar matriz" con un
  ícono de descarga.
- Estilo: fondo --color-blue, texto blanco, bordes redondeados, sombra sutil,
  efecto hover (oscurecer ligeramente).
- Al hacer clic: usar html2canvas sobre el contenedor completo de la matriz
  (incluyendo el logo si se desea, o solo la matriz — decidir cuál se ve
  mejor) y disparar la descarga como PNG con nombre de archivo
  "matriz-eisenhower-utede.png".
- Mientras se genera la imagen, mostrar un estado breve de "Generando…" en
  el botón para feedback visual.

## Responsividad (obligatorio probar en los 3 tamaños)
- Mobile (< 600px): la matriz se reorganiza a una sola columna apilando los
  4 cuadrantes verticalmente en el orden Hacer → Decidir → Delegar →
  Eliminar, cada uno con altura mínima suficiente para escribir cómodamente.
  El logo y header se reducen de tamaño pero mantienen legibilidad.
- Tablet (600px–1024px): la matriz puede mantenerse en grid 2x2 pero con
  cuadrantes más compactos, o pasar a 1 columna según se vea mejor — usar
  buen criterio de diseño.
- Desktop (> 1024px): grid 2x2 completo, centrado, con márgenes laterales
  amplios y la matriz como protagonista visual de la pantalla.
- Usar unidades relativas (rem, %, clamp()) en vez de píxeles fijos donde
  sea posible, para que el texto y espaciado escalen bien.

## Estilo visual general
- Diseño moderno, limpio, "flat" (sin gradientes ni sombras exageradas).
- Bordes redondeados consistentes (8-12px) en cuadrantes, botón y header.
- Buen espaciado (whitespace generoso, no se debe sentir apretado).
- Alto contraste entre texto y fondo en todos los cuadrantes (validar
  legibilidad, no solo estética).
- Transiciones suaves (200-250ms) en hover de botones e inputs.
- Nada de imágenes decorativas ni iconos innecesarios — el foco visual es
  la matriz y el logo institucional.

## Lo que NO debe incluir
- Sin autenticación ni login.
- Sin backend, API, ni base de datos.
- Sin tracking de analítica.
- Sin dependencias salvo html2canvas vía CDN.
- Sin contenido de ejemplo pre-rellenado en los cuadrantes (deben iniciar
  vacíos con su placeholder).

## Criterios de aceptación
- [ ] Abre correctamente con doble clic en index.html (sin servidor).
- [ ] El logo se ve nítido y bien proporcionado en todos los tamaños.
- [ ] Los 4 cuadrantes son editables y el texto se ve legible sobre su color.
- [ ] Los ejes (Importancia / Urgencia) son claramente identificables.
- [ ] El botón de descarga genera un PNG que incluye todo el contenido
      escrito y se ve igual a como se ve en pantalla.
- [ ] Se ve bien y es usable en una pantalla de celular real (375px de ancho).
- [ ] No hay errores en la consola del navegador.
