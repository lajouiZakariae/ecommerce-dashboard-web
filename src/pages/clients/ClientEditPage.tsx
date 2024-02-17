import { useParams } from 'react-router-dom';
import Breadcrumb from '@/components/Breadcrumb';
import ProductEditForm from '@/products/ProductEditForm/ProductEditForm';
import NotFound from '@/common/NotFound';
import useClient from '@/hooks/queries/useClient';
import ClientEditForm from '@/clients/ClientEditForm';

export default function ClientEditPage() {
    const { id } = useParams();

    const { isLoading, error, isSuccess, data } = useClient(id, {
        retry: false,
        refetchOnWindowFocus: false,
    });

    if (isLoading) return 'loading...';

    if (error?.response?.status === 404) return <NotFound />;

    if (error) return 'error...';

    if (isSuccess) {
        return (
            <>
                <Breadcrumb
                    links={[
                        { text: 'Dashboard', path: '/dashboard' },
                        { text: 'Clients', path: '/dashboard/clients' },
                    ]}
                    pageName={`${data.first_name} ${data.last_name}`}
                />
                <ClientEditForm client={data} />
            </>
        );
    }
}
