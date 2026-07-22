// src/entities/event/api/events.data.ts
import type { BootcampEvent } from "./../model/types";

import img42sp from "@/assets/instituicoes/42sp.jpg";
import imgCaelum from "@/assets/instituicoes/caelum.jpg";
import imgDio from "@/assets/instituicoes/dio.jpg";
import imgRocketseat from "@/assets/instituicoes/rocketseat.jpg";
import imgFreeCodeCamp from "@/assets/instituicoes/freecodecamp.jpg";
import imgCursoEmVideo from "@/assets/instituicoes/curso-em-video.jpg";
import imgDriven from "@/assets/instituicoes/driven.jpg";
import imgGdgJf from "@/assets/instituicoes/gdg-jf.jpg";
import imgIfsudesteJf from "@/assets/instituicoes/ifsudeste-mg-jf.jpg";
import imgStartse from "@/assets/instituicoes/startse_tech_academy.jpg";
import imgUfjf from "@/assets/instituicoes/ufjf-dcc.jpg";
import imgW3schools from "@/assets/instituicoes/w3schools.jpg";
import imgXpeducacao from "@/assets/instituicoes/xpeducacao.jpg";

export const events: BootcampEvent[] = [
  {
    id: "1",
    slug: "42-sp",
    title: "Piscine 42SP",
    institution: "42 São Paulo",
    description:
      "Avancei na seleção da 42 em 2026 até ser aprovado para a Piscina, mas cedi a vaga por não conseguir estar presente.",
    coverImage: img42sp,
    altText: "Ambiente de imersão da 42 São Paulo",
    category: "fullstack",
    status: "desejado",
    content: {
      longDescription:
        "Fiz o processo seletivo da 42 São Paulo: primeiro uma etapa online, depois uma missão presencial de 7 dias em abril de 2026, na sede de uma empresa parceira, resolvendo desafios em Python. Avancei pelas duas fases e fui aprovado para a Piscina — a etapa final e mais intensa do processo seletivo. Precisei ceder minha vaga por não conseguir estar presencialmente disponível no período. Fica como uma jornada recente que pretendo retomar.",
      videoUrl: "https://www.youtube.com/embed/1-fUC6_yntE",
      gallery: [],
      curriculum: [
        "Jogo de Lógica e Memória (seleção online)",
        "Missão presencial de 7 dias — desafios em Python (abril/2026)",
      ],
      officialLink: "https://www.42sp.org.br",
    },
  },
  {
    id: "2",
    slug: "rocketseat-ignite",
    title: "Ignite ReactJS",
    institution: "Rocketseat",
    description:
      "Programa de aceleração da Rocketseat focado em React, TypeScript e arquitetura de aplicações modernas.",
    coverImage: imgRocketseat,
    altText: "Identidade visual do programa Ignite da Rocketseat",
    category: "frontend",
    status: "concluido",
    content: {
      longDescription:
        "O Ignite é o programa de especialização da Rocketseat voltado para quem já programa há mais de um ano e quer se aprofundar no ecossistema React. A trilha cobre componentização, hooks, Context API, consumo de APIs e boas práticas de arquitetura front-end, com desafios práticos entregues a cada módulo.",
      videoUrl: "",
      gallery: [],
      curriculum: [
        "ReactJS",
        "TypeScript",
        "Context API e Hooks",
        "Consumo de APIs (Axios/React Query)",
        "Testes automatizados (Jest)",
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
      "Fundamentos sólidos de Programação Orientada a Objetos com Java, da Caelum, hoje parte da Alura.",
    coverImage: imgCaelum,
    altText: "Identidade visual da Formação Java da Caelum",
    category: "backend",
    status: "concluido",
    content: {
      longDescription:
        "A Formação Java da Caelum (incorporada à Alura) guia o aluno desde a sintaxe da linguagem e boas práticas até modelagem orientada a objetos consistente, preparando a base para frameworks como Spring e persistência com JPA/Hibernate.",
      videoUrl: "",
      gallery: [],
      curriculum: [
        "Java SE",
        "Programação Orientada a Objetos",
        "Tratamento de Exceções",
        "Spring Boot",
        "Hibernate/JPA",
      ],
      officialLink: "https://www.alura.com.br",
    },
  },
  {
    id: "4",
    slug: "dio-santander-python",
    title: "Santander Bootcamp — Ciência de Dados com Python",
    institution: "DIO",
    description:
      "Capacitação gratuita da DIO em parceria com o Santander, com foco em Python e ciência de dados.",
    coverImage: imgDio,
    altText: "Identidade visual do Santander Bootcamp na plataforma DIO",
    category: "outros",
    status: "concluido",
    content: {
      longDescription:
        "Bootcamp gratuito oferecido pela DIO em parceria com o Santander, cobrindo Python, análise de dados, bancos de dados SQL e NoSQL, produtividade com Excel e IA, e computação em nuvem com AWS — com projetos práticos para portfólio.",
      videoUrl: "",
      gallery: [],
      curriculum: [
        "Python",
        "Análise de Dados",
        "SQL e NoSQL",
        "AWS (fundamentos)",
        "Projetos práticos com dados",
      ],
      officialLink: "https://www.dio.me",
    },
  },
  {
    id: "5",
    slug: "freecodecamp-js-algorithms",
    title: "JavaScript Algorithms and Data Structures",
    institution: "freeCodeCamp",
    description:
      "Certificação gratuita do freeCodeCamp em algoritmos e estruturas de dados com JavaScript.",
    coverImage: imgFreeCodeCamp,
    altText: "Identidade visual da certificação do freeCodeCamp",
    category: "fullstack",
    status: "concluido",
    content: {
      longDescription:
        "Currículo open-source e gratuito do freeCodeCamp, com centenas de horas de exercícios interativos cobrindo variáveis, arrays, objetos, funções, programação orientada a objetos e funcional em JavaScript, finalizado com projetos certificáveis.",
      videoUrl: "",
      gallery: [],
      curriculum: [
        "JavaScript (fundamentos e ES6)",
        "Estruturas de Dados",
        "Algoritmos",
        "Programação Orientada a Objetos",
        "Programação Funcional",
      ],
      officialLink:
        "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
    },
  },
  {
    id: "6",
    slug: "driven-fullstack",
    title: "Formação Full Stack",
    institution: "Driven Educação",
    description:
      "Formação intensiva de 9 meses em desenvolvimento full stack, com pagamento após empregabilidade.",
    coverImage: imgDriven,
    altText: "Identidade visual da Driven Educação",
    category: "fullstack",
    status: "concluido",
    content: {
      longDescription:
        "Programa de formação full stack da Driven Educação, com 1.450 horas ao longo de 9 meses, unindo projetos práticos, portfólio e preparação para processos seletivos do mercado de tecnologia.",
      videoUrl: "",
      gallery: [],
      curriculum: [
        "Lógica de Programação",
        "JavaScript",
        "Desenvolvimento Front-end",
        "Desenvolvimento Back-end",
        "Projetos em equipe",
      ],
      officialLink: "https://www.driven.com.br",
    },
  },
  {
    id: "7",
    slug: "w3schools-referencia",
    title: "Plataforma de Referência W3Schools",
    institution: "W3Schools",
    description:
      "Plataforma de referência e tutoriais usada como consulta contínua para HTML, CSS, JavaScript e mais.",
    coverImage: imgW3schools,
    altText: "Identidade visual do W3Schools",
    category: "fullstack",
    status: "concluido",
    content: {
      longDescription:
        "W3Schools é uma referência de uso contínuo — tutoriais interativos e documentação prática de HTML, CSS, JavaScript e diversas outras tecnologias web, com exemplos executáveis direto no navegador.",
      videoUrl: "",
      gallery: [],
      curriculum: [
        "HTML/CSS",
        "JavaScript",
        "SQL",
        "Referência contínua de sintaxe e boas práticas",
      ],
      officialLink: "https://www.w3schools.com",
    },
  },
  {
    id: "8",
    slug: "xpeducacao-minicamp",
    title: "Minicamp XP Educação",
    institution: "XP Educação",
    description:
      "Minicamp gratuito de duas semanas da Faculdade XP, porta de entrada para as graduações gratuitas em tecnologia.",
    coverImage: imgXpeducacao,
    altText: "Identidade visual do Minicamp da XP Educação",
    category: "fullstack",
    status: "desejado",
    content: {
      longDescription:
        "O Minicamp é a primeira etapa do processo seletivo da Faculdade XP: duas semanas de aulas ao vivo e gravadas com testes práticos sobre fundamentos de programação, com certificado de conclusão garantido a todos os participantes, aprovados ou não na etapa seguinte.",
      videoUrl: "",
      gallery: [],
      curriculum: [
        "Fundamentos de Lógica de Programação",
        "Testes práticos",
        "Introdução à metodologia da XP Educação",
      ],
      officialLink: "https://www.xpeducacao.com.br",
    },
  },
  {
    id: "9",
    slug: "curso-em-video-algoritmos",
    title: "Curso de Algoritmos e Lógica de Programação",
    institution: "Curso em Vídeo",
    description:
      "Curso gratuito e icônico de lógica de programação do professor Gustavo Guanabara.",
    coverImage: imgCursoEmVideo,
    altText: "Identidade visual do Curso em Vídeo",
    category: "outros",
    status: "concluido",
    content: {
      longDescription:
        "Referência para quem está começando a programar no Brasil: aulas descontraídas do professor Gustavo Guanabara cobrindo algoritmos e lógica de programação com pseudocódigo (Portugol), base para aprender qualquer linguagem depois.",
      videoUrl: "",
      gallery: [],
      curriculum: [
        "Algoritmos",
        "Lógica de Programação",
        "Pseudocódigo (Portugol)",
        "Estruturas de Decisão e Repetição",
      ],
      officialLink: "https://www.cursoemvideo.com/curso/curso-de-algoritmo/",
    },
  },
  {
    id: "10",
    slug: "gdg-jf",
    title: "Encontros GDG Juiz de Fora",
    institution: "GDG Juiz de Fora",
    description:
      "Participação recorrente nos encontros da comunidade Google Developer Group de Juiz de Fora.",
    coverImage: imgGdgJf,
    altText: "Identidade visual do GDG Juiz de Fora",
    category: "outros",
    status: "concluido",
    content: {
      longDescription:
        "O GDG Juiz de Fora é uma comunidade local ativa desde 2014, com mais de 130 eventos técnicos gratuitos e abertos, cobrindo desde web e mobile até cloud e IA. Participação frequente nos encontros presenciais, que acontecem a cada duas semanas em locais variados da cidade.",
      videoUrl: "",
      gallery: [],
      curriculum: [
        "Networking técnico local",
        "Palestras sobre tecnologias Google e do mercado",
        "Comunidade de desenvolvedores de Juiz de Fora",
      ],
      officialLink: "https://gdg.community.dev/gdg-juiz-de-fora/",
    },
  },
  {
    id: "11",
    slug: "if-sudeste-mg-informatica",
    title: "Técnico em Informática",
    institution: "IF Sudeste MG",
    description:
      "Curso técnico em Informática, período noturno, no Instituto Federal do Sudeste de Minas Gerais — Campus Juiz de Fora.",
    coverImage: imgIfsudesteJf,
    altText: "Identidade visual do IF Sudeste MG",
    category: "outros",
    status: "concluido",
    content: {
      longDescription:
        "Formação técnica de nível médio em Informática no IF Sudeste MG, campus Juiz de Fora, cursada no período noturno — base formal que antecedeu a entrada na graduação em Ciência da Computação.",
      videoUrl: "",
      gallery: [],
      curriculum: [
        "Lógica de Programação",
        "Redes de Computadores",
        "Banco de Dados",
        "Manutenção e Suporte",
        "Desenvolvimento de Sistemas",
      ],
      officialLink: "https://www.ifsudestemg.edu.br/juizdefora",
    },
  },
  {
    id: "12",
    slug: "ufjf-dcc-cc-noturno",
    title: "Ciência da Computação (Noturno)",
    institution: "UFJF",
    description:
      "Bacharelado em Ciência da Computação, período noturno, na Universidade Federal de Juiz de Fora (UFJF-DCC).",
    coverImage: imgUfjf,
    altText: "Identidade visual da UFJF",
    category: "outros",
    status: "concluido",
    content: {
      longDescription:
        "Graduação em Ciência da Computação pela UFJF, no Departamento de Ciência da Computação (DCC), cursada no período noturno — formação de base teórica e prática em algoritmos, estruturas de dados, engenharia de software e fundamentos de computação.",
      videoUrl: "",
      gallery: [],
      curriculum: [
        "Algoritmos e Estruturas de Dados",
        "Engenharia de Software",
        "Banco de Dados",
        "Redes de Computadores",
        "Linguagens de Programação",
      ],
      officialLink: "https://www2.ufjf.br/cursocomputacao/",
    },
  },
];