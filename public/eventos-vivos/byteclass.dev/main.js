/**
 * ByteClass - learnTECH Ecosystem
 * Core Logic: Renderização dinâmica baseada nos panfletos físicos.
 */

// 1. DATABASE DE TECNOLOGIAS (As 27 tecnologias do Tech Wall)
const technologies = [
  { name: "HTML5", category: "frontend" },
  { name: "CSS3", category: "frontend" },
  { name: "JavaScript", category: "frontend" },
  { name: "ReactJS", category: "frontend" },
  { name: "Vue 3", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Sass", category: "frontend" },
  { name: "React Native", category: "mobile" },
  { name: "Expo", category: "mobile" },
  { name: "Node.js", category: "backend" },
  { name: "Express", category: "backend" },
  { name: "PHP", category: "backend" },
  { name: "Laravel", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "Django", category: "backend" },
  { name: "SQL", category: "database" },
  { name: "MySQL", category: "database" },
  { name: "PostgreSQL", category: "database" },
  { name: "Supabase", category: "infra" },
  { name: "Docker", category: "infra" },
  { name: "Git", category: "tools" },
  { name: "GitHub", category: "tools" },
  { name: "Vercel", category: "infra" },
  { name: "Figma", category: "design" },
  { name: "UI/UX", category: "design" },
  { name: "Glassmorphism", category: "design" },
];

// 2. DATABASE DE TRILHAS (Níveis M1 a M5 extraídos do panfleto)
const trainingTracks = [
  {
    id: "M1",
    title: "M1 - Básico",
    desc: "Lógica de Programação, Algoritmos e Setup de Ambiente.",
    status: "Iniciante",
    icon: "💻",
  },
  {
    id: "M2",
    title: "M2 - Fundamental",
    desc: "Estrutura Web (HTML/CSS) e linguagens estruturadas.",
    status: "Estudante",
    icon: "🌐",
  },
  {
    id: "M3",
    title: "M3 - Intermediário",
    desc: "Frameworks modernos, Integração de APIs e Bancos de Dados.",
    status: "Developer",
    icon: "🚀",
  },
  {
    id: "M4",
    title: "M4 - Avançado",
    desc: "Arquitetura de Sistemas, Performance e Segurança.",
    status: "Senior Path",
    icon: "🏗️",
  },
  {
    id: "M5",
    title: "M5 - Bootcamp",
    desc: "Projetos Reais Full-Stack e preparação de portfólio de elite.",
    status: "Ready for Market",
    icon: "🏆",
  },
];

// 3. RENDERIZAÇÃO DA VITRINE (TECH GRID)
function renderTechGrid() {
  const techWall = document.getElementById("tech-wall");
  if (!techWall) return;

  techWall.innerHTML = technologies
    .map(
      (tech) => `
        <div class="tech-item glass-frame" data-category="${tech.category}">
            <div class="tech-content">
                <span class="pixel-font" style="font-size: 0.75rem">${tech.name}</span>
            </div>
        </div>
    `,
    )
    .join("");
}

// 4. RENDERIZAÇÃO DOS NÍVEIS (MOSAICO) - APERFEIÇOADO
function renderTrainingTracks(filter = "all") {
  const mosaico = document.getElementById("mosaico-trilhas");
  if (!mosaico) return;

  mosaico.innerHTML = trainingTracks
    .map((track, index) => {
      // Cálculo de progresso visual (ex: M1 = 20%, M5 = 100%)
      const progress = (index + 1) * 20;

      return `
        <article class="card-trilha glass-frame" data-level="${track.id}">
            <div class="track-header">
                <span class="level-tag pixel-font">STEP_0${index + 1}</span>
                <div class="track-icon-circle">${track.icon}</div>
            </div>
            
            <h3 class="pixel-font text-green">${track.title}</h3>
            <p class="track-description">${track.desc}</p>
            
            <div class="track-progress-container">
                <div class="progress-bar" style="width: ${progress}%"></div>
            </div>

            <div class="track-footer">
                <span class="badge pixel-font">${track.status}</span>
                <div class="status-dot"></div>
            </div>
        </article>
      `;
    })
    .join("");
}

// 5. INICIALIZAÇÃO E EVENTOS
document.addEventListener("DOMContentLoaded", () => {
  // Renderiza os componentes iniciais
  renderTechGrid();
  renderTrainingTracks();

  // Filtros de Trilha (Frontend/Backend no HTML)
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Aqui você pode expandir a lógica de filtro se desejar
      const filterValue = btn.getAttribute("data-filter");
      // Por enquanto renderiza todas para manter o visual do panfleto M1-M5
    });
  });

  // Smooth Scroll para navegação
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Efeito de Scroll na Navbar
  const nav = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      nav.style.background = "rgba(10, 10, 11, 0.98)";
      nav.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
    } else {
      nav.style.background = "rgba(10, 10, 11, 0.8)";
      nav.style.boxShadow = "none";
    }
  });
});
