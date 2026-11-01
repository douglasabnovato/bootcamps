// src/entities/event/model/types.ts

// Interface para itens da galeria
export interface EventMedia {
  id: string;
  url: string;
  type: "image" | "video";
  alt?: string;
}

export type EventCategory =
  | "frontend"
  | "backend"
  | "fullstack"
  | "mobile"
  | "outros";
export type EventStatus = "concluido" | "desejado";

export interface EventLink {
  label: string;
  url: string;
}


export interface EventActivity {
  tipo: "palestra" | "painel" | "workshop" | "networking" | "sorteio";
  titulo: string;
  descricao?: string;
}

export interface EventEdition {
  numero?: number;
  year: string;
  data?: string;
  horario?: string;
  local?: { nome: string; cidade: string };
  tema?: string;
  formato?: string;
  programacao?: EventActivity[];
  participacao?: "presente" | "inscrito" | "nao-participou";
  link?: string;
  image: string;
  highlight: string;
  status: "realizado" | "anunciado";
}

export interface BootcampEvent {
  id: string;
  slug: string;
  title: string;
  institution: string;
  description: string;
  coverImage: string;
  altText: string;
  category: EventCategory;
  status: EventStatus;

  content: {
    longDescription: string;
    paragraphs?: string[];
    videoUrl?: string;
    gallery?: EventMedia[];
    curriculum: string[];
    officialLink: string;
    editions?: EventEdition[];
    links?: EventLink[];
    certificate?: string;
    sources?: EventLink[];
    /* Conteúdo relacionado nos outros projetos; a API publica título e URL prontos. */
    relacionados?: { tipo: string; id: string; projeto?: string; titulo?: string; url?: string }[];
  };
}
