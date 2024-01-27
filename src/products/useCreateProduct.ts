import apiClient from '@/utils/api-client';
import { useMutation } from '@tanstack/react-query';

export default function useCreateProduct() {
    return useMutation({
        mutationKey: ['products'],
        mutationFn: async (data: { title: string }) =>
            await apiClient.post('products', data),
    });
}
