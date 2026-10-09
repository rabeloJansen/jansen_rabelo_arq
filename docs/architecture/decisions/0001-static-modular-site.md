# ADR 0001: site estático modular

## Contexto
O portfólio precisa ser simples, rápido, publicável em hospedagem estática e fácil de manter.

## Decisão
Usar HTML, CSS e módulos JavaScript nativos, sem framework e sem etapa obrigatória de build.

## Alternativas
Framework SPA e gerador de site estático foram considerados, mas adicionariam dependências e complexidade sem necessidade demonstrada.

## Consequências
A implantação é direta e o projeto possui superfície de manutenção pequena. Conteúdo compartilhado entre páginas permanece duplicado em pequena escala e deve ser revisto se o número de páginas crescer.
