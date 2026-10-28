# 04 · Testes automatizados e verificação — bootcamps

Data: 27/10/2026

## Situação

| Item | Existe? | Evidência |
| --- | --- | --- |
| Script `test` no `package.json` | **não** | `package.json` (scripts: `dev`, `build`, `lint`, `preview`) |
| Arquivos de teste | **não** | nenhum `*.test.*` / `*.spec.*` |
| Lint | sim | `npm run lint` (`eslint .`) |
| Checagem de tipos | sim | `tsc -b` dentro de `npm run build` |
| Build de produção | sim | `vite build` dentro de `npm run build` |
| CI | sim, a partir do lote 1 | `.github/workflows/ci.yml` |

## Como rodar no Windows

Na raiz do projeto (pasta `bootcamps`):

```powershell
powershell -ExecutionPolicy Bypass -File docs\claudeia\verificar.ps1
# ou, sem reinstalar dependências:
powershell -ExecutionPolicy Bypass -File docs\claudeia\verificar.ps1 -PularInstalacao
```

O script para no primeiro erro (sai com código 1) e mostra o que cada etapa confere.

| Etapa | Comando / checagem | O que confere | Para no erro? |
| --- | --- | --- | --- |
| 0 | `package.json` com `name = learntech-bootcamps` | Está na pasta certa | sim |
| 1 | `node -v`, `npm -v` | Node 20.19+ ou 22.12+ (Vite 7) | sim |
| 2 | `npm ci` | Instalação idêntica ao `package-lock.json` | sim |
| 3 | `npm run lint` | ESLint + typescript-eslint + react-hooks | sim |
| 4 | `npm run build` | `tsc -b` (tipos strict) + `vite build` | sim |
| 5 | Arquivos em `dist/` | `index.html`, sites estáticos copiados, `.js` gerados; mostra o total em KB | sim |
| 6 | `href="/..."` do `index.html` | Ícones e manifest existem em `public/` | sim |
| 7 | `"@/assets/..."` em `events.data.ts` | Capas e certificado existem | sim |
| 8 | `src`/`href`/`./assets/` nos sites de `public/eventos-vivos` | Arquivos referenciados existem | **não** (só AVISO) |

### Resultado esperado hoje

| Etapa | Expectativa | Por quê |
| --- | --- | --- |
| 3 (lint) | **Pode falhar** | `eslint-plugin-react-hooks` 7.0.1 inclui regras do React Compiler; `setLoading(true)` / `setError(false)` síncronos no `useEffect` de `useEventBySlug.ts:17-18` são o candidato. Não verificado — esta revisão não rodou npm. Se falhar, é o item S3 do plano, não regressão do lote 1 |
| 8 | **2 avisos conhecidos** | `bq-agenda-tech/script.js` aponta para `./assets/inspiracao/homer-1.jpg` e `homer-2.jpg`, que estão em `./assets/imgs/` (decisão de produto PR3) |

## O que NÃO é coberto

| Lacuna | Como cobrir |
| --- | --- |
| Lógica do fallback da API | Testes T2 (Vitest) — proposto |
| Regra verde/âmbar e contagens da Home | Testes T3 — proposto |
| Integridade do catálogo (slugs/ids únicos) | Teste T4 — proposto; hoje só a etapa 7 confere arquivos |
| Comportamento visual, responsivo, animações | Roteiro manual `05-testes-manuais.md` |
| Links externos (sites oficiais, YouTube, Sympla) | Roteiro manual |
| Identificação do ecossistema (`/sdk/identificacao.js`) | Roteiro manual, com `VITE_API_URL` configurada |
| Formulários dos sites estáticos | Roteiro manual (hoje não enviam nada) |

## Proposta de testes (lote 2, precisa aprovar dependências)

Dependências de desenvolvimento: `vitest`, `@testing-library/react`, `jsdom`. Scripts: `"test": "vitest"`, `"test:run": "vitest run"`. Depois, adicionar `npm run test:run` ao `ci.yml` e uma etapa no `verificar.ps1`.

| ID | Arquivo | Casos |
| --- | --- | --- |
| T2 | `src/entities/event/api/eventApi.test.ts` | sem `VITE_API_URL` → 17 locais; API responde lista → usa API; API responde `{}` → locais; `getBySlug` com slug inexistente → `undefined` |
| T3 | `src/pages/home/Home.test.tsx` | renderiza "14 concluídos" e "3 no radar"; grupos "Concluídos" e "Metas de estudo" |
| T3 | `src/pages/detail/Detail.test.tsx` | `/event/minas-summit` mostra "Edições" e "Ver certificado"; `/event/nao-existe` mostra 404; meta mostra "Plano de estudos" |
| T4 | `src/entities/event/api/events.data.test.ts` | `slug` e `id` únicos; `officialLink` não vazio; `altText` não vazio |
