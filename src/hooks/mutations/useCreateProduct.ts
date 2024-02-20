import apiClient from '@/utils/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse, HttpStatusCode } from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/types/Product';
import { UseFormSetError } from 'react-hook-form';

export default function useCreateProduct(setError: UseFormSetError<Product>) {
    const client = useQueryClient();

    const navigate = useNavigate();

    return useMutation({
        mutationKey: ['products'],
        mutationFn: async (data: { title: string }) => {
            return await apiClient.post('products', data);
        },

        onSuccess: async ({ status, data }: AxiosResponse<Product>) => {
            if (status === HttpStatusCode.Created) {
                await client.invalidateQueries({ queryKey: ['products'] });
                console.log(data.id);
                navigate({ pathname: `/dashboard/products/${data.id}/edit` });
            }
        },

        onError: (error) => {
            // setError(error.response?.data.errors?.title.at(0));
        },
    });
}
