import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query';
import { PaymentMethod } from '@/types';
import apiClient from '@/utils/api-client';

type ExtraQueryOptions = Omit<
    UndefinedInitialDataOptions<PaymentMethod>,
    'queryKey'
>;

export default function usePaymentMethod(
    // typing fix
    id: string | undefined,
    extraQueryOptions: ExtraQueryOptions = {},
) {
    return useQuery({
        queryKey: ['products', { id }],
        queryFn: async (): Promise<PaymentMethod> =>
            await apiClient
                .get(`payment-methods/${id}`)
                .then(({ data }) => data),
        ...extraQueryOptions,
    });
}
