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
      const dados = await buscarRecurso<BootcampEvent[]>('bootcamps/eventos.json');
      // Resposta fora do formato esperado (ex.: objeto em vez de lista) cai nos dados locais.
      if (!Array.isArray(dados)) throw new Error('formato inválido em bootcamps/eventos.json');
      return resolverMidia(dados);
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
      const dado = await buscarRecurso<BootcampEvent>(`bootcamps/eventos/${encodeURIComponent(slug)}.json`);
      // Sem slug, content ou curriculum, a página de detalhe quebraria: usa o evento local.
      if (!dado || typeof dado !== 'object' || typeof dado.slug !== 'string' || !dado.content || !Array.isArray(dado.content.curriculum)) {
        throw new Error(`formato inválido em bootcamps/eventos/${slug}.json`);
      }
      return resolverMidia(dado);
    } catch (erro) {
      if (API_URL) console.warn('[learntech-content] usando evento local:', (erro as Error).message);
      return events.find((item) => item.slug === slug);
    }
  }
};
