// src/app/App.tsx
import { BrowserRouter } from "react-router-dom";
import { LazyMotion, MotionConfig } from "framer-motion";
import { ScrollToTop } from "./../shared/ui/lib/ScrollToTop";
import { MainLayout } from "../shared/ui/layout/MainLayout";
import { AppRouter } from "./router/AppRouter";

// Os recursos de animação saem do bundle inicial e chegam num chunk à parte (issue #73).
const carregarRecursosDeAnimacao = () => import("../shared/lib/motion/features").then((modulo) => modulo.default);

export default function App() {
  return (
    <>
      {/* reducedMotion="user": quem pede menos movimento no sistema não recebe as animações de transformação. */}
      {/* strict: um `motion.*` esquecido quebra no desenvolvimento em vez de puxar o Framer Motion inteiro de volta. */}
      <LazyMotion features={carregarRecursosDeAnimacao} strict>
        <MotionConfig reducedMotion="user">
          <BrowserRouter>
            <ScrollToTop />
            <MainLayout>
              <AppRouter />
            </MainLayout>
          </BrowserRouter>
        </MotionConfig>
      </LazyMotion>
    </>
  );
}
