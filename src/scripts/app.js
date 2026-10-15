import { CONTACTS } from './contact-config.js';
const qs = (s, c = document) => c.querySelector(s),
  qsa = (s, c = document) => [...c.querySelectorAll(s)];
function menu() {
  const b = qs('[data-menu-toggle]'),
    n = qs('#menu');
  if (!b || !n) return;
  b.onclick = () => {
    const o = b.getAttribute('aria-expanded') === 'true';
    b.setAttribute('aria-expanded', String(!o));
    n.classList.toggle('open', !o);
  };
}
function horizontal() {
  const shell = qs('[data-horizontal]');
  if (!shell) return;
  const sections = qsa('.panel', shell),
    links = qsa('[data-section-link]');
  let current = 0,
    locked = false;
  const active = i => {
    current = i;
    links.forEach(a => a.classList.toggle('active', a.dataset.sectionLink === sections[i]?.id));
  };
  const go = (i, smooth = true) => {
    i = Math.max(0, Math.min(sections.length - 1, i));
    active(i);
    sections[i].scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      inline: 'start',
      block: 'start',
    });
  };
  links.forEach(a =>
    a.addEventListener('click', e => {
      const i = sections.findIndex(x => x.id === a.dataset.sectionLink);
      if (i < 0) return;
      e.preventDefault();
      go(i);
    })
  );
  shell.addEventListener(
    'wheel',
    e => {
      if (matchMedia('(max-width:800px)').matches || locked || Math.abs(e.deltaY) < 8) return;
      e.preventDefault();
      locked = true;
      go(current + (e.deltaY > 0 ? 1 : -1));
      setTimeout(() => (locked = false), 700);
    },
    { passive: false }
  );
  const io = new IntersectionObserver(
    es => {
      const x = es
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (x) active(sections.indexOf(x.target));
    },
    { root: shell, threshold: [0.6, 0.8] }
  );
  sections.forEach(x => io.observe(x));
  const i = sections.findIndex(x => x.id === location.hash.slice(1));
  if (i > 0) requestAnimationFrame(() => go(i, false));
  else active(0);
}
function reveal() {
  const io = new IntersectionObserver(
    es =>
      es.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.1 }
  );
  qsa('.reveal').forEach(x => io.observe(x));
}
function filters() {
  const w = qs('[data-filters]');
  if (!w) return;
  w.onclick = e => {
    const b = e.target.closest('[data-filter]');
    if (!b) return;
    qsa('button', w).forEach(x => x.classList.toggle('active', x === b));
    qsa('[data-category]').forEach(
      c =>
        (c.hidden =
          b.dataset.filter !== 'all' && !c.dataset.category.split(' ').includes(b.dataset.filter))
    );
  };
}
function contacts() {
  qsa('[data-contact]').forEach(a => {
    const x = CONTACTS[a.dataset.contact];
    a.href = x.href;
    qs('[data-value]', a).textContent = x.label;
    if (x.external) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }
  });
  const b = qs('[data-copy]'),
    m = qs('[data-message]');
  if (b && m)
    b.onclick = async () => {
      try {
        await navigator.clipboard.writeText(m.textContent.trim());
        b.textContent = 'Mensagem copiada';
      } catch {
        b.textContent = 'Selecione e copie o texto';
      }
    };
}
menu();
horizontal();
reveal();
filters();
contacts();
qsa('[data-year]').forEach(x => (x.textContent = new Date().getFullYear()));
