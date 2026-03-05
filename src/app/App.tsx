// src/app/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { MainLayout } from '../shared/ui/layout/MainLayout';
 
const HomeView = () => (
  <div className="min-h-screen bg-zinc-950 p-8">
    <h1 className="text-3xl font-bold text-brand-primary">Home: Lista de Eventos</h1>
    <p className="text-zinc-400 mt-2">O motor de dados está pronto para alimentar esta tela.</p>
  </div>
);

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
          <Route path="/" element={<HomeView />} />
          <Route path="/event/:slug" element={<EventDetailsView />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}