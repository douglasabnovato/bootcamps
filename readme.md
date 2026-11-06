<h1 align="center">🎓 Bootcamps</h1>

<p align="center">
  <strong>O hub de eventos e formações do ecossistema learnTECH.</strong><br />
  27 registros · 24 concluídos · 3 metas de estudo
</p>

> **Vai evoluir o projeto ou trouxe arquivos novos?** Comece por [`docs/COMO-EVOLUIR.md`](docs/COMO-EVOLUIR.md): onde fica cada coisa, o que é gerado pela API, comandos e a checklist de estabilidade.

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-19-0a0a0b?style=flat-square&logo=react&logoColor=00C853" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.9-0a0a0b?style=flat-square&logo=typescript&logoColor=00C853" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-7-0a0a0b?style=flat-square&logo=vite&logoColor=00C853" />
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-4-0a0a0b?style=flat-square&logo=tailwindcss&logoColor=00C853" />
  <img alt="FSD" src="https://img.shields.io/badge/arquitetura-Feature--Sliced%20Design-0a0a0b?style=flat-square" />
</p>

---

## 🧭 Sobre

O Bootcamps registra a jornada técnica em duas frentes, e é essa divisão que
organiza o produto inteiro:

- **Retrospectiva** — formações e eventos já concluídos e validados
  (Ignite, Minas Summit, CodeXperience, Fator S, GDG JF). Marcados em **verde**.
- **Prospecção** — o que está no radar e ainda não aconteceu (hoje: Piscine
  42SP, Minicamp XP Educação e BQ Agenda Tech). Marcados em **âmbar**. Não são promessas: são o roteiro declarado de evolução.

A distinção entre os dois estados não é decorativa. Ela define a cor do card, o
texto do botão, o título da seção de conteúdo, o agrupamento da listagem e o
filtro de status da Home. É a regra de negócio central do projeto.

---

## ▶️ Como rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run preview  # serve o build local
npm run lint
npm test         # vitest run (testes de unidade)
```

Deploy contínuo na Vercel, com `vercel.json` reescrevendo todas as rotas para
`index.html` (necessário por ser SPA).

---

## 🧱 Arquitetura

O projeto segue **Feature-Sliced Design**. Nem toda camada do FSD existe aqui —
só as que têm conteúdo real:

```text
src/
├── app/                        configuração global
│   ├── main.tsx                entry point, StrictMode e Speed Insights
│   ├── App.tsx                 HelmetProvider + MotionConfig (reducedMotion) + BrowserRouter + MainLayout
│   ├── router/
│   │   ├── AppRouter.tsx       rotas com lazy + Suspense + AnimatePresence
│   │   └── index.tsx           barril do AppRouter
│   └── styles/main.css         Tailwind 4: @theme e camada base
│
├── entities/event/             o domínio
│   ├── model/
│   │   ├── types.ts            contrato BootcampEvent e rótulos das categorias
│   │   ├── useEvents.ts        lista, com loading e error
│   │   └── useEventBySlug.ts   um evento, com loading e error
│   ├── api/
│   │   ├── eventApi.ts         camada de acesso: API learntech-content, com dados locais de reserva
│   │   ├── events.data.ts      cópia de reserva dos 27 eventos, GERADA pela API (não editar)
│   │   └── *.test.ts           contrato da cópia e fallback da API
│   └── ui/
│       ├── EventCard.tsx       card da listagem
│       └── badge/Badge.tsx     etiqueta de categoria
│
├── features/event-filter/      filtro da Home por status e categoria
│   ├── model/filtrarEventos.ts função pura e leitura/escrita de ?status=&categoria= (+ teste)
│   ├── ui/EventFilter.tsx      botões de status e chips de categoria com contagem
│   └── index.ts                API pública da feature
│
├── pages/
│   ├── home/Home.tsx           listagem agrupada por status, com filtro e estado vazio
│   ├── detail/Detail.tsx       capa, mídia, edições, ementa e CTA
│   ├── detail/DetailSkeleton.tsx
│   └── notFound/NotFound.tsx
│
├── shared/config/ecossistema.ts  URLs base do ecossistema e resolvedor de "Veja também" (+ teste)
├── shared/ui/                  peças sem conhecimento de domínio
│   ├── layout/MainLayout.tsx   cabeçalho fixo, main e rodapé
│   ├── footer/Footer.tsx
│   ├── ctaButton/CTAButton.tsx
│   ├── videoPlayer/VideoPlayer.tsx
│   ├── eventGallery/EventGallery.tsx  grade + ampliação em <dialog> (setas, Esc, contador)
│   ├── pdf/PDFViewerButton.tsx
│   ├── skeleton/Skeleton.tsx
│   ├── backToTop/BackToTopButton.tsx
│   └── lib/                    cn(), ScrollToTop, useDocumentTitle
│
└── assets/                     logo (logo-icon.webp, 96×96); as imagens dos eventos vêm da API
```

A camada `features/` nasceu com o filtro da Home (`event-filter`). A camada
`widgets/` do FSD canônico **não existe** — nada no projeto pediu por ela ainda.

### Fluxo de dados

```text
Home.tsx  ou  Detail.tsx
      ↓
useEvents()  /  useEventBySlug(slug)        hook: loading, error, dado
      ↓
eventApi.getAll()  /  getBySlug()           camada de acesso, assíncrona
      ↓
events.data.ts                              cópia de reserva gerada a partir da API
```

A `eventApi` busca primeiro na API learntech-content (`src/shared/api/learntechContent.ts`,
tempo limite de 5 s) e, se a API não estiver configurada, falhar ou responder fora
do formato esperado, devolve os dados locais de `events.data.ts`. Nada acima dela
precisa saber de onde o dado veio.

`events.data.ts` não é editado à mão: é gerado por `npm run copias` no repositório
learntech-content a partir de `content/bootcamps/eventos/*.json`. As imagens da cópia
apontam para a API (`/media/...` em URL absoluta).

Os `relacionados` da cópia trazem só `{ tipo, id }` (a API publica `url` e `titulo`
prontos). Sem a API, `shared/config/ecossistema.ts` monta a URL a partir de
`tipo` + `id` para a seção "Veja também" não sumir. Programas vão para `/programs`
do learn-tech, porque a cópia não traz o `categoryFilter`.

### Variável de ambiente

| Nome | Efeito |
| --- | --- |
| `VITE_API_URL` | Endereço da API learntech-content. Sem ela, o site usa só os dados locais e **não** carrega o script de identificação do ecossistema (`/sdk/identificacao.js`). Modelo em `.env.example`. |

Revisão independente e plano de melhorias: `docs/claudeia/`.

---

## 📐 O contrato de dado

Todo evento obedece a `BootcampEvent`. O TypeScript recusa um card incompleto:

```ts
interface BootcampEvent {
  id: string;
  slug: string;              // vira a URL: /event/minas-summit
  title: string;
  institution: string;
  description: string;       // uma linha, aparece no card
  coverImage: string;        // import do Vite, não caminho solto
  altText: string;           // obrigatório — acessibilidade não é opcional
  category: "frontend" | "backend" | "fullstack" | "mobile" | "outros";
  status: "concluido" | "desejado";

  content: {
    longDescription: string;
    videoUrl?: string;
    gallery?: EventMedia[];
    paragraphs?: string[];       // seção "Sobre"
    curriculum: string[];
    officialLink: string;
    editions?: EventEdition[];   // linha do tempo por ano
    links?: EventLink[];
    certificate?: string;        // import do PDF
    sources?: EventLink[];       // seção "Fontes"
    relacionados?: { tipo: string; id: string; projeto?: string; titulo?: string; url?: string }[];
  };
}
```

### Como o catálogo está preenchido

Contagem da cópia `events.data.ts` em 03/11/2026 (27 eventos):

| Campo | Eventos que usam |
| --- | --- |
| `curriculum` (não vazio) | 26 |
| `paragraphs`, `sources`, `relacionados` | 27 |
| `links` | 13 |
| `gallery` | 6 (até 29 fotos, no Fator S) |
| `videoUrl` | 4 |
| `editions` | 3 |
| `certificate` | 1 (Minas Summit) |
| sem `officialLink` | 7 |

Distribuição por categoria: outros 14, fullstack 11, frontend 1, backend 1, mobile 0.

---

## 🎨 Identidade e convenções

A comunidade learnTECH tem **verde** como cor principal e um cubo com `{` e `}`
nos lados como logo.

```css
--color-brand-primary:   #00c853   /* verde learnTECH */
--color-brand-secondary: #7000ff
--font-sans: "Raleway", ui-sans-serif, system-ui, sans-serif
```

### ⚠️ Tailwind 4: a configuração mora no CSS

Este projeto usa **Tailwind 4**. Os tokens ficam no bloco `@theme` de
`src/app/styles/main.css` — **não existe `tailwind.config.js`**, e criar um não
adianta: o Tailwind 4 só lê um arquivo de configuração se você apontar para ele
com a diretiva `@config`.

Consequências práticas:

- token novo → `@theme` em `main.css`, e ele vira classe (`text-brand-primary`)
- cor de anel/borda a partir de variável → `ring-brand-primary`, **nunca**
  `ring-[--color-brand-primary]` (sintaxe da v3; na v4 não produz cor nenhuma
  e falha em silêncio)

### A regra verde/âmbar

| Estado | Cor | Onde aparece |
| --- | --- | --- |
| `concluido` | Emerald | etiqueta do card, selo da capa, botão de CTA, moldura do vídeo, marcador da edição |
| `desejado` | Amber | os mesmos pontos |

Os componentes de `shared/` recebem `isCompleted: boolean`. Eles não conhecem o
vocabulário do domínio — a tradução acontece uma vez só, no `Detail`.

### Títulos de aba

`useDocumentTitle` acrescenta ` | learnTECH`. Passe só o nome da página
(`useDocumentTitle("Eventos")`), nunca a marca junto.

---

## 🗺️ Rotas

| Rota | Página |
| --- | --- |
| `/` | listagem, agrupada em Concluídos e Metas de estudo; filtro em `?status=` e `?categoria=` |
| `/event/:slug` | detalhe do evento |
| `*` | 404 com `console.warn` do caminho acessado e `noindex` |

Verificação rápida:

```text
/                                     → lista os 27 eventos em dois grupos, com filtro
/?status=desejado&categoria=frontend  → estado vazio com "Limpar filtros"
/event/42-sp                          → detalhe da Piscine 42SP
/event/minas-summit                   → detalhe com linha do tempo e certificado
/event/fator-s-challenge              → galeria com ampliação (29 fotos)
/event/hackathon-inovacao-social-jf   → "Veja também" mesmo sem VITE_API_URL
/qualquer-coisa                       → 404 com noindex
```

---

## 📍 Momento atual

Lint, testes (Vitest, 25 testes em 4 arquivos) e build com checagem de tipos
limpos, e os três rodam na CI (`.github/workflows/ci.yml`). `npm audit --omit=dev`
sem avisos desde a atualização do React Router para 7.18. Registro da rodada de
MVP de 03/11/2026: `docs/claudeia/06-mvp-2026-11-03.md`.

### Corrigido

- [x] `tailwind.config.js` removido — era inerte no Tailwind 4 e declarava uma
      paleta ciano que nunca chegou ao build, contradizendo o verde real
- [x] Anel de foco sem cor: `ring-[--var]` é sintaxe da v3 e não gerava
      `--tw-ring-color`
- [x] Três links sociais de exemplo (`github.com/seuusuario`) no rodapé
- [x] As 5 edições do Minas Summit passaram a ser renderizadas — o campo existia
      e nenhum componente lia
- [x] `PDFViewerButton`: a URL do PDF já vem resolvida pelo Vite (o
      `new URL(..., import.meta.url)` anterior quebrava o caminho); ganhou Esc,
      trava de rolagem, retorno de foco, clique fora e nome acessível
- [x] Três `<h1>` por página viraram um
- [x] `<main>` aninhado dentro de `<main>` na página de detalhe
- [x] Dois `aria-labelledby` apontando para `id` inexistente
- [x] Título da capa sobrepondo o parágrafo, e seções desalinhadas da coluna
      do cabeçalho
- [x] `/vite.svg` no `<head>` — 404 em toda visita
- [x] `index.html` sem `lang="pt-BR"`, sem descrição e sem Open Graph
- [x] Status do evento invisível no card da listagem — a tela onde a escolha
      acontece era a única sem a informação
- [x] Roteador fantasma em `app/router/index.tsx`, `HelmetProvider` duplicado,
      bloco inalcançável no `Detail` e `event.id === '16'` cravado no JSX
- [x] `.history/` do VS Code versionado por engano
- [x] Filtro por status e categoria na Home, refletido na URL (03/11/2026)
- [x] Botão Voltar do detalhe não tira mais o visitante do site na entrada direta
- [x] "Veja também" aparece sem a API (URL montada a partir de `tipo` + `id`)
- [x] Logo de 205 KB (PNG 500×500) trocado por WebP 96×96 de 4 KB
- [x] Galeria com ampliação acessível; itens de vídeo não viram `<img>`
- [x] `prefers-reduced-motion`, link "Pular para o conteúdo", rótulos de 10 px
      subiram para 12 px, categoria em português no card

### Em aberto

| Prioridade | Item |
| --- | --- |
| 🟡 | JS inicial em 389 KB (130 KB gzip) + chunk compartilhado de 174 KB (50 KB gzip) — Framer Motion domina |
| 🟡 | Galeria em 6 de 27 eventos e vídeo em 4 |
| 🟡 | SPA sem pré-renderização: o robô que não executa JS só vê o `index.html` (o 404 responde 200, com `noindex`) |
| 🟡 | Tipografia e espaçamento fixos em alguns componentes (ver abaixo) |
| 🟡 | 27 arquivos fora do Prettier (`npm run format:check`); o passo não está na CI |
| 🟢 | 14 dos 27 eventos em `outros` e 11 em `fullstack` — as categorias viraram balde |

---

## 🗺️ Próximos passos

### Fase 1 — Peso

- [x] Páginas próprias de BQ e ByteClass (`public/eventos-vivos`, 11,2 MB de PNG) removidas em 28/10/2026; o conteúdo aproveitável foi para os eventos na API
- [x] JPGs de `assets/instituicoes/` removidos: a cópia de reserva usa as imagens WebP da API
- [ ] Avaliar `LazyMotion` do Framer Motion para cortar o bundle inicial

### Fase 2 — Conteúdo

- [ ] Preencher `gallery` nos eventos presenciais, que é onde a foto tem valor
- [ ] Revisar a categoria dos 14 eventos em `outros` e dos 11 em `fullstack`
- [ ] Definir um terceiro estado para eventos que **você organiza** — hoje o BQ
      Agenda Tech é `desejado`, o que descreve mal um evento do qual você é
      coorganizador

### Fase 3 — Responsividade fina

Os itens abaixo sobraram da auditoria de responsividade de julho/2026, já
descontando o que foi corrigido e o que era falso positivo:

- [ ] `EventCard`: `text-xl` e `p-6` sem escala — usar `text-lg md:text-xl` e
      `p-4 md:p-6`
- [ ] `Home`: `gap-8` fixo na grade — `gap-4 md:gap-8`
- [ ] Testar em 320px (iPhone SE); o que foi validado até agora foi 390px
- [ ] Conferir alvos de toque com 48px mínimo

Três apontamentos daquela auditoria **não procediam** e ficam registrados para
não voltarem: a meta tag `viewport` nunca esteve ausente, o breakpoint `sm:`
já era usado no `MainLayout`, e não existe menu de navegação para receber um
botão hamburger. Os outros dois — `-mt-32` no mobile e `text-8xl` em tela
pequena — foram resolvidos na reconstrução da página de detalhe.

### Fase 4 — Descoberta

- [ ] Pré-renderizar as rotas para que o Open Graph do `Detail` seja visível
- [ ] `canonical` e `og:url` com o domínio de produção

---

## 📊 Monitoramento

Core Web Vitals (LCP, INP, CLS) em produção via
[Vercel Speed Insights](https://vercel.com/docs/speed-insights), integrado no
`main.tsx`.

> A coleta só roda em produção. Em `npm run dev` o script não reporta nada, e o
> 404 de `/_vercel/speed-insights/script.js` no console local é esperado.

---

## 🌿 Workflow

| Branch | Papel |
| --- | --- |
| `main` | produção |
| `developer-mvp` | integração antes de subir |
| `feature/add-4-projetos` | migração de conteúdo de 4 repositórios antigos |

Convenção para trabalho novo: `feature/<tarefa>` para funcionalidade,
`hotfix/<tarefa>` para urgência na `main`. Tudo passa por `developer-mvp` antes
da produção.

### Code review

Toda alteração é lida antes de entrar na `main`, com três objetivos: achar
falha de lógica antes do usuário, manter o padrão do ecossistema (o FSD e as
convenções acima) e circular conhecimento sobre o que foi feito.

---

## 🕓 Histórico

**Versão 2** — reconstrução completa em React + TypeScript + Vite, com FSD,
página de detalhe dinâmica, Media Center, transições com Framer Motion,
skeleton de carregamento, 404 próprio e SEO por página.

**Versão 1** — página estática sobre template do W3.CSS, com informações fixas
que apenas levavam aos sites oficiais.

---

<p align="center">
  <a href="https://github.com/douglasabnovato">@douglasabnovato</a> — Desenvolvedor Fullstack
</p>