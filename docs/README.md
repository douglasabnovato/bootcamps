# bootcamps: documentação de engenharia

Site de eventos, bootcamps e formações (os que o autor fez e os que quer fazer). Publicado no Vercel (`https://bootcamps-dun.vercel.app`).

## Stack
- React 19, Vite 7, React Router 7, TypeScript 5.9 e Tailwind CSS 4 (PostCSS).
- Bibliotecas: `framer-motion`, `react-helmet-async` (metadados por página) e `@vercel/speed-insights`.
- Qualidade: ESLint com `typescript-eslint`; checagem de tipos no build; testes de unidade com Vitest (ambiente `node`, sem jsdom): contrato da cópia, fallback da API, filtro da Home (`filtrarEventos`) e resolvedor de relacionados. 25 testes em 4 arquivos em 03/11/2026.

## Como rodar do zero
```bash
cp .env.example .env.local      # VITE_API_URL aponta para a API learntech-content
npm install
npm run dev
npm run lint && npm test && npm run build
```

## De onde vêm os dados
- **Busca:** `src/shared/api/learntechContent.ts` busca na API e resolve caminhos de mídia (`/media/...` vira URL absoluta). `src/entities/event/api/eventApi.ts` tenta a API primeiro e, se falhar, usa a cópia local.
- **Cópia de reserva:** `src/entities/event/api/events.data.ts`, gerada pelo `npm run copias` da API. Não edite à mão.
- **Recursos consumidos:** `bootcamps/eventos.json` e `bootcamps/eventos/<slug>.json`.
- **Modelo:** `src/entities/event/model/types.ts` espelha o schema `src/schemas/bootcamps.ts` da API. Campo novo no schema pede campo novo no tipo.

## Página de detalhe (`src/pages/detail/Detail.tsx`)
Seções, na ordem:
- capa;
- Media Center (vídeo e galeria);
- Edições, com data, número, formato, tema, local, programação e o selo "Eu estive lá";
- Sobre;
- ementa ou plano de estudos;
- links;
- **Veja também no ecossistema** (`relacionados` resolvidos pela API; sem `url`, `src/shared/config/ecossistema.ts` monta a URL a partir de `tipo` + `id`);
- Fontes.

A galeria (`src/shared/ui/eventGallery/EventGallery.tsx`) amplia a foto num `<dialog>` nativo (←/→, Esc, contador "3 de 29", foco devolvido à miniatura). O botão Voltar vai para `/` quando a página foi aberta direto (`location.key === "default"`) e volta no histórico quando veio da Home, preservando o filtro.

## Home (`src/pages/home/Home.tsx`)
Filtro por status e categoria em `src/features/event-filter/`, lido e gravado na URL (`?status=concluido|desejado&categoria=...`, com `replace` para não empilhar histórico). Valor desconhecido na URL vira "todos". Sem resultado, aparece "Limpar filtros".

## Cores e contraste
Fundo da página: `zinc-950` (#09090b). Mínimo WCAG AA: 4,5:1 em texto normal e 3:1 em texto grande.

| Uso | Cor | Contraste sobre zinc-950 |
|---|---|---|
| Marca (destaques, links, badge principal) | `brand-primary` #00c853 | sem mudança |
| Texto secundário (contadores, rodapé, local e horário das edições, textos da CTA, títulos pequenos do detalhe) | `zinc-400` #9f9fa9 | 7,59:1 |
| Antes (10/11/2026, trocado) | `zinc-500` #71717b | 4,12:1, reprovado pelo axe |

Regra: texto sobre fundo escuro não usa `zinc-500` ou mais escuro. O `zinc-500` fica só em bordas e detalhes decorativos.
Verificação de 10/11/2026: axe (e2e de `learntech-content`, build local) sem `color-contrast` na home e no detalhe do evento.

## Deploy e CI
- **Deploy:** push na `main` publica no Vercel. O `vercel.json` tem a reescrita de SPA e os cabeçalhos de segurança.
- **CI:** `.github/workflows/ci.yml` roda `npm ci`, `npm run lint`, `npm run format:check`, `npm test` e `npm run build` em Node 22.
- **Formatação:** Prettier (`.prettierrc`) em todo o `src/` desde 10/11/2026. A cópia gerada `events.data.ts` fica no `.prettierignore`. Antes de commitar: `npx prettier --write "src/**/*.{ts,tsx}"`.
- **Proposta (não aplicada):** acrescentar `npm audit --omit=dev --audit-level=high` à CI.

## Pendências de engenharia
O backlog fica em `learntech-content/docs/engenharia/backlog.md`. Para este site: testes de componente (jsdom + Testing Library) e de ponta a ponta, métricas de Lighthouse, axe sem violações serious/critical, pré-renderização das rotas e o gerador de cópias exportar `url` e `titulo` nos relacionados.
