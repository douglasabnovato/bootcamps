// src/app/App.tsx
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; // Adicionado do item 5.3
import { ScrollToTop } from './../shared/ui/lib/ScrollToTop';
import { MainLayout } from '../shared/ui/layout/MainLayout';
import { AppRouter } from './router/AppRouter';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <MainLayout>
          <AppRouter />
        </MainLayout>
      </BrowserRouter>
    </HelmetProvider>
  );
}