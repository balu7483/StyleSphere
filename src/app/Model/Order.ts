import { Cart } from "./Cart";
import { User } from "./User";

export class Order{
    orderId?:number;
    user!:User
    cart!:Cart
    status!:string
}