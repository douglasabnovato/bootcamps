/* index.tsx — ponto de entrada do roteamento.
   Antes este arquivo trazia um segundo roteador (createBrowserRouter) que ninguém
   importava e que não funcionava com o MainLayout baseado em children.
   Agora é apenas o barril do AppRouter, que é o roteador de fato. */

export { AppRouter } from './AppRouter';

/* Fim de index.tsx */
