import { IProductImage } from "./productInterfaces";

interface IAddToCartPayload {
    quantity:number;
    product: {
        name: string;
        prodId:string;
        category: string;
        subCategory: string;
        price: number;
        images: IProductImage;
    };
}
export {IAddToCartPayload};