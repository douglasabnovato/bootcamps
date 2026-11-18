# Performance do carregamento: issue #73 (18/11/2026)

Branch `feature/tasks-18-11-2026`. A medição foi feita no build local (`vite preview`), com dados da API de produção, usando Lighthouse 12 com o perfil móvel padrão (4G lento simulado e CPU 4x mais lenta). Foram 3 rodadas por rota.

## O que mudou

| Mudança | Por quê | Arquivos |
|---|---|---|
| `LazyMotion` com `domMax` num chunk à parte, e `m.*` no lugar de `motion.*` | Tira os recursos de animação do bundle inicial. O `strict` quebra no desenvolvimento se alguém usar `motion.*` | `app/App.tsx`, `shared/lib/motion/features.ts` e 5 componentes |
| Sem `AnimatePresence` no roteador | Não há `exit` em nenhuma página. O filho direto era o `Suspense`, sem chave, então ele não animava nada | `app/router/AppRouter.tsx` |
| Sem `react-helmet-async`: metadados nativos do React 19 | Um provedor e uma dependência a menos no bundle inicial. O `<title>` continua com `useDocumentTitle` | `pages/detail`, `pages/notFound` e `package.json` |
| Raleway servida pelo próprio site (`@fontsource-variable/raleway`) | O CSS do Google Fonts bloqueava a renderização por cerca de 1 s. Além disso, o IP de quem visita deixa de ir para terceiros (LGPD) | `app/main.tsx`, `app/styles/main.css` e `index.html` |
| A capa do primeiro card com `loading="eager"` e `fetchpriority="high"` | Essa capa é o LCP da home e estava com `loading="lazy"` | `entities/event/ui/EventCard.tsx` e `pages/home/Home.tsx` |
| O parágrafo do detalhe sem animação de entrada | Ele é o LCP do detalhe. Com `opacity: 0`, só aparecia depois de o chunk de animação chegar | `pages/detail/Detail.tsx` |
| Fachada do YouTube: miniatura e botão, com o iframe `youtube-nocookie` carregado só no clique | O player embutido baixava cerca de 860 KB de script sem a pessoa pedir | `shared/ui/videoPlayer/` (com teste do `idDoYoutube`) |
| `npm run orcamento` na CI | Falha se o JS inicial passar de 100 KB gzip, para que o ganho não se perca | `scripts/orcamento-bundle.mjs` e `.github/workflows/ci.yml` |

## Medição

| | Antes | Depois |
|---|---|---|
| JS inicial (gzip) | 130,2 KB | **95,6 KB** (o limite é 100) |
| `/`: Performance, Acessibilidade, LCP | 80, 100, 4,4 s | 82 a 84, 100, 4,2 a 4,5 s |
| `/event/codexperience` | 70, 100, 12,3 s | 82 a 85, 100, 4,0 a 4,5 s |
| `/event/42-sp` (com vídeo) | sem medição | 89, 100, 3,5 s |
| Script de terceiros no detalhe com vídeo | cerca de 860 KB (player do YouTube) | 0 (só a miniatura de `i.ytimg.com`) |
| CLS | 0 | 0 |

## Critérios da issue
- [x] JS inicial ≤ 100 KB gzip, com `LazyMotion`. A CI passa a garantir isso.
- [x] Acessibilidade ≥ 95: 100 nas três rotas.
- [ ] Performance ≥ 90: de 82 a 89. O que falta já não é JavaScript. Os gargalos são dois:
  1. **Cadeia de dados.** O conteúdo só aparece depois de carregar o HTML, o JS, o chunk da página e o `fetch` da API. Quem resolve isso é a **issue #71** (pré-renderização), que põe o texto e a capa no HTML.
  2. **Capas pesadas servidas pela API** (370 KB de imagem na home). Isso está na learntech-content#8 (orçamento de mídia).

## Como reproduzir
```bash
npm run build && npm run orcamento
npx vite preview --port 4173
# em ../learntech-content:
npx lighthouse http://localhost:4173/event/codexperience --chrome-flags="--headless=new" --only-categories=performance,accessibility
```
