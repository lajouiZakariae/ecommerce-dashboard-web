import { useQuery } from '@tanstack/react-query';
import apiClient from '@/utils/api-client';
import { PaymentMethod } from '@/types';

const getPaymentMethods = async (): Promise<PaymentMethod[]> =>
    apiClient.get('payment-methods').then((response) => response.data);

export default function usePaymentMethodes() {
    return useQuery({
        queryKey: ['payment-methods'],
        queryFn: getPaymentMethods,
    });
}
