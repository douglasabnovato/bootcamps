import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

const Home = lazy(() => import("../../pages/home/Home").then((module) => ({ default: module.Home })));
const Detail = lazy(() => import("../../pages/detail/Detail").then((module) => ({ default: module.Detail })));
const NotFound = lazy(() => import("../../pages/notFound/NotFound").then((module) => ({ default: module.NotFound })));

// Sem AnimatePresence: nenhuma página tem animação de saída (`exit`) e o filho direto era o Suspense, sem chave,
// então ele não animava nada e só pesava no bundle inicial (issue #73). A transição card → detalhe usa `layoutId`.
export const AppRouter = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<div className="h-screen bg-zinc-950" />}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/event/:slug" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
