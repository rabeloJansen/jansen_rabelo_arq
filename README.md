# Jansen Rabelo — Portfólio

Portfólio estático, responsivo e sem dependências de runtime. A página inicial usa navegação horizontal no desktop e rolagem vertical em telas menores.

Publicado em: https://rabelojansen.github.io/jansen_rabelo_arq/

## Executar localmente

Requer Node.js 18 ou superior.

```bash
npm install
npm start
```

Acesse `http://localhost:4173`.

## Validar

```bash
npm run check
npm test
```

## Biblioteca de projetos

Os projetos ficam em uma única fonte: `src/data/projects.js`. A partir dela:

- a página `library.html` monta os cards e os filtros (`src/scripts/library.js`);
- o script `scripts/build-projects.mjs` gera as páginas `projects/<id>.html`, o `sitemap.xml` e o `robots.txt`.

Para adicionar ou editar um projeto:

1. edite `src/data/projects.js` (o campo `filter` precisa existir em `library.html`);
2. coloque o ícone em `assets/images/projects/<id>/<id>-icon.webp` (360 × 360);
3. coloque as capturas em `assets/images/projects/<id>/screens/` (WebP, até 1600 px de largura) e liste-as em `screens`, com `width`, `height` e `caption`;
4. rode `npm run build:projects` e `npm test`.

Não edite os arquivos em `projects/` à mão: eles são sobrescritos pelo gerador.

As páginas de projeto usam `src/scripts/gallery.js` para ampliar as capturas (teclado: setas e Esc).

## Configuração

- Contato: `src/scripts/contact-config.js`. Use somente dados que possam ser públicos.
- Endereço público do site (links canônicos, Open Graph e sitemap): `src/data/site.js`. Se o domínio mudar, ajuste ali e também nas tags `canonical`/`og:` de `index.html`, `professional.html`, `library.html` e `contact.html`, além dos caminhos de `404.html`.

## Estrutura

```text
├── assets/
│   ├── download/            currículos em PDF
│   ├── icons/               favicon
│   └── images/              fundo, retrato, imagem de compartilhamento e projetos
├── docs/architecture/
├── projects/                páginas geradas (não editar)
├── scripts/
│   ├── build-projects.mjs   gerador das páginas de projeto e do sitemap
│   └── serve.mjs            servidor local
├── src/
│   ├── data/                projects.js e site.js
│   ├── scripts/             app.js, library.js, gallery.js, contact-config.js
│   └── styles/              main.css, library.css, professional.css, cv-downloads.css
├── tests/
├── 404.html
├── contact.html
├── index.html
├── library.html
└── professional.html
```

## Princípios

- arquitetura estática e proporcional ao escopo;
- CSS e JavaScript separados por responsabilidade;
- acessibilidade: navegação por teclado, link de salto, foco visível e redução de movimento;
- nenhuma dependência externa em produção e nenhuma coleta de dados.
