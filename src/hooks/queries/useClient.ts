import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query';
import apiClient from '@/utils/api-client';
import { Client } from '@/clients/types/Client';

type ExtraQueryOptions = Omit<UndefinedInitialDataOptions<Client>, 'queryKey'>;

export default function useClient(
    // typing fix
    id: string | undefined,
    extraQueryOptions: ExtraQueryOptions = {},
) {
    return useQuery({
        queryKey: ['clients', { id }],
        queryFn: async (): Promise<Client> =>
            await apiClient.get(`clients/${id}`).then(({ data }) => data),
        ...extraQueryOptions,
    });
}
