import ErrorUI from '@/common/ErrorUI';
import TableLoading from '@/common/TableLoading';
import useFilteredProducts from '@/hooks/queries/useFilteredProducts';
import ProductsFilter from '@/products/ProductsFilter/ProductsFilter';
import ProductsTable from './ProductsTable';
import ProductsPagination from '@/products/ProuductsPagination';
import { useMediaQuery } from '@uidotdev/usehooks';
import FeedLoading from '@/common/FeedLoading';

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
        return <FeedLoading count={10} />;
        if (isError) return <ErrorUI />;

        if (isLoading) return <TableLoading count={10} headers={headers} />;

        if (isSuccess)
            return <ProductsTable headers={headers} products={data.data} />;
    };

    const renderPagination = () => {
        if (isError) return 'Error...';

        if (isLoading) return 'Loading...';

        if (isSuccess) return <ProductsPagination links={data?.meta.links} />;
    };

    return (
        <div className="overflow-x-auto sm:overflow-x-visible">
            <ProductsFilter />

            {renderContext()}

            <div className="flex justify-center mt-4">{renderPagination()}</div>
        </div>
    );
}
