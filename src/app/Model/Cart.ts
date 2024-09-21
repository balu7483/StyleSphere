import { Product } from "./Product"
import { User } from "./User"

export class Cart{
    id?:number
    user!:User
    product!:Product
    color!:String
    quantity!:number
    size!:string
}
