// src/app/App.tsx
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; // Adicionado do item 5.3
import { MotionConfig } from 'framer-motion';
import { ScrollToTop } from './../shared/ui/lib/ScrollToTop';
import { MainLayout } from '../shared/ui/layout/MainLayout';
import { AppRouter } from './router/AppRouter';

export default function App() {
  return (
    <HelmetProvider>
      {/* reducedMotion="user": quem pede menos movimento no sistema não recebe as animações de transformação. */}
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <ScrollToTop />
          <MainLayout>
            <AppRouter />
          </MainLayout>
        </BrowserRouter>
      </MotionConfig>
    </HelmetProvider>
  );
}