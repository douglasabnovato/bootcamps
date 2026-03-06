import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '../shared/ui/layout/MainLayout';
import { Home } from '../pages/home/Home';
// Importe a página que estruturamos com a lógica de dados
import { Detail } from '../pages/detail/Detail';

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* TROCA: Saia o placeholder EventDetailsView, entra a página Detail */}
          <Route path="/event/:slug" element={<Detail />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}