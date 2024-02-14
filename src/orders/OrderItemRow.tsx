import { PropsWithChildren } from 'react';
import { OrderItem } from './types/order';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import useIncrementQuantity from '@/hooks/mutations/useIncrementQuantity';
import useDecrementQuantity from '@/hooks/mutations/useDecrementQuantity';

type Props = PropsWithChildren<OrderItem>;

export default function OrderItemRow({
    order_id,
    product,
    quantity,
    total_price,
    increment_quantity_url,
    decrement_quantity_url,
}: Props) {
    const { isPending: isIncrementing, mutate: incrementQuantity } =
        useIncrementQuantity(order_id, increment_quantity_url);

    const { isPending: isDecrementing, mutate: decrementQuantity } =
        useDecrementQuantity(order_id, decrement_quantity_url);

    const incrementHandler = () => incrementQuantity();

    const decrementHandler = () => decrementQuantity();

    return (
        <tr>
            <td className="italic w-[55%]">{product.title}</td>

            <td className="flex items-center space-x-1">
                <button
                    type="button"
                    className="bg-slate-200 hover:bg-slate-100 dark:bg-form-input transition duration-300 rounded-full size-5 flex items-center justify-center disabled:bg-opacity-80"
                    onClick={decrementHandler}
                    disabled={isDecrementing || isIncrementing}
                >
                    <FaMinus className="size-2 text-slate-800 dark:text-slate-100" />
                </button>

                <p>{quantity}</p>

                <button
                    type="button"
                    className="bg-slate-200 hover:bg-slate-100 dark:bg-form-input transition duration-300 rounded-full size-5 flex items-center justify-center disabled:bg-opacity-80"
                    onClick={incrementHandler}
                    disabled={isDecrementing || isIncrementing}
                >
                    <FaPlus className="size-2 text-slate-800 dark:text-slate-100" />
                </button>
            </td>

            <td className="text-sm italic">
                {product.price}
                {' MAD'}
            </td>

            <td className="text-sm italic">
                {total_price}
                {' MAD'}
            </td>
        </tr>
    );
}
