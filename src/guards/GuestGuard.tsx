import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '@/common/Loaders';
import useUser from '@/hooks/queries/useUser';

export default function GuestGuard({ children }: PropsWithChildren) {
    const { isLoading, user } = useUser();

    if (isLoading) return <Loader />;

    return <>{user ? <Navigate to="/dashboard" /> : children}</>;
}
