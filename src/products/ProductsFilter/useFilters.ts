import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { appendSearchParams } from '@/utils/url-helpers';
import { forOwn } from 'lodash';
import useProductUrlFilters from '../useProductUrlFilters';

export default function useFilters() {
    const { defaultFilters, currentFilters } = useProductUrlFilters();

    const [_, setSearchParams] = useSearchParams();

    const [filtersInputs, setFiltersInputs] = useState(currentFilters);

    const appliedFilters = useMemo(() => {
        const applied: string[] = [];

        forOwn(filtersInputs, (value, key) =>
            value !== defaultFilters[key] ? applied.push(key) : null,
        );

        return applied;
    }, [currentFilters]);

    console.log(appliedFilters);

    const clearFilters = () => {
        setFiltersInputs(defaultFilters);

        setSearchParams((prev) => appendSearchParams(prev, defaultFilters));
    };

    const applyFilters = () =>
        setSearchParams((prev) => appendSearchParams(prev, filtersInputs));

    return { filtersInputs, setFiltersInputs, clearFilters, applyFilters };
}
