import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { appendSearchParams } from '@/utils/url-helpers';
import { forOwn } from 'lodash';
import useProductUrlFilters from '../useProductUrlFilters';

/**
 * Handles Filter Inputs State
 */
export default function useFilters() {
    const { defaultFilters, currentFilters } = useProductUrlFilters();

    const [_, setSearchParams] = useSearchParams();

    const [filtersInputs, setFiltersInputs] = useState(currentFilters);

    // Recalculating applied filters count
    const appliedFiltersCount = useMemo(() => {
        const applied: string[] = [];

        forOwn(currentFilters, (value, key) =>
            // @ts-ignore
            value !== defaultFilters[key] ? applied.push(key) : null,
        );

        return applied.length;
    }, [currentFilters]);

    const clearFilters = () => {
        setFiltersInputs(defaultFilters);

        setSearchParams((prev) => appendSearchParams(prev, defaultFilters));
    };

    const applyFilters = () =>
        setSearchParams((prev) =>
            appendSearchParams(prev, { ...filtersInputs, page: 1 }),
        );

    return {
        filtersInputs,
        setFiltersInputs,
        appliedFiltersCount,
        clearFilters,
        applyFilters,
    };
}
