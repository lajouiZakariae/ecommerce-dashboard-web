import { PropsWithChildren } from 'react';
import EmptyData from '@/common/Loader/EmptyData';
import Table from '@/common/Table';
import ProductRow from '@/products/ProductRow';
import { Product } from '@/types';

type Props = PropsWithChildren<{
    headers: { name: string }[];
    products: Product[];
}>;

export default function ProductsTable({ headers, products }: Props) {
    return (
        <Table headers={headers}>
            {products.length ? (
                products.map((product) => (
                    <ProductRow key={product.id} {...product} />
                ))
            ) : (
                <EmptyData />
            )}
        </Table>
    );
}
