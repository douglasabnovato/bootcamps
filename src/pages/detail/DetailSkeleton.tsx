import { Skeleton } from "../../shared/ui/skeleton/Skeleton";

export const DetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans pb-32">
      {/* Esqueleto do Header/Banner */}
      <Skeleton className="w-full h-[50vh] md:h-[65vh] rounded-none" />

      <div className="max-w-5xl mx-auto px-6 -mt-32 relative z-10 space-y-12">
        {/* Esqueleto dos Títulos */}
        <header className="space-y-6">
          <div className="flex gap-4">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-32 rounded-full" />
          </div>
          <Skeleton className="h-20 w-3/4" />
          <Skeleton className="h-10 w-full" />
        </header>

        {/* Esqueleto do Media Center */}
        <section className="space-y-8">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="w-full aspect-video rounded-3xl" />
        </section>

        {/* Esqueleto do Currículo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-3xl" />
          ))}
        </div>
      </div>
    </div>
  );
};