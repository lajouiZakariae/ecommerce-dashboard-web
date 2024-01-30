import { ButtonHTMLAttributes } from 'react';
import { BsTrash3Fill } from 'react-icons/bs';
import { QueryKey } from '@tanstack/react-query';

import useDelete from './useDelete';
import DropdownButton from '@/products/DropdownButton';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    url: string;
    pendingTxt: string;
    queryKey: QueryKey;
    size?: 'sm' | 'md';
}

export default function DeleteResource({
    url,
    queryKey,
    pendingTxt,
    size = 'md',
    children,
    ...other
}: Props) {
    const { isPending, mutate } = useDelete(url, queryKey);

    return (
        <DropdownButton onClick={() => mutate()} {...other}>
            <BsTrash3Fill />
            {isPending ? pendingTxt : children}
        </DropdownButton>
    );
}
