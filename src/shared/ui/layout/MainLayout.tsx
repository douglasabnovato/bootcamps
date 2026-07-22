import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import { Footer } from '../footer/Footer';
import { BackToTopButton } from './../backToTop/BackToTopButton';
import LogoLTECH from './../../../assets/logo-icon.png';
 
interface MainLayoutProps {
    children?: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100">
            <header className="w-full border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center">
                    <Link to="/" className="group flex items-center gap-3">
                        <img
                            src={LogoLTECH}
                            alt="Logo LearnTECH"
                            className="h-10 w-10 object-contain transition-transform group-hover:scale-105"
                        />
                        <h1 className="text-2xl font-black tracking-tighter transition-transform group-hover:scale-105">
                            <span className="text-white">Learn</span>
                            <span className="text-brand-primary">TECH</span>
                        </h1>
                    </Link>
                </div>
            </header>
            <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 py-12">
                {children || <Outlet />}
            </main>
            <Footer />
            <BackToTopButton />
        </div>
    );
};