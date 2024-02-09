import { status } from '@/types';

export interface Order {
    id: number;
    full_name: string;
    email: string;
    phone_number: string;
    city: string;
    zip_code: string;
    address: string;
    status: status;
    delivery: boolean;
    created_at: string;
    order_items_url: string;
    order_items_count: number;
    total_price: number;
    order_items: OrderItem[];
}

export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    url: string;
    total_price: number;
    decrement_quantity_url: string;
    increment_quantity_url: string;
    product: {
        id: number;
        title: string;
        price: number;
        url: number;
    };
}
