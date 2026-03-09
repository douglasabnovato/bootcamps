// src/shared/ui/layout/MainLayout.tsx
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import { Footer } from '../footer/Footer';

interface MainLayoutProps {
    children?: ReactNode;
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

            <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 py-12">
                {children || <Outlet />}
            </main>

            <Footer />

        </div>
    );
};