import { RouteObject } from 'react-router-dom';
import NotFound from '../common/NotFound';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import OrdersPage from '../pages/orders/OrdersPage';
import PaymentMethodEditPage from '../pages/payment-methods/PaymentMethodEditPage';
import PaymentMethodsPage from '../pages/payment-methods/PaymentMethodsPage';
import ProductEditPage from '../pages/products/ProductEditPage';
import ProductsPage from '../pages/products/ProductsPage';
import OrderEditPage from '@/pages/orders/OrderEditPage';
import OrderDetailsEditPage from '@/pages/orders/OrderDetailsEditPage';
import ClientsPage from '@/pages/clients/ClientsPage';
import ClientEditPage from '@/pages/clients/ClientEditPage';
import ClientCreatePage from '@/pages/clients/ClientCreatePage';

const authRoutes: RouteObject[] = [
    { index: true, Component: Home },
    {
        path: 'products',
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
        path: 'payment-methods',
        children: [
            { index: true, Component: PaymentMethodsPage },
            { path: ':id/edit', Component: PaymentMethodEditPage },
        ],
    },
    {
        path: 'orders',
        children: [
            { index: true, Component: OrdersPage },
            { path: ':id/edit', Component: OrderEditPage },
            { path: ':id/details/edit', Component: OrderDetailsEditPage },
        ],
    },
    {
        path: 'clients',
        children: [
            { index: true, Component: ClientsPage },
            { path: 'create', Component: ClientCreatePage },
            { path: ':id/edit', Component: ClientEditPage },
            // { path: ':id/details/edit', Component: OrderDetailsEditPage },
        ],
    },

    {
        path: 'profile',
        Component: Profile,
    },
    {
        path: '*',
        Component: NotFound,
    },
];

export default authRoutes;
