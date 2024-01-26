import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import OfflineWarning from './components/OfflineWarning';

type apiErrors = { message: string; errors: { [key: string]: string } };

declare module '@tanstack/react-query' {
    interface Register {
        defaultError: AxiosError<apiErrors>;
    }
}

const client = new QueryClient({});

function App() {
    return (
        <QueryClientProvider client={client}>
            <Toaster
                position="top-center"
                reverseOrder={false}
                containerClassName="overflow-auto"
            />

            <OfflineWarning />

            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;
