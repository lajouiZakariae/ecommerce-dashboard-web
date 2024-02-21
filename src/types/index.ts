export interface PaginationResult<T> {
    data: T[];

    meta: {
        current_page: 1;
        from: 1;
        last_page: 1;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        path: string;
        per_page: number;
        to: number;
        total: number;
    };

    links: {
        first: string | null;
        last: string | null;
        next: string | null;
        prev: string | null;
    };
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at: null | string;
    role: { name: string };
}

export interface Filters {
    price_from: string;
    price_to: string;
    cost_from: string;
    cost_to: string;
    sort_by: SortBy;
    page: number;
}

export enum SortBy {
    CREATED_AT = 'created_at',
    PRICE = 'price',
    COST = 'cost',
    STOCK_QUANTITY = 'stock_quantity',
}

export interface Category {
    id?: number;
    name: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
}

export interface CouponCode {
    id?: number;
    code: string;
    amount: number;
    created_at?: string;
    updated_at?: string;
}

export interface History {
    id?: number;
    operation: Operation;
    product_id: number;
    created_at?: string;
    updated_at?: string;
}

export enum Operation {
    DAMAGE = 'damage',
    ORDER = 'order',
    SALE = 'sale',
}

export interface Image {
    id?: number;
    alt_text: string;
    url?: string;
    product_id: number;
    created_at?: string;
    updated_at?: string;
}

export enum Status {
    PENDING = 'pending',
    IN_TRANSIT = 'in transit',
    DELIVERED = 'delivered',
    DELIVERY_ATTEMPT = 'delivery attempt',
    CANCELLED = 'cancelled',
    RETURN_TO_SENDER = 'return to sender',
}

export interface PaymentMethod {
    id?: number;
    name: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
    url: string;
}

export interface PurchaseItem {
    id?: number;
    purchase_id: number;
    product_id: number;
    quantity: number;
    created_at?: string;
    updated_at?: string;
}

export interface Purchase {
    id?: number;
    supplier_id: number;
    delivery_date: Date;
    paid: boolean;
    payment_method_id?: number;
    store_id: number;
    created_at?: string;
    updated_at?: string;
}

export interface Review {
    id?: number;
    email: string;
    body: string;
    product_id: number;
    approved: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface Role {
    id?: number;
    name: string;
    created_at?: string;
    updated_at?: string;
}

export interface Setting {
    id?: number;
    platform: Platform;
    settings_value: string;
    settings_default: string;
}

export enum Platform {
    DESKTOP = 'desktop',
    WEB_CLIENT = 'web_client',
    WEB_ADMIN = 'web_admin',
}

export interface Store {
    id?: number;
    name: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    created_at?: string;
    updated_at?: string;
}

export interface Supplier {
    id?: number;
    name: string;
    email: string;
    phone_number: string;
    address: string;
    created_at?: string;
    updated_at?: string;
}
