import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient({});

function App() {
    return (
        <QueryClientProvider client={client}>
            <Toaster
                position="top-right"
                reverseOrder={false}
                containerClassName="overflow-auto"
            />

            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;
