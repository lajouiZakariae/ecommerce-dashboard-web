import ErrorUI from '@/common/ErrorUI';
import TableLoading from '@/common/TableLoading';
import useFilteredProducts from '@/hooks/queries/useFilteredProducts';
import ProductsFilter from '@/products/ProductsFilter/ProductsFilter';
import ProductsTable from './ProductsTable';
import { useMediaQuery } from '@uidotdev/usehooks';
import FeedLoading from '@/common/FeedLoading';
import Pagination from './Pagination';
import usePage from '@/hooks/usePage';
import Modal from './Modal';

export default function ProductsPage() {
    const { page, setPage } = usePage();
    const { isLoading, isError, isSuccess, data } = useFilteredProducts();

    const headers = [
        { name: 'Image' },
        { name: 'Title' },
        { name: 'Price' },
        { name: 'Cost' },
        { name: 'Stock Quantity' },
        { name: 'Published' },
        { name: '' },
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

        if (isSuccess)
            return <ProductsTable headers={headers} products={data.data} />;
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
            <ProductsFilter />

            {renderContext()}

            <div className="flex justify-center mt-4">{renderPagination()}</div>

            <Modal />
        </div>
    );
}
