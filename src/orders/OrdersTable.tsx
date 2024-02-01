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
}: Order) {
    const date = moment(created_at).format('YYYY-MM-DD');

    return (
        <tr>
            <td>{full_name}</td>
            <td>{total_price}</td>
            <td>{status}</td>
            <td>{date}</td>
        </tr>
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
