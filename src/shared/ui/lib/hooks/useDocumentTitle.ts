import { useEffect } from 'react';

export const useDocumentTitle = (title: string, persist = false) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | learnTECH`;

    // Cleanup: Quando sair da página, volta para o título padrão (opcional)
    return () => {
      if (!persist) {
        document.title = previousTitle;
      }
    };
  }, [title, persist]);
};