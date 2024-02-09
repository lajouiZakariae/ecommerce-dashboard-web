import Loader from '@/common/Loaders';
import useUser from '@/hooks/queries/useUser';
import DefaultLayout from '@/layout/DefaultLayout';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

export default function AuthGuard({ children }: PropsWithChildren) {
    const { isLoading, user } = useUser();

    if (isLoading) return <Loader />;

    return (
        <>
            {user ? (
                <DefaultLayout>{children}</DefaultLayout>
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
}
