# Jansen Rabelo Portfolio

Portfólio estático, responsivo e sem dependências de runtime. A página inicial preserva a navegação horizontal no desktop e adapta o conteúdo para rolagem vertical em telas menores.

## Decisões principais

- nome do diretório: `jansen-rabelo-portfolio`;
- arquitetura estática e proporcional ao escopo;
- CSS e JavaScript separados por responsabilidade;
- configuração de contato centralizada;
- Biblioteca como catálogo filtrável de projetos;
- Profissional reúne perfil, experiência, competências e formação;
- acessibilidade: navegação por teclado, link de salto, foco semântico e redução de movimento;
- nenhuma dependência externa ou coleta de dados.

## Executar localmente

Requer Node.js 18 ou superior.

```bash
npm start
```

Acesse `http://localhost:4173`.

## Validar

```bash
npm run check
npm test
```

## Configuração de contato

Edite `src/scripts/contact-config.js`. Use somente dados que possam ser públicos. Exemplos de formato:

- e-mail: `mailto:nome@dominio.com`;
- LinkedIn/Instagram: endereço completo `https://...`;
- WhatsApp: `https://wa.me/55DDDNUMERO`, somente números.

## Recursos do projeto anterior

Os arquivos binários não estavam incorporados ao pacote Markdown analisado. Para manter o download do currículo, copie o PDF anterior para:

`assets/download/JANSEN-RABELO-PT-BR.pdf`

Se desejar usar o favicon antigo, copie-o para:

`assets/icons/favicon.ico`

A ausência desses arquivos não impede o funcionamento das páginas, exceto o download do currículo e o ícone personalizado.

## Hospedagem

O projeto pode ser publicado como site estático. O documento inicial é `index.html`.

## Estrutura

```text
jansen-rabelo-portfolio/
├── assets/
│   ├── download/
│   └── icons/
├── docs/architecture/decisions/
├── scripts/
├── src/
│   ├── scripts/
│   └── styles/
├── tests/
├── contact.html
├── index.html
├── library.html
├── professional.html
├── package.json
└── README.md
```
