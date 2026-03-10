
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LogoLTECH from './../../../assets/logo-icon.png';
import { Github, Linkedin, Instagram } from 'lucide-react';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-zinc-900 bg-zinc-950 pt-16 pb-8">
            <div className="max-w-5xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">

                    <div className="space-y-4">
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
                        <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
                            Ecossistema de aceleração para desenvolvedores focado em tracks práticas e bootcamps intensivos.
                        </p>
                    </div>

                    {/* Direita: Redes Sociais */}
                    <div className="flex flex-col items-start md:items-end gap-4">
                        <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Connect with us</span>
                        <div className="flex items-center gap-5">
                            <SocialLink
                                href="https://github.com/seuusuario"
                                label="GitHub"
                                icon={<Github size={20} />}
                            />

                            <SocialLink
                                href="https://linkedin.com/in/seuusuario"
                                label="LinkedIn"
                                icon={<Linkedin size={20} />}
                            />

                            <SocialLink
                                href="https://instagram.com/seuusuario"
                                label="Instagram"
                                icon={<Instagram size={20} />}
                            />

                        </div>
                    </div>
                </div>

                {/* Créditos Finais */}
                <div className="mt-16 pt-8 border-t border-zinc-900/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-600 text-xs font-mono">
                        © {currentYear} LearnTECH. All rights reserved.
                    </p>
                    <div className="text-zinc-600 text-[10px] uppercase tracking-tighter">
                        Desenvolvido <span className="text-brand-primary">Eventos </span>com <span className="text-brand-primary">React + Vite</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

type SocialLinkProps = {
    href: string;
    label: string;
    icon: React.ReactNode;
};

const SocialLink = ({ href, label, icon }: SocialLinkProps) => (
    <motion.a
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.95 }}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-brand-primary hover:text-brand-primary transition-colors focus-visible:ring-2 focus-visible:ring-brand-primary outline-none"
    >
        {icon}
    </motion.a>
); 