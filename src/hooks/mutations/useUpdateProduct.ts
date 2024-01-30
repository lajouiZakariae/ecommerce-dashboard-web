import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse, HttpStatusCode } from 'axios';
import { Product } from '@/types';
import apiClient from '@/utils/api-client';
import toast from 'react-hot-toast';
import { UseFormSetError } from 'react-hook-form';

export default function useUpdateProduct(
    id: number,
    setError: UseFormSetError<Product>,
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['products', { id }],

        mutationFn: async (product: Product): Promise<AxiosResponse> => {
            return await apiClient.put(`/products/${product.id}`, product);
        },

        onSuccess: async (data) => {
            if (data.status === HttpStatusCode.NoContent) {
                toast.success('Product Saved Successfully', { duration: 2000 });
                queryClient.refetchQueries({ queryKey: ['products'] });
            }
        },

        onError: async (error) => {
            const errorList = error.response?.data.errors;

            const errors: { [key: string]: any } = {};

            for (const key in errorList) {
                const firstMessage = errorList[key].at(0);

                setError(`root.${key}`, {
                    type: 'server',
                    message: firstMessage,
                });

                errors[key] = firstMessage;
            }
        },
    });
}
