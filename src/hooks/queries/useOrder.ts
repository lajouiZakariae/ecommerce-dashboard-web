import { Order } from '@/orders/types/order';
import apiClient from '@/utils/api-client';
import { useQuery } from '@tanstack/react-query';

export default function useOrder(id: string | undefined) {
    return useQuery({
        queryKey: ['orders', id],
        queryFn: async (): Promise<Order> => {
            const { data } = await apiClient.get(`orders/${id}`);
            console.log('Fetching...');
            return data;
        },
    });
}
