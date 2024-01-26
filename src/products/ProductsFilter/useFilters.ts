import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { appendSearchParams } from '@/utils/url-helpers';
import { forOwn } from 'lodash';
import useProductUrlFilters from '../useProductUrlFilters';

export default function useFilters() {
    const { defaultFilters, currentFilters } = useProductUrlFilters();

    const [_, setSearchParams] = useSearchParams();

    const [filtersInputs, setFiltersInputs] = useState(currentFilters);

    const appliedFiltersCount = useMemo(() => {
        const applied: string[] = [];

        forOwn(currentFilters, (value, key) =>
            value !== defaultFilters[key] ? applied.push(key) : null,
        );

        console.log('Calc');

        return applied.length;
    }, [currentFilters]);

    console.log(currentFilters, appliedFiltersCount);

    const clearFilters = () => {
        setFiltersInputs(defaultFilters);

        setSearchParams((prev) => appendSearchParams(prev, defaultFilters));
    };

    const applyFilters = () =>
        setSearchParams((prev) => appendSearchParams(prev, filtersInputs));

    return {
        filtersInputs,
        setFiltersInputs,
        appliedFiltersCount,
        clearFilters,
        applyFilters,
    };
}
