import type { BootcampEvent } from "./../model/types";

export const events: BootcampEvent[] = [
  {
    id: "1",
    slug: "42-sp",
    title: "Piscine 42SP",
    institution: "42 São Paulo",
    description:
      "A base da engenharia de software através da metodologia peer-to-peer.",
    coverImage: "https://placehold.co/600x400/0A0A0B/00D1FF?text=42+SP",
    altText: "Ambiente de imersão da 42 São Paulo",
    category: "fullstack",
    status: "concluido",
    content: {
      longDescription:
        "A Piscine é um processo seletivo intensivo de 26 dias onde o aprendizado é baseado em projetos e colaboração, removendo a figura do professor tradicional.",
      videoUrl: "https://www.youtube.com/embed/S_I_N9f-B3k",
      gallery: [
        {
          id: "42m1",
          url: "https://placehold.co/600x400/1e1e1e/fff?text=Cluster+42",
          type: "image",
          alt: "Cluster de computadores",
        },
        {
          id: "42m2",
          url: "https://placehold.co/600x400/1e1e1e/fff?text=Peer+Learning",
          type: "image",
          alt: "Estudantes colaborando",
        },
      ],
      curriculum: [
        "Linguagem C",
        "Shell Script",
        "Lógica de Programação",
        "Git",
      ],
      officialLink: "https://www.42sp.org.br",
    },
  },
  {
    id: "2",
    slug: "rocketseat-ignite",
    title: "Ignite ReactJS",
    institution: "Rocketseat",
    description: "Especialização profunda no ecossistema React e TypeScript.",
    coverImage: "https://placehold.co/600x400/0A0A0B/8257E5?text=Ignite+React",
    altText: "Interface moderna do programa Ignite Rocketseat",
    category: "frontend",
    status: "concluido",
    content: {
      longDescription:
        "O Ignite é um programa de especialização focado em preparar desenvolvedores para o mercado, utilizando as tecnologias mais modernas de desenvolvimento web.",
      videoUrl: "https://www.youtube.com/embed/m7vV9vO9hCI",
      gallery: [
        {
          id: "rs1",
          url: "https://placehold.co/600x400/202024/fff?text=Clean+Code",
          type: "image",
          alt: "Exemplo de código limpo",
        },
        {
          id: "rs2",
          url: "https://placehold.co/600x400/202024/fff?text=React+Hooks",
          type: "image",
          alt: "Desenvolvimento de Hooks",
        },
      ],
      curriculum: [
        "ReactJS",
        "TypeScript",
        "Styled Components",
        "React Query",
        "Context API",
      ],
      officialLink: "https://www.rocketseat.com.br/ignite",
    },
  },
  {
    id: "3",
    slug: "caelum-java",
    title: "Formação Java",
    institution: "Caelum (Alura)",
    description:
      "Fundamentos sólidos de Programação Orientada a Objetos com Java.",
    coverImage: "https://placehold.co/600x400/0A0A0B/ED1D24?text=Caelum+Java",
    altText: "Livros e apostilas da Caelum Ensino",
    category: "backend",
    status: "concluido",
    content: {
      longDescription:
        "Formação clássica que aborda desde a sintaxe do Java até padrões de projeto, frameworks como Spring e persistência de dados com JPA.",
      videoUrl: "https://www.youtube.com/embed/fUunS0Gz2iM",
      gallery: [
        {
          id: "cl1",
          url: "https://placehold.co/600x400/f4f4f4/333?text=Java+OO",
          type: "image",
          alt: "Diagrama de Classes",
        },
        {
          id: "cl2",
          url: "https://placehold.co/600x400/f4f4f4/333?text=Spring+Boot",
          type: "image",
          alt: "Arquitetura Spring",
        },
      ],
      curriculum: [
        "Java SE",
        "POO",
        "Exceções",
        "Spring Boot",
        "Hibernate/JPA",
      ],
      officialLink: "https://www.alura.com.br/formacao-java",
    },
  },
  {
    id: "4",
    slug: "dio-fullstack",
    title: "Potência Tech Angular",
    institution: "DIO",
    description: "Bootcamp focado em Angular e integração com serviços cloud.",
    coverImage: "https://placehold.co/600x400/0A0A0B/EE2A35?text=DIO+Angular",
    altText: "Certificado Potência Tech da DIO",
    category: "fullstack",
    status: "desejado",
    content: {
      longDescription:
        "Um programa intensivo focado no framework Angular para criar aplicações web robustas e escaláveis, em parceria com grandes empresas de tecnologia.",
      videoUrl: "https://www.youtube.com/embed/fA_fK5yV6f0",
      gallery: [
        {
          id: "dio1",
          url: "https://placehold.co/600x400/121212/fff?text=Components",
          type: "image",
          alt: "Arquitetura de Componentes",
        },
        {
          id: "dio2",
          url: "https://placehold.co/600x400/121212/fff?text=TypeScript",
          type: "image",
          alt: "Tipagem avançada",
        },
      ],
      curriculum: ["Angular CLI", "RxJS", "Web Components", "Cloud Services"],
      officialLink: "https://www.dio.me",
    },
  },
  {
    id: "5",
    slug: "udemy-laravel",
    title: "Laravel: The Complete Guide",
    institution: "Udemy",
    description:
      "Desenvolvimento ágil de aplicações backend com PHP e Laravel.",
    coverImage: "https://placehold.co/600x400/0A0A0B/FF5722?text=Laravel+Udemy",
    altText: "Interface do curso na plataforma Udemy",
    category: "backend",
    status: "desejado",
    content: {
      longDescription:
        "Curso prático focado em construir aplicações reais usando o framework PHP mais popular do mercado, abordando Eloquent, Blade e APIs RESTful.",
      videoUrl: "https://www.youtube.com/embed/ImtZ5yENzgE",
      gallery: [
        {
          id: "ud1",
          url: "https://placehold.co/600x400/3d3d3d/fff?text=Eloquent+ORM",
          type: "image",
          alt: "Mapeamento Banco de Dados",
        },
        {
          id: "ud2",
          url: "https://placehold.co/600x400/3d3d3d/fff?text=Blade+Engine",
          type: "image",
          alt: "Templates Front-end",
        },
      ],
      curriculum: ["MVC", "Migrations", "Eloquent ORM", "Auth Systems", "APIs"],
      officialLink: "https://www.udemy.com",
    },
  },
];
