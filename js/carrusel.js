/* Galería de proyectos.

   Avanza sola cada 6 segundos y se detiene con el mouse encima o
   cuando alguien usa las flechas: si el usuario tomó el control,
   moverle la foto por debajo es pelearle.

   Funciona con varias galerías en la misma página sin tocar nada:
   cada una guarda su propio estado. */
(function () {
  var AUTO = 6000;
  var quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.gal').forEach(function (gal) {
    var track = gal.querySelector('.gal-track');
    var slides = gal.querySelectorAll('.gal-slide');
    /* Los puntos viven FUERA de .gal: el bloque `gal-dots` es hermano
       del carrusel, no hijo. Buscarlos adentro devolvia una lista
       vacia, y por eso no se marcaban al avanzar ni respondian al
       clic, mientras las flechas si andaban.

       Se busca primero el hermano inmediato y recien despues adentro,
       para que siga funcionando si algun dia se mueven al medio. */
    var caja = gal.nextElementSibling;
    var dots = (caja && caja.classList.contains('gal-dots'))
      ? caja.querySelectorAll('.gal-dot')
      : gal.querySelectorAll('.gal-dot');
    if (!track || slides.length < 2) return;

    var i = 0, timer = null, manual = false;

    function ir(n) {
      i = (n + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + (i * 100) + '%)';
      slides.forEach(function (s, k) { s.setAttribute('aria-hidden', k !== i); });
      Array.prototype.forEach.call(dots, function (d, k) { d.classList.toggle('on', k === i); });
    }
    function arrancar() { if (!quieto && !manual) timer = setInterval(function () { ir(i + 1); }, AUTO); }
    function parar() { clearInterval(timer); timer = null; }

    var prev = gal.querySelector('.gal-prev');
    var next = gal.querySelector('.gal-next');
    if (prev) prev.addEventListener('click', function () { manual = true; parar(); ir(i - 1); });
    if (next) next.addEventListener('click', function () { manual = true; parar(); ir(i + 1); });
    Array.prototype.forEach.call(dots, function (d, k) {
      d.addEventListener('click', function () { manual = true; parar(); ir(k); });
    });

    gal.addEventListener('mouseenter', parar);
    gal.addEventListener('mouseleave', arrancar);

    /* Una galería que sigue corriendo en una pestaña que nadie mira
       gasta batería y llega desfasada cuando el usuario vuelve. */
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) parar(); else arrancar();
    });

    ir(0);
    arrancar();
  });
})();
