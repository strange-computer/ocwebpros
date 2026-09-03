(function () {
  document.querySelectorAll('form[data-formspree-submit]').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const thankYou = form.getAttribute('data-thank-you');
      const gtmEvent = form.getAttribute('data-gtm-event');
      const gtmLanding = form.getAttribute('data-gtm-landing');

      if (gtmEvent) {
        window.dataLayer = window.dataLayer || [];
        const payload = { event: gtmEvent };
        if (gtmLanding) payload.landing_page = gtmLanding;
        window.dataLayer.push(payload);
      }

      const submitButton = form.querySelector('[type="submit"]');
      if (submitButton) submitButton.disabled = true;

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Form submit failed');
        }

        if (thankYou) {
          window.location.href = thankYou;
        }
      } catch (err) {
        console.error('Form submit failed', err);
        if (submitButton) submitButton.disabled = false;
        const note = form.querySelector('[data-form-note]');
        if (note) {
          note.textContent = 'Something went wrong. Please try again or call (949) 329-4437.';
        }
      }
    });
  });
})();
