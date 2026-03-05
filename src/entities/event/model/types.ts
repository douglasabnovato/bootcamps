/**
 * Interface que define a estrutura rigorosa de um Evento/Bootcamp
 * no ecossistema learnTECH.
 */

export type EventCategory = 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'outros';
export type EventStatus = 'concluido' | 'desejado';

export interface BootcampEvent {
  id: string;
  slug: string;           // Ex: 'rocketseat-ignite' (usado na URL)
  title: string;          // Nome do Bootcamp
  institution: string;    // Quem ofereceu (Caelum, DIO, etc)
  description: string;    // Texto curto para o Card principal
  coverImage: string;     // URL da imagem grande do Card
  altText: string;        // Acessibilidade (Obrigatório!)
  category: EventCategory;
  status: EventStatus;
  
  // Informações para a página interna de detalhes
  content: {
    longDescription: string;
    videoUrl?: string;    // Opcional, caso não tenha vídeo
    curriculum: string[]; // Lista de tópicos aprendidos
    officialLink: string; // Link para o site oficial
  };
}