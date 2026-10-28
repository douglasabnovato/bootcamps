import { useEffect, useState } from 'react';
import { eventApi } from '../api/eventApi';
import type { BootcampEvent } from './types';

/* Resultado guardado junto com o slug que o gerou: assim "carregando" é derivado, sem setState síncrono no efeito. */
type Resultado = { slug: string; event: BootcampEvent | undefined; error: boolean };

/**
 * Hook customizado para buscar um evento de forma assíncrona.
 * Gerencia o estado de carregamento para evitar erros de 'undefined'
 * enquanto a Promise da eventApi não é resolvida.
 */
export const useEventBySlug = (slug: string | undefined) => {
  const [resultado, setResultado] = useState<Resultado | null>(null);

  useEffect(() => {
    if (!slug) return;

    // Ignora respostas de um slug anterior (navegação rápida entre eventos).
    let ativo = true;

    // Chamada assíncrona para a Camada de Abstração de Dados (DAL)
    eventApi.getBySlug(slug)
      .then((data) => {
        if (ativo) setResultado({ slug, event: data, error: false });
      })
      .catch(() => {
        if (ativo) setResultado({ slug, event: undefined, error: true });
      });

    return () => {
      ativo = false;
    };
  }, [slug]); // Re-executa sempre que o slug na URL mudar

  if (!slug) return { event: undefined, loading: false, error: false };

  // Enquanto o resultado guardado for de outro slug, o evento atual ainda está carregando.
  const atual = resultado?.slug === slug ? resultado : null;
  return { event: atual?.event, loading: atual === null, error: atual?.error ?? false };
};