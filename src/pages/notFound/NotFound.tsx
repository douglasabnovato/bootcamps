import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const NotFound = () => {
    const navigate = useNavigate();
    useEffect(() => {
        console.warn(`[learnTECH] 404 - Rota Inexistente: ${window.location.pathname}`);
        // No futuro, aqui você poderia disparar um evento para o Analytics
    }, []);
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
            {/* Elemento Visual de Impacto */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative mb-8"
            >
                <h1 className="text-[12rem] md:text-[15rem] font-black text-zinc-900 leading-none select-none">
                    404
                </h1>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl md:text-3xl font-bold text-white tracking-tighter uppercase italic bg-zinc-950 px-4">
                        Trilha Perdida
                    </span>
                </div>
            </motion.div>

            {/* Conteúdo de Texto */}
            <div className="max-w-md space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-zinc-100">
                    Ops! Essa jornada ainda não foi mapeada.
                </h2>
                <p className="text-zinc-500 text-lg leading-relaxed font-light">
                    Parece que você tentou acessar um bootcamp ou evento que não existe no ecossistema <span className="text-brand-primary font-bold">learnTECH</span>.
                </p>

                {/* Ação de Retorno */}
                <div className="pt-8">
                    <button
                        onClick={() => navigate('/')}
                        className="group relative px-8 py-4 bg-zinc-100 text-zinc-950 rounded-2xl font-bold uppercase tracking-widest transition-all hover:bg-brand-primary hover:text-white"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            ← Voltar para a Home
                        </span>
                    </button>
                </div>
            </div>

            {/* Decoração Sutil de Fundo */}
            <div className="absolute -z-10 w-64 h-64 bg-brand-primary/10 blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
    );
};