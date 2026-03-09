# Bootcamps

O site é um Hub de Experiências Tecnológicas. Ele possui duas frentes claras:

Retrospectiva: Exibir eventos e formações que você já concluiu e validou (ex: Piscine 42SP, Ignite).

Prospecção: Mapear os eventos que você planeja participar (ex: HackTown, eventos de Blockchain), servindo como um roteiro de evolução profissional.

## Informações do Site

### Versão 1

- Template do W3.CSS
- Informações Estáticas que levam para os sites oficiais

### Bootcamps

Exibir os bootcamps que participei com uma breve descrição

- [x] caelum - apostilas em pdf
- [x] curso em vídeo - tutorias no youtube
- [x] dio - bootcamps na plataforma
- [x] driven - tutorias no youtube
- [x] startse tech academy - bootcamps na plataforma
- [x] w3schools - tutorias no site
- [x] xpeducação - minicamp
- [x] 42sp - bootcamp
- [x] rocketseat - tutoriais na plataforma, bootcamps

### Requisitos

- [ ] Design personalizado
- [ ] Favicon
- [ ] Responsividade
- [ ] Redes Sociais

## Informações do Projeto

### Workflow

As branches desse projeto seguem a seguinte organização:

- main: em produção
- develop: para tratar versão
- feature/nome_da_tarefa: resolver tarefa
- hotfix/nome_da_tarefa: resolver urgência
 
## Plano de Ação: Projeto Bootcamps v2

1. Setup & Architecture (A Fundação)

Configuração do ambiente de desenvolvimento focado em escala e tipagem rigorosa.

- [x] 1.1 - Inicialização do Projeto: Setup com Vite + React + TypeScript.
- [x] 1.2 - Configuração de Estilo: Instalação do Tailwind CSS e configuração de Design Tokens (cores da marca learnTECH, fontes, breakpoints).
- [x] 1.3 - Estrutura de Pastas (FSD): Implementação da arquitetura Feature-Sliced Design (Entities, Features, Widgets, Shared).
- [x] 1.4 - Contrato de Dados: Definição da Interface TypeScript para os Eventos, garantindo que nenhum bootcamp seja renderizado sem os campos obrigatórios (img, alt, descrição, etc).

2. Core Entities & Mock Data (O Motor)

- [x] 2.1 - Separação da lógica de dados da interface para facilitar futuras integrações com APIs.
- [x] 2.2 - Data Manager: Criação de um arquivo central de dados (events.data.ts) com o array de bootcamps baseados no seu readme.md.
- [x] 2.3 - Custom Hooks: Desenvolvimento de hooks como useEvents() para gerenciar a lógica de filtragem e busca de dados.
- [x] 2.4 - Configuração de Roteamento: Setup do React Router para suportar as rotas / (Home) e /event/:slug (Detalhes).

3. Responsive UI & Layout (A Estrutura Visual)

- [x] 3.1 - Construção da interface objetiva com foco total em responsividade explícita.
- [x] 3.2 - Layout Base: Criação do Header com Menu e Footer utilizando semântica HTML5 (<header>, <main>, <footer>).
- [x] 3.3 - Bento Grid: Implementação do grid de cards usando Tailwind. A responsividade será definida via classes utilitárias (grid-cols-1 md:grid-cols-2 lg:grid-cols-3).
- [x] 3.4 - Componente EventCard: Desenvolvimento do card com imagens grandes, efeitos de hover (Glassmorphism) e exibição das informações essenciais (tecnologias, carga horária).

4. Detail Page & Content Hub (A Experiência)

- [x] 4.1 - Transformação de um link externo em uma aplicação interna rica em conteúdo.
- [x] 4.2 - Dynamic Event Page: Criação da página detalhada que consome o ID do evento via URL. 
- [x] 4.3 - Media Center: Implementação do container de vídeo e galeria de imagens para os detalhes do bootcamp.
- [x] 4.4 - Interatividade com Framer Motion: Adição de transições suaves entre a lista e a página de detalhes (Shared Layout Transitions).
- [x] 4.5 - Call to Action (CTA): Botão estilizado para o site oficial, mantendo o usuário dentro do seu ecossistema o máximo possível.

5. Polishing & Deploy (A Excelência)

- [x] 5.1 - Refinamentos finais para atingir o nível "Sênior" de entrega. (1,2,3,4) 
1. Gerenciamento de Títulos Dinâmicos
[x] Hook de Título: Implementar o useDocumentTitle em shared/lib/hooks.
[x] Identidade Visual: Garantir que o sufixo | learnTECH apareça em todas as abas.
[x] Reatividade: O título deve mudar para "Carregando..." no loading e para o nome do bootcamp no success.
2. Fluidez de Navegação (UX Invisível)
[x] Scroll Restoration: Inserir o componente <ScrollToTop /> no App.tsx para evitar que páginas de detalhes abram no meio da tela.
[x] Smooth Scrolling: Adicionar scroll-behavior: smooth no CSS global para transições menos bruscas.
[x] Micro-interações: Validar se o AnimatePresence está com mode="wait" para evitar sobreposição de páginas durante a troca de rotas.
3. Percepção de Performance (Skeleton)
[x] Base UI: Criar o componente atômico Skeleton com animação de pulse.
[x] Padrão FSD: Construir o DetailSkeleton mimetizando a estrutura real da página (Banner, Header, Media Center).
[x] Flicker-Free: Garantir que a transição do Skeleton para o conteúdo real não cause "pulos" de layout (Cumulative Layout Shift).
4. Tratamento de Erros e Observabilidade
[x] Página 404: Implementar o componente NotFound com design alinhado à ByteClass.
[x] Rota Coringa: Configurar <Route path="*" /> no arquivo de rotas principal.
[x] Log de Roteamento: Inserir o console.warn no useEffect do 404 para monitorar links quebrados ou acessos inválidos.
5. Clean Code & DX (Developer Experience)
[x] Absolute Imports: Verificar se todos os componentes novos estão usando @/ ou caminhos relativos limpos.
[x] Prop Types/Interfaces: Garantir que todos os componentes (Skeleton, CTAButton, NotFound) tenham interfaces TypeScript estritas.
[x] Consistency Check: Validar se as cores Emerald (Concluído) e Amber (Desejado) estão sendo aplicadas via cn() ou lógica de props em todos os componentes de feedback.

- [x] 5.2 - Acessibilidade (a11y): Auditoria de tags alt, contraste de cores e navegação via teclado.
- [ ] 5.3 - SEO & Meta: Configuração de títulos dinâmicos e Meta Tags para compartilhamento em redes sociais.
- [ ] 5.4 - Performance: Otimização de imagens e análise do bundle final.
- [ ] 5.5 - Continuous Deployment: Setup do workflow para deploy automatizado (GitHub Pages ou Vercel).

### Estrutura de pasta do projeto

Mapeamento das Camadas para apresentar O que vai em cada lugar.
Para você não se perder durante o desenvolvimento, aqui está o guia de responsabilidades de cada pasta:

- app/: Configurações globais que envolvem toda a aplicação. (Styles, Providers, Router).
- pages/: Onde as rotas vivem. Elas apenas montam a página usando peças menores. (Ex: Home, EventDetails).
- widgets/: Peças grandes e autônomas da interface. (Ex: EventGrid, Navbar).
- features/: Funcionalidades que o usuário executa. (Ex: FilterEvents, RegisterNewsletter).
- entities/: Onde definimos o domínio de negócio. (Ex: EventCard, EventTypes).
- shared/: O seu canivete suíço. Componentes de UI puros (botão, input), hooks genéricos e utilitários.

#### Arquitetura Design

````markddown
src/
├── app/                      # Configuração Global
│   ├── App.tsx              # Componente raiz com rotas
│   ├── main.tsx             # Entry point React
│   ├── router/              # Roteamento (pode ser expandido)
│   └── styles/              # Estilos globais
│
├── pages/                   # Páginas (rotas completas)
│   ├── home/
│   │   └── Home.tsx        # Página inicial - lista de bootcamps
│   └── detail/
│       └── Detail.tsx      # Página de detalhes (placeholder)
│
├── entities/                # Domínio de negócio (Bootcamps)
│   └── event/
│       ├── model/          # Tipos, lógica, hooks
│       │   ├── types.ts    # Interface BootcampEvent
│       │   ├── useEvents.ts # Hook customizado
│       ├── api/            # Dados e chamadas
│       │   ├── events.data.ts  # Mock de 3 bootcamps
│       │   └── eventApi.ts     # Interface de dados
│       └── ui/             # Componentes específicos da entidade
│           ├── EventCard.tsx   # Card renderizado no grid
│           └── badge/
│               └── Badge.tsx   # Badge de categoria
│
├── shared/                  # Código reutilizável
│   └── ui/
│       └── layout/
│           └── MainLayout.tsx # Wrapper com header/footer/nav
│
└── assets/                  # Recursos estáticos
````


#### Fluxo de Dados (Data Flow)

````
Home.tsx
  ↓
useEvents() [Hook]
  ↓
eventApi.getAll() [API Layer]
  ↓
events.data.ts [Mock Data]
  ↓
Retorna BootcampEvent[]
  ↓
.map(event => <EventCard event={event} />) [Rendering]
````

### Estrutura de roteamento

- Acesse http://localhost:5173/ -> Deve exibir "Home: Lista de Eventos".
- Acesse http://localhost:5173/event/42-sp -> Deve exibir "Detalhes do Evento".
- Acesse http://localhost:5173/qualquer-coisa -> Deve exibir o seu fallback de 404.
