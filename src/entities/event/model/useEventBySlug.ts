import { events } from '../api/events.data';
import type { BootcampEvent } from './types';

export const useEventBySlug = (slug: string | undefined): BootcampEvent | undefined => {
  if (!slug) return undefined;
    
  return events.find((event: BootcampEvent) => event.slug === slug);
};