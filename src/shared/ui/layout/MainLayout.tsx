// src/shared/ui/layout/MainLayout.tsx
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        // Wrapper principal que ocupa no mínimo a altura da tela inteira
        <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100">

            {/* 1. HEADER: Identidade e Navegação Principal */}
            <header className="w-full border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="group">
                        <h1 className="text-2xl font-black tracking-tighter transition-transform group-hover:scale-105">
                            learn<span className="text-brand-primary">TECH</span>
                        </h1>
                    </Link>

                    <nav aria-label="Navegação principal">
                        <ul className="flex items-center gap-8 text-sm font-medium uppercase tracking-wider text-zinc-400">
                            <li>
                                <Link to="/" className="hover:text-brand-primary transition-colors">Eventos</Link>
                            </li>
                            <li>
                                <a href="#sobre" className="hover:text-brand-primary transition-colors">Sobre</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* 2. MAIN: Onde o conteúdo das rotas (Home/Detalhes) é injetado */}
            <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 py-12">
                {children}
            </main>

            {/* 3. FOOTER: Rodapé informativo */}
            <footer className="w-full border-t border-zinc-800 py-10 bg-zinc-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-500 text-sm">
                        © 2026 <span className="text-zinc-300 font-semibold">learnTECH</span>. Todos os direitos reservados.
                    </p>
                    <div className="text-zinc-400 font-medium text-sm">
                        Douglas Novato — <span className="text-brand-primary">Full-stack Developer</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};