import Breadcrumb from '@/components/Breadcrumb';
import OrderDetails from '@/orders/OrderDetails';
import { OrderItem } from '@/orders/types/order';
import apiClient from '@/utils/api-client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function OrderDetailsPage() {
    const { id } = useParams();

    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ['orders', id, 'order-items'],
        queryFn: async (): Promise<OrderItem[]> => {
            const { data } = await apiClient.get(`orders/${id}/order-items`);

            console.log(data);
            return data;
        },
    });

    if (isLoading) {
        return 'loading...';
    }

    if (isSuccess) {
        return (
            <>
                <Breadcrumb
                    links={[{ path: '/dashboard', text: 'Dashboard' }]}
                    pageName={`Items of Order ${id}`}
                />

                <OrderDetails order_items={data} />
            </>
        );
    }
}
