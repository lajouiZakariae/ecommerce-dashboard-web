import { PropsWithChildren, useState } from 'react';
import { OrderItemCard } from '../OrderItemCard';
import { Result } from '@/hooks/queries/useProducts';
import { OrderItem } from '../types/order';

interface Props extends PropsWithChildren {
    products: Result;
    orderId: number;
    _orderItems: OrderItem[];
}

export default function OrderDetailsEdit({
    products,
    _orderItems,
    orderId,
}: Props) {
    const [orderItems, setOrderItems] = useState(_orderItems);

    return (
        <div className="flex flex-wrap items-stretch">
            {products.data.map((product) => (
                <div key={product.id} className="basis-1/2 p-2">
                    <OrderItemCard
                        {...product}
                        orderId={orderId}
                        orderItems={orderItems}
                        setOrderItems={setOrderItems}
                    />
                </div>
            ))}
        </div>
    );
}
