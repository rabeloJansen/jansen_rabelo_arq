# Visão de arquitetura

## Contexto

Site pessoal estático com quatro páginas principais, páginas de projeto geradas a partir de dados e nenhuma persistência, autenticação ou integração de servidor.

## Componentes

- HTML: conteúdo e estrutura semântica por página.
- `main.css`: design system, layouts, responsividade e estados visuais.
- `app.js`: menu, navegação horizontal, animações progressivas e contato.
- `library.js`: cards e filtros da Biblioteca a partir de `src/data/projects.js`.
- `gallery.js`: galeria com ampliação das capturas nas páginas de projeto.
- `build-projects.mjs`: gera `projects/*.html`, `sitemap.xml` e `robots.txt` a partir dos dados.
- `contact-config.js`: única fonte para canais públicos de contato.
- `serve.mjs`: servidor local mínimo para desenvolvimento.

## Limites

Não há backend, analytics, formulário ou coleta de dados. Links de contato são habilitados somente quando configurados.
