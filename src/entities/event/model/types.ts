// src/entities/event/model/types.ts

export type EventCategory =
  | "frontend"
  | "backend"
  | "fullstack"
  | "mobile"
  | "outros";
export type EventStatus = "concluido" | "desejado";

// Interface para itens da galeria
export interface EventMedia {
  id: string;
  url: string;
  type: "image" | "video";
  alt?: string;
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
    gallery?: EventMedia[]; // Adicionado para suportar o Media Center (4.3)
    curriculum: string[];
    officialLink: string;
  };
}
