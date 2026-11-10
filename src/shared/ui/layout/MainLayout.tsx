import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import { Footer } from "../footer/Footer";
import { BackToTopButton } from "./../backToTop/BackToTopButton";
import LogoLTECH from "./../../../assets/logo-icon.webp";

interface MainLayoutProps {
  children?: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-zinc-100 focus:text-zinc-950 focus:font-bold"
      >
        Pular para o conteúdo
      </a>
      <header className="w-full border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center">
          <Link to="/" aria-label="LearnTECH, página inicial dos eventos" className="group flex items-center gap-3">
            <img
              src={LogoLTECH}
              alt=""
              width={40}
              height={40}
              decoding="async"
              className="h-10 w-10 object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-2xl font-black tracking-tighter transition-transform group-hover:scale-105">
              <span className="text-white">Learn</span>
              <span className="text-brand-primary">TECH</span>
            </span>
          </Link>
        </div>
      </header>
      <main id="conteudo" tabIndex={-1} className="flex-grow outline-none focus:ring-0 max-w-7xl w-full mx-auto px-4 sm:px-6 py-12">
        {children}
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};
