# MVP: bootcamps

**Nível:** N3 (produto). Proposta do Claude em 10/11/2026; o autor confirma.
**Resumo:** 5 de 12 aplicáveis atendidos
**Finalizado:** não. Falta do código: fluxo na CI, falhas com teste, desempenho no celular, axe e segurança confirmados na produção. Falta do autor: hipótese (#23) e medição de uso (#24), alertas do Dependabot e levar as integrações para a `main`.

Régua: `engenharia/arquitetura/padroes.md`. "Atende" só com comando, data e resultado.

## Problema e público
O hub de eventos e formações do ecossistema learnTECH: o que foi feito em cada evento, o que se aprendeu e as metas de estudo (README).

## Critérios (10/11/2026)

| # | Critério | Situação | Evidência |
|---|---|---|---|
| 1 | Problema e público claros | Atende | O hub de eventos e formações do ecossistema learnTECH: o que foi feito em cada evento, o que se aprendeu e as metas de estudo (README). |
| 2 | Hipótese a validar | Não atende | Nenhuma hipótese escrita. A aposta é do autor: [learntech-content#23](https://github.com/douglasabnovato/learntech-content/issues/23). |
| 3 | Fluxo principal completo | Parcial | `npm run e2e` no learntech-content, contra a produção, em 10/11/2026: 2 de 2 fluxos (home abre o detalhe, "Veja também no ecossistema"). Fora da CI ([learntech-content#10](https://github.com/douglasabnovato/learntech-content/issues/10)). |
| 4 | Escopo enxuto | Atende | Seção "Fora do MVP" abaixo, com as decisões do autor. |
| 5 | Medição de uso | Não atende | Sem painel de visitas. A API registra só as identificações (D1). Ferramenta gratuita a escolher: [learntech-content#24](https://github.com/douglasabnovato/learntech-content/issues/24). |
| 6 | Falhas tratadas | Parcial | `src/entities/event/api/eventApi.test.ts` cobre a falha da API com a cópia de reserva; estado vazio do filtro com "Limpar filtros". Carregamento sem teste próprio. |
| 7 | Desempenho aceitável | Não atende | `npm run ux:lighthouse` (móvel) contra a produção em 10/11/2026, 3 execuções. Home: 4,5 s, mediana 4,5 s, TBT 294 ms, CLS 0,0 (1 de 3 rodadas válidas); evento: 15,8 / 8,9 s, mediana 12,3 s, TBT 541 ms, CLS 0,0 (2 de 3 rodadas válidas). Meta: 2,5 s ([#73](https://github.com/douglasabnovato/bootcamps/issues/73)). |
| 8 | Acessibilidade básica | Parcial | Produção, axe em 10/11/2026: `color-contrast` 5 na home e 6 no evento. Na `developer`, axe local sem violações ([#75](https://github.com/douglasabnovato/bootcamps/issues/75)). Falta confirmar na produção. |
| 9 | Segurança e conformidade | Parcial | `npm audit --omit=dev` em 10/11/2026: 0 vulnerabilidades. Alertas do Dependabot desligados (`gh api .../dependabot/alerts` responde 403 em 10/11/2026; ligar é do autor). Sem segredo no código. Cabeçalhos de segurança no `vercel.json`. |
| 10 | Entrega confiável | Atende | `gh api repos/douglasabnovato/bootcamps/rulesets` em 10/11/2026: ruleset "main protegida" ativo (check `verificar` obrigatório, sem force push, sem apagar a `main`). CI em todo push e PR. |
| 11 | Testes dos fluxos críticos | Atende | CI da branch `feature/tasks-10-11-2026-b` em 10/11/2026 (run 42850726164): 34 testes passando, nenhum pulado; `format:check` obrigatório. |
| 12 | Documentação honesta | Atende | Os comandos `npm run` citados existem; `copias`, `sitemaps` e `validar` são da API (conferido em 10/11/2026). |

## Fora do MVP
- Domínio próprio e qualquer serviço pago: o ambiente fica gratuito (decisão do autor, 10/11/2026).
- Identificação opcional: a identificação obrigatória continua ([learntech-content#5](https://github.com/douglasabnovato/learntech-content/issues/5), não autorizada pelo autor em 10/11/2026).
- Votação de temas nos cards de programa ([learntech-content#4](https://github.com/douglasabnovato/learntech-content/issues/4), aguardando o autor).
- Pré-renderização das rotas ([#71](https://github.com/douglasabnovato/bootcamps/issues/71)) e revisão de categorias ([#72](https://github.com/douglasabnovato/bootcamps/issues/72), decisão do autor).

## Histórico
- 10/11/2026: primeira tabela, depois do ciclo de acessibilidade e busca nos quatro sites.
