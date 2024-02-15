import Badge from '@/common/Badge';
import { status } from '@/types';
import moment from 'moment';
import { Order } from './types/order';
import { FaChevronRight } from 'react-icons/fa6';

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
    client: { first_name, last_name },
    status,
    created_at,
    order_items,
    total_quantity,
    total_unit_price,
    total_price,
}: Order) {
    const full_name = `${first_name} ${last_name}`;
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
                        <FaChevronRight className="text-gray-400 absolute -right-1 top-1/2 -translate-y-[6.5px]" />
                    </span>
                </td>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Price</th>
            </tr>

            {order_items.map(({ id, product, quantity, total_price }) => (
                <tr
                    key={id}
                    className="bg-gray-100 dark:bg-slate-800 border-none"
                >
                    <td className="relative">
                        <span className="absolute h-full w-8/12 left-1/4 top-0 border-l border-gray-400">
                            <span className="absolute top-1/2 w-full border-t border-gray-400"></span>
                            <FaChevronRight className="text-gray-400 absolute -right-1 top-1/2 -translate-y-[6.5px]" />
                        </span>
                    </td>
                    <td>{product.title}</td>
                    <td>{quantity}</td>
                    <td>{product.price} MAD</td>
                    <td>{total_price} MAD</td>
                </tr>
            ))}

            <tr className="bg-gray-100 dark:bg-slate-800 font-bold">
                <td className="relative">
                    <span className="absolute h-1/2 w-8/12 left-1/4 top-0 border-l border-b border-gray-400">
                        <FaChevronRight className="text-gray-400 absolute -right-1 top-full -translate-y-[6.5px]" />
                    </span>
                </td>
                <td>Total</td>
                <td>{total_quantity}</td>
                <td>{total_unit_price} MAD</td>
                <td>{total_price} MAD</td>
            </tr>
        </>
    );
}
