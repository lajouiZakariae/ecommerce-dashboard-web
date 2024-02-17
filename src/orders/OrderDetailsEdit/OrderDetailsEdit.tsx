import { PropsWithChildren, useState } from 'react';
import { OrderItemCard } from '../OrderItemCard';
import { Result } from '@/hooks/queries/useProducts';
import { OrderItem } from '../types/order';
import { round } from 'lodash';

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

    const resetOrderItems = () => setOrderItems(_orderItems);

    return (
        <>
            <button
                className="btn btn-sm btn-primary"
                onClick={() =>
                    document
                        .querySelector('#previewOrderItemsModal')!
                        // @ts-ignore
                        .showModal()
                }
            >
                See Preview
            </button>

            <dialog id="previewOrderItemsModal" className="modal">
                <div className="modal-box min-h-65">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th className="text-right">Quantity</th>
                                <th className="text-right">Price</th>
                                <th className="text-right">Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orderItems.map(
                                ({ product, quantity, product_id }) => (
                                    <tr key={product_id}>
                                        <td>{product?.title}</td>
                                        <td className="text-right">
                                            {quantity}
                                        </td>
                                        <td className="text-right">
                                            {product.price} MAD
                                        </td>
                                        <td className="text-right">
                                            {round(product.price * quantity, 2)}{' '}
                                            MAD
                                        </td>
                                    </tr>
                                ),
                            )}

                            <tr>
                                <td className="font-bold">Total</td>
                                <td className="font-bold text-right">
                                    {orderItems.reduce(
                                        (acc, { quantity }) => acc + quantity,
                                        0,
                                    )}
                                </td>
                                <td className="font-bold text-right">
                                    {round(
                                        orderItems.reduce(
                                            (acc, { product }) =>
                                                acc + product.price,
                                            0,
                                        ),
                                        2,
                                    )}{' '}
                                    MAD
                                </td>
                                <td className="font-bold text-right">
                                    {round(
                                        orderItems.reduce(
                                            (acc, { quantity, product }) =>
                                                acc + product.price * quantity,
                                            0,
                                        ),
                                        2,
                                    )}{' '}
                                    MAD
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="mt-1 flex justify-end">
                        <button
                            className="btn btn-sm btn-outline btn-primary mr-3"
                            onClick={() => resetOrderItems()}
                        >
                            Clear
                        </button>
                        <button className="btn btn-sm btn-success text-gray-100">
                            Validate
                        </button>
                    </div>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

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
        </>
    );
}
