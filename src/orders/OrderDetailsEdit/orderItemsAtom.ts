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
        | 'add_product'
        | 'remove_product';
    payload: OrderItem;
}

// interface ActionProps {
//     type: 'update_order_items' | 'remove_product';
//     payload: OrderItem;
// }

// interface QuantityActionProps {
//     type: 'inc_quantity' | 'dec_quantity' | 'update_quantity';
//     payload: number;
// }

// const deleteOrderItem = (id: number) => {
//     setOrderItems((prev) =>
//         prev.filter((orderItem) => orderItem.id !== id),
//     );
// };

const reducer = (
    prev: OrderItem[],
    { type, payload }: ActionProps | OrderItemActionProps,
) => {
    if (type === 'update_order_items') {
        return payload;
    }

    if (type === 'remove_product') {
        return prev.filter(
            (orderItem) => orderItem.product_id !== payload.product_id,
        );
    }

    if (type === 'add_product') {
        return [...prev, payload];
    }

    if (type.includes('quantity')) {
        return prev.map((orderItem) => {
            if (orderItem.id !== payload.id) return orderItem; // Not Found

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
