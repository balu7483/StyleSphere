import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { UserService } from 'src/app/service/user.service';
import {faL, faSleigh, faTrash} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  email!:string
  emailData:any
  userId:any
  cartData:any
  finalPrice!:any
  price!:any
  trash=faTrash
  message!:string
  showcart=true
  show=true
  

  constructor(private cartservice:CartService,private router:Router,private route:ActivatedRoute,private userService:UserService,
  
    ){
     
  }
  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.email=params['email']
      console.log(this.email)
      this.userId;
      this.getbyemail();
      
    })
  }



  getbyemail(){
    return this.userService.getUserByEmail(this.email).subscribe(data=>{
      this.emailData=data
      this.userId=this.emailData.userId
      this.getcartItems();
    })
  }

  getcartItems(){
    return this.cartservice.getitems(this.userId).subscribe(data=>{
      this.cartData=data
      this.showcart=this.cartData && this.cartData.length>0;
      if(!this.showcart){
        this.message="Your Cart is Empty!!"
      }
    })
  }

 
  calculateTotalPrice(): number {
    if (this.cartData && this.cartData.length > 0) {
       return this.cartData.reduce((total: number, item: { product: { productPrice: number; }; quantity: number; }) => {
         return total + (item.product.productPrice * item.quantity);
       }, 0);
    } else {
       return 0;
    }
   }

   delete(id:number){
   this.cartservice.deleteItem(id).subscribe(response=>{
    console.log(response)
    this.getcartItems()
   })
  

   }

   checkout(totalPrice:Number,id:number){
    this.router.navigate([`/checkout/${this.email}/${totalPrice}/${id}`])
   }

   getOrdered(){
    this.cartservice.getOrdered().subscribe
   }
  
}
