import { PropsWithChildren } from 'react';
import Button from '../Button';
import { QueryKey } from '@tanstack/react-query';
import useDelete from './useDelete';

interface Props extends PropsWithChildren {
    url: string;
    pendingTxt: string;
    queryKey: QueryKey;
}

export default function DeleteResource({
    url,
    queryKey,
    pendingTxt,
    children,
}: Props) {
    const { isPending, mutate } = useDelete(url, queryKey);

    return (
        <Button color="error" onClick={() => mutate()}>
            {isPending ? pendingTxt : children}
        </Button>
    );
}
