// src/entities/event/api/eventApi.ts
import { BootcampEvent } from '../model/types';
import { bootcampsMock } from './events.data'; // Este arquivo criaremos no passo 2.2

/**
 * Camada de Abstração de Dados (Data Access Layer)
 * Centraliza como o sistema obtém os eventos.
 */
export const eventApi = {
  /**
   * Simula a busca de todos os eventos com um delay de rede.
   */
  getAll: async (): Promise<BootcampEvent[]> => {
    return new Promise((resolve) => {
      // Simulando latência de 500ms para testar Loadings no futuro
      setTimeout(() => {
        resolve(bootcampsMock);
      }, 500);
    });
  },

  /**
   * Busca um evento específico pelo seu slug (ID amigável).
   */
  getBySlug: async (slug: string): Promise<BootcampEvent | undefined> => {
    return new Promise((resolve) => {
      const event = bootcampsMock.find((item) => item.slug === slug);
      setTimeout(() => {
        resolve(event);
      }, 300);
    });
  }
};