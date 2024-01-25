import useFilteredProducts from '@/hooks/queries/useFilteredProducts';
import useProducts from '@/hooks/queries/useProducts';
import ProductRow from '@/products/ProductRow';

export default function ProductsPage() {
    const { isLoading, isSuccess, data } = useFilteredProducts();

    const headers = [
        { name: 'Image' },
        { name: 'Title' },
        { name: 'Price' },
        { name: 'Cost' },
        { name: 'Stock Quantity' },
        { name: 'Published' },
        { name: 'Actions' },
    ];

    const RenderBody = () => {
        // if (isError) return <Error />;

        // if (isLoading) return <TableLoading />;

        if (isSuccess) {
            return data.data.length
                ? data.data.map((product) => <ProductRow {...product} />)
                : 'empty';
            // <EmptyData />
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="table bg-white dark:text-white">
                {/* head */}
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
                            <th>{name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>{RenderBody()}</tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        {headers.map(({ name }) => (
                            <th>{name}</th>
                        ))}
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
