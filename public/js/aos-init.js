(function () {
  function revealAll() {
    document.documentElement.classList.add('aos-fallback');
    document.querySelectorAll('[data-aos]').forEach(function (el) {
      el.classList.add('aos-animate');
    });
  }

  // Catches elements AOS missed during slow scroll (intersection threshold never crossed).
  function startScrollRevealFallback() {
    var ticking = false;

    function revealVisible() {
      if (!document.documentElement.classList.contains('aos-ready')) return;

      var viewportHeight = window.innerHeight;
      var edge = Math.min(120, viewportHeight * 0.12);

      document.querySelectorAll('[data-aos]:not(.aos-animate)').forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < viewportHeight - edge && rect.bottom > edge) {
          el.classList.add('aos-animate');
        }
      });
    }

    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        revealVisible();
        ticking = false;
      });
    }, { passive: true });

    revealVisible();
  }

  function initAOS() {
    if (typeof AOS === 'undefined') {
      revealAll();
      return;
    }

    try {
      AOS.init({
        duration: 700,
        easing: 'ease-out',
        once: true,
        offset: 280,
        disable: false,
      });
      document.documentElement.classList.add('aos-ready');
      startScrollRevealFallback();
    } catch (error) {
      console.error('AOS init failed:', error);
      revealAll();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAOS, { once: true });
  } else {
    initAOS();
  }

  // Only used if AOS never loaded — don't force-reveal on a timer or animations break.
  window.setTimeout(function () {
    if (!document.documentElement.classList.contains('aos-ready')) {
      revealAll();
    }
  }, 3000);
})();
