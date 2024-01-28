import { SortBy } from '@/types';
import { useSearchParams } from 'react-router-dom';

export interface Filters {
    price_from: string;
    price_to: string;
    cost_from: string;
    cost_to: string;
    sort_by: string;
    order: 'asc' | 'desc';
    page?: number;
}

export default function useFiltersFromUrl() {
    const defaultFilters: Filters = {
        price_from: '',
        price_to: '',
        cost_from: '',
        cost_to: '',
        sort_by: SortBy.CREATED_AT,
        order: 'desc',
    };

    const [searchParams] = useSearchParams();

    const currentFilters: Filters = {
        price_from: searchParams.get('price_from') ?? defaultFilters.price_from,
        price_to: searchParams.get('price_to') ?? defaultFilters.price_to,
        cost_from: searchParams.get('cost_from') ?? defaultFilters.cost_from,
        cost_to: searchParams.get('cost_to') ?? defaultFilters.cost_to,
        sort_by: searchParams.get('sort_by') ?? defaultFilters.sort_by,
        order:
            searchParams.get('order') === 'asc' ? 'asc' : defaultFilters.order,
    };

    return { defaultFilters, currentFilters };
}
