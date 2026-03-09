import { motion } from 'framer-motion';
// Se estiver usando Lucide React para ícones:
// import { Github, Linkedin, Instagram } from 'lucide-react';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-zinc-900 bg-zinc-950 pt-16 pb-8">
            <div className="max-w-5xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">

                    {/* Esquerda: Branding e Contexto */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-black text-white tracking-tighter">
                            learn<span className="text-brand-primary">TECH</span>
                        </h2>
                        <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
                            Ecossistema de aceleração para desenvolvedores focado em tracks práticas e bootcamps intensivos.
                        </p>
                    </div>

                    {/* Direita: Redes Sociais */}
                    <div className="flex flex-col items-start md:items-end gap-4">
                        <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Connect with us</span>
                        <div className="flex items-center gap-5">
                            <SocialLink
                                href="https://github.com/seu-github"
                                label="GitHub"
                                icon="GH" // Substitua pelo ícone real
                            />
                            <SocialLink
                                href="https://linkedin.com/in/seu-linkedin"
                                label="LinkedIn"
                                icon="LI" // Substitua pelo ícone real
                            />
                        </div>
                    </div>
                </div>

                {/* Créditos Finais */}
                <div className="mt-16 pt-8 border-t border-zinc-900/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-600 text-xs font-mono">
                        © {currentYear} Douglas A. B. Novato. All rights reserved.
                    </p>
                    <div className="text-zinc-600 text-[10px] uppercase tracking-tighter">
                        Desenvolvido com <span className="text-brand-primary">React + Vite</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Sub-componente interno para evitar repetição (DRY)
const SocialLink = ({ href, label, icon }: { href: string; label: string; icon: string }) => (
    <motion.a
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.95 }}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-brand-primary hover:text-brand-primary transition-colors focus-visible:ring-2 focus-visible:ring-brand-primary outline-none"
    >
        <span className="font-bold text-xs">{icon}</span>
    </motion.a>
);