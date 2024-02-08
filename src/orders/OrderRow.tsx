import Badge from '@/common/Badge';
import { Order, status } from '@/types';
import moment from 'moment';

function getBadgeType(type: status): 'success' | 'info' | 'warning' | 'danger' {
    switch (type) {
        case 'pending':
            return 'info';

        case 'cancelled':
            return 'danger';

        case 'delivered':
            return 'success';

        default:
            return 'success';
    }
}

export function OrderRow({
    full_name,
    total_price,
    status,
    created_at,
    order_items,
}: Order) {
    const date = moment(created_at).format('YYYY-MM-DD');

    return (
        <>
            <tr>
                <td>{full_name}</td>
                <td>
                    <Badge color={getBadgeType(status)} className="min-w-30">
                        {status}
                    </Badge>
                </td>
                <td>{date}</td>
            </tr>

            <tr className="bg-gray-100 dark:bg-slate-800 border-none">
                <td className="relative">
                    <span className="absolute h-full w-8/12 left-1/4 top-0 border-l border-gray-400">
                        <span className="absolute top-1/2 w-full border-t border-gray-400"></span>
                    </span>
                </td>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Price</th>
            </tr>

            {order_items.map(({ product, quantity, total_price }) => (
                <tr className="bg-gray-100 dark:bg-slate-800 border-none">
                    <td className="relative">
                        <span className="absolute h-full w-8/12 left-1/4 top-0 border-l border-gray-400">
                            <span className="absolute top-1/2 w-full border-t border-gray-400"></span>
                        </span>
                    </td>
                    <td>{product.title}</td>
                    <td>{quantity}</td>
                    <td>
                        {product.price}
                        {' MAD'}
                    </td>
                    <td>
                        {total_price}
                        {' MAD'}
                    </td>
                </tr>
            ))}

            <tr className="bg-gray-100 dark:bg-slate-800 font-bold">
                <td className="relative">
                    <span className="absolute h-1/2 w-8/12 left-1/4 top-0 border-l border-b border-gray-400"></span>
                </td>
                <td>Total</td>
                <td>
                    {order_items.reduce(
                        (acc, { quantity }) => acc + quantity,
                        0,
                    )}
                </td>
                <td>
                    {order_items.reduce(
                        (acc, { product: { price } }) => acc + price,
                        0,
                    )}
                </td>
                <td>
                    {total_price}
                    {' MAD'}
                </td>
            </tr>
        </>
    );
}
