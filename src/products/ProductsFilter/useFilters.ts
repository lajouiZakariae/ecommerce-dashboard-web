import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { appendSearchParams } from '@/utils/url-helpers';
import { SortBy } from '@/types';

const sortByAllowedList = ['created_at', 'price', 'cost', 'stock_quantity'];

export default function useFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [filters, setFilters] = useState(() => {
        const priceFrom = searchParams.get('price_from');
        const priceTo = searchParams.get('price_to');
        const published = searchParams.get('published') ?? 'all';
        const sortBy = searchParams.get('sort_by');

        return {
            price_from: priceFrom ?? '',
            price_to: priceTo ?? '',
            cost_from: searchParams.get('cost_from') ?? '',
            cost_to: searchParams.get('cost_to') ?? '',
            sort_by:
                sortBy && sortByAllowedList.includes(sortBy)
                    ? sortBy
                    : SortBy.CREATED_AT,
            order: searchParams.get('order') ?? 'desc',
            published,
        };
    });

    const clearFilters = () => {
        const defaultFilters = {
            price_from: '',
            price_to: '',
            cost_from: '',
            cost_to: '',
            published: 'all',
            sort_by: SortBy.CREATED_AT,
            order: 'asc',
        };

        setFilters(defaultFilters);

        setSearchParams((prev) => appendSearchParams(prev, defaultFilters));
    };

    const applyFilters = () =>
        setSearchParams((prev) => appendSearchParams(prev, filters));

    return { filters, setFilters, clearFilters, applyFilters };
}
