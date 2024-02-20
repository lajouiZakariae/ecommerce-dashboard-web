import Select from '@/common/Select';
import useCategories from '@/hooks/queries/categories/useCategories';
import { Category } from '@/types';
import { SelectHTMLAttributes, forwardRef } from 'react';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
    disabled: boolean;
}

const CategoriesSelect = forwardRef<HTMLSelectElement, Props>(
    ({ disabled }, ref) => {
        const { data, isSuccess } = useCategories();

        if (isSuccess) {
            return (
                <Select
                    ref={ref}
                    options={data}
                    disabled={disabled}
                    renderItem={({ id, name }: Category) => (
                        <option key={id} value={id}>
                            {name}
                        </option>
                    )}
                />
            );
        }
    },
);

export default CategoriesSelect;
