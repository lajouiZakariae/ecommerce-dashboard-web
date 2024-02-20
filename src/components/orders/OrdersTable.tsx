import { PropsWithChildren } from 'react';
import EmptyDataRow from '@/common/Loaders/EmptyData';
import Table from '@/common/Table';
import { OrderRow } from './OrderRow';
import { Order } from '../../types/Order';

interface Props extends PropsWithChildren {
    headers: { name: string }[];
    orders: Order[];
}

export default function OrdersTable({ headers, orders }: Props) {
    console.log(orders);

    return (
        <Table headers={headers}>
            {orders.length ? (
                orders.map((order) => <OrderRow key={order.id} {...order} />)
            ) : (
                <EmptyDataRow cols={5} />
            )}
        </Table>
    );
}
