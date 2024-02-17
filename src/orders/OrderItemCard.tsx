import {
    ChangeEvent,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
} from 'react';
import { Product } from '@/types';
import { OrderItem } from './types/order';

interface Props extends PropsWithChildren<Product> {
    orderItems: OrderItem[];
    orderId: number;
    setOrderItems: Dispatch<SetStateAction<OrderItem[]>>;
}

export function OrderItemCard({
    id,
    thumbnail,
    title,
    price,
    //
    orderId,
    orderItems,
    setOrderItems,
}: Props) {
    const foundOrderItem = orderItems.find(
        (orderItem) => orderItem.product_id === id,
    );

    const addProductHandler = () =>
        setOrderItems((prev) => [
            ...prev,
            {
                order_id: orderId,
                quantity: 1,
                product_id: id,
            },
        ]);

    const deleteProductHandler = () =>
        setOrderItems((prev) =>
            prev.filter((orderItem) => orderItem.product_id !== id),
        );

    const decrementQuantityHandler = () =>
        setOrderItems((prev) =>
            prev.map((orderItem) =>
                orderItem.product_id === id
                    ? { ...orderItem, quantity: orderItem.quantity - 1 }
                    : orderItem,
            ),
        );

    const updateQuantityHandler = (ev: ChangeEvent<HTMLInputElement>) =>
        setOrderItems((prev) =>
            prev.map((orderItem) =>
                orderItem.product_id === id
                    ? {
                          ...orderItem,
                          quantity:
                              ev.target.value !== ''
                                  ? parseInt(ev.target.value)
                                  : 0,
                      }
                    : orderItem,
            ),
        );

    const incrementQuantityHandler = () =>
        setOrderItems((prev) =>
            prev.map((orderItem) =>
                orderItem.product_id === id
                    ? { ...orderItem, quantity: orderItem.quantity + 1 }
                    : orderItem,
            ),
        );

    return (
        <div
            className={`flex flex-wrap p-4 bg-slate-50 shadow-1 h-full border ${foundOrderItem ? 'border-primary/45' : ''}`}
        >
            <img
                src={thumbnail?.url ?? '/placeholder.jpg'}
                alt={thumbnail?.alt_text}
                className="size-15 object-cover rounded-md"
            />

            <div className="ml-5">
                <h4 className="font-bold">{title}</h4>
                <p className="text-sm">Price: {price} MAD</p>
            </div>

            <div
                className={`basis-full flex ${foundOrderItem ? 'justify-between' : 'justify-end'} items-center mt-2`}
            >
                {foundOrderItem ? (
                    <>
                        <div className="flex items-stretch">
                            <button
                                type="button"
                                className="btn btn-sm rounded-none p-2"
                                disabled={foundOrderItem.quantity <= 1}
                                onClick={decrementQuantityHandler}
                            >
                                -
                            </button>

                            <input
                                type="text"
                                className="w-18 text-center"
                                onChange={updateQuantityHandler}
                                value={foundOrderItem.quantity}
                            />

                            <button
                                type="button"
                                className="btn btn-sm rounded-none p-2"
                                onClick={incrementQuantityHandler}
                            >
                                +
                            </button>
                        </div>

                        <div>
                            <button
                                className="btn btn-sm btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 rounded-none"
                                onClick={deleteProductHandler}
                            >
                                Delete
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <button
                            className="btn btn-sm btn-outline border-primary text-primary hover:bg-primary hover:text-white hover:border-primary rounded-none"
                            onClick={addProductHandler}
                        >
                            Add
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
