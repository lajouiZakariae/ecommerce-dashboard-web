import { Image, status } from '@/types';

export interface Client {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    city: string;
    zip_code: string;
    address: string;
}

export interface Order {
    id: number;
    client: Client;
    status: status;
    created_at: string;
    order_items_url: string;
    order_items_count: number;
    order_items: OrderItem[];
    total_quantity: number;
    total_unit_price: number;
    total_price: number;
}

export interface OrderItem {
    id?: number;
    order_id: number;
    product_id: number;
    quantity: number;
    url?: string;
    total_price?: number;
    decrement_quantity_url?: string;
    increment_quantity_url?: string;
    product: {
        id?: number;
        title: string;
        price: number;
        url?: string;
        thumbnail?: Image;
    };
}
