import { PropsWithChildren } from 'react';
import EmptyDataRow from '@/common/Loaders/EmptyData';
import Table from '@/common/Table';
import ProductRow from '@/products/ProductRow';
import { Product } from './types/Product';

interface Props extends PropsWithChildren {
    headers: { name: string }[];
    products: Product[];
}

export default function ProductsTable({ headers, products }: Props) {
    return (
        <Table headers={headers}>
            {products.length ? (
                products.map((product) => (
                    <ProductRow key={product.id} {...product} />
                ))
            ) : (
                <EmptyDataRow cols={8} />
            )}
        </Table>
    );
}
