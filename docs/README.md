# bootcamps: documentação de engenharia

Site de eventos, bootcamps e formações (os que o autor fez e os que quer fazer). Publicado no Vercel (`https://bootcamps-dun.vercel.app`).

## Stack
- React 19, Vite 7, React Router 7, TypeScript 5.9 e Tailwind CSS 4 (PostCSS).
- Bibliotecas: `framer-motion`, `react-helmet-async` (metadados por página) e `@vercel/speed-insights`.
- Qualidade: ESLint com `typescript-eslint`; checagem de tipos no build. Ainda sem testes automatizados.

## Como rodar do zero
```bash
cp .env.example .env.local      # VITE_API_URL aponta para a API learntech-content
npm install
npm run dev
npm run lint && npm run build
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
- **Veja também no ecossistema** (`relacionados` resolvidos pela API);
- Fontes.

## Deploy e CI
- **Deploy:** push na `main` publica no Vercel. O `vercel.json` só tem a reescrita de SPA.
- **CI:** `.github/workflows/ci.yml` roda `npm ci`, `npm run lint` e `npm run build`.

## Pendências de engenharia
O backlog fica em `learntech-content/docs/engenharia/backlog.md`. Para este site: testes unitários (Vitest) e de ponta a ponta, métricas de Lighthouse, acessibilidade, sitemap e cabeçalhos de segurança.
