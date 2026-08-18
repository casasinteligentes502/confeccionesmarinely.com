const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const topbar = document.querySelector('.topbar');

menuButton?.addEventListener('click', () => nav.classList.toggle('open'));

function scrollToSection(hash) {
  const target = document.querySelector(hash);
  if (!target) return;

  const headerHeight = topbar ? topbar.offsetHeight : 0;
  const extraSpace = 26;
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - extraSpace;

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });

  history.pushState(null, '', hash);
}

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', event => {
    const hash = link.getAttribute('href');

    if (hash && hash.startsWith('#')) {
      event.preventDefault();
      nav.classList.remove('open');
      scrollToSection(hash);
    }
  });
});

window.addEventListener('load', () => {
  if (window.location.hash) {
    setTimeout(() => scrollToSection(window.location.hash), 120);
  }
});

// Galería filtrable y vista ampliada
const galleryFilters = document.querySelectorAll('.gallery-filter');
const galleryCards = document.querySelectorAll('.gallery-card');

galleryFilters.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter || 'all';

    galleryFilters.forEach(item => item.classList.remove('active'));
    button.classList.add('active');

    galleryCards.forEach(card => {
      const category = card.dataset.category || '';
      card.hidden = filter !== 'all' && category !== filter;
    });
  });
});

const lightbox = document.querySelector('.gallery-lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxClose = lightbox?.querySelector('.lightbox-close');

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  lightboxImage.alt = '';
  document.body.classList.remove('lightbox-open');
}

document.querySelectorAll('.gallery-open').forEach(button => {
  button.addEventListener('click', () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = button.dataset.src || '';
    lightboxImage.alt = button.dataset.alt || 'Trabajo de Confecciones Marinely';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
  });
});

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', event => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeLightbox();
});
