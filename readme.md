# Bootcamps

Quero apresentar os eventos de tecnologia que eu gosto e aqueles que quero ir.

## Informações do Site

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
- [ ] Explicação para cada evento
- [ ] Funcionalidade de enviar e-mail
- [ ] Redes Sociais

### Próximo passo

- [ ] Abrir uma página com descrição e ementa da forma que acontece o evento e mais detalhes do que gostei e do que poderia ter acontecido.
- [ ] Um cta para o site oficial para inscrições

## Informações do Projeto

### Workflow

As branches desse projeto seguem a seguinte organização:

- main: em produção
- develop: para tratar versão
- feature/nome_da_tarefa: resolver tarefa
- hotfix/nome_da_tarefa: resolver urgência

### Versão 1

- Template do W3.CSS
- Informações Estáticas que levam para os sites oficiais
 
## Plano de Ação: Projeto Bootcamps v2

1. Setup & Architecture (A Fundação)

Configuração do ambiente de desenvolvimento focado em escala e tipagem rigorosa.

1.1 - Inicialização do Projeto: Setup com Vite + React + TypeScript.

1.2 - Configuração de Estilo: Instalação do Tailwind CSS e configuração de Design Tokens (cores da marca learnTECH, fontes, breakpoints).

1.3 - Estrutura de Pastas (FSD): Implementação da arquitetura Feature-Sliced Design (Entities, Features, Widgets, Shared).

1.4 - Contrato de Dados: Definição da Interface TypeScript para os Eventos, garantindo que nenhum bootcamp seja renderizado sem os campos obrigatórios (img, alt, descrição, etc).

2. Core Entities & Mock Data (O Motor)

Separação da lógica de dados da interface para facilitar futuras integrações com APIs.

Data Manager: Criação de um arquivo central de dados (events.data.ts) com o array de bootcamps baseados no seu readme.md.

Custom Hooks: Desenvolvimento de hooks como useEvents() para gerenciar a lógica de filtragem e busca de dados.

Configuração de Roteamento: Setup do React Router para suportar as rotas / (Home) e /event/:slug (Detalhes).

3. Responsive UI & Layout (A Estrutura Visual)

Construção da interface objetiva com foco total em responsividade explícita.

Layout Base: Criação do Header com Menu e Footer utilizando semântica HTML5 (<header>, <main>, <footer>).

Bento Grid: Implementação do grid de cards usando Tailwind. A responsividade será definida via classes utilitárias (grid-cols-1 md:grid-cols-2 lg:grid-cols-3).

Componente EventCard: Desenvolvimento do card com imagens grandes, efeitos de hover (Glassmorphism) e exibição das informações essenciais (tecnologias, carga horária).

4. Detail Page & Content Hub (A Experiência)
Transformação de um link externo em uma aplicação interna rica em conteúdo.

Dynamic Event Page: Criação da página detalhada que consome o ID do evento via URL.

Media Center: Implementação do container de vídeo e galeria de imagens para os detalhes do bootcamp.

Interatividade com Framer Motion: Adição de transições suaves entre a lista e a página de detalhes (Shared Layout Transitions).

Call to Action (CTA): Botão estilizado para o site oficial, mantendo o usuário dentro do seu ecossistema o máximo possível.

5. Polishing & Deploy (A Excelência)
Refinamentos finais para atingir o nível "Sênior" de entrega.

Acessibilidade (a11y): Auditoria de tags alt, contraste de cores e navegação via teclado.

SEO & Meta: Configuração de títulos dinâmicos e Meta Tags para compartilhamento em redes sociais.

Performance: Otimização de imagens e análise do bundle final.

Continuous Deployment: Setup do workflow para deploy automatizado (GitHub Pages ou Vercel).