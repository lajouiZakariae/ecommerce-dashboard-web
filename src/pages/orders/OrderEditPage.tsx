import { useParams } from 'react-router-dom';
import Breadcrumb from '@/components/Breadcrumb';
import NotFound from '@/common/NotFound';
import useOrder from '@/hooks/queries/orders/useOrder';
import OrderEditForm from '@/components/orders/OrderEditForm';

export default function OrderEditPage() {
    const { id } = useParams();

    const { isLoading, error, isSuccess, data } = useOrder(id);

    if (isLoading) return 'loading...';

    if (error?.response?.status === 404) return <NotFound />;

    if (error) return 'error...';

    if (isSuccess) {
        return (
            <>
                <Breadcrumb
                    links={[
                        { text: 'Dashboard', path: '/' },
                        { text: 'Orders', path: '/dashboard/orders' },
                    ]}
                    pageName={data.full_name}
                />

                <OrderEditForm order={data} />
            </>
        );
    }
}
