# Visão de arquitetura

## Contexto
Site pessoal estático com quatro entradas públicas e nenhuma persistência, autenticação ou integração de servidor.

## Componentes
- HTML: conteúdo e estrutura semântica por página.
- `main.css`: design system, layouts, responsividade e estados visuais.
- `app.js`: menu, navegação horizontal, animações progressivas, filtros e contato.
- `contact-config.js`: única fonte para canais públicos de contato.
- `serve.mjs`: servidor local mínimo para desenvolvimento.

## Limites
Não há backend, analytics, formulário ou coleta de dados. Links de contato são habilitados somente quando configurados.
