import { RouteObject } from 'react-router-dom';
import NotFound from '../common/NotFound';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import OrdersPage from '../pages/orders/OrdersPage';
import PaymentMethodEditPage from '../pages/payment-methods/PaymentMethodEditPage';
import PaymentMethodsPage from '../pages/payment-methods/PaymentMethodsPage';
import ProductEditPage from '../pages/products/ProductEditPage';
import ProductsPage from '../pages/products/ProductsPage';

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
        children: [{ index: true, Component: OrdersPage }],
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
