/* Aviso de cookies.

   No es un cartel decorativo: mientras no haya respuesta, las etiquetas
   de medición quedan bloqueadas por el modo de consentimiento de Google,
   que se inicializa en "denied" en el <head> de cada página, antes de
   que cargue GTM.

   La decisión se guarda un año. Se puede cambiar desde el enlace
   "Cookies" del pie, que vuelve a abrir el aviso. */
(function () {
  var CLAVE = 'suplacard_cookies';
  var DIAS = 365;

  function leer() {
    try { return localStorage.getItem(CLAVE); } catch (e) { return null; }
  }
  function guardar(v) {
    try {
      localStorage.setItem(CLAVE, v);
      localStorage.setItem(CLAVE + '_fecha', new Date().toISOString());
    } catch (e) {}
  }

  function aplicar(acepta) {
    var estado = acepta ? 'granted' : 'denied';
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        ad_storage: estado,
        ad_user_data: estado,
        ad_personalization: estado,
        analytics_storage: estado
      });
    }
    /* El evento queda disponible en el dataLayer para que las etiquetas
       que no usan el modo de consentimiento —el pixel de Meta, por
       ejemplo— puedan condicionarse desde GTM. */
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: acepta ? 'cookies_aceptadas' : 'cookies_rechazadas' });
  }

  function iniciar() {
    var ck = document.getElementById('ckBanner');
    if (!ck) return;
    var previa = leer();

    if (previa === 'si') aplicar(true);
    else if (previa === 'no') aplicar(false);
    else ck.classList.add('open');

    document.getElementById('ckSi').addEventListener('click', function () {
      guardar('si'); aplicar(true); ck.classList.remove('open');
    });
    document.getElementById('ckNo').addEventListener('click', function () {
      guardar('no'); aplicar(false); ck.classList.remove('open');
    });

    /* Reabrir desde el pie: la decisión tiene que poder cambiarse,
       no solo tomarse una vez. */
    document.querySelectorAll('[data-cookies]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        ck.classList.add('open');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else { iniciar(); }
})();
