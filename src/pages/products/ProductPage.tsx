import ErrorUI from '@/common/ErrorUI';
import EmptyData from '@/common/Loader/EmptyData';
import Table from '@/common/Table';
import TableLoading from '@/common/TableLoading';
import useFilteredProducts from '@/hooks/queries/useFilteredProducts';
import ProductRow from '@/products/ProductRow';
import ProductsFilter from '@/products/ProductsFilter/ProductsFilter';

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

    const RenderBody = () => {
        if (isError) return <ErrorUI />;

        if (isLoading) return <TableLoading />;

        if (isSuccess) {
            return data.data.length ? (
                data.data.map((product) => (
                    <ProductRow key={product.id} {...product} />
                ))
            ) : (
                <EmptyData />
            );
        }
    };

    return (
        <div className="overflow-x-auto sm:overflow-x-visible">
            <ProductsFilter />

            {/* <Table headers={headers}>{RenderBody()}</Table> */}
        </div>
    );
}
