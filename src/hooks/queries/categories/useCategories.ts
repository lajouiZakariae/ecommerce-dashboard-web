import { useQuery } from '@tanstack/react-query';
import apiClient from '@/utils/api-client';
import { Category } from '@/types';

export default function useCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async (): Promise<Category[]> => {
            const response = await apiClient.get('categories');
            return response.data;
        },
    });
}
