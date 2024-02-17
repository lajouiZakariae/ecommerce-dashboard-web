import { orderItemsAtom } from '@/orders/OrderDetailsEdit/orderItemsAtom';
import { OrderItem } from '@/orders/types/order';
import apiClient from '@/utils/api-client';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

export default function useOrderItems(orderId: number) {
    const [_, dispatch] = useAtom(orderItemsAtom);

    return useQuery({
        queryKey: ['orders', orderId, 'order-items'],
        queryFn: async (): Promise<OrderItem[]> => {
            const { data } = await apiClient.get(
                `orders/${orderId}/order-items`,
            );
            dispatch({ type: 'update_order_items', payload: data });
            return data;
        },
    });
}
