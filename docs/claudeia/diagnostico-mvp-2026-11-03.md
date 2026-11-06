# Diagnóstico para o MVP: `bootcamps`

Data: 03/11/2026 · Branch local: `feature/tasks-03-11-2026` (sem diferença para a `main`; último commit `324b2e2 ci: actions em v5`).
Escopo: só leitura. Comandos executados nesta análise:

| Comando | Resultado |
|---|---|
| `npm test` | 2 arquivos, **7/7 verdes** (6,6 s) |
| `npx eslint .` | **0 problemas** |
| `npm run build` | verde. `index` 380,6 KB (124 KB gzip), chunk compartilhado `useDocumentTitle` 147,5 KB (41 KB gzip, Framer Motion), `Detail` 41,6 KB, **`logo-icon.png` 205 KB** |
| `npm run format:check` | **27 arquivos fora do Prettier** (o script existe, mas não está na CI) |
| `npm audit --omit=dev` | **2 high** em `react-router`/`react-router-dom` 7.13 (a maioria dos avisos é de SSR/RSC, mas há open redirect em `<Link>`/`useNavigate`); correção disponível |
| `gh issue list --state open` | **28 issues abertas**, quase todas de conteúdo e dependentes de relato do autor |

Números da cópia `src/entities/event/api/events.data.ts` (medidos com script): **27 eventos**, 24 `concluido` e 3 `desejado` (42SP, XP Educação, BQ Agenda Tech); categorias: `outros` 14, `fullstack` 11, `frontend` 1, `backend` 1, `mobile` 0; galeria em 6, vídeo em 4, edições em 3, certificado em 1, `paragraphs` e `sources` em 27, `relacionados` em 27 (mas **nenhum com `url`** na cópia), 7 sem `officialLink`, 1 com `curriculum` vazio.

---

## 1. Produto

**Proposta de valor.** Vitrine verificável da trajetória técnica do autor: o que ele fez (verde) e o que ele quer fazer (âmbar), com fontes, edições e ligações para os programas, artigos e empresas do ecossistema learnTECH. Para quem estuda tecnologia em Juiz de Fora/MG, é também um mapa de eventos e formações reais da região (GDG JF, CodeXperience, Capivara Tech, Hackathon de Inovação Social, UFJF, IF Sudeste MG) com relato de quem esteve lá.

**Público.** (1) Estudante e pessoa em transição de carreira que procura formação ou evento; (2) recrutador e comunidade que querem ver a trajetória do autor; (3) organizadores de eventos locais.

**Jornadas e estado atual.**

| Jornada | Estado | Evidência |
|---|---|---|
| Navegar eventos | Pronto | `Home.tsx:49-68`, agrupado em Concluídos e Metas |
| Filtrar por status | **Parcial**: só agrupamento fixo, sem filtro | `Home.tsx:11-12` |
| Filtrar por categoria | **Ausente**. A categoria aparece no card como texto cru (`outros`, `fullstack`) | `EventCard.tsx:48` |
| Buscar por nome/instituição | **Ausente** | não existe `features/` |
| Ver detalhe | Pronto: capa, mídia, edições, Sobre, ementa, CTA, relacionados, fontes | `Detail.tsx:45-331` |
| Galeria | **Parcial**: grade sem ampliar (lightbox), `cursor-pointer` sem ação, item `type: "video"` ignorado, fotos com `opacity-60` | `EventGallery.tsx:24-31` |
| Relacionados | **Depende da API**: na cópia local nenhum item tem `url`, então a seção some sem API | `Detail.tsx:285`, `events.data.ts:63-67` |
| Voltar | **Defeito conhecido**: `navigate(-1)` tira o visitante do site quando ele chega por link direto (B11 de `docs/claudeia/05-testes-manuais.md`) | `Detail.tsx:60` |
| 404 | Pronto, mas é "soft 404" (HTTP 200 e sem `noindex`) | `NotFound.tsx`, `vercel.json:2` |

**Pronto x lacunas para o MVP.**
- Pronto: dados vindos da API com reserva local validada (`eventApi.ts:14-41`), regra verde/âmbar consistente, edições com "Eu estive lá", fontes em todos os eventos, CI com lint, testes e build, cabeçalhos de segurança (`vercel.json:3-12`), sitemap com 27 URLs.
- Lacunas que bloqueiam "MVP finalizado": filtro por status/categoria (a jornada central do pedido); relacionados sem a API; botão Voltar; galeria sem ampliação; categoria `outros` com 14 de 27 (o rótulo não ajuda a escolher); README desatualizado (ver Engenharia).
- Decisão de produto pendente: terceiro estado para evento **organizado** pelo autor (BQ Agenda Tech segue `desejado`, issue #54). O schema da API só aceita `concluido | desejado` (`learntech-content/src/schemas/bootcamps.ts:53`).

**Métricas propostas.**
- Ativação: % de visitas à Home que abrem um detalhe (hoje não medido; só Speed Insights em `main.tsx:13`).
- Uso de filtro: % de sessões que aplicam filtro, quando existir.
- Saída qualificada: cliques no CTA oficial e em "Veja também" (prova o valor do ecossistema).
- Qualidade: LCP < 2,5 s, CLS < 0,1, INP < 200 ms (Speed Insights); Lighthouse a11y ≥ 95.
- Conteúdo: eventos com galeria (6/27), com edição (3/27), em `outros` (14/27, meta ≤ 6).

---

## 2. Engenharia

**Arquitetura.** FSD parcial: `app/`, `entities/event/` (model, api, ui), `pages/`, `shared/`. **Não existe `features/`** (o pedido cita entities/features/pages/shared; o README admite em "As camadas widgets/ e features/ ... não existem"). Filtros e busca seriam a primeira `features/event-filter`. Fluxo `Home/Detail → useEvents/useEventBySlug → eventApi → buscarRecurso (5 s) | events.data.ts` está limpo.

**Tipos.**
- `types.ts:47-72` espelha o schema da API, mas é mantido à mão: se o schema mudar, nada quebra no build. Risco de divergência silenciosa.
- `buscarRecurso` usa `as T` (`learntechContent.ts:14`); a validação mínima está em `eventApi.ts:18,33` (ADR-01). Suficiente para o MVP.
- `useEvents` tem estado de erro que **nunca dispara**, porque `eventApi.getAll` engole a falha e devolve a cópia (`useEvents.ts:21-23`, `eventApi.ts:20-23`). A tela de erro de `Home.tsx:23-36` é código morto na prática. `Detail.tsx:22` ignora `error`.
- `EventGallery` declara um tipo local sem `type` (`EventGallery.tsx:5-9`), então vídeos da galeria viram `<img>`.
- Chave de lista frágil: `paragrafo.slice(0, 40)` (`Detail.tsx:208`), `item` da ementa (`Detail.tsx:228`).

**Testes.** 7 testes de unidade (contrato da cópia e fallback da API). Faltam: testes de componente (ambiente `node`, sem jsdom nem Testing Library), teste dos hooks e e2e. Os e2e estão no repositório da API (`learntech-content/e2e/fluxos.spec.mjs:33-46`) e **o teste "Veja também" só passa com a API no ar**, porque a cópia não tem `url` nos relacionados. Backlog da API: e2e, Lighthouse e axe "falta rodar" (`learntech-content/docs/engenharia/backlog.md:29,36-38`).

**CI.** `.github/workflows/ci.yml`: `npm ci`, lint, test, build em Node 22. Faltam `format:check`, `npm audit` e e2e de fumaça. O comentário da linha 1 e `docs/README.md` ("CI roda lint e build", "Ainda sem testes automatizados") estão desatualizados.

**Acessibilidade.**
- Bom: um `h1` por página, `aria-labelledby` válidos, `alt` obrigatório, foco visível nos cards, modal de PDF com Esc e retorno de foco.
- Problemas: texto `text-[10px]` em 9 lugares (badges, instituição, rótulos de atividade), vários em `zinc-500` sobre `zinc-900/950`, contraste provavelmente abaixo de 4,5:1 (`EventCard.tsx:49`, `Badge.tsx:13,20`, `Detail.tsx:179,301`); imagens do card em `opacity-60 grayscale` (`EventCard.tsx:31`); sem `prefers-reduced-motion` (nenhum `MotionConfig`); sem link "pular para o conteúdo" (`MainLayout.tsx:15-31`); botão do 404 sem anel de foco (`NotFound.tsx:40-42`); `aria-label` do card (`EventCard.tsx:18`) apaga o status e a descrição para leitor de tela; rodapé em inglês, "Connect with us" (`Footer.tsx:34`).

**SEO.**
- `index.html` tem descrição, OG, canonical e `lang`. `robots.txt` e `sitemap.xml` (27 URLs) existem.
- SPA sem pré-renderização: o OG por evento (`Detail.tsx:32-43`) só existe após JS, então link compartilhado mostra o OG genérico. `og:url` usa `window.location.href` (`Detail.tsx:39`), sem `canonical` por página.
- Soft 404 sem `<meta name="robots" content="noindex">`.
- Sem dados estruturados (`schema.org/Event` ou `Course`), que dariam rich results.

**Performance e imagens.**
- `logo-icon.png` de **205 KB** carregado no cabeçalho e no rodapé (`MainLayout.tsx:6`, `Footer.tsx:4`), exibido em 40×40. É o maior ativo do build e provável candidato a LCP no mobile.
- Framer Motion no caminho crítico (chunk de 147 KB); `LazyMotion` está no README como pendência.
- Capa do detalhe sem `width/height` nem `fetchpriority="high"` (`Detail.tsx:51-56`); galeria sem dimensões (CLS).
- Duas capas hospedadas fora da API: Pixabay (`events.data.ts:2021`, Jogos Universitários) e Luma CDN (`events.data.ts:2091`, Capivara Tech). Risco de link quebrado e de imagem genérica sem relação direta com o evento (a de rugby).
- Fonte Raleway via Google Fonts com 4 pesos, bloqueando renderização.

**Dívidas e riscos.**

| # | Item | Gravidade |
|---|---|---|
| D1 | `react-router` 7.13 com 2 avisos high | Alta (correção trivial) |
| D2 | Relacionados invisíveis sem API; e2e acoplado à API | Alta para o MVP |
| D3 | README e `docs/README.md` com números e estados errados (17/22 eventos, "gallery 0", "sem testes", "CI só lint e build") | Média: engana quem chega |
| D4 | Sem filtro e sem `features/` | Alta para o MVP |
| D5 | Tipos à mão, sem checagem contra o schema | Média |
| D6 | 27 arquivos fora do Prettier | Baixa |
| D7 | Soft 404 e OG só no cliente | Média |
| D8 | `vite.config.ts:18` com `usePolling: true` (CPU alta no dev) | Baixa |
| D9 | `Badge.tsx:1` com caminho antigo no comentário (`src/shared/ui/badge`) | Baixa |

---

## 3. Conteúdo (até 5 ideias)

Regra aplicada: evento só com participação real do autor; formação `desejado` é permitida (`learntech-content/docs/processo/regras-editoriais.md`, tabela da seção 1 e seção 7). Toda página precisa de fontes de 2 domínios.

| # | Ideia | Destino | Tipo | Depende do autor? |
|---|---|---|---|---|
| C1 | **Minas Summit 2026: relato da edição** (já `realizado` na cópia, sem `participacao: "presente"` e sem galeria). Acrescentar o relato, as palestras assistidas e até 10 fotos | `bootcamps/eventos/minas-summit` | Melhoria | Sim, issue #53 |
| C2 | **BQ Agenda Tech: passar a `concluido`** com edição (data, local, temas) e galeria; decidir o terceiro estado "organizado" | `bootcamps/eventos/bq-agenda-tech` | Melhoria | Sim, issue #54 (perguntas já postadas) |
| C3 | **Oracle Next Education (ONE)**, formação gratuita on-line da Oracle com Alura, para iniciantes, com 10ª edição em 2026 e trilhas de IA. Alto valor para quem estuda em JF sem custo | `bootcamps/eventos/oracle-next-education` | Formação `desejado` | Não (confirmar se o autor quer como meta) |
| C4 | **Hackers do Bem (RNP/MCTI)**, formação gratuita em cibersegurança com nivelamento, básico e residência com bolsa; 25 mil vagas anunciadas em 2026. Preenche a lacuna de segurança no catálogo | `bootcamps/eventos/hackers-do-bem` | Formação `desejado` | Não (idem C3) |
| C5 | **JF Summit** (4ª edição em 27 e 28/08/2026, Terrazzo, com Arena UFJF/Critt). Maior evento de inovação da cidade, já mapeado na issue #21. Só entra como evento se o autor confirmar presença em 2025 ou 2026; caso contrário, a informação vira fonte nos eventos da UFJF | `bootcamps/eventos/jf-summit` | Evento `concluido` | Sim, issue #21 |

Também revisar no lote: categoria dos 14 `outros` e 11 `fullstack` (sugestão de categorias novas no schema: `comunidade`, `empreendedorismo`, `academico`); capas externas de C-Jogos Universitários e Capivara Tech trocadas por imagens próprias na API; o hackTown (issue #41) **não** pode entrar como evento `desejado` pela regra de participação real: a edição 2026 já ocorreu (3 a 7/09/2026), então só entra se o autor tiver ido.

Fontes da pesquisa: [ONE, PR Newswire, jun/2026](https://www.prnewswire.com/br/comunicados-para-a-imprensa/inscricoes-para-o-oracle-next-education-entram-na-reta-final-com-bolsas-gratuitas-em-ia-302800555.html), [ONE, Convergência Digital](https://convergenciadigital.com.br/mercado/oracle-reabre-programa-para-formar-em-ti-ciencia-de-dados-e-inteligencia-artificial-no-brasil/), [Hackers do Bem, Convergência Digital](https://convergenciadigital.com.br/seguranca/hackers-do-bem-abre-25-mil-novas-vagas-para-formacao-em-ciberseguranca-em-2026/), [Hackers do Bem, Agência Gov](https://agenciagov.ebc.com.br/noticias/202603/programa-hackers-do-bem-oferece-aulas-on-line-ao-vivo-para-niveis-avancados), [JF Summit 2026, Itatiaia](https://www.itatiaia.com.br/juizdefora/a-gente-pode-o-que-quiser-jf-summit-2026-termina-com-balanco-positivo/), [Arena Critt, UFJF](https://www2.ufjf.br/critt/2026/09/21/ufjf-realiza-arena-critt-para-promocao-da-inovacao-no-jf-summit-2026/), [hackTown 2026, Sympla](https://sympla.com.br/evento/festival-hacktown-2026/3288395), [hackTown 2026, Diário do Comércio](https://diariodocomercio.com.br/economia/hacktown-2026-balanco-completo-destaques/). Datas e vagas precisam ser conferidas no site oficial antes de publicar (regra 4: número com fonte e data).

---

## 4. Plano de ação executável hoje (ordem de prioridade)

Nenhuma tarefa precisa de segredo nem altera `events.data.ts`.

**T1. Atualizar `react-router-dom`.**
- Objetivo: zerar os 2 avisos high.
- Arquivos: `package.json`, `package-lock.json`.
- Pronto quando: `npm audit --omit=dev` mostra 0 high; `npm test`, `npx eslint .` e `npm run build` verdes; `/`, `/event/minas-summit` e `/xyz` funcionam em `npm run preview`.
- Risco: baixo (mesma major 7).

**T2. Filtro por status e categoria na Home (primeira `features/`).**
- Objetivo: fechar a jornada "filtrar".
- Arquivos: novo `src/features/event-filter/` (componente e função pura `filtrarEventos`), `src/pages/home/Home.tsx`, teste `filtrarEventos.test.ts`.
- Pronto quando: botões "Todos / Concluídos / Metas" e chips de categoria com contagem; filtro refletido na URL (`?status=concluido&categoria=outros`) e preservado ao voltar do detalhe; estado vazio com "Limpar filtros"; teste unitário cobre combinação status + categoria e lista vazia.
- Risco: médio (o `layoutId` do Framer pode animar estranho ao refiltrar; testar).

**T3. Botão Voltar seguro.**
- Objetivo: não tirar o visitante do site (B11).
- Arquivos: `src/pages/detail/Detail.tsx:59-65`.
- Pronto quando: com `location.key === "default"` (entrada direta), o botão vai para `/`; vindo da Home, volta preservando os filtros da T2. Verificado abrindo `/event/minas-summit` em aba nova.
- Risco: baixo.

**T4. Relacionados funcionando sem API.**
- Objetivo: a seção "Veja também" aparecer com a cópia local.
- Arquivos: `src/pages/detail/Detail.tsx:285-308` e um mapa `src/shared/config/ecossistema.ts` com a URL base de cada projeto (`learn-tech-pied.vercel.app`, `douglasabnovato.github.io/career`, etc.) para montar a URL a partir de `tipo` + `id` quando `url` faltar. Alternativa melhor, no outro repositório: `npm run copias` exportar `url` e `titulo`, e esta tarefa só documenta.
- Pronto quando: `npm run dev` sem `VITE_API_URL` mostra "Veja também" em `/event/hackathon-inovacao-social-jf`; teste unitário do resolvedor de URL.
- Risco: médio (duplica regra de URL que é da API; preferir a correção no gerador e abrir issue lá).

**T5. Logo leve e imagens com dimensões.**
- Objetivo: cortar ~200 KB e reduzir CLS.
- Arquivos: `src/assets/logo-icon.png` → `logo-icon.webp` 80×80 (ou SVG), `MainLayout.tsx:6,18-22`, `Footer.tsx:4,17-21`, `Detail.tsx:51-56` (`fetchpriority="high"`, `decoding="async"`), `EventCard.tsx:26-32` (`width`/`height`), `EventGallery.tsx:26-31`.
- Pronto quando: `npm run build` sem nenhum ativo de imagem acima de 20 KB; Lighthouse mobile sem aviso "Properly size images" para o logo.
- Risco: baixo.

**T6. Acessibilidade de baixo custo.**
- Objetivo: chegar perto de WCAG 2.2 AA sem redesenho.
- Arquivos: `App.tsx` (`<MotionConfig reducedMotion="user">`), `MainLayout.tsx` (link "Pular para o conteúdo" e `id="conteudo"` no `main`), `EventCard.tsx:18,31,49` (tirar `aria-label` que oculta o status, `opacity-60` só no hover-out em telas com mouse, rótulos em `text-xs` e `zinc-400`), `Badge.tsx`, `NotFound.tsx:40` (anel de foco), `Footer.tsx:34` ("Redes").
- Pronto quando: axe (DevTools ou `learntech-content/e2e/acessibilidade.spec.mjs` com `E2E_BOOTCAMPS=http://localhost:4173`) sem violações "serious/critical" em `/` e `/event/codexperience`; navegação só com teclado registrada em `docs/claudeia/05-testes-manuais.md`.
- Risco: baixo (mudança visual pequena; mostrar ao autor).

**T7. Galeria com ampliação.**
- Objetivo: a foto de cobertura ter valor (6 eventos com 3 a 29 fotos).
- Arquivos: `src/shared/ui/eventGallery/EventGallery.tsx` (cada item vira `<button>`, diálogo com `<dialog>` nativo, setas e Esc, contador "3 de 29"), reaproveitar o padrão de foco do `PDFViewerButton.tsx`; tipo local passa a aceitar `type`.
- Pronto quando: em `/event/fator-s-challenge`, clicar ou Enter abre a foto, ←/→ navegam, Esc fecha e o foco volta à miniatura; item `type: "video"` não vira `<img>`.
- Risco: médio (a11y do diálogo; testar no mobile).

**T8. Documentação e CI coerentes com o código.**
- Objetivo: quem chega confiar no README.
- Arquivos: `readme.md` (27 eventos, 24/3, tabela de preenchimento com os números medidos, rotas de verificação, "Em aberto"), `docs/README.md` (testes e CI), `.github/workflows/ci.yml:1` (comentário) e passo `npm run format:check` **depois** de rodar `npx prettier --write "src/**/*.{ts,tsx}"` num commit só de formatação; soft 404 com `<Helmet><meta name="robots" content="noindex" /></Helmet>` em `NotFound.tsx`.
- Pronto quando: `npm run format:check` verde e obrigatório na CI; nenhum número do README diverge do script de contagem; `/xyz` tem `noindex` no DOM.
- Risco: baixo (o commit de formatação mexe em 27 arquivos; isolar para facilitar a revisão).

---

## 5. Issues propostas

**I1. Filtros e busca na listagem de eventos**
Contexto: a Home só agrupa por status (`Home.tsx:11-12`) e não há filtro por categoria nem busca. Com 27 eventos e crescendo, a escolha fica lenta, e o e2e do backlog já prevê "filtros".
Critérios: (1) filtros de status e categoria com contagem, refletidos na URL; (2) busca por título e instituição, sem acento e sem caixa; (3) estado vazio com "Limpar filtros"; (4) teste unitário da função de filtro e e2e "filtrar e abrir".
Labels: `enhancement`, `frontend`, `mvp`.

**I2. Galeria com lightbox acessível**
Contexto: `EventGallery` mostra miniaturas com `cursor-pointer` que não fazem nada e ignora itens de vídeo. Seis eventos têm galeria (até 29 fotos no Fator S).
Critérios: (1) abrir com clique e Enter; (2) navegar por setas e por gesto no mobile; (3) Esc fecha e devolve o foco; (4) sem violação axe serious/critical em `/event/fator-s-challenge`.
Labels: `enhancement`, `acessibilidade`, `mvp`.

**I3. Relacionados e e2e independentes da API**
Contexto: a cópia local não traz `url` em nenhum dos relacionados, então "Veja também" some quando a API falha, e o e2e `fluxos.spec.mjs:42-45` depende da API. Corrigir no gerador `exportar-copias.mjs` do learntech-content.
Critérios: (1) a cópia gerada tem `url` e `titulo` em 100% dos relacionados; (2) a seção aparece com `npm run dev` sem `VITE_API_URL`; (3) teste em `events.data.test.ts` exige `url` em todo relacionado.
Labels: `bug`, `dados`, `cross-repo`.

**I4. Pré-renderização das rotas e SEO por evento**
Contexto: o OG e a descrição de cada evento só existem depois do JS, então link compartilhado mostra o cartão genérico, e o 404 responde 200.
Critérios: (1) `dist/event/<slug>/index.html` gerado no build para os 27 slugs, com `title`, `description`, `og:*` e `canonical` próprios; (2) JSON-LD `Event` ou `Course` por página, válido no Rich Results Test; (3) rota inexistente com `noindex`; (4) build continua abaixo de 60 s.
Labels: `seo`, `performance`, `mvp`.

**I5. Revisar categorias e terceiro estado "organizado"**
Contexto: 14 de 27 eventos estão em `outros` e 11 em `fullstack`; o BQ Agenda Tech, coorganizado pelo autor, segue `desejado` (#54). Exige mudança no schema da API e no tipo `types.ts`.
Critérios: (1) decisão registrada em `learntech-content/docs/DECISOES.md`; (2) nenhuma categoria com mais de 40% dos eventos; (3) estado `organizado` (ou equivalente) com cor e texto definidos e aplicado no card, no detalhe e no filtro; (4) `npm run copias` e testes verdes nos dois repositórios.
Labels: `produto`, `dados`, `decisão-do-autor`.

**I6. Performance: Lighthouse mobile ≥ 90**
Contexto: o logo PNG de 205 KB e o Framer Motion (147 KB) estão no caminho crítico; capas sem dimensões. Medição já prevista no backlog da API (`npm run ux:lighthouse`).
Critérios: (1) relatório Lighthouse mobile de `/` e `/event/codexperience` anexado, com Performance ≥ 90 e Acessibilidade ≥ 95; (2) JS inicial ≤ 100 KB gzip (com `LazyMotion`); (3) LCP < 2,5 s e CLS < 0,1 no Speed Insights por 7 dias.
Labels: `performance`, `mvp`.

---

## 6. Melhorias do processo

1. **Definição de MVP escrita e fechada.** Hoje o "pronto" está espalhado (README "Em aberto", backlog da API, manual de testes). Proposta: uma lista curta em `docs/README.md` com as jornadas e os critérios desta análise (filtro, detalhe, galeria, relacionados sem API, Lighthouse, axe) e marcar cada item com o link do PR.
2. **Números do README gerados, não escritos.** A contagem de eventos e campos diverge em três lugares (README 17, árvore do README 22, cópia 27). Um script `npm run resumo` (ou a mesma saída de `npm run copias`) que imprime a tabela evita a deriva.
3. **Checagem de contrato entre schema e tipo.** O gerador de cópias pode emitir também o tipo TypeScript a partir do schema Zod (`z.infer`), ou um teste que compara as chaves. Campo novo deixa de passar despercebido.
4. **CI mais completa e barata:** `format:check`, `npm audit --audit-level=high` e um e2e de fumaça contra `npm run preview` (sem depender da produção nem da API).
5. **Triagem das 28 issues.** Separar com labels `depende-do-autor`, `conteudo`, `engenharia`, `fora-de-escopo` (as sete classificadas como X no lote 2026-11-03: #8, #14, #19, #23, #26, #42, #45) e fechar ou mover as de estratégia pessoal. Issues de engenharia hoje não existem no repositório: as 6 da seção 5 preenchem isso.
6. **Teste manual versionado com data.** `docs/claudeia/05-testes-manuais.md` ainda fala em 14/3 eventos. Atualizar a cada leva de conteúdo e registrar quem rodou e quando, seguindo a regra "escrito, não executado" do backlog.
7. **Regra para capas externas:** toda imagem passa pela API (`/media/...`), sem hotlink de Pixabay ou Luma; checar no build da API.
