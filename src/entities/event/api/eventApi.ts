// src/entities/event/api/eventApi.ts
import type { BootcampEvent } from '../model/types';
import { events } from './events.data';
import { buscarRecurso, resolverMidia, API_URL } from '../../../shared/api/learntechContent';

/**
 * Camada de Abstração de Dados (Data Access Layer)
 * Busca os eventos na API learntech-content e, se ela falhar, usa os dados locais (events.data.ts).
 */
export const eventApi = {
  /**
   * Busca todos os eventos (API primeiro, dados locais como reserva).
   */
  getAll: async (): Promise<BootcampEvent[]> => {
    try {
      return resolverMidia(await buscarRecurso<BootcampEvent[]>('bootcamps/eventos.json'));
    } catch (erro) {
      if (API_URL) console.warn('[learntech-content] usando eventos locais:', (erro as Error).message);
      return events;
    }
  },

  /**
   * Busca um evento específico pelo seu slug (ID amigável).
   */
  getBySlug: async (slug: string): Promise<BootcampEvent | undefined> => {
    try {
      return resolverMidia(await buscarRecurso<BootcampEvent>(`bootcamps/eventos/${encodeURIComponent(slug)}.json`));
    } catch (erro) {
      if (API_URL) console.warn('[learntech-content] usando evento local:', (erro as Error).message);
      return events.find((item) => item.slug === slug);
    }
  }
};
