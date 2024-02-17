export interface ClientInputs {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    city: string;
    zip_code: string;
    address: string;
}

export interface Client {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    city: string;
    zip_code: string;
    address: string;
    created_at: string;
    url: string;
}
