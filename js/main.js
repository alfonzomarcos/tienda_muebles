// Header que cambia de fondo al hacer scroll
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 60));
}

// Scroll reveal + firma de línea (trazo de plano)
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      e.target.querySelectorAll('.reveal-title').forEach(t => t.classList.add('drawn'));
      if (e.target.classList.contains('reveal-title')) e.target.classList.add('drawn');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-section').forEach(el => io.observe(el));
document.querySelectorAll('.reveal-title').forEach(el => io.observe(el));

// ---------- Menú mobile (hamburguesa) ----------
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');

if (menuToggle && mobileMenu) {
  function toggleMenu() {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      mobileMenu.classList.remove('open');
      mobileOverlay.classList.remove('open');
      menuToggle.classList.remove('open');
      document.body.classList.remove('menu-open');
    } else {
      mobileMenu.classList.add('open');
      mobileOverlay.classList.add('open');
      menuToggle.classList.add('open');
      document.body.classList.add('menu-open');
    }
  }
  menuToggle.addEventListener('click', toggleMenu);
  mobileOverlay.addEventListener('click', toggleMenu);
  // Cerrar al tocar un link
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
    menuToggle.classList.remove('open');
    document.body.classList.remove('menu-open');
  }));
}

// ---------- Atribucion publicitaria ----------
// Va en main.js, que lo cargan las 11 paginas, y no solo en contacto.
// El motivo: el anuncio puede caer en placards, cocinas o el home, y
// la persona recorre el sitio antes de escribir. Para cuando llega al
// formulario la URL ya perdio los parametros. Si la captura estuviera
// solo en contacto, se perderia casi todo.
//
// Se guarda en sessionStorage: dura lo que dura la visita y no deja
// cookie. Nada de esto identifica a nadie por si solo.
(function () {
  var CLAVE = 'suplacard_atribucion';

  function capturar() {
    try {
      var p = new URLSearchParams(window.location.search);
      var campos = ['fbclid', 'gclid', 'utm_source', 'utm_medium',
                    'utm_campaign', 'utm_content', 'utm_term'];
      var nuevo = {}, hay = false;

      campos.forEach(function (c) {
        var v = p.get(c);
        if (v) { nuevo[c] = v.slice(0, 300); hay = true; }
      });

      // Solo pisa lo guardado si ESTA visita trae parametros.
      // Asi gana el ultimo anuncio que trajo a la persona.
      if (hay) {
        nuevo.landing_url = window.location.href.slice(0, 2000);
        nuevo.referrer = document.referrer ? document.referrer.slice(0, 500) : null;
        sessionStorage.setItem(CLAVE, JSON.stringify(nuevo));
        return nuevo;
      }

      var guardado = sessionStorage.getItem(CLAVE);
      return guardado ? JSON.parse(guardado) : {};
    } catch (e) {
      return {};
    }
  }

  // Se ejecuta al cargar CADA pagina, asi la primera que pisa la
  // persona es la que deja el rastro guardado.
  capturar();

  // Lo usan los formularios al momento de enviar.
  window.suplacardAtribucion = function () {
    var a = capturar();
    return {
      fbclid:       a.fbclid       || null,
      gclid:        a.gclid        || null,
      utm_source:   a.utm_source   || null,
      utm_medium:   a.utm_medium   || null,
      utm_campaign: a.utm_campaign || null,
      utm_content:  a.utm_content  || null,
      utm_term:     a.utm_term     || null,
      landing_url:  a.landing_url  || null,
      referrer:     a.referrer     || null
    };
  };
})();
