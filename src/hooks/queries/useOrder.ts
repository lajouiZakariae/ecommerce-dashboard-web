import { Order } from '@/types';
import apiClient from '@/utils/api-client';
import { useQuery } from '@tanstack/react-query';

export default function useOrder(id: string | undefined) {
    return useQuery({
        queryKey: ['orders', id],
        queryFn: async (): Promise<Order> =>
            await apiClient.get(`orders/${id}`).then(({ data }) => data),
    });
}
