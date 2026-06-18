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
