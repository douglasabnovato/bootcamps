# MVP: bootcamps

**Nível:** N3 (produto). Proposta do Claude em 10/11/2026; o autor confirma.
**Resumo:** 8 de 12 aplicáveis atendidos (20/11/2026)
**Finalizado:** não. Falta do código: LCP no celular abaixo de 2,5 s (#73). Falta do autor: decidir a hipótese (#23, proposta escrita) e a ferramenta de medição (#24, recomendação escrita), e ligar os alertas do Dependabot.

Régua: `engenharia/arquitetura/padroes.md`. "Atende" só com comando, data e resultado.

## Problema e público
O hub de eventos e formações do ecossistema learnTECH: o que foi feito em cada evento, o que se aprendeu e as metas de estudo (README).

## Critérios (10/11/2026)

| # | Critério | Situação | Evidência |
|---|---|---|---|
| 1 | Problema e público claros | Atende | O hub de eventos e formações do ecossistema learnTECH: o que foi feito em cada evento, o que se aprendeu e as metas de estudo (README). |
| 2 | Hipótese a validar | Não atende | Proposta escrita em 20/11/2026 ([hipoteses.md](https://github.com/douglasabnovato/learntech-content/blob/main/docs/estrategia/hipoteses.md)), no formato da [learntech-content#23](https://github.com/douglasabnovato/learntech-content/issues/23). A aposta é do autor: o critério só atende depois da decisão dele. |
| 3 | Fluxo principal completo | Atende | `npm run e2e` no learntech-content contra a produção em 20/11/2026: fluxos, acessibilidade, capturas, estabilidade e estados passaram. O workflow `e2e` roda na CI do learntech-content a cada push na `main` (sucesso em 19/11/2026) e toda segunda-feira ([learntech-content#10](https://github.com/douglasabnovato/learntech-content/issues/10)). Fluxos deste site: home abre o detalhe, "Veja também no ecossistema". |
| 4 | Escopo enxuto | Atende | Seção "Fora do MVP" abaixo, com as decisões do autor. |
| 5 | Medição de uso | Não atende | Sem painel de visitas. A API registra só as identificações (D1). Recomendação pontuada das ferramentas gratuitas em 20/11/2026 ([medicao.md](https://github.com/douglasabnovato/learntech-content/blob/main/docs/estrategia/medicao.md)): Cloudflare Web Analytics. A escolha e a conta são do autor ([learntech-content#24](https://github.com/douglasabnovato/learntech-content/issues/24)). |
| 6 | Falhas tratadas | Atende | `e2e/estados.spec.mjs` no learntech-content contra a produção em 20/11/2026, 2 rodadas sem falha: home e evento com a API lenta e fora do ar (cópia de reserva), busca sem resultado com o estado vazio; falha da API com a reserva coberta por `src/entities/event/api/eventApi.test.ts`. |
| 7 | Desempenho aceitável | Parcial | `npm run ux:lighthouse` (móvel) contra a produção em 19/11/2026, depois da `main`: home 91 e evento 85 de performance, CLS 0, TBT 20 e 180 ms. O LCP ainda passa da meta de 2,5 s (3,5 e 3,9 s; [#73](https://github.com/douglasabnovato/bootcamps/issues/73)). CLS no celular com rede lenta (`e2e/estabilidade.spec.mjs`, 20/11/2026): 0 nas duas, e a bootcamps#79 pode fechar. Correções na `developer` em 20/11/2026 (Decisão LIDER D19): a capa do evento com prioridade baixa (fica atrás do degradê e não é o LCP) e o pré-carregamento por rota no `index.html`. `npm run ux:lcp` do learntech-content no `npm run preview` (celular, cache frio, mediana de 3), antes → depois: evento 4,1 → 3,0 s; home 3,5 s. Falta confirmar na produção. O que ainda pesa: o JavaScript inicial e a fonte antes do parágrafo, e capas de até 190 kB vindas da API ([learntech-content#8](https://github.com/douglasabnovato/learntech-content/issues/8)). |
| 8 | Acessibilidade básica | Atende | Produção, axe em 20/11/2026 (`npm run e2e`, projeto acessibilidade): 0 violações em home e evento. Lighthouse de acessibilidade de 99 a 100 na produção em 19/11/2026. |
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
