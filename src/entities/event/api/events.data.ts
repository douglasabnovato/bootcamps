// src/entities/event/api/events.data.ts
import type { BootcampEvent } from './../model/types';

export const events: BootcampEvent[] = [
  {
    id: '1',
    slug: '42-sp',
    title: 'Piscine 42SP',
    institution: '42 São Paulo',
    description: 'A base da engenharia de software através da metodologia peer-to-peer.',
    coverImage: 'https://placehold.co/600x400/0A0A0B/00D1FF?text=42+SP', // Placeholder por enquanto
    altText: 'Logo da 42 São Paulo em estilo minimalista',
    category: 'fullstack',
    content: {
      longDescription: 'A 42 é uma escola de engenharia de software disruptiva. O aprendizado é baseado em projetos, colaboração e correção entre pares (P2P), sem professores ou salas de aula tradicionais.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      curriculum: ['Linguagem C', 'Shell Script', 'Git & GitHub', 'Algoritmos'],
      officialLink: 'https://www.42sp.org.br'
    }
  },
  {
    id: '2',
    slug: 'rocketseat-ignite',
    title: 'Ignite ReactJS',
    institution: 'Rocketseat',
    description: 'Especialização profunda no ecossistema React e TypeScript.',
    coverImage: 'https://placehold.co/600x400/0A0A0B/7000FF?text=Rocketseat',
    altText: 'Logo da Rocketseat com cores vibrantes',
    category: 'frontend',
    content: {
      longDescription: 'Treinamento focado em criar interfaces modernas, performáticas e escaláveis, utilizando as melhores práticas do mercado como Design Patterns e Clean Code.',
      videoUrl: '', 
      curriculum: ['React Hooks', 'Context API', 'Stitches/Tailwind', 'Next.js'],
      officialLink: 'https://www.rocketseat.com.br'
    }
  },
  {
    id: '3',
    slug: 'caelum-java',
    title: 'Formação Java',
    institution: 'Caelum (Alura)',
    description: 'Fundamentos sólidos de Programação Orientada a Objetos com Java.',
    coverImage: 'https://placehold.co/600x400/0A0A0B/00D1FF?text=Caelum',
    altText: 'Logo da Caelum Ensino e Inovação',
    category: 'backend',
    content: {
      longDescription: 'Uma jornada completa pelos fundamentos do Java, explorando desde a sintaxe básica até frameworks robustos para o mercado corporativo.',
      videoUrl: '',
      curriculum: ['Java SE', 'Collections', 'Exceptions', 'Maven'],
      officialLink: 'https://www.alura.com.br'
    }
  }
  // Dica: Adicione os outros bootcamps (DIO, Udemy, etc.) seguindo este mesmo padrão.
];