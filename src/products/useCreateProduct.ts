import { Product } from '@/types';
import apiClient from '@/utils/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse, HttpStatusCode } from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useCreateProduct(
    setError: Dispatch<SetStateAction<string | undefined>>,
) {
    const client = useQueryClient();

    const navigate = useNavigate();

    return useMutation({
        mutationKey: ['products'],
        mutationFn: async (data: { title: string }) =>
            await apiClient.post('products', data),
        onSuccess: async ({ status, data }: AxiosResponse<Product>) => {
            if (status === HttpStatusCode.Created) {
                await client.invalidateQueries({ queryKey: ['products'] });
                console.log(data.id);
                navigate({ pathname: `/products/${data.id}/edit` });
            }
        },
        onError: (error) => {
            setError(error.response?.data.errors?.title.at(0));
        },
    });
}
