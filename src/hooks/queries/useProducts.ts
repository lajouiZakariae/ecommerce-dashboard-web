import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import apiClient from '@/utils/api-client';
import { resolveQueryParamsString } from '@/utils/url-helpers';
import { PaginationResult } from '@/types';
import { Filters } from '@/products/useFiltersFromUrl';
import { Product } from '@/products/types/Product';

export default function useProducts(
    filters: Filters = {},
    callback: ((_data: PaginationResult<Product[]>) => void) | null = null,
) {
    const memoCallback = () => resolveQueryParamsString({ ...filters });

    const queryString = useMemo(memoCallback, [filters]);

    const getProducts = async (): Promise<PaginationResult<Product[]>> => {
        const { data } = await apiClient.get(
            `products${queryString.length ? `?${queryString}` : ''}`,
        );

        if (callback) callback(data);

        return data;
    };

    return useQuery({
        queryKey: ['products', filters],
        queryFn: getProducts,
        refetchOnWindowFocus: true,
    });
}
