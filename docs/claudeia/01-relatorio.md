# 01 · Relatório de revisão independente — bootcamps

Data: 27/10/2026 · Branch: `feature/claudeia-2026-10-27` · Revisor: Claude (revisão estática, sem rodar build)

> Limite desta revisão: nenhum comando git, npm ou node foi executado. Tudo o que está aqui vem de leitura de arquivos e contagens feitas com `find`/`wc`/`python3`. Afirmações sobre o comportamento em produção que não puderam ser medidas estão marcadas como **estimativa** ou **não verificado**.

## 1. Visão geral

| Item | Situação | Evidência |
| --- | --- | --- |
| Produto | Hub de eventos e formações do ecossistema learnTECH ("Retrospectiva de formações e eventos") | `readme.md:4`, `index.html:9-11` |
| Objetivo | Mostrar a jornada técnica do autor em dois estados: concluído (verde) e meta de estudo (âmbar) — **inferido · confirmar** | `readme.md:20-30`, `context.txt` |
| Público | Recrutadores, comunidade tech de Juiz de Fora e alunos do ecossistema learnTECH/ByteClass — **inferido · confirmar** | textos de `Home.tsx:41-46`, `Footer.tsx:28` |
| Stack | React 19 · TypeScript 5.9 (strict) · Vite 7.3 · Tailwind 4 · Framer Motion 12 · React Router 7 · react-helmet-async · Vercel Speed Insights | `package.json`, versões travadas em `package-lock.json` |
| Arquitetura | Feature-Sliced Design parcial (`app/`, `pages/`, `entities/event/`, `shared/`) | árvore `src/` |
| Dados | API learntech-content (`VITE_API_URL`) com reserva local de 17 eventos (14 concluídos, 3 desejados) | `eventApi.ts`, `events.data.ts` (contagem por `grep -c`) |
| Hospedagem | Vercel, SPA com rewrite total para `/index.html` | `vercel.json` |
| Sites estáticos embutidos | `public/eventos-vivos/byteclass.dev` e `public/eventos-vivos/bq-agenda-tech` (HTML/CSS/JS puro), linkados como "site oficial" dos eventos 14 e 15 | `events.data.ts:377`, `events.data.ts:402` |
| Testes | Nenhum | sem `*.test.*`, sem script `test` |
| CI | Não havia — criado no lote 1 (`.github/workflows/ci.yml`) | — |
| Lint | ESLint 9 flat config com typescript-eslint e react-hooks 7 | `eslint.config.js` |

### Tamanho medido (exclui `.git`, `node_modules`, `dist`; 118 arquivos no total antes do lote 1)

| Tipo | Arquivos | Linhas |
| --- | --- | --- |
| `.tsx` | 19 | 940 |
| `.ts` | 10 | 743 (486 só em `events.data.ts`) |
| `.html` | 6 | 972 |
| `.css` | 4 | 1.599 |
| `.js` | 4 | 261 |
| `.json` | 6 | 4.690 (quase tudo `package-lock.json`) |
| `.md` | 3 | 511 |
| `.jpg` / `.jpeg` / `.png` | 34 / 1 / 23 | — |

| Pasta | Peso medido (`du -sh`) |
| --- | --- |
| `src/assets` | 5,6 MB (4,1 MB em `instituicoes/`) |
| `public` | 13 MB |
| `public/eventos-vivos/byteclass.dev` | 11 MB (6 PNGs entre 1,2 e 2,2 MB cada) |
| `public/eventos-vivos/bq-agenda-tech` | 1,4 MB |

Dependências: 9 de produção, 17 de desenvolvimento. Variável de ambiente usada: `VITE_API_URL` (nome apenas).

## 2. Avaliação por área

| Área | Nota | Resumo |
| --- | --- | --- |
| Objetivo | **8** | Cumpre bem: a regra verde/âmbar está aplicada de ponta a ponta |
| Eficiência de produto digital | **6** | Fluxo principal limpo, mas os sites embutidos têm formulários que não enviam nada |
| Performance de software | **6** | SPA leve em código; peso concentrado em imagens e Framer Motion |
| UX design | **7** | Hierarquia e estados bons; contraste de textos secundários e alguns detalhes de navegação |
| Engenharia | **6** | TS strict, FSD e fallback de API; sem testes, sem CI até agora, hooks sem cancelamento |

### 2.1 Objetivo — 8/10

| Pontos fortes | Evidência |
| --- | --- |
| Separação concluído × meta visível na listagem, no card, no detalhe, no CTA e no vídeo | `Home.tsx:11-12,49-68`, `EventCard.tsx:35-43`, `Detail.tsx:70-78`, `CTAButton.tsx:19-21` |
| Contador honesto na abertura ("14 concluídos e 3 no radar") calculado do dado | `Home.tsx:44-45` |
| Página de detalhe adapta o título da ementa ("Ementa dominada" × "Plano de estudos") | `Detail.tsx:170` |

| Falhas | Evidência |
| --- | --- |
| Dois estados não descrevem eventos que o autor organiza (BQ Agenda Tech como "desejado") — o próprio README reconhece | `readme.md` (Fase 2), `events.data.ts:390` |
| Piscine 42SP aparece como "Meta de estudo" com texto de aprovação + vaga cedida: o selo âmbar pode ler como "ainda não tentou" | `events.data.ts:33-36` |
| `context.txt` (prompt de IA) está desatualizado ("iniciando o item 4.3") e convive com o README como fonte de verdade | `context.txt` |

### 2.2 Eficiência de produto digital — 6/10

Fluxo principal: Home → card → `/event/:slug` → CTA para o site oficial / certificado / links.

| Pontos fortes | Evidência |
| --- | --- |
| Rota única por evento com slug legível; 404 próprio | `AppRouter.tsx:16-18` |
| Fallback local quando a API falha: o site nunca fica vazio | `eventApi.ts` |
| Certificado abre em modal com Esc, clique fora e retorno de foco | `PDFViewerButton.tsx:22-38` |

| Falhas | Gravidade | Evidência |
| --- | --- | --- |
| Formulário de inscrição do BQ Café e Tecnologia mostra "Inscrição realizada com sucesso" mas só faz `console.log` dos dados: a inscrição se perde e nome/e-mail/WhatsApp ficam no console | Alta | `public/eventos-vivos/bq-agenda-tech/script.js:37-55` |
| Formulário "RECEBER GRADE" do ByteClass não tem `action` nem handler: o envio recarrega a página e o e-mail se perde | Alta | `public/eventos-vivos/byteclass.dev/index.html` (form `capture-form-footer`) |
| Fotos dos palestrantes do BQ apontam para `./assets/inspiracao/` que não existe (arquivos estão em `./assets/imgs/`) — imagens quebradas | Média | `bq-agenda-tech/script.js:7,13` |
| 8 links `href="#"` sem destino no site ByteClass | Baixa | `byteclass.dev/index.html` (contagem `grep`) |
| Botão "Voltar" do detalhe usa `navigate(-1)`: quem chega por link direto sai do site | Média | `Detail.tsx:60` |
| Galeria vazia em 17/17 eventos e vídeo em 1/17: o "Media Center" quase nunca aparece | Baixa | `events.data.ts` (`gallery: []` em todos) |
| Imagens das 5 edições do Minas Summit são cadastradas mas nunca exibidas | Baixa | `types.ts:27`, `events.data.ts:427-451`, `Detail.tsx:134-160` |
| Links externos não foram testados nesta revisão (sem rede para o domínio) | — | ver `05-testes-manuais.md` |

### 2.3 Performance de software — 6/10

| Pontos fortes | Evidência |
| --- | --- |
| Rotas com `lazy` + `Suspense` | `AppRouter.tsx:5-7` |
| Imagens dos cards com `loading="lazy"`; iframes de vídeo lazy | `EventCard.tsx:30`, `VideoPlayer.tsx:27` |
| Busca à API com tempo limite de 5 s | `learntechContent.ts:4-17` |
| Speed Insights em produção | `main.tsx:3,13` |

| Falhas | Evidência |
| --- | --- |
| 11 MB de PNG no site ByteClass, maior arquivo 2,2 MB | medição `ls`/`du` |
| 4,1 MB de JPG das instituições; maior 391 KB, todos baixados pela Home (17 capas) | medição |
| Bundle principal citado no README: 415 KB (134 KB gzip) — **não medido nesta revisão** | `readme.md` (Em aberto) |
| Google Fonts com 4 pesos de Raleway bloqueando a renderização (há `display=swap`) | `index.html:28-32` |
| Arquivos sem uso em `src/assets`: `cubo.png` (639 KB), `logo-icon-1.png`, `profile/profile.jpeg` — não entram no bundle, só pesam no repositório | `grep` sem import |
| Sem cabeçalhos de cache/segurança em `vercel.json` (Vercel já aplica cache imutável em `/assets/*` com hash — **não verificado**) | `vercel.json` |

### 2.4 UX design — 7/10

| Pontos fortes | Evidência |
| --- | --- |
| Um `h1` por página, seções com `aria-labelledby` válidos | `Home.tsx:41`, `Detail.tsx:101-103` |
| Anel de foco visível global e nos cards | `main.css:11-13`, `EventCard.tsx:19` |
| Skeleton no detalhe e spinner com `sr-only` na Home | `DetailSkeleton.tsx`, `Home.tsx:16-19` |
| Grade responsiva 1/2/3 colunas | `Home.tsx:62` |

| Falhas | Evidência |
| --- | --- |
| Texto `text-zinc-600` (#52525b) sobre `zinc-950` dá contraste ≈ 2,6:1 (abaixo de 4,5:1) no rodapé; `text-zinc-500` ≈ 4,1:1 em textos pequenos — **estimativa por cálculo de luminância** | `Footer.tsx:60,63`, 10 ocorrências de `text-zinc-500/600` em `src` |
| Galeria com `cursor-pointer` sem ação ao clicar | `EventGallery.tsx:24` |
| Capas em cinza e opacidade 60% até o hover: no celular (sem hover) as capas ficam sempre apagadas | `EventCard.tsx:31` |
| Rodapé mistura inglês ("Connect with us") num site em português | `Footer.tsx:34` |
| Labels do formulário BQ não associadas aos campos (`<label>` sem `for`) | `bq-agenda-tech/index.html:59,68,77` |
| Sem tema claro (só escuro) — decisão de identidade, não falha | `main.css` |

### 2.5 Engenharia — 6/10

| Pontos fortes | Evidência |
| --- | --- |
| TypeScript `strict`, `noUnusedLocals`, `verbatimModuleSyntax` | `tsconfig.app.json` |
| Contrato de dado único (`BootcampEvent`) | `types.ts` |
| Camada de acesso isolada com fallback e `encodeURIComponent` no slug | `eventApi.ts` |
| README excelente: arquitetura, convenções, histórico e pendências | `readme.md` |
| `.env` ignorado; `.env.example` só com o nome da variável | `.gitignore`, `.env.example` |

| Falhas | Evidência |
| --- | --- |
| Zero testes automatizados | sem arquivos de teste |
| Sem CI até este lote | sem `.github/` |
| Resposta da API era aceita sem checar formato: um objeto no lugar de lista quebrava a Home (`events.filter`) — **corrigido no lote 1** | `eventApi.ts` (antes: linha 16) |
| `useEventBySlug` não cancela a requisição anterior nem limpa `event` ao trocar de slug; `error` é calculado e nunca lido | `useEventBySlug.ts:15-36`, `Detail.tsx:22` |
| `useEvents.error` é inalcançável (o `getAll` nunca rejeita) | `useEvents.ts:21-23`, `eventApi.ts` |
| `eslint-plugin-react-hooks` 7.0.1 traz regras do React Compiler; `setState` síncrono dentro de `useEffect` pode falhar no `npm run lint` — **não verificado** | `useEventBySlug.ts:17-18`, `package-lock.json` |
| Script de identificação carregado de `${VITE_API_URL}/sdk/identificacao.js` sem SRI/CSP: confiança total no servidor da API | `learntechContent.ts:31-40` |
| `innerHTML` com template string nos sites estáticos — seguro hoje (dados fixos), vira XSS se os dados vierem de fora | `bq-agenda-tech/script.js:20`, `byteclass.dev/main.js:81,99` |
| `og:image` com caminho relativo e Helmet só no cliente: prévia social sem imagem | `Detail.tsx:38,42` |
| Comentário de caminho errado (`// src/shared/ui/badge/Badge.tsx` em `entities/`) e `declarations.d.ts` redundante com `vite/client` | `Badge.tsx:1`, `declarations.d.ts` |
| README dizia "latência simulada" na `eventApi`, que não existe mais — **corrigido no lote 1** | `readme.md` |

## 3. Falhas em ordem de gravidade

### Engenharia

| # | Falha | Gravidade | Situação |
| --- | --- | --- | --- |
| 1 | Sem testes automatizados | Alta | proposto (T1–T3) |
| 2 | Sem CI | Alta | **executado** (`ci.yml`) |
| 3 | Resposta da API sem validação de formato | Média | **executado** |
| 4 | Lint provavelmente vermelho com react-hooks 7 | Média | proposto (R3), confirmar rodando `verificar.ps1` |
| 5 | `useEventBySlug` sem cancelamento / `error` ignorado | Média | proposto (R1) |
| 6 | Erro de JS ao clicar em `href="#"` no ByteClass | Baixa | **executado** |
| 7 | Script externo sem SRI/CSP; sem cabeçalhos de segurança | Baixa | proposto (R5) |
| 8 | Imagens pesadas (11 MB PNG + 4,1 MB JPG) | Média | proposto (P1–P2) |
| 9 | Documentação desatualizada (`eventApi`, `context.txt`) | Baixa | README **executado**; `context.txt` proposto |

### Decisão de produto (não executar sem aprovação)

| # | Falha | Por que é produto |
| --- | --- | --- |
| 1 | Inscrição do BQ confirma sucesso mas não grava nada | Coleta de dados é regra de negócio: precisa de destino (API learntech-content, planilha, Sympla) e aviso de privacidade (LGPD). Aperfeiçoar, não remover |
| 2 | Formulário "RECEBER GRADE" do ByteClass não envia | Idem: definir destino e entrega do PDF |
| 3 | Fotos dos palestrantes do BQ quebradas (caminho `inspiracao/`) | Corrigir o caminho passaria a exibir as imagens-placeholder ("homer") — o autor decide se quer placeholder ou foto real |
| 4 | Terceiro estado "organizo" para eventos do autor | Muda a regra verde/âmbar |
| 5 | Botão "Voltar" sair do site em acesso direto | Muda o comportamento de navegação |
| 6 | Capas apagadas no celular | Muda a aparência |
| 7 | Contraste dos textos secundários | Muda a aparência |
| 8 | Exibir imagens das edições e preencher galerias | Conteúdo |
