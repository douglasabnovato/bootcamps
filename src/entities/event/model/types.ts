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


export interface EventEdition {
  year: string;
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
    videoUrl?: string;
    gallery?: EventMedia[];
    curriculum: string[];
    officialLink: string;
    editions?: EventEdition[];
    links?: EventLink[]; 
  };
}
