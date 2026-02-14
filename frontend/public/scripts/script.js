 // public/scripts/script.js
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(() => {
    const modal = document.getElementById('deleteModal');
    const form = document.getElementById('deleteForm');
    const cancelBtn = document.getElementById('cancelDelete');

    // If modal or form missing, do nothing (no errors)
    if (!modal || !form || !cancelBtn) return;

    // attach click handlers to every .delete button
    document.querySelectorAll('.delete').forEach(button => {
      button.addEventListener('click', (e) => {
        // read id from data attribute
        const id = button.dataset.id;
        if (!id) return console.warn('delete button missing data-id');

        // set form action to correct route (method-override uses _method)
        form.action = `/posts/${id}?_method=DELETE`;

        // show modal (remove hidden and add show to animate)
        modal.classList.remove('hidden');
        // ensure browser paints before adding show (so animation works)
        requestAnimationFrame(() => modal.classList.add('show'));

        // focus first button for accessibility
        const confirmBtn = form.querySelector('button[type="submit"]');
        if (confirmBtn) confirmBtn.focus();
      });
    });

    // Cancel closes modal
    cancelBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('show');
      setTimeout(() => modal.classList.add('hidden'), 240);
    });

    // Clicking backdrop (but not modal content) closes modal
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.classList.add('hidden'), 240);
      }
    });

    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        modal.classList.remove('show');
        setTimeout(() => modal.classList.add('hidden'), 240);
      }
    });
  });
})();
