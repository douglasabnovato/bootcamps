<h1 align="center">🎓 Bootcamps</h1>

<p align="center">
  <strong>O hub de eventos e formações do ecossistema learnTECH.</strong><br />
  17 registros · 14 concluídos · 3 metas de estudo
</p>

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
  (Piscine 42SP, Ignite, Minas Summit, CodeXperience). Marcados em **verde**.
- **Prospecção** — o que está no radar e ainda não aconteceu. Marcados em
  **âmbar**. Não são promessas: são o roteiro declarado de evolução.

A distinção entre os dois estados não é decorativa. Ela define a cor do card, o
texto do botão, o título da seção de conteúdo e o agrupamento da listagem. É a
regra de negócio central do projeto.

---

## ▶️ Como rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run preview  # serve o build local
npm run lint
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
│   ├── App.tsx                 BrowserRouter + HelmetProvider + MainLayout
│   ├── router/
│   │   ├── AppRouter.tsx       rotas com lazy + Suspense + AnimatePresence
│   │   └── index.tsx           barril do AppRouter
│   └── styles/main.css         Tailwind 4: @theme e camada base
│
├── entities/event/             o domínio
│   ├── model/
│   │   ├── types.ts            contrato BootcampEvent
│   │   ├── useEvents.ts        lista, com loading e error
│   │   └── useEventBySlug.ts   um evento, com loading e error
│   ├── api/
│   │   ├── eventApi.ts         camada de acesso a dado (Promise + latência)
│   │   └── events.data.ts      os 17 eventos
│   └── ui/
│       ├── EventCard.tsx       card da listagem
│       └── badge/Badge.tsx     etiqueta de categoria
│
├── pages/
│   ├── home/Home.tsx           listagem agrupada por status
│   ├── detail/Detail.tsx       capa, mídia, edições, ementa e CTA
│   ├── detail/DetailSkeleton.tsx
│   └── notFound/NotFound.tsx
│
├── shared/ui/                  peças sem conhecimento de domínio
│   ├── layout/MainLayout.tsx   cabeçalho fixo, main e rodapé
│   ├── footer/Footer.tsx
│   ├── ctaButton/CTAButton.tsx
│   ├── videoPlayer/VideoPlayer.tsx
│   ├── eventGallery/EventGallery.tsx
│   ├── pdf/PDFViewerButton.tsx
│   ├── skeleton/Skeleton.tsx
│   ├── backToTop/BackToTopButton.tsx
│   └── lib/                    cn(), ScrollToTop, useDocumentTitle
│
└── assets/                     imagens das instituições e certificados
```

As camadas `widgets/` e `features/` do FSD canônico **não existem** — nada no
projeto pediu por elas ainda. Quando pedirem, entram aí.

### Fluxo de dados

```text
Home.tsx  ou  Detail.tsx
      ↓
useEvents()  /  useEventBySlug(slug)        hook: loading, error, dado
      ↓
eventApi.getAll()  /  getBySlug()           camada de acesso, assíncrona
      ↓
events.data.ts                              os 17 objetos
```

A `eventApi` devolve Promises com latência simulada. É de propósito: o dia em
que virar uma API de verdade, nada acima dela muda.

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
    curriculum: string[];
    officialLink: string;
    editions?: EventEdition[];   // linha do tempo por ano
    links?: EventLink[];
    certificate?: string;        // import do PDF
  };
}
```

### Como o catálogo está preenchido

| Campo | Eventos que usam |
| --- | --- |
| `curriculum` | quase todos |
| `editions` | 1 (Minas Summit, 5 edições) |
| `certificate` | 1 (Minas Summit) |
| `videoUrl` | 1 (Piscine 42SP) |
| `gallery` | 0 |

Distribuição por categoria: fullstack 10, outros 5, frontend 1, backend 1.

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
| `/` | listagem, agrupada em Concluídos e Metas de estudo |
| `/event/:slug` | detalhe do evento |
| `*` | 404 com `console.warn` do caminho acessado |

Verificação rápida:

```text
/                    → lista os 17 eventos em dois grupos
/event/42-sp         → detalhe da Piscine 42SP
/event/minas-summit  → detalhe com linha do tempo e certificado
/qualquer-coisa      → 404
```

---

## 📍 Momento atual

Build e checagem de tipos limpos (`tsc -b` e `vite build`). A rodada mais
recente atacou defeitos encontrados por auditoria, não por suposição — cada um
confirmado no CSS compilado ou no navegador.

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

### Em aberto

| Prioridade | Item |
| --- | --- |
| 🔴 | `public/eventos-vivos/byteclass.dev/assets/` tem **11,2 MB** em 6 PNGs |
| 🟡 | Bundle principal em 415 KB (134 KB gzip) — Framer Motion domina |
| 🟡 | Media Center construído, mas 1 de 17 eventos tem vídeo e nenhum tem galeria |
| 🟡 | SPA sem pré-renderização: o robô que não executa JS só vê o `index.html` |
| 🟡 | Tipografia e espaçamento fixos em alguns componentes (ver abaixo) |
| 🟢 | `context.txt` na raiz é um prompt de IA, não documentação do projeto |
| 🟢 | 10 dos 17 eventos em `fullstack` — a categoria virou balde |

---

## 🗺️ Próximos passos

### Fase 1 — Peso

- [ ] Converter os 6 PNGs do `byteclass.dev` para `.webp` (11,2 MB → ~1,5 MB)
- [ ] Converter os 18 JPGs de `assets/instituicoes/` (4,2 MB)
- [ ] Avaliar `LazyMotion` do Framer Motion para cortar o bundle inicial

### Fase 2 — Conteúdo

- [ ] Preencher `gallery` nos eventos presenciais, que é onde a foto tem valor
- [ ] Revisar a categoria dos 10 eventos em `fullstack`
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