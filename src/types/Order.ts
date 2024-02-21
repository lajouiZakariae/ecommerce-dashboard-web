import { Image } from '@/types';
import { Product } from './Product';
import { Client } from './Client';

export type status =
    | 'pending'
    | 'in transit'
    | 'delivered'
    | 'delivery attempt'
    | 'cancelled'
    | 'return to sender';

export interface OrderItem {
    id?: number;
    order_id: number;
    product_id: number;
    quantity: number;
    url: string;
    total_price?: number;
    // decrement_quantity_url?: string;
    // increment_quantity_url?: string;
    product: Product;
}

export interface Order {
    id: 2;
    url: string;
    created_at: string;
    status: status;
    total_price: number;
    client: Client;

    order_items: OrderItem[];
}
