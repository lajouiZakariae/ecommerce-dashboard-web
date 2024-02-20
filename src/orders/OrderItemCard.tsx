import { PropsWithChildren, useState } from 'react';
import { Order, OrderItem } from './types/order';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/utils/api-client';
import { HttpStatusCode } from 'axios';

interface Props extends PropsWithChildren<OrderItem> {}

export function OrderItemCard(orderItem: Props) {
    const [_orderItem, setOrderItem] = useState(orderItem);

    const {
        id,
        order_id,
        product: { thumbnail, title, price },
        quantity,
        url,
    } = _orderItem;

    const [isEdit, setIsEdit] = useState(false);

    const client = useQueryClient();

    const deleteMutation = useMutation({
        mutationKey: ['order-items', id, 'delete'],
        mutationFn: async () => {
            return await apiClient.delete(url);
        },
        onSuccess(data) {
            if (data.status === HttpStatusCode.NoContent) {
                client.invalidateQueries({
                    queryKey: ['orders', order_id, 'order-items'],
                });
            }
        },
    });

    const updateMutation = useMutation({
        mutationKey: ['order-items', id, 'update'],
        mutationFn: async (data: OrderItem) => await apiClient.put(url, data),
        async onSuccess(data) {
            if (data.status === HttpStatusCode.NoContent) {
                await client.invalidateQueries({
                    queryKey: ['orders', order_id, 'order-items'],
                });
                setIsEdit(false);
            }
        },
    });

    const deleteHandler = () => {
        deleteMutation.mutate();
    };

    const updateHandler = () => {
        updateMutation.mutate(orderItem);
    };

    return (
        <div
            className={`flex flex-wrap p-4 bg-slate-50 dark:bg-black  shadow-1 h-full border ${'dark:border-slate-800'}`}
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
                className={`basis-full flex ${isEdit ? 'justify-between' : 'justify-end'} items-center mt-2`}
            >
                <>
                    {isEdit && (
                        <div className="flex items-stretch">
                            <button
                                type="button"
                                className="btn btn-sm rounded-none p-2"
                                disabled={quantity <= 1}
                                onClick={() =>
                                    setOrderItem((prev) => ({
                                        ...prev,
                                        quantity: prev.quantity - 1,
                                    }))
                                }
                            >
                                -
                            </button>

                            <input
                                type="number"
                                className="w-18 text-center"
                                value={quantity}
                                onChange={(ev) =>
                                    setOrderItem((prev) => ({
                                        ...prev,
                                        quantity: parseInt(ev.target.value),
                                    }))
                                }
                            />

                            <button
                                type="button"
                                className="btn btn-sm rounded-none p-2"
                                onClick={() =>
                                    setOrderItem((prev) => ({
                                        ...prev,
                                        quantity: prev.quantity + 1,
                                    }))
                                }
                            >
                                +
                            </button>
                        </div>
                    )}

                    <div>
                        {isEdit ? (
                            <button
                                className="btn btn-sm btn-outline btn-success rounded-none"
                                onClick={updateHandler}
                            >
                                {updateMutation.isPending
                                    ? 'Saving...'
                                    : 'Save'}
                            </button>
                        ) : (
                            <button
                                className="btn btn-sm btn-outline btn-info rounded-none"
                                onClick={() => setIsEdit(true)}
                            >
                                Edit
                            </button>
                        )}

                        <button
                            className="ml-4 btn btn-sm btn-outline btn-error rounded-none"
                            onClick={deleteHandler}
                        >
                            {deleteMutation.isPending
                                ? 'Deleting...'
                                : 'Delete'}
                        </button>
                    </div>
                </>
            </div>
        </div>
    );
}
