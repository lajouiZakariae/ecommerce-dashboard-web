import { PropsWithChildren } from 'react';
import EmptyData from '@/common/Loaders/EmptyData';
import Table from '@/common/Table';
import { Order } from '@/types';
import moment from 'moment';

interface Props extends PropsWithChildren {
    headers: { name: string }[];
    orders: Order[];
}

export function OrderRow({
    full_name,
    total_price,
    status,
    created_at,
    order_items,
}: Order) {
    const date = moment(created_at).format('YYYY-MM-DD');
    console.log(order_items);

    return (
        <>
            <tr>
                <td>{full_name}</td>
                <td>{total_price}</td>
                <td>{status}</td>
                <td>{date}</td>
            </tr>

            <tr className="bg-[#f0f0f0]">
                <td></td>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Price</th>
            </tr>

            {order_items.map(({ product, quantity, total_price }) => (
                <tr className="bg-[#f0f0f0]">
                    <td></td>
                    <td>{product.title}</td>
                    <td>{quantity}</td>
                    <td>{product.price}</td>
                    <td>{total_price}</td>
                </tr>
            ))}

            <tr className="bg-[#f0f0f0]">
                <td></td>
                <td>
                    <b>Total</b>
                </td>
                <td></td>
                <td></td>
                <td>{total_price}</td>
            </tr>
        </>
    );
}

export default function OrdersTable({ headers, orders }: Props) {
    return (
        <Table headers={headers}>
            {orders.length ? (
                orders.map((order) => <OrderRow key={order.id} {...order} />)
            ) : (
                <EmptyData />
            )}
        </Table>
    );
}
