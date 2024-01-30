import { ButtonHTMLAttributes } from 'react';
import { QueryKey } from '@tanstack/react-query';
import useDelete from './useDelete';
import OptionItem from '@/products/OptionItem';

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
        <OptionItem
            className="bg-red-200 text-red-800 border-2 border-red-800"
            onClick={() => mutate()}
            {...other}
        >
            {isPending ? pendingTxt : children}
        </OptionItem>
    );
}
