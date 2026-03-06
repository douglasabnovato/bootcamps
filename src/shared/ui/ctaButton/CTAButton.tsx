import { cn } from "./../lib/utils";

interface CTAButtonProps {
    url: string;
    status: 'completed' | 'desired';
    label?: string;
}

export const CTAButton = ({ url, status, label }: CTAButtonProps) => {
    const isCompleted = status === 'completed';

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "flex items-center justify-center w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl",
                isCompleted
                    ? "bg-emerald-500 text-emerald-950 hover:bg-emerald-400 shadow-emerald-500/20"
                    : "bg-amber-500 text-amber-950 hover:bg-amber-400 shadow-amber-500/20"
            )}
        >
            {label || (isCompleted ? "Acessar a Programação" : "Conhecer a Programação")}
        </a>
    );
};