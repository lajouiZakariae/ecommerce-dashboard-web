import useProducts from '@/hooks/queries/useProducts';
import usePage from '@/hooks/usePage';
import useFiltersFromUrl from '@/products/useFiltersFromUrl';

export default function useFilteredProducts() {
    const { page } = usePage();

    const { currentFilters } = useFiltersFromUrl();

    return useProducts({ ...currentFilters, page });
}
