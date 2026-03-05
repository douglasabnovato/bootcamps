// src/entities/event/model/useEvents.ts: este hook gerencia o estado de carregamento (isLoading), o que é essencial para uma boa UX
import { useState, useEffect } from 'react';
import { BootcampEvent } from './types';
import { eventApi } from '../api/eventApi';

/**
 * Hook customizado para gerenciar a lógica de busca de eventos.
 * Centraliza o estado de loading e os dados da BU ByteClass.
 */
export const useEvents = () => {
  const [events, setEvents] = useState<BootcampEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const data = await eventApi.getAll();
        setEvents(data);
      } catch (err) {
        setError('Falha ao carregar os bootcamps da learnTECH.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Retornamos os dados e os estados para o componente UI
  return { 
    events, 
    isLoading, 
    error 
  };
};