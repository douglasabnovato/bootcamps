// src/shared/ui/layout/MainLayout.tsx
import { ReactNode } from 'react';

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-brand-primary/30">
            {/* Header Simples */}
            <header className="border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <span className="text-xl font-bold tracking-tighter text-brand-primary">
                        learn<span className="text-zinc-100">TECH</span>
                    </span>
                    <nav className="hidden md:flex gap-6 text-sm font-medium text-zinc-400">
                        <a href="/" className="hover:text-brand-primary transition-colors">Eventos</a>
                        <a href="#sobre" className="hover:text-brand-primary transition-colors">Sobre</a>
                    </nav>
                </div>
            </header>

            {/* Conteúdo Principal com Responsividade Explícita */}
            <main className="max-w-7xl mx-auto px-4 py-8 md:py-12 lg:py-16">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-zinc-800/50 py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center text-zinc-500 text-xs uppercase tracking-widest">
                    © 2026 learnTECH - Douglas Novato
                </div>
            </footer>
        </div>
    );
};