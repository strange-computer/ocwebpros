(function () {
  document.querySelectorAll('form[data-netlify-submit]').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const thankYou = form.getAttribute('data-thank-you');

      const submitButton = form.querySelector('[type="submit"]');
      if (submitButton) submitButton.disabled = true;

      try {
        const fd = new FormData(form);
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(Object.fromEntries(fd)).toString(),
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
