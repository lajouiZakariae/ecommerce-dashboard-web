import Breadcrumb from '@/components/Breadcrumb';
import useProducts from '@/hooks/queries/useProducts';
import OrderDetailsEdit from '@/orders/OrderDetailsEdit/OrderDetailsEdit';
import { OrderItem } from '@/orders/types/order';
import apiClient from '@/utils/api-client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function OrderDetailsPage() {
    const { id } = useParams();

    const orderItemsQuery = useQuery({
        queryKey: ['orders', id, 'order-items'],
        queryFn: async (): Promise<OrderItem[]> => {
            const { data } = await apiClient.get(`orders/${id}/order-items`);

            console.log(data);
            return data;
        },
    });

    const productsQuery = useProducts();

    if (productsQuery.isLoading || orderItemsQuery.isLoading) {
        return 'loading...';
    }

    if (orderItemsQuery.isSuccess && productsQuery.isSuccess) {
        return (
            <>
                <Breadcrumb
                    links={[{ path: '/dashboard', text: 'Dashboard' }]}
                    pageName={`Items of Order ${id}`}
                />

                <OrderDetailsEdit
                    _products={productsQuery.data.data}
                    order_items={orderItemsQuery.data}
                />
            </>
        );
    }
}
