# CLAUDE.md: bootcamps

SPA em React, TypeScript e Vite, publicada na Vercel (`bootcamps-dun.vercel.app`). Registra eventos, bootcamps e formações, concluídos e metas. Os dados vêm da API `learntech-content`, a pasta irmã deste repositório. Tudo em português do Brasil.

## Antes de qualquer tarefa
1. `docs/ESTADO-DO-PROJETO.md`: o que foi feito e as issues em ordem.
2. `docs/COMO-EVOLUIR.md`: estrutura do site, arquivos gerados e checklist de estabilidade.
3. Para conteúdo novo: `../learntech-content/docs/contratos/bootcamps.md` (o contrato deste site) e `../learntech-content/docs/processo/agentes.md` (o fluxo).

## Regras que não mudam
- **Conteúdo novo entra pela API, nunca por este repositório.** O produtor do bootcamps grava em `learntech-content/content/`, e as cópias chegam aqui por `npm run copias`.
- **Arquivos gerados, não edite à mão:** `src/entities/event/api/events.data.ts`; `public/sitemap.xml`.
- O tipo `BootcampEvent` (`src/entities/event/model/types.ts`) precisa bater com `learntech-content/src/schemas/bootcamps.ts`.
- **Privacidade:** nenhum dado pessoal de terceiro, nome de cliente ou link interno de ex-empregador. O Claude não lê nem cadastra segredos.

## Git
- Branch do dia `feature/tasks-DD-MM-AAAA`, criada da `main`. Depois: push, CI verde, `developer` e `main` por `--ff-only`.
- A `main` é protegida: check `verificar` obrigatório e sem force push. Nunca commit direto na `main`.
- Comentários e issues no GitHub terminam com `<sub>por douglas ciborgue</sub>`.

## Comandos
| Comando | Para quê |
|---|---|
| `npm test` | Vitest |
| `npm run lint` | ESLint |
| `npm run build` | checagem de tipos e build |
| `npm run e2e` (em `learntech-content`) | fluxos e acessibilidade deste site contra a produção |
