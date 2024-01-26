import { useSearchParams } from 'react-router-dom';
import { Filters, SortBy } from '@/types';
import useProducts from '@/hooks/queries/useProducts';
import usePage from '@/hooks/usePage';

export default function useFilteredProducts() {
    const { page } = usePage();
    const [searchParams] = useSearchParams();

    const filters: Filters = {
        price_from: searchParams.get('price_from') ?? '',
        price_to: searchParams.get('price_to') ?? '',
        cost_from: searchParams.get('cost_from') ?? '',
        cost_to: searchParams.get('cost_to') ?? '',
        sort_by: searchParams.get('sort_by') ?? SortBy.TIME,
        order: searchParams.get('order') ?? 'asc',
        page: page,
    };

    return useProducts(filters);
}
