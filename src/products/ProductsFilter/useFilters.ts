import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { appendSearchParams } from '@/utils/url-helpers';

const sortByAllowedList = [
    'latest',
    'oldest',
    'oldest',
    'price_asc',
    'price_desc',
    'cost_asc',
    'cost_desc',
    'stock_quantity_asc',
    'stock_quantity_desc',
];

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
                sortBy && sortByAllowedList.includes(sortBy)
                    ? sortBy
                    : 'latest',
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
            sort_by: 'latest',
        };

        setFilters(defaultFilters);

        setSearchParams((prev) => appendSearchParams(prev, defaultFilters));
    };

    const applyFilters = () =>
        setSearchParams((prev) => appendSearchParams(prev, filters));

    return { filters, setFilters, clearFilters, applyFilters };
}
