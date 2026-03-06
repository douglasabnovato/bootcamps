import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../../shared/ui/layout/MainLayout';
import { Home } from '../../pages/home/Home';
import { Detail } from '../../pages/detail/Detail';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,  
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/event/:slug',
                element: <Detail />,
            },
        ],
    },
]);