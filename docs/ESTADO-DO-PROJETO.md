# Estado do projeto: bootcamps

**Atualizado em 10/11/2026.** A régua dos 12 critérios está em [`MVP.md`](MVP.md). Este arquivo responde a três perguntas: onde o projeto está, o que já fizemos e o que queremos fazer. Para trazer conteúdo novo ou mudar o site, siga [`COMO-EVOLUIR.md`](COMO-EVOLUIR.md).

## Onde está

| Item | Situação |
|---|---|
| Produção | `https://bootcamps-dun.vercel.app/` (Vercel, deploy a cada push na `main`) |
| Repositório | `main` protegida (check `verificar` obrigatório, sem force push). Fluxo: `feature/tasks-DD-MM-AAAA` → `developer` → `main`, só fast-forward |
| CI | Lint, `format:check` (Prettier), 34 testes (Vitest) e build com checagem de tipos; `npm audit --omit=dev` sem avisos |
| Conteúdo | 27 eventos (24 concluídos e 3 metas), com reserva local gerada pela API (`events.data.ts`) |
| Acessibilidade | Sem violação crítica no axe. Contraste corrigido na branch `feature/tasks-10-11-2026-b` (axe local sem `color-contrast` em 10/11/2026); falta conferir na produção depois da `main` (#75) |

## O que fizemos

| Período | Entregas |
|---|---|
| 28/10 | Conteúdos novos; páginas próprias de BQ e ByteClass (11,2 MB de PNG) substituídas pelos eventos na API |
| 31/10 | Edições detalhadas, Capivara Tech, seções Sobre e Fontes |
| 01/11 | Seção "Veja também no ecossistema", formações e cópia atualizada |
| 03/11 | Testes com Vitest, edições e relacionados nos eventos, SEO, cabeçalhos de segurança, actions em v5 |
| 05/11, MVP | React Router 7.18 (0 vulnerabilidades); filtro por status e categoria refletido na URL; Voltar seguro na entrada direta; relacionados sem a API; logo de 205 KB trocado por WebP de 4 KB; galeria acessível; movimento reduzido e "Pular para o conteúdo" |
| 05/11, estabilidade | e2e contra a produção passando; `COMO-EVOLUIR.md`; README com os números reais |
| 06/11 | Este documento, README com o estado e issue nova (#75) |
| 10/11 | Prettier em `src/` e `format:check` na CI (#74); textos secundários em `zinc-400` (#75); busca por título e instituição com `?q=` (#70). Em revisão, fora da `main` |

Detalhes: `docs/claudeia/diagnostico-mvp-2026-11-03.md` e `docs/claudeia/06-mvp-2026-11-03.md`.

## O que queremos fazer

Todas as issues têm o label `proximos-passos` e pelo menos três critérios de entrega. A ordem é a sugerida.

| Ordem | Issue | O quê | Tipo |
|---|---|---|---|
| 1 | [#74](https://github.com/douglasabnovato/bootcamps/issues/74) | Prettier em todo o código e `format:check` na CI | engenharia |
| 2 | [#75](https://github.com/douglasabnovato/bootcamps/issues/75) | Contraste de cor: zerar `color-contrast` do axe | acessibilidade |
| 3 | [#70](https://github.com/douglasabnovato/bootcamps/issues/70) | Busca por título e instituição na listagem | frontend |
| 4 | [#73](https://github.com/douglasabnovato/bootcamps/issues/73) | Lighthouse mobile ≥ 90 e Framer Motion fora do caminho crítico | performance |
| 5 | [#71](https://github.com/douglasabnovato/bootcamps/issues/71) | Pré-renderização das rotas e SEO por evento | SEO |
| 6 | [#72](https://github.com/douglasabnovato/bootcamps/issues/72) | Revisar categorias e criar o estado "organizado" | produto, decisão do autor |

Também na fila, sem issue própria por enquanto: a responsividade fina listada no README (escala de texto e espaçamento do `EventCard`, teste em 320 px).

As outras issues abertas (eventos, comunidades e formações) são **material de conteúdo**. Elas entram pela API, pelo processo de remessa do `learntech-content`.

## Decisões que dependem do autor
- Nova divisão de categorias (14 eventos em `outros` e 11 em `fullstack`) e o estado "organizado" para eventos que o autor coorganiza (#72).
- Modal de identificação obrigatório ou opcional (learntech-content #5).

## Como manter este arquivo
Ao fim de cada rodada: acrescente uma linha em "O que fizemos", atualize "Onde está" com os números de `npm test` e `npm run build`, e troque as issues fechadas por novas em "O que queremos fazer". A visão do ecossistema fica em `learntech-content/docs/ESTADO-DO-PROJETO.md`.
