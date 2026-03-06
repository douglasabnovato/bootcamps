// src/shared/ui/badge/Badge.tsx
import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'outline';
}

export const Badge = ({ children, variant = 'primary' }: BadgeProps) => {
  // Estilos baseados no design system da learnTECH
  const variants = {
    primary: "bg-brand-primary/10 text-brand-primary border-brand-primary/20",
    outline: "bg-transparent text-zinc-500 border-zinc-800"
  };

  return (
    <span className={`
      px-2 py-0.5 
      rounded-md 
      text-[10px] 
      font-bold 
      uppercase 
      tracking-wider 
      border 
      inline-block
      ${variants[variant]}
    `}>
      {children}
    </span>
  );
};