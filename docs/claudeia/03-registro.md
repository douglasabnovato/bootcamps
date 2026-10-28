# 03 · Registro do lote 1 — bootcamps

Data: **27/10/2026** · Branch: `feature/claudeia-2026-10-27` (já ativa; nenhum comando git foi executado — o dono revisa e faz o commit)

Restrições respeitadas: sem git, sem npm/node/build, nenhum arquivo apagado, `.env` não lido, fins de linha preservados (CRLF nos arquivos existentes editados; arquivos novos em LF, exceto `verificar.ps1` em CRLF com BOM para o Windows PowerShell 5.1).

## Executado

| Arquivo | Tipo | O que mudou | Muda o produto? | Como verificar |
| --- | --- | --- | --- | --- |
| `src/entities/event/api/eventApi.ts` | editado (CRLF mantido) | `getAll` só aceita lista; `getBySlug` só aceita objeto com `slug` string, `content` e `content.curriculum` array. Fora disso, lança erro e cai no fallback local já existente | não | `npm run build`; com `VITE_API_URL` apontando para algo que responda `{}`, a Home ainda lista 17 eventos e o console avisa "formato inválido" |
| `public/eventos-vivos/byteclass.dev/main.js` | editado (CRLF mantido) | No smooth scroll, `document.querySelector(href)` dentro de `try/catch`. Antes, clicar em links `href="#"` gerava `SyntaxError` no console; o comportamento visível (nada acontece) é o mesmo | não | Abrir `/eventos-vivos/byteclass.dev/index.html`, clicar em "Mentoria Instrutor" no rodapé: sem erro no console. Links `#hero`, etc. continuam rolando |
| `public/eventos-vivos/bq-agenda-tech/index.html` | editado (CRLF mantido) | `<meta name="description">` com texto tirado do próprio site (hero + local) | não (só metadado) | Ver código-fonte da página |
| `readme.md` | editado (CRLF mantido) | Linha da árvore e parágrafo sobre `eventApi` (dizia "latência simulada", que não existe mais); nova tabela com `VITE_API_URL` (nome apenas) e ponteiro para `docs/claudeia/` | não | Ler seção "Fluxo de dados" |
| `.github/workflows/ci.yml` | novo | `npm ci` → `npm run lint` → `npm run build` em Node 22, em push para `main`, `developer-mvp`, `feature/**`, `hotfix/**` e em PRs | não | Aba Actions do GitHub após o push |
| `docs/claudeia/01-relatorio.md` | novo | Relatório | não | — |
| `docs/claudeia/02-plano-e-arquitetura.md` | novo | Arquitetura, ADRs, plano | não | — |
| `docs/claudeia/03-registro.md` | novo | Este registro | não | — |
| `docs/claudeia/04-testes-automatizados.md` | novo | Explica o script de verificação | não | — |
| `docs/claudeia/verificar.ps1` | novo | Verificação local no Windows | não | `powershell -ExecutionPolicy Bypass -File docs\claudeia\verificar.ps1` |
| `docs/claudeia/05-testes-manuais.md` | novo | Roteiro manual | não | — |

### Erros evidentes anotados antes de corrigir

| Erro | Onde | Decisão |
| --- | --- | --- |
| `SyntaxError: '#' is not a valid selector` ao clicar em link vazio | `byteclass.dev/main.js` (antiga linha 151) | Corrigido (não muda produto) |
| Home quebraria com resposta da API fora do formato | `eventApi.ts` (antiga linha 16) | Corrigido (não muda produto) |
| Fotos dos palestrantes do BQ com caminho inexistente (`assets/inspiracao/`) | `bq-agenda-tech/script.js:7,13` | **Não corrigido**: passaria a exibir imagens-placeholder; decisão do dono (PR3) |

## Riscos de quebrar o build

| Mudança | Risco | Observação |
| --- | --- | --- |
| `eventApi.ts` | Baixo | Usa só tipos existentes; nenhuma variável nova sem uso. Não compilado nesta revisão — rode `verificar.ps1` |
| `ci.yml` | Nenhum no build; pode aparecer **vermelho** se o lint já estiver falhando (suspeita: regras do `eslint-plugin-react-hooks` 7 em `useEventBySlug.ts`) | Não é regressão deste lote |
| `main.js` (ByteClass) | Nenhum | Arquivo em `public/`, não passa pelo bundler; `catch {}` sem parâmetro é ES2019 |

## Pendente (proposto, não executado)

| ID | Item | Motivo de não executar agora |
| --- | --- | --- |
| S3 | Lint verde com react-hooks 7 | Precisa rodar o lint para ver a lista real |
| T1–T4 | Testes com Vitest | Exige dependências novas |
| R3 | Cancelamento em `useEventBySlug` | Melhor junto com S3 e com teste |
| R4–R6 | OG absoluto, headers, `innerHTML` | Precisam de domínio de produção / teste de CSP |
| P1–P4 | Imagens e bundle | Exigem ferramentas de conversão e conferência visual |
| D3–D4 | `context.txt`, comentários | Baixa prioridade; o dono decide o destino do `context.txt` |
| PR1–PR10 | Decisões de produto | Precisam de aprovação (ver `02-plano-e-arquitetura.md`) |
