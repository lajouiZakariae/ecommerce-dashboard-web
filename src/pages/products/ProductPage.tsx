import ErrorUI from '@/common/ErrorUI';
import EmptyData from '@/common/Loader/EmptyData';
import TableLoading from '@/common/TableLoading';
import useFilteredProducts from '@/hooks/queries/useFilteredProducts';
import ProductRow from '@/products/ProductRow';

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
        <div className="overflow-x-auto">
            <table className="table bg-white text-center dark:text-white">
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm"
                                />
                            </label>
                        </th>
                        {headers.map(({ name }) => (
                            <th key={name}>{name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>{RenderBody()}</tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        {headers.map(({ name }) => (
                            <th key={name}>{name}</th>
                        ))}
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
