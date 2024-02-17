import ErrorUI from '@/common/ErrorUI';
import TableLoading from '@/common/Loaders/TableLoading';
import ClientsTable from '@/clients/ClientsTable';
import usePage from '@/hooks/usePage';
import Pagination from '@/products/Pagination';
import apiClient from '@/utils/api-client';
import { useQuery } from '@tanstack/react-query';
import { PaginationResult } from '@/types';
import { Client } from '@/clients/types/Client';

export default function ClientsPage() {
    const { page, setPage } = usePage();

    const { isLoading, isError, isSuccess, data } = useQuery({
        queryKey: ['clients'],
        queryFn: async (): Promise<PaginationResult<Client>> => {
            const { data } = await apiClient.get('clients');
            return data;
        },
    });

    const headers = [
        { name: 'Full Name' },
        { name: 'Email' },
        { name: 'Phone Number' },
        { name: 'City' },
        { name: '' },
    ];

    const renderContext = () => {
        if (isError) return <ErrorUI>Server Error</ErrorUI>;

        if (isLoading) return <TableLoading count={10} headers={headers} />;

        if (isSuccess)
            return <ClientsTable headers={headers} clients={data.data} />;
    };

    const renderPagination = () => {
        if (isError) return;

        if (isLoading) return 'Loading...';

        if (isSuccess)
            return (
                <Pagination
                    page={page}
                    count={data.meta.last_page}
                    pageChangeHandler={(_page) => setPage(_page)}
                />
            );
    };

    return (
        <div className="overflow-x-visible sm:overflow-x-visible">
            {renderContext()}

            <div className="flex justify-center mt-4">{renderPagination()}</div>

            {/* <Modal /> */}
        </div>
    );
}
