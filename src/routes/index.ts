import NotFound from '@/common/NotFound';
import Home from '@/pages/Home';
import PaymentMethodsPage from '@/pages/PaymentMethodsPage';
import ProductEditPage from '@/pages/products/ProductEditPage';
import ProductsPage from '@/pages/products/ProductsPage';
import { lazy } from 'react';
import { RouteObject, createBrowserRouter } from 'react-router-dom';

// const ProductsPage = lazy(() => import('@/pages/products/ProductPage'));
// const ProductEditPage = lazy(() => import('@/pages/products/ProductEditPage'));

// const ECommerce = lazy(() => import('@/pages/Dashboard/ECommerce'));
const DefaultLayout = lazy(() => import('@/layout/DefaultLayout'));
const Profile = lazy(() => import('@/pages/Profile'));

const coreRoutes: RouteObject[] = [
    {
        Component: DefaultLayout,
        path: '/',
        children: [
            { index: true, Component: Home },
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
            { path: 'payment-methods', Component: PaymentMethodsPage },
            {
                path: '/profile',
                Component: Profile,
            },
            {
                path: '*',
                Component: NotFound,
            },
        ],
    },
];

const router = createBrowserRouter(coreRoutes);

export default router;
