// Galeria das páginas de projeto: amplia a captura em um <dialog> com navegação por teclado.
const gallery = document.querySelector('[data-gallery]');

if (gallery) {
  const items = [...gallery.querySelectorAll('[data-gallery-open]')].map(button => {
    const img = button.querySelector('img');
    return { button, src: img.currentSrc || img.src, alt: img.alt };
  });

  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Imagem ampliada');
  dialog.innerHTML = `
    <figure>
      <img alt="" />
      <figcaption></figcaption>
    </figure>
    <button type="button" class="lightbox-close" data-lightbox-close aria-label="Fechar">×</button>
    <button type="button" class="lightbox-nav prev" data-lightbox-step="-1" aria-label="Imagem anterior">‹</button>
    <button type="button" class="lightbox-nav next" data-lightbox-step="1" aria-label="Próxima imagem">›</button>
    <span class="lightbox-count" aria-live="polite"></span>`;
  document.body.append(dialog);

  const image = dialog.querySelector('img');
  const caption = dialog.querySelector('figcaption');
  const count = dialog.querySelector('.lightbox-count');
  const multiple = items.length > 1;
  dialog.querySelectorAll('.lightbox-nav, .lightbox-count').forEach(el => (el.hidden = !multiple));
  let current = 0;

  const show = index => {
    current = (index + items.length) % items.length;
    const item = items[current];
    image.src = item.src;
    image.alt = item.alt;
    caption.textContent = item.alt;
    count.textContent = `${current + 1} / ${items.length}`;
  };

  items.forEach((item, index) =>
    item.button.addEventListener('click', () => {
      show(index);
      dialog.showModal();
    })
  );

  dialog.addEventListener('click', event => {
    const step = event.target.closest('[data-lightbox-step]');
    if (step) return show(current + Number(step.dataset.lightboxStep));
    if (event.target === dialog || event.target.closest('[data-lightbox-close]')) dialog.close();
  });

  dialog.addEventListener('keydown', event => {
    if (!multiple) return;
    if (event.key === 'ArrowRight') show(current + 1);
    if (event.key === 'ArrowLeft') show(current - 1);
  });

  dialog.addEventListener('close', () => items[current].button.focus());
}
