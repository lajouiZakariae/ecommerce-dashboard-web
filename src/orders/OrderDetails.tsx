import { PropsWithChildren, useState } from 'react';
import { Order } from './types/order';
import { IoAdd } from 'react-icons/io5';

type Props = PropsWithChildren<Pick<Order, 'order_items'>>;

export default function OrderDetails({ order_items }: Props) {
    const [orderItems, setOrderItems] = useState(order_items);

    const quantityUpdater = (
        id: number,
        action: 'increment' | 'decrement' | 'set',
        payload: number = 0,
    ) =>
        setOrderItems((prev) => {
            return prev.map((orderItem) => {
                let quantity = orderItem.quantity;

                switch (action) {
                    case 'increment':
                        quantity++;
                        break;

                    case 'decrement':
                        quantity++;
                        break;

                    case 'set':
                        if (payload) quantity = payload;
                        break;
                }

                return orderItem.id === id
                    ? {
                          ...orderItem,
                          quantity,
                      }
                    : orderItem;
            });
        });

    const deleteOrderItem = (id: number) => {
        setOrderItems((prev) =>
            prev.filter((orderItem) => orderItem.id !== id),
        );
    };

    console.log(orderItems);

    return (
        <div className="flex flex-wrap">
            {orderItems.map(({ id, product }) => (
                <div key={id} className="basis-1/2 p-2">
                    <div className="flex flex-wrap bg-slate-50 p-4 shadow-1">
                        <img
                            src={product.thumbnail.url ?? '/placeholder.jpg'}
                            alt={product.thumbnail.alt_text}
                            className="size-15 object-cover rounded-md"
                        />

                        <div className="ml-5">
                            <h4 className="font-bold">{product.title}</h4>
                            <p className="text-sm">
                                Price: {product.price} MAD
                            </p>
                        </div>

                        <div className="basis-full flex justify-between items-center mt-2">
                            <div className="flex items-stretch">
                                <button
                                    type="button"
                                    className="btn btn-sm rounded-none p-2"
                                    onClick={() =>
                                        quantityUpdater(id, 'decrement')
                                    }
                                >
                                    -
                                </button>

                                <input
                                    type="text"
                                    className="w-18 text-center"
                                    value={
                                        orderItems.find(
                                            (orderItem) => orderItem.id === id,
                                        )?.quantity
                                    }
                                    onChange={(ev) =>
                                        quantityUpdater(
                                            id,
                                            'set',
                                            parseInt(ev.target.value),
                                        )
                                    }
                                />

                                <button
                                    type="button"
                                    className="btn btn-sm rounded-none p-2"
                                    onClick={() =>
                                        quantityUpdater(id, 'increment')
                                    }
                                >
                                    +
                                </button>
                            </div>

                            <div>
                                <button
                                    className="btn btn-sm btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 rounded-none"
                                    onClick={() => deleteOrderItem(id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <div className="basis-1/2 p-2">
                <div
                    className="flex flex-wrap bg-slate-50 p-2 shadow-1 h-full cursor-pointer transition-colors duration-300 hover:bg-slate-100"
                    onClick={() => {}}
                >
                    <div className="border border-dashed w-full flex items-center justify-center">
                        <IoAdd className="size-15 text-gray-300" />
                    </div>
                </div>
            </div>
        </div>
    );
}
