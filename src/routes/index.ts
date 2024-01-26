import { lazy } from 'react';
import { RouteObject, createBrowserRouter } from 'react-router-dom';

const ProductsPage = lazy(() => import('@/pages/products/ProductPage'));
const ProductEditPage = lazy(() => import('@/pages/products/ProductEditPage'));

const Calendar = lazy(() => import('@/pages/Calendar'));
const Profile = lazy(() => import('@/pages/Profile'));
const DefaultLayout = lazy(() => import('@/layout/DefaultLayout'));

const coreRoutes: RouteObject[] = [
    {
        Component: DefaultLayout,
        path: '/',
        children: [
            { index: true },
            {
                path: '/products',
                children: [
                    {
                        index: true,
                        Component: ProductsPage,
                    },
                    {
                        path: ':id/edit',
                        Component: ProductEditPage,
                    },
                ],
            },
            {
                path: '/calendar',
                Component: Calendar,
            },
            {
                path: '/profile',
                Component: Profile,
            },
        ],
    },
];

const router = createBrowserRouter(coreRoutes);

export default router;
