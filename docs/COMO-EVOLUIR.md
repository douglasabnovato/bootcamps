# Como evoluir o bootcamps

Guia curto para mudar o site com segurança. Os eventos e as formações **não nascem aqui**: eles entram pela API, em `learntech-content` (veja `../learntech-content/docs/COMO-EVOLUIR.md`, seção 3).

## 1. O que é
- SPA em React, TypeScript e Vite, publicada na Vercel (`bootcamps-dun.vercel.app`) a partir da `main`.
- Os dados vêm de `/v1/bootcamps/eventos.json` da API. Sem API, o site usa a cópia gerada `events.data.ts`.

## 2. Onde fica cada coisa (arquitetura por camadas)
| Pasta ou arquivo | Papel |
|---|---|
| `src/app/` | Raiz da aplicação e rotas |
| `src/pages/` | Home, Detail (`/event/:slug`) e NotFound |
| `src/features/event-filter/` | Filtro por status e categoria (função pura `filtrarEventos`, com teste, e o componente) |
| `src/entities/event/model/types.ts` | Tipo `BootcampEvent`. Precisa bater com o schema da API (`learntech-content/src/schemas/bootcamps.ts`) |
| `src/entities/event/api/eventApi.ts` | Busca na API, com a reserva |
| `src/entities/event/api/events.data.ts` | **Gerado** pela API (`npm run copias` em `learntech-content`). Não edite à mão |
| `src/shared/config/ecossistema.ts` | URL base dos quatro sites, usada quando um relacionado vem sem `url` |
| `src/shared/ui/` | Componentes compartilhados (galeria, layout, rodapé) |

## 3. Quando chegar um evento ou uma formação nova
1. O evento entra em `learntech-content/content/bootcamps/eventos/<slug>.json`. As fotos vão para `media/bootcamps/eventos/<slug>/`, tratadas com `scripts/tratar-fotos.py`.
2. Lá: `npm run validar`, `npm run copias` (atualiza `events.data.ts` com os relacionados já resolvidos) e `npm run sitemaps`.
3. Aqui: `npm test && npx eslint . && npm run build`, depois commit só da cópia ("conteudo: cópia dos eventos ...").

## 4. Quando mudar o site
- **Campo novo do evento:** primeiro o schema da API, depois `types.ts` e a tela. O `tsc -b` do build acusa a divergência.
- **Filtro novo:** acrescente à função pura de `src/features/event-filter/` e ao teste dela; o estado do filtro fica na URL.
- **Acessibilidade:** a animação respeita `prefers-reduced-motion` (`MotionConfig reducedMotion="user"`); diálogos usam `<dialog>` nativo e devolvem o foco.
- **Imagens:** `width`, `height` e `decoding="async"`; a imagem principal do detalhe com `fetchpriority="high"`.

## 5. Comandos
| Comando | Para quê |
|---|---|
| `npm run dev` | Servidor local (sem `VITE_API_URL`, testa a reserva) |
| `npm test` | Vitest (25 testes em 05/11/2026) |
| `npx eslint .` | Lint (obrigatório na CI) |
| `npm run build` | `tsc -b` + build |
| `npm audit --omit=dev` | 0 vulnerabilidades em produção em 05/11/2026 |

## 6. Estabilidade: antes de dar por pronto
- [ ] Testes, lint e build verdes.
- [ ] Sem API, a home lista os eventos e o detalhe mostra "Veja também".
- [ ] CI verde na branch; feature → `developer` → `main` (`../learntech-content/docs/processo/fluxo-git.md`).
- [ ] Deploy da Vercel em "Production" com o commit da `main`.
- [ ] `npm run e2e` em `learntech-content` sem falha nos testes do bootcamps.

## 7. Documentos
- `readme.md`: visão geral. `docs/README.md`: engenharia.
- `docs/claudeia/`: histórico datado, com o diagnóstico de MVP e o relatório de 03/11/2026.
- `docs/ESTADO-DO-PROJETO.md`: o que fizemos, como está hoje e o que queremos fazer, com as issues em ordem.
- Próximos passos: issues com a label `proximos-passos`.
