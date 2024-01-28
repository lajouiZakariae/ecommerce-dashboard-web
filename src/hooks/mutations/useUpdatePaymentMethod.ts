import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse, HttpStatusCode } from 'axios';
import apiClient from '@/utils/api-client';
import toast from 'react-hot-toast';
import { Dictionary } from 'lodash';
import { Dispatch, SetStateAction } from 'react';

export default function useUpdatePaymentMethod(
    id: number | undefined,
    setIsEdit: Dispatch<SetStateAction<boolean>>,
) {
    const queryClient = useQueryClient();

    const updatePaymentMethod = async (
        paymentMethod: Dictionary<string | undefined>,
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

                await queryClient.invalidateQueries({
                    queryKey: ['payment-methods'],
                });

                setIsEdit(false);
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
