import { useEffect, useState } from 'react';
import { eventApi } from '../api/eventApi';
import type { BootcampEvent } from './types';

/**
 * Hook customizado para buscar um evento de forma assíncrona.
 * Gerencia o estado de carregamento para evitar erros de 'undefined' 
 * enquanto a Promise da eventApi não é resolvida.
 */
export const useEventBySlug = (slug: string | undefined) => {
  const [event, setEvent] = useState<BootcampEvent | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    // Resetar estados ao mudar de slug (importante para navegação entre eventos)
    setLoading(true);
    setError(false);

    if (!slug) {
      setLoading(false);
      return;
    }

    // Chamada assíncrona para a Camada de Abstração de Dados (DAL)
    eventApi.getBySlug(slug)
      .then((data) => {
        setEvent(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]); // Re-executa sempre que o slug na URL mudar

  return { event, loading, error };
};