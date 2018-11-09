export interface Products{
    id?: string;
    category_id: string;
    user_id: string;
    imgUrl: string;
    name: string;
    brief_description: string;
    description: string;
    units: number;
    price: number;
    lat?: number;
    lng?:number;
    location?: string;
}