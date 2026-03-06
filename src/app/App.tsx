// src/app/App.tsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ScrollToTop } from './../shared/ui/lib/ScrollToTop';
import { AnimatePresence } from 'framer-motion';
import { MainLayout } from '../shared/ui/layout/MainLayout';
import { Home } from '../pages/home/Home';
import { Detail } from '../pages/detail/Detail';
import { NotFound } from '../pages/notFound/NotFound';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/event/:slug" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainLayout>
        <AnimatedRoutes />
      </MainLayout>
    </BrowserRouter>
  );
}