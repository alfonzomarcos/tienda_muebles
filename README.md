
# Mueblar — Página web catálogo

Sitio web de presentación y catálogo para un negocio de **placards, cocinas y vestidores a medida**, ubicada Buenos Aires.

No es una tienda online: no tiene login, carrito ni pagos. El objetivo es mostrar los productos y que la persona interesada se contacte directamente por **WhatsApp**.

"https://alfonzomarcos.github.io/tienda_muebles/"

## 🔗 Demo


## ✨ Funcionalidades

- Catálogo de productos (placards, cocinas, vestidores) con fotos grandes y descripción.
- Carrusel de proyectos entregados, con flechas, puntos de navegación y soporte táctil (swipe).
- Botón flotante de WhatsApp + botones de contacto en todas las secciones clave, que abren una conversación con un mensaje predefinido.
- Sección de dirección y horarios de atención.
- Menú adaptado a celular (hamburguesa).
- Banner de cookies con Google Consent Mode, para que la medición (GTM/GA4) solo se active si la persona acepta.
- Diseño responsive: computadora, tablet y celular.

## 🛠 Tecnologías

Sitio estático, sin frameworks ni build:

- HTML5
- CSS3 (variables CSS, grid, flexbox, scroll-snap)
- JavaScript vanilla (sin librerías externas)

## 📁 Estructura del proyecto

```
├── index.html          # Página principal
├── css/
│   ├── styles.css      # Estilos generales del sitio
│   └── cookies.css     # Estilos del aviso de cookies
├── js/
│   ├── main.js         # Menú, carrusel, botones de WhatsApp, scroll reveal
│   └── cookies.js      # Lógica del aviso de cookies y Consent Mode
└── img/                # Imágenes del sitio (no incluidas en el repo)
```

## ▶️ Cómo correrlo en local

El sitio usa rutas absolutas (`/css/...`, `/js/...`), así que **no funciona abriendo `index.html` con doble clic** (protocolo `file://`). Hay que levantar un servidor local:

```bash
# Con Python (ya viene instalado en Mac/Linux)
python3 -m http.server 8000
# Abrir http://localhost:8000

# o con Node
npx serve .
```

También funciona con la extensión **Live Server** de VS Code (clic derecho sobre `index.html` → "Open with Live Server").

## ⚙️ Configuración

Antes de publicarlo hay que completar estos datos, todos marcados con comentarios `⚠️ EDITAR` en el código:

| Qué | Dónde |
|---|---|
| Nombre de la marca | `index.html` (buscar `[NOMBRE DE LA MARCA]`) |
| Logo | `index.html` (`/isotipo.png`) |
| Número de WhatsApp | `js/main.js` → constante `WHATSAPP_NUMBER` |
| Mensaje inicial de WhatsApp | `js/main.js` → constante `WHATSAPP_MENSAJE` |
| Dirección y horarios | `index.html`, sección `#ubicacion` |
| Fotos del carrusel | `index.html`, sección `#carrusel` (carpeta `img/carrusel/`) |
| Logos de clientes | `index.html`, sección de clientes (carpeta `img/clientes/`) |
| ID de Google Tag Manager | `index.html` (buscar `GTM-XXXXXXX`) |
| Dominio / SEO (título, meta description, schema.org) | `index.html`, `<head>` |


