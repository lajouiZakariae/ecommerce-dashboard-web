import ErrorUI from '@/common/ErrorUI';
import TableLoading from '@/common/TableLoading';
import useFilteredProducts from '@/hooks/queries/useFilteredProducts';
import ProductsFilter from '@/products/ProductsFilter/ProductsFilter';
import ProductsTable from './ProductsTable';
import ProductsPagination from '@/products/ProuductsPagination';
import { useMediaQuery } from '@uidotdev/usehooks';
import FeedLoading from '@/common/FeedLoading';
import ProductsFeed from '@/products/ProductFeed';

export default function ProductsPage() {
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
        // return <ProductsFeed products={[]} />;
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
        if (isError) return 'Error...';

        if (isLoading) return 'Loading...';

        if (isSuccess) return <ProductsPagination links={data?.meta.links} />;
    };

    return (
        <div className="overflow-x-visible sm:overflow-x-visible">
            <ProductsFilter />

            {renderContext()}

            {/* <div className="flex justify-center mt-4">{renderPagination()}</div> */}
        </div>
    );
}
