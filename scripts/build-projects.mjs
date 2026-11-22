// Gera as páginas de projeto (projects/<id>.html) e o sitemap.xml a partir de src/data/projects.js.
// Uso: npm run build:projects
// As páginas geradas são versionadas; edite os dados, não o HTML gerado.
import { writeFile, mkdir } from 'node:fs/promises';
import { PROJECTS, statusHtml } from '../src/data/projects.js';
import { SITE } from '../src/data/site.js';

const esc = value =>
  String(value).replace(
    /[&<>"']/g,
    char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]
  );

const STATIC_PAGES = ['', 'professional.html', 'library.html', 'contact.html'];

function gallery(project) {
  if (!project.screens.length) {
    return `<div class="gallery-placeholder"><span>Capturas da interface em breve.</span></div>`;
  }
  const items = project.screens
    .map(
      (screen, index) => `
          <figure class="gallery-item">
            <button type="button" data-gallery-open="${index}" aria-label="Ampliar imagem: ${esc(screen.caption)}">
              <img src="../${esc(screen.src)}" alt="${esc(screen.caption)}" width="${screen.width}" height="${screen.height}" loading="lazy" decoding="async" />
            </button>
            <figcaption>${esc(screen.caption)}</figcaption>
          </figure>`
    )
    .join('');
  const layout = project.screens.length === 1 ? ' single' : '';
  return `<div class="gallery-grid${layout}" data-gallery>${items}
        </div>`;
}

function page(project, index) {
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const url = `${SITE.url}${project.page}`;
  const ogImage = `${SITE.url}${project.screens[0]?.src ?? SITE.ogImage}`;
  const tech = project.tech.map(item => `<span>${esc(item)}</span>`).join('');
  const features = project.features.map(item => `<li>${esc(item)}</li>`).join('\n          ');
  return `<!doctype html>
<!-- Arquivo gerado por scripts/build-projects.mjs. Edite src/data/projects.js. -->
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="description" content="${esc(project.summary)}" />
    <meta name="theme-color" content="#0b1018" />
    <link rel="canonical" href="${esc(url)}" />
    <meta property="og:type" content="article" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:site_name" content="${esc(SITE.name)}" />
    <meta property="og:title" content="${esc(project.name)} | ${esc(SITE.name)}" />
    <meta property="og:description" content="${esc(project.summary)}" />
    <meta property="og:url" content="${esc(url)}" />
    <meta property="og:image" content="${esc(ogImage)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <title>${esc(project.name)} | Biblioteca de Jansen Rabelo</title>
    <link rel="icon" type="image/png" href="../assets/icons/favicon.png" />
    <link rel="stylesheet" href="../src/styles/main.css?v=1.2.2" />
    <link rel="stylesheet" href="../src/styles/library.css?v=1.2.2" />
    <script type="module" src="../src/scripts/app.js?v=1.2.2"></script>
    <script type="module" src="../src/scripts/gallery.js?v=1.2.2"></script>
  </head>
  <body data-page="project">
    <a class="skip-link" href="#conteudo">Ir para o conteúdo</a>
    <header class="site-header">
      <a class="brand" href="../index.html" aria-label="Ir para o início"
        ><img src="../assets/icons/brand-logo.webp" alt="" width="42" height="42" /><strong>Jansen Rabelo</strong></a
      ><button class="menu-toggle" data-menu-toggle aria-expanded="false" aria-controls="menu">
        <span class="sr-only">Abrir menu</span>☰
      </button>
      <nav id="menu" class="site-nav" aria-label="Navegação principal">
        <a href="../index.html">Início</a><a href="../index.html#sobre">Sobre mim</a
        ><a href="../professional.html">Profissional</a
        ><a class="active" href="../library.html">Biblioteca</a
        ><a href="../contact.html">Contato</a>
      </nav>
    </header>
    <main id="conteudo" class="project-page project-${esc(project.accent)}">
      <section class="project-hero">
        <div class="project-hero-copy reveal">
          <a class="back-link" href="../library.html">← Voltar à Biblioteca</a>
          <p class="eyebrow">${esc(project.category.toUpperCase())}</p>
          <h1>${esc(project.name)}</h1>
          <p class="project-lead">${esc(project.lead)}</p>
          <div class="tech-list large">${tech}</div>
          <span class="project-status stage stage-${esc(project.stage)}">${statusHtml(project, esc)}</span>
        </div>
        <div class="project-hero-icon reveal">
          <img src="../${esc(project.icon)}" alt="Ícone do projeto ${esc(project.name)}" width="360" height="360" />
        </div>
      </section>
      <section class="project-story">
        <article class="story-block reveal">
          <p class="eyebrow">O DESAFIO</p>
          <h2>Contexto</h2>
          <p>${esc(project.problem)}</p>
        </article>
        <article class="story-block reveal">
          <p class="eyebrow">A SOLUÇÃO</p>
          <h2>Produto</h2>
          <p>${esc(project.solution)}</p>
        </article>
      </section>
      <section class="project-gallery reveal" aria-labelledby="gallery-title">
        <p class="eyebrow">GALERIA</p>
        <h2 id="gallery-title" class="sr-only">Capturas de tela de ${esc(project.name)}</h2>
        ${gallery(project)}
      </section>
      <section class="project-capabilities reveal">
        <div class="section-heading">
          <p class="eyebrow">PRINCIPAIS CAPACIDADES</p>
          <h2>O que o produto reúne</h2>
        </div>
        <ul>
          ${features}
        </ul>
      </section>
      <section class="project-technical">
        <article class="technical-card reveal">
          <p class="eyebrow">ARQUITETURA</p>
          <h2>Construído para evoluir</h2>
          <p>${esc(project.architecture)}</p>
        </article>
        <article class="technical-card accent-card reveal">
          <p class="eyebrow">DIFERENCIAL</p>
          <h2>Decisão de produto</h2>
          <p>${esc(project.innovation)}</p>
        </article>
      </section>
      <nav class="project-pagination" aria-label="Outros projetos">
        <a href="${esc(prev.id)}.html"><small>PROJETO ANTERIOR</small><strong>← ${esc(prev.name)}</strong></a
        ><a href="${esc(next.id)}.html"><small>PRÓXIMO PROJETO</small><strong>${esc(next.name)} →</strong></a>
      </nav>
    </main>
    <footer class="site-footer static">
      <span>© <b data-year></b> Jansen Rabelo</span><span>Projeto autoral</span>
    </footer>
  </body>
</html>
`;
}

function sitemap() {
  const urls = [...STATIC_PAGES, ...PROJECTS.map(project => project.page)]
    .map(path => `  <url><loc>${esc(SITE.url + path)}</loc></url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

await mkdir('projects', { recursive: true });
for (const [index, project] of PROJECTS.entries()) {
  await writeFile(`projects/${project.id}.html`, page(project, index));
}
await writeFile('sitemap.xml', sitemap());
await writeFile('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}sitemap.xml\n`);
console.log(`${PROJECTS.length} páginas de projeto, sitemap.xml e robots.txt gerados.`);
