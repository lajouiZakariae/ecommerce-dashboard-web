import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse, HttpStatusCode } from 'axios';
import apiClient from '@/utils/api-client';
import toast from 'react-hot-toast';
import { UseFormSetError } from 'react-hook-form';
import { Client } from '@/clients/types/Client';

export default function useUpdateClient(
    id: number,
    setError: UseFormSetError<Client>,
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['clients', { id }],

        mutationFn: async (client: Client): Promise<AxiosResponse> => {
            return await apiClient.put(`/clients/${client.id}`, client);
        },

        onSuccess: async (data) => {
            if (data.status === HttpStatusCode.NoContent) {
                toast.success('Client Saved Successfully', { duration: 2000 });
                queryClient.refetchQueries({ queryKey: ['clients'] });
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
