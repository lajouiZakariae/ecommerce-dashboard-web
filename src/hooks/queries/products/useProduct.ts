import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query';
import { Product } from '@/types';
import apiClient from '@/utils/api-client';

type ExtraQueryOptions = Omit<UndefinedInitialDataOptions<Product>, 'queryKey'>;

export default function useProduct(
    // typing fix
    id: string | undefined,
    extraQueryOptions: ExtraQueryOptions = {},
) {
    return useQuery({
        queryKey: ['products', { id }],
        queryFn: async (): Promise<Product> =>
            await apiClient.get(`products/${id}`).then(({ data }) => data),
        ...extraQueryOptions,
    });
}
