import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Product } from '@/types';
import apiClient from '@/utils/api-client';

// type ExtraQueryOptions = Pick<
//     UndefinedInitialDataOptions<Product>,
//     'refetchOnWindowFocus' | 'retry'
// >;
type ExtraQueryOptions = Omit<UndefinedInitialDataOptions<Product>, 'queryKey'>;

export default function useProduct(extraQueryOptions: ExtraQueryOptions) {
    const { id } = useParams();

    return useQuery({
        queryKey: ['products', { id }],
        queryFn: async (): Promise<Product> =>
            await apiClient.get(`products/${id}`).then(({ data }) => data),
        ...extraQueryOptions,
    });
}
