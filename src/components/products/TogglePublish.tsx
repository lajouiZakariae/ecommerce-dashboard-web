import { PropsWithChildren } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import apiClient from '@/utils/api-client';
import DropdownButton from './DropdownButton';

interface Props extends PropsWithChildren {
    id: number;
    url: string;
    published: boolean;
}

export default function TogglePublish({ id, url, published }: Props) {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['products', id],
        mutationFn: async () => await apiClient.patch(`${url}/toggle-publish`),
        onSuccess: async () =>
            await queryClient.invalidateQueries({ queryKey: ['products'] }),
    });

    const pendingText = published ? 'Unpublishing...' : 'Publishing...';

    const text = published ? 'Unpublish' : 'Publish';

    const icon = published ? <FaRegEyeSlash /> : <FaRegEye />;
    return (
        <DropdownButton onClick={() => mutate()}>
            {icon}
            {isPending ? pendingText : text}
        </DropdownButton>
    );
}
