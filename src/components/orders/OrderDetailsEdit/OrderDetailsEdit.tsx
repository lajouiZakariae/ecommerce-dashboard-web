import { PropsWithChildren, useState } from 'react';
import { OrderItemCard } from '../OrderItemCard';
import { OrderItem } from '../../../types/Order';
import { BsX } from 'react-icons/bs';
import { IoAdd } from 'react-icons/io5';
import ProductsListing from './ProductsListing';

interface Props extends PropsWithChildren {
    orderId: number;
    orderItems: OrderItem[];
}

export default function OrderDetailsEdit({ orderItems }: Props) {
    return (
        <>
            <ProductsListing />

            <div className="flex flex-wrap items-stretch">
                {orderItems.map((orderItem) => (
                    <div key={orderItem.id} className="basis-1/2 p-2">
                        <OrderItemCard {...orderItem} />
                    </div>
                ))}

                <div className="basis-1/2 p-2">
                    <div
                        className={`p-3 bg-slate-50 dark:bg-black shadow-1 h-full border dark:border-slate-800 cursor-pointer  transition-colors duration-300 hover:dark:bg-slate-800 hover:bg-gray-100`}
                        onClick={() =>
                            document
                                .querySelector('#previewOrderItemsModal')!
                                // @ts-ignore
                                .showModal()
                        }
                    >
                        <div className="flex items-center justify-center border border-dashed dark:border-slate-800 h-full min-h-[100px]">
                            <IoAdd className="size-12 text-gray-500" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
