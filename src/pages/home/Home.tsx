// src/pages/home/HomePage.tsx
import { useEvents } from '../../entities/event/model/useEvents';
import { EventCard } from '../../entities/event/ui/EventCard'; 
import { useDocumentTitle } from './../../shared/ui/lib/hooks/useDocumentTitle';

export const Home = () => {
    const { events, isLoading } = useEvents();
    useDocumentTitle("Bootcamps & Formações");

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64" aria-live="polite">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-primary"></div>
            </div>
        );
    }

    return (
        <section className="container mx-auto px-4 py-8">
            <header className="mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight text-white">
                    Bootcamps & Formações
                </h1>
                <p className="text-zinc-400 mt-2 text-lg">
                    Explorando minha jornada técnica e especializações.
                </p>
            </header>

            {/* Grid Bento com o componente especializado */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </section>
    );
};