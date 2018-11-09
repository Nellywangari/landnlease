export interface Order {
    id?: string;
    product_id: string;
    product_name: string;
    buyer_id: string;
    seller_id: string;
    quantity: number;
    price: number;
    accepted: boolean;
    rejected: boolean;
}