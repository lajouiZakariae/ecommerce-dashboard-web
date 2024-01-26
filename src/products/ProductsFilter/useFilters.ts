import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { appendSearchParams } from '@/utils/url-helpers';
import { SortBy } from '@/types';
import { forOwn } from 'lodash';

const sortByAllowedList = ['created_at', 'price', 'cost', 'stock_quantity'];

interface Filters {
    price_from: string;
    price_to: string;
    cost_from: string;
    cost_to: string;
    sort_by: string;
    page?: number;
    order: 'asc' | 'desc';
}

const defaultFilters: Filters = {
    price_from: '',
    price_to: '',
    cost_from: '',
    cost_to: '',
    // status: '',
    sort_by: SortBy.CREATED_AT,
    order: 'desc',
};

export default function useFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentFilters: Filters = {
        price_from: searchParams.get('price_from') ?? defaultFilters.price_from,
        price_to: searchParams.get('price_to') ?? defaultFilters.price_to,
        cost_from: searchParams.get('cost_from') ?? defaultFilters.cost_from,
        cost_to: searchParams.get('cost_to') ?? defaultFilters.cost_to,
        sort_by: searchParams.get('sort_by') ?? defaultFilters.sort_by,
        order:
            searchParams.get('order') === 'asc' ? 'asc' : defaultFilters.order,
    };

    const [filters, setFilters] = useState<Filters>(currentFilters);

    const appliedFilters = useMemo(() => {
        const applied: string[] = [];
        forOwn(filters, (value, key) =>
            value !== defaultFilters[key] ? applied.push(key) : null,
        );
        return applied;
    }, [currentFilters]);

    console.log(appliedFilters);

    const clearFilters = () => {
        setFilters(defaultFilters);

        setSearchParams((prev) => appendSearchParams(prev, defaultFilters));
    };

    const applyFilters = () =>
        setSearchParams((prev) => appendSearchParams(prev, filters));

    return { filters, setFilters, clearFilters, applyFilters };
}
