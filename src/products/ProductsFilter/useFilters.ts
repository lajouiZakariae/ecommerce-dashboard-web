import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { appendSearchParams } from '@/utils/url-helpers';

const sortByAllowedList = ['time', 'price', 'cost', 'stock_quantity'];

export default function useFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [filters, setFilters] = useState(() => {
        const priceFrom = searchParams.get('price_from');
        const priceTo = searchParams.get('price_to');
        const sortBy = searchParams.get('sort_by');
        const published = searchParams.get('published') ?? 'all';

        return {
            price_from: priceFrom ?? '',
            price_to: priceTo ?? '',
            cost_from: searchParams.get('cost_from') ?? '',
            cost_to: searchParams.get('cost_to') ?? '',
            sort_by:
                sortBy && sortByAllowedList.includes(sortBy) ? sortBy : sortBy,
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
            sort_by: 'time',
            order: 'asc',
        };

        setFilters(defaultFilters);

        setSearchParams((prev) => appendSearchParams(prev, defaultFilters));
    };

    const applyFilters = () =>
        setSearchParams((prev) => appendSearchParams(prev, filters));

    return { filters, setFilters, clearFilters, applyFilters };
}
