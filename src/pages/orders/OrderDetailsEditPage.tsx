import NotFound from '@/common/NotFound';
import Breadcrumb from '@/components/Breadcrumb';
import useOrderItems from '@/hooks/queries/useOrderItems';
import useProducts from '@/hooks/queries/useProducts';
import usePage from '@/hooks/usePage';
import OrderDetailsEdit from '@/orders/OrderDetailsEdit/OrderDetailsEdit';
import Pagination from '@/common/Pagination';
import { useParams } from 'react-router-dom';

export default function OrderDetailsPage() {
    const { id: orderId } = useParams();
    const { page, setPage } = usePage();

    if (orderId === undefined) return <NotFound />;

    const orderItemsQuery = useOrderItems(parseInt(orderId));

    const productsQuery = useProducts({ page });

    const renderPagination = () => {
        if (productsQuery.isError) return;

        if (productsQuery.isLoading) return 'Loading...';

        if (productsQuery.isSuccess)
            return (
                <Pagination
                    page={page}
                    count={productsQuery.data.meta.last_page}
                    pageChangeHandler={(_page) => setPage(_page)}
                />
            );
    };

    return (
        <>
            <Breadcrumb
                links={[
                    { path: '/dashboard', text: 'Dashboard' },
                    { path: '/dashboard/orders', text: 'Orders' },
                ]}
                pageName={`Items of Order ${orderId}`}
            />

            {productsQuery.isSuccess && orderItemsQuery.isSuccess && (
                <>
                    <OrderDetailsEdit
                        products={productsQuery.data}
                        _orderItems={orderItemsQuery.data}
                        orderId={parseInt(orderId)}
                    />

                    <div className="mt-5 flex items-center justify-center">
                        {renderPagination()}
                    </div>
                </>
            )}
        </>
    );
}
