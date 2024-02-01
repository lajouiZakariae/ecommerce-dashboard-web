import apiClient from '@/utils/api-client';
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';

export default function useDelete(url: string, queryKey: QueryKey) {
    const client = useQueryClient();

    return useMutation({
        mutationKey: [url],
        mutationFn: async () => await apiClient.delete(url),
        onSuccess: async () => await client.invalidateQueries({ queryKey }),
    });
}
