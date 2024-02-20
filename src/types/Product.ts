import { Image } from '@/types';

export interface Product {
    url: string;
    id: number;
    title: string;
    description?: string;
    cost: number;
    price: number;
    quantity: number;
    published: boolean;
    category_id?: number;
    store_id?: number;
    created_at?: string;
    updated_at?: string;
    thumbnail: Image;
}
