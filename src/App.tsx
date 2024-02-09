import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { QueryClientProvider } from '@tanstack/react-query';
import OfflineWarning from './components/OfflineWarning';
import client from './utils/query-client';

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
