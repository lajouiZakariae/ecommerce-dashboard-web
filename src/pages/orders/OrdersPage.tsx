import ErrorUI from '@/common/ErrorUI';
import TableLoading from '@/common/Loaders/TableLoading';
import { useMediaQuery } from '@uidotdev/usehooks';
import FeedLoading from '@/common/Loaders/FeedLoading';
import useOrders from '../../hooks/queries/useOrders';
import OrdersTable from '@/orders/OrdersTable';

export default function OrdersPage() {
    const { isLoading, isError, isSuccess, data } = useOrders();

    const headers = [
        { name: 'Full Name' },
        { name: 'Status' },
        { name: 'Date' },
        { name: 'Total Price' },
    ];

    const isBigScreen = useMediaQuery('(min-width : 700px)');

    const renderContext = () => {
        if (isError) return <ErrorUI />;

        if (isLoading)
            return isBigScreen ? (
                <TableLoading count={10} headers={headers} />
            ) : (
                <FeedLoading count={10} />
            );

        if (isSuccess) return <OrdersTable headers={headers} orders={data} />;
    };

    // const renderPagination = () => {
    //     if (isError) return;

    //     if (isLoading) return 'Loading...';

    //     if (isSuccess)
    //         return (
    //             <Pagination
    //                 page={page}
    //                 count={data.meta.last_page}
    //                 pageChangeHandler={(_page) => setPage(_page)}
    //             />
    //         );
    // };

    return (
        <div className="overflow-x-visible sm:overflow-x-visible">
            {/* <ProductsFilter /> */}

            {renderContext()}

            {/* <div className="flex justify-center mt-4">{renderPagination()}</div> */}

            {/* <Modal /> */}
        </div>
    );
}
