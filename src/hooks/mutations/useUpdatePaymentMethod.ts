import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse, HttpStatusCode } from 'axios';
import apiClient from '@/utils/api-client';
import toast from 'react-hot-toast';
import { Dictionary } from 'lodash';
import { UseFormSetError } from 'react-hook-form';
import { PaymentMethod } from '@/types';

export default function useUpdatePaymentMethod(
    id: number | undefined,
    setError: UseFormSetError<PaymentMethod>,
) {
    const queryClient = useQueryClient();

    const updatePaymentMethod = async (
        paymentMethod: Dictionary<string | number | undefined | Date>,
    ): Promise<AxiosResponse> => {
        return await apiClient.put(`/payment-methods/${id}`, paymentMethod);
    };

    return useMutation({
        mutationKey: ['payment-methods', { id }],

        mutationFn: updatePaymentMethod,

        onSuccess: async (data) => {
            if (data.status === HttpStatusCode.NoContent) {
                toast.success('Payment Method Saved Successfully', {
                    duration: 2000,
                });

                queryClient.refetchQueries({
                    queryKey: ['payment-methods'],
                });
            }
        },

        // onError: async (error) => {
        //     const errorList = error.response?.data.errors;

        //     const errors: { [key: string]: any } = {};

        //     for (const key in errorList) {
        //         const firstMessage = errorList[key].at(0);

        //         setError(`root.${key}`, {
        //             type: 'server',
        //             message: firstMessage,
        //         });

        //         errors[key] = firstMessage;
        //     }
        // },
    });
}
