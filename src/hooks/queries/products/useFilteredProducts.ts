import useProducts from '@/hooks/queries/products/useProducts';
import usePage from '@/hooks/usePage';
import useFiltersFromUrl from '@/components/products/useFiltersFromUrl';

export default function useFilteredProducts() {
    const { page } = usePage();

    const { currentFilters } = useFiltersFromUrl();

    return useProducts({ ...currentFilters, page });
}
