import { PropsWithChildren } from 'react';
import { OrderItem } from './types/order';
import { Product } from '@/types';
import { useAtom, useAtomValue } from 'jotai';
import { orderItemsAtom } from './OrderDetailsEdit/orderItemsAtom';
import { useParams } from 'react-router-dom';

type Props = PropsWithChildren<Product>;

export function OrderItemCard({ id, thumbnail, title, price, url }: Props) {
    const [orderItems, dispatch] = useAtom(orderItemsAtom);

    const { id: order_id } = useParams();

    const foundOrderItem = orderItems.find(
        (orderItem) => orderItem.product.id === id,
    );

    return (
        <div
            className={`flex flex-wrap p-4 bg-slate-50 shadow-1 border ${foundOrderItem ? 'border-primary/45' : ''}`}
        >
            <img
                src={thumbnail.url ?? '/placeholder.jpg'}
                alt={thumbnail.alt_text}
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
                                disabled={foundOrderItem.quantity === 1}
                                onClick={() =>
                                    dispatch({
                                        type: 'dec_quantity',
                                        payload: foundOrderItem,
                                    })
                                }
                            >
                                -
                            </button>

                            <input
                                type="text"
                                className="w-18 text-center"
                                value={foundOrderItem.quantity}
                                onChange={(ev) =>
                                    dispatch({
                                        type: 'update_quantity',
                                        payload: {
                                            ...foundOrderItem,
                                            quantity:
                                                ev.target.value !== ''
                                                    ? parseInt(ev.target.value)
                                                    : 0,
                                        },
                                    })
                                }
                            />

                            <button
                                type="button"
                                className="btn btn-sm rounded-none p-2"
                                onClick={() =>
                                    dispatch({
                                        type: 'inc_quantity',
                                        payload: foundOrderItem,
                                    })
                                }
                            >
                                +
                            </button>
                        </div>

                        <div>
                            <button
                                className="btn btn-sm btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 rounded-none"
                                onClick={() =>
                                    dispatch({
                                        type: 'remove_product',
                                        payload: foundOrderItem,
                                    })
                                }
                            >
                                Delete
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <button
                            className="btn btn-sm btn-outline border-primary text-primary hover:bg-primary hover:text-white hover:border-primary rounded-none"
                            onClick={() =>
                                dispatch({
                                    type: 'add_product',
                                    payload: {
                                        order_id: parseInt(order_id),
                                        quantity: 1,
                                        product_id: id,
                                        product: {
                                            id,
                                            title,
                                            price,
                                            thumbnail,
                                            url,
                                        },
                                    },
                                })
                            }
                        >
                            Add
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
