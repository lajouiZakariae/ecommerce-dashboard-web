import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import apiClient from '@/utils/api-client';
import { resolveQueryParamsString } from '@/utils/url-helpers';
import { Product } from '@/types';
import { Filters } from '@/products/useProductUrlFilters';

interface Result {
    data: Product[];
    meta: { last_page: number; links: [] };
}

export default function useProducts(filters: Filters) {
    const queryString = useMemo(
        () => resolveQueryParamsString({ ...filters }),
        [filters],
    );

    const getProducts = async (): Promise<Result> =>
        apiClient
            .get(`products${queryString.length ? `?${queryString}` : ''}`)
            .then((response) => response.data);

    return useQuery({
        queryKey: ['products', filters],
        queryFn: getProducts,
    });
}
