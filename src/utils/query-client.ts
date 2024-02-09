import router from '@/routes';
import { QueryCache, QueryClient } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
    queryCache: new QueryCache({
        onError: async (data) => {
            if (
                router.basename !== 'login' &&
                data.response?.status === HttpStatusCode.Unauthorized
            ) {
            }
        },
    }),
});

export default client;
