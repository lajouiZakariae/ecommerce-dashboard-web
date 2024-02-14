import apiClient from '@/utils/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

export default function useDecrementQuantity(id: number, url: string) {
    const client = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const { status } = await apiClient.patch(url);
            if (status === HttpStatusCode.NoContent) {
                client.refetchQueries({ queryKey: ['orders', id] });
            }
        },
    });
}
