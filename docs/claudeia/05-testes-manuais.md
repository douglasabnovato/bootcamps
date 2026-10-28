# 05 · Roteiro de testes manuais — bootcamps

Data: 27/10/2026 · Rode duas vezes: local (`npm run dev`, http://localhost:5173) e publicado (https://bootcamps-dun.vercel.app). Marque `[x]` no que passou e anote a falha ao lado.

Resultado esperado baseado no código desta branch. Itens marcados **(conhecido)** já falham hoje por decisão de produto pendente.

## A. Listagem (Home `/`)

| # | Ação | Resultado esperado | OK |
| --- | --- | --- | --- |
| A1 | Abrir `/` | Aba "Eventos \| learnTECH"; spinner rápido e depois a lista | [ ] |
| A2 | Ler o subtítulo | "14 concluídos" em verde e "3 no radar" em âmbar | [ ] |
| A3 | Rolar a página | Grupo "Concluídos" (14 cards) e depois "Metas de estudo" (3 cards) | [ ] |
| A4 | Olhar os selos dos cards | "Concluído" verde nos 14; "Meta" âmbar em Piscine 42SP, XP Educação e BQ Agenda Tech | [ ] |
| A5 | Passar o mouse num card (desktop) | Imagem sai do cinza, aumenta; título fica verde | [ ] |
| A6 | Navegar só com Tab | Cada card recebe anel de foco verde visível; Enter abre o detalhe | [ ] |
| A7 | Rolar mais de 400 px | Botão redondo "Voltar ao topo" aparece embaixo à direita; clicar sobe suave | [ ] |
| A8 | Clicar no logo learnTECH (cabeçalho e rodapé) | Volta para `/` | [ ] |

## B. Detalhe (`/event/:slug`)

| # | Ação | Resultado esperado | OK |
| --- | --- | --- | --- |
| B1 | Abrir `/event/42-sp` | Skeleton e depois capa com título "Piscine 42SP", selo "★ Meta de estudo" âmbar | [ ] |
| B2 | Na 42SP, rolar | "Media Center" com vídeo do YouTube tocando dentro da moldura âmbar | [ ] |
| B3 | Na 42SP | Seção "Plano de estudos" com itens numerados 01, 02 | [ ] |
| B4 | Abrir `/event/minas-summit` | Selo "✓ Concluído" verde; seção "Edições" com 5 anos (4 "Realizada" verdes, 1 "Anunciada" âmbar) | [ ] |
| B5 | Minas Summit → "Ver certificado" | Modal com o PDF; título "Certificado — …" | [ ] |
| B6 | No modal, apertar Esc; abrir de novo e clicar fora; abrir e clicar "Fechar" | Fecha nos três casos; foco volta ao botão; página de trás não rola com o modal aberto | [ ] |
| B7 | No modal, "Abrir em nova aba" | PDF abre em outra aba | [ ] |
| B8 | Botão do CTA (verde em concluído, âmbar em meta) | Abre o site oficial em nova aba | [ ] |
| B9 | Abrir `/event/codexperience` | Botões extras "Ingressos", "Instagram", "Matéria" abrindo em nova aba | [ ] |
| B10 | Detalhe → botão "← Voltar" (vindo da Home) | Volta para a Home | [ ] |
| B11 | Colar `/event/minas-summit` numa aba nova e clicar "← Voltar" | **(conhecido)** volta para a página anterior do navegador (sai do site) — PR4 | [ ] |
| B12 | Título da aba no detalhe | "Minas Summit … \| learnTECH" | [ ] |
| B13 | Abrir `/event/byteclass-dev` → CTA | Abre o site estático ByteClass (seção D) | [ ] |
| B14 | Abrir `/event/bq-agenda-tech` → CTA | Abre o site estático BQ Café e Tecnologia (seção E) | [ ] |

## C. 404

| # | Ação | Resultado esperado | OK |
| --- | --- | --- | --- |
| C1 | Abrir `/qualquer-coisa` | "404 · Trilha Perdida"; aviso `[learnTECH] 404` no console | [ ] |
| C2 | Abrir `/event/nao-existe` | Mesma tela 404 | [ ] |
| C3 | Clicar "← Voltar para a Home" | Vai para `/` | [ ] |
| C4 | Recarregar (F5) em `/event/42-sp` na versão publicada | Página carrega (rewrite da Vercel), sem 404 do servidor | [ ] |

## D. Site estático ByteClass (`/eventos-vivos/byteclass.dev/index.html`)

| # | Ação | Resultado esperado | OK |
| --- | --- | --- | --- |
| D1 | Abrir a página | Hero, parede de tecnologias e mosaico M1–M5 renderizados | [ ] |
| D2 | Clicar nos links do menu (âncoras) | Rolagem suave até a seção | [ ] |
| D3 | Abrir o console e clicar em "Mentoria Instrutor" (rodapé) | Nada acontece e **nenhum erro** no console (corrigido no lote 1) | [ ] |
| D4 | Preencher e-mail em "RECEBER GRADE" e enviar | **(conhecido)** página recarrega; nenhum e-mail é registrado — PR2 | [ ] |
| D5 | Tempo de carregamento em 4G (DevTools → Network → Fast 4G) | Anotar o tempo; imagens somam ~11 MB (P1) | [ ] |

## E. Site estático BQ Café e Tecnologia (`/eventos-vivos/bq-agenda-tech/index.html`)

| # | Ação | Resultado esperado | OK |
| --- | --- | --- | --- |
| E1 | Abrir a página | Hero "Onde a Tecnologia encontra a conexão.", formulário, palestrantes, mapa | [ ] |
| E2 | Seção "Palestrantes do Mês" | Cards de Marcus e Lucas; **(conhecido)** fotos quebradas — PR3 | [ ] |
| E3 | Enviar o formulário vazio | Navegador bloqueia (campos obrigatórios) | [ ] |
| E4 | Preencher e enviar | **(conhecido)** alerta "Inscrição realizada com sucesso", mas nada é gravado (só `console.log`) — PR1 | [ ] |
| E5 | "Abrir no Google Maps" | Abre o Maps com BQ Spazio Coworking | [ ] |
| E6 | Ver código-fonte | `<meta name="description">` presente (lote 1) | [ ] |
| E7 | Abrir `convites/palestrante.html`, `convites/apoiador.html`, `convites/parceiro.html` | As três páginas abrem com estilo e favicon | [ ] |

## F. Identificação do ecossistema (regra de negócio)

| # | Ação | Resultado esperado | OK |
| --- | --- | --- | --- |
| F1 | Local, **sem** `VITE_API_URL` | Site funciona só com dados locais; nenhum script `learntech-sdk` no `<head>` | [ ] |
| F2 | Local **com** `VITE_API_URL` (ou na versão publicada, se configurada) | `<script id="learntech-sdk">` no `<head>`; fluxo de identificação (nome e e-mail) aparece conforme o SDK | [ ] |
| F3 | No fluxo de identificação | Link de privacidade aponta para `https://learn-tech-pied.vercel.app/privacy` | [ ] |
| F4 | Com `VITE_API_URL` apontando para um endereço que não responde | Em até ~5 s a Home mostra os 17 eventos locais; aviso `[learntech-content] usando eventos locais` no console | [ ] |

## G. Responsivo e celular

Use o DevTools (modo dispositivo) e, se possível, um celular real.

| # | Ação | Resultado esperado | OK |
| --- | --- | --- | --- |
| G1 | Home em 320 px | 1 coluna, sem rolagem horizontal, títulos sem cortar | [ ] |
| G2 | Home em 768 px | 2 colunas | [ ] |
| G3 | Home em 1280 px | 3 colunas | [ ] |
| G4 | Detalhe em 320 px | Capa 16:10, título legível sobre a imagem, botão "Voltar" tocável | [ ] |
| G5 | Modal do certificado no celular | Ocupa a tela, botão "Fechar" alcançável | [ ] |
| G6 | Cards no celular (sem hover) | **(conhecido)** capas ficam cinzas e apagadas — PR5 | [ ] |
| G7 | Sites ByteClass e BQ em 360 px | Sem rolagem horizontal; menu utilizável | [ ] |

## H. Tema

| # | Ação | Resultado esperado | OK |
| --- | --- | --- | --- |
| H1 | Sistema operacional em modo claro | Site continua escuro (não há tema claro; é a identidade) | [ ] |

## I. Rodapé e links externos

| # | Ação | Resultado esperado | OK |
| --- | --- | --- | --- |
| I1 | GitHub, LinkedIn, Instagram no rodapé | Abrem os perfis `douglasabnovato` em nova aba | [ ] |
| I2 | CTA de cada um dos 17 eventos | Nenhum link quebrado (anotar os que deram erro) | [ ] |
| I3 | Ano no rodapé | Ano atual | [ ] |

## J. Versão publicada

| # | Ação | Resultado esperado | OK |
| --- | --- | --- | --- |
| J1 | https://bootcamps-dun.vercel.app | Mesmo comportamento das seções A–C | [ ] |
| J2 | DevTools → Network | `/_vercel/speed-insights/script.js` carrega sem 404 | [ ] |
| J3 | Lighthouse (mobile) na Home | Anotar Performance, Acessibilidade, SEO para comparar com os próximos lotes | [ ] |
| J4 | Compartilhar `/event/minas-summit` no WhatsApp/LinkedIn | Anotar a prévia (esperado hoje: título/descrição gerais do `index.html`, sem imagem do evento — R4) | [ ] |
