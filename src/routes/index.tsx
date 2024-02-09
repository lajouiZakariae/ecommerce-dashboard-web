import { Outlet, RouteObject, createBrowserRouter } from 'react-router-dom';
import authRoutes from '@/routes/auth';
import AuthGuard from '@/guards/AuthGuard';
import GuestGuard from '@/guards/GuestGuard';

import LoginPage from '@/pages/LoginPage';

const coreRoutes: RouteObject[] = [
    {
        path: '/login',
        element: (
            <GuestGuard>
                <LoginPage />
            </GuestGuard>
        ),
    },
    {
        path: '/dashboard',
        element: (
            <AuthGuard>
                <Outlet />
            </AuthGuard>
        ),
        children: authRoutes,
    },
];

const router = createBrowserRouter(coreRoutes);

export default router;
