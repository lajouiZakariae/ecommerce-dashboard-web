import { Order } from '@/types';
import apiClient from '@/utils/api-client';
import { useQuery } from '@tanstack/react-query';

// interface Result {
//     data: Order[];
//     meta: { last_page: number; links: [] };
// }

export default function useOrders() {
    const getProducts = async (): Promise<Order[]> =>
        apiClient.get(`orders`).then((response) => response.data);

    return useQuery({
        queryKey: ['orders'],
        queryFn: getProducts,
    });
}
