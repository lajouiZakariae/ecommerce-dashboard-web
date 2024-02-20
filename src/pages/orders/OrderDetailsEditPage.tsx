import NotFound from '@/common/NotFound';
import Breadcrumb from '@/components/Breadcrumb';
import useOrderItems from '@/hooks/queries/useOrderItems';
import OrderDetailsEdit from '@/orders/OrderDetailsEdit/OrderDetailsEdit';
import { useParams } from 'react-router-dom';
import FeedLoading from '@/common/Loaders/FeedLoading';

export default function OrderDetailsPage() {
    const { id: orderId } = useParams();

    if (orderId === undefined) return <NotFound />;

    const orderItemsQuery = useOrderItems(parseInt(orderId));

    const renderOrderDetails = () => {
        if (orderItemsQuery.isLoading) return <FeedLoading count={10} />;

        if (orderItemsQuery.isSuccess)
            return (
                <OrderDetailsEdit
                    orderItems={orderItemsQuery.data}
                    orderId={parseInt(orderId)}
                />
            );
    };

    return (
        <>
            <Breadcrumb
                links={[
                    { path: '/dashboard', text: 'Dashboard' },
                    { path: '/dashboard/orders', text: 'Orders' },
                ]}
                pageName={`Items of Order ${orderId}`}
            />

            {renderOrderDetails()}
        </>
    );
}
