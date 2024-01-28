import Button from '@/common/Button';
import apiClient from '@/utils/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

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

    return (
        <Button
            purpose={published ? 'warning' : 'success'}
            onClick={() => mutate()}
        >
            {isPending ? pendingText : text}
        </Button>
    );
}
