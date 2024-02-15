import { PropsWithChildren, useEffect, useState } from 'react';
import { OrderItem } from '../types/order';
import { Product } from '@/types';
import { OrderItemCard } from '../OrderItemCard';
import { orderItemsAtom } from './orderItemsAtom';
import { atom, useAtom } from 'jotai';

interface Props extends PropsWithChildren {
    order_items: OrderItem[];
    _products: Product[];
}

const productsAtom = atom<Product[]>([]);

export default function OrderDetailsEdit({ order_items, _products }: Props) {
    // const [products, setProducts] = useState(_products);
    const [products, setProducts] = useAtom(productsAtom);

    const [orderItems, dispatch] = useAtom(orderItemsAtom);

    useEffect(() => {
        setProducts(_products);
        dispatch({ type: 'update_order_items', payload: order_items });
    }, []);

    console.log(products);

    return (
        <div className="flex flex-wrap">
            {products.map((product) => (
                <div key={product.id} className="basis-1/2 p-2">
                    <OrderItemCard {...product} />
                </div>
            ))}
        </div>
    );
}
