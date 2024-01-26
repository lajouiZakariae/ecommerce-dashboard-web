import useProducts from '@/hooks/queries/useProducts';
import usePage from '@/hooks/usePage';
import useProductUrlFilters from '@/products/useProductUrlFilters';

export default function useFilteredProducts() {
    const { page } = usePage();

    const { currentFilters } = useProductUrlFilters();

    return useProducts({ ...currentFilters, page });
}
