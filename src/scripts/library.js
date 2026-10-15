import { PROJECTS } from '../data/projects.js';
const grid = document.querySelector('[data-project-grid]');
const filters = document.querySelector('[data-library-filters]');
const escapeHtml = value =>
  String(value).replace(
    /[&<>"']/g,
    char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]
  );
function card(project, index) {
  const tech = project.tech
    .slice(0, 4)
    .map(item => `<span>${escapeHtml(item)}</span>`)
    .join('');
  return `<article class="portfolio-card reveal project-${escapeHtml(project.accent)}" data-category="${escapeHtml(project.filter)}"><a class="portfolio-card-link" href="${escapeHtml(project.page)}" aria-label="Conhecer o projeto ${escapeHtml(project.name)}"><div class="project-number">${String(index + 1).padStart(2, '0')}</div><div class="project-icon-wrap"><img src="${escapeHtml(project.icon)}" alt="" loading="lazy"></div><div class="portfolio-card-body"><div class="project-meta"><span>${escapeHtml(project.category)}</span><small>${escapeHtml(project.status)}</small></div><h2>${escapeHtml(project.name)}</h2><p>${escapeHtml(project.summary)}</p><div class="tech-list">${tech}</div><span class="project-cta">Conhecer projeto <b aria-hidden="true">→</b></span></div></a></article>`;
}
function render(filter = 'all') {
  if (!grid) return;
  const visible = PROJECTS.filter(project => filter === 'all' || project.filter === filter);
  grid.innerHTML = visible.map((project, index) => card(project, index)).join('');
  requestAnimationFrame(() =>
    grid.querySelectorAll('.reveal').forEach(item => item.classList.add('visible'))
  );
}
filters?.addEventListener('click', event => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  filters
    .querySelectorAll('button')
    .forEach(item => item.classList.toggle('active', item === button));
  render(button.dataset.filter);
});
render();
