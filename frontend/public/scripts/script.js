// public/scripts/script.js

document.addEventListener("DOMContentLoaded", () => {

  /* ================= DELETE MODAL ================= */

  const modal = document.getElementById('deleteModal');
  const form = document.getElementById('deleteForm');
  const cancelBtn = document.getElementById('cancelDelete');

  if (modal && form && cancelBtn) {

    document.querySelectorAll('.delete').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault(); // important
        const id = button.dataset.id;
        if (!id) return;

        form.action = `/posts/${id}/delete`;

        modal.classList.remove('hidden');
        requestAnimationFrame(() => modal.classList.add('show'));

        form.querySelector('button[type="submit"]')?.focus();
      });
    });

    cancelBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('show');
      setTimeout(() => modal.classList.add('hidden'), 240);
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.classList.add('hidden'), 240);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        modal.classList.remove('show');
        setTimeout(() => modal.classList.add('hidden'), 240);
      }
    });
  }

  /* ================= LIKE SYSTEM ================= */

  document.querySelectorAll(".like-btn").forEach(button => {

    button.addEventListener("click", async () => {

      if (button.disabled) return; // prevent spam click
      button.disabled = true;

      const postId = button.dataset.id;
      const liked = button.classList.contains("liked");

      try {

        const response = await fetch(`/posts/${postId}/like`, {
          method: liked ? "DELETE" : "POST"
        });

        if (!response.ok) throw new Error("Like failed");

        const data = await response.json();

        button.classList.toggle("liked", data.liked);
        button.querySelector(".heart").textContent =
          data.liked ? "❤️" : "🤍";

        button.querySelector(".like-count").textContent = data.count;

      } catch (err) {
        console.error(err);
      } finally {
        button.disabled = false;
      }

    });

  });

});