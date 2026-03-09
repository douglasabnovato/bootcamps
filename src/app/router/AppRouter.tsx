import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const Home = lazy(() => import('../../pages/home/Home').then(module => ({ default: module.Home })));
const Detail = lazy(() => import('../../pages/detail/Detail').then(module => ({ default: module.Detail })));
const NotFound = lazy(() => import('../../pages/notFound/NotFound').then(module => ({ default: module.NotFound })));

export const AppRouter = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Suspense fallback={<div className="h-screen bg-zinc-950" />}>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/event/:slug" element={<Detail />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </AnimatePresence>
    );
};