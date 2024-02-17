import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import apiClient from '@/utils/api-client';
import { resolveQueryParamsString } from '@/utils/url-helpers';
import { Product } from '@/types';
import { Filters } from '@/products/useFiltersFromUrl';

export interface Result {
    data: Product[];
    meta: { last_page: number; links: [] };
}

export default function useProducts(
    filters: Filters = {},
    callback: ((_data: Result) => void) | null = null,
) {
    const memoCallback = () => resolveQueryParamsString({ ...filters });

    const queryString = useMemo(memoCallback, [filters]);

    const getProducts = async (): Promise<Result> => {
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
