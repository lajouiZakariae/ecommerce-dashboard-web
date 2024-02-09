import userAtom from '@/user';
import apiClient from '@/utils/api-client';
import { AxiosError, HttpStatusCode } from 'axios';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

export default function useUser() {
    const [isLoading, setIsLoading] = useState(true);

    const [user, setUser] = useAtom(userAtom);

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data, status } = await apiClient.get('user');

                if (status === HttpStatusCode.Ok) {
                    setUser(data);
                    setIsLoading(false);
                }
            } catch (error) {
                if (
                    error instanceof AxiosError &&
                    error?.response?.status === HttpStatusCode.Unauthorized
                ) {
                    setUser(null);
                    setIsLoading(false);
                }
            }
        };

        getUser();
    }, []);

    return { isLoading, user };
}
