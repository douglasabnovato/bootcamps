// src/app/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '../shared/ui/layout/MainLayout';
import { Home } from '../pages/home/Home';

const EventDetailsView = () => (
  <div className="min-h-screen bg-zinc-950 p-8">
    <h1 className="text-3xl font-bold text-brand-secondary">Detalhes do Evento</h1>
    <p className="text-zinc-400 mt-2">O parâmetro slug será capturado aqui para buscar os dados.</p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:slug" element={<EventDetailsView />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}