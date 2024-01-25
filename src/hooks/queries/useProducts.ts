import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import apiClient from '@/utils/api-client';
import { resolveQueryParamsString } from '@/utils/url-helpers';
import { Filters, Product } from '@/types';

interface Result {
    data: Product[];
    meta: { last_page: number };
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

    const query = useQuery({
        queryKey: ['products', filters],
        queryFn: getProducts,
    });

    return query;
    // return { products: query.data, isSuccess: query.isSuccess, status: query.status };
}
