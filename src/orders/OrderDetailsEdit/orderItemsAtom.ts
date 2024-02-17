import { atomWithReducer } from 'jotai/utils';
import { OrderItem } from '../types/order';

interface ActionProps {
    type: 'update_order_items';
    payload: OrderItem[];
}

interface OrderItemActionProps {
    type:
        | 'inc_quantity'
        | 'dec_quantity'
        | 'update_quantity'
        | 'add_order_item'
        | 'remove_order_item';
    payload: OrderItem;
}

const reducer = (
    prev: OrderItem[],
    { type, payload }: ActionProps | OrderItemActionProps,
) => {
    if (type === 'update_order_items') return payload;

    if (type === 'remove_order_item')
        return prev.filter(
            (orderItem) => orderItem.product_id !== payload.product_id,
        );

    if (type === 'add_order_item') return [...prev, payload];

    if (type.includes('quantity')) {
        return prev.map((orderItem) => {
            if (orderItem.product_id !== payload.product_id) return orderItem; // Not Found

            let quantity = orderItem.quantity;

            switch (type) {
                case 'inc_quantity':
                    quantity++;
                    break;

                case 'dec_quantity':
                    quantity--;
                    break;

                case 'update_quantity':
                    quantity = payload.quantity;
                    break;
            }

            return {
                ...orderItem,
                quantity,
            };
        });
    }

    return prev;
};

export const orderItemsAtom = atomWithReducer([], reducer);
