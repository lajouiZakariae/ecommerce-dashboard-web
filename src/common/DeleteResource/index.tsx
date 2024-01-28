import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import Button from '../Button';
import { QueryKey } from '@tanstack/react-query';
import useDelete from './useDelete';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    url: string;
    pendingTxt: string;
    queryKey: QueryKey;
    size?: 'sm';
}

export default function DeleteResource({
    url,
    queryKey,
    pendingTxt,
    children,
    size = 'sm',
    ...other
}: Props) {
    const { isPending, mutate } = useDelete(url, queryKey);

    return (
        <Button purpose="error" size={size} onClick={() => mutate()} {...other}>
            {isPending ? pendingTxt : children}
        </Button>
    );
}
