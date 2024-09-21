import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { ProductService } from '../product.service';
import { OrderService } from '../order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../Model/User';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  email!:string
  totalPrice!:number
  id!:number
  emailData:any
  userId:any
  updateform!:FormGroup
  user!:User
  add=false
  address!:string

  constructor(private userService:UserService,
    private productService:ProductService,
    private OrderService:OrderService,
    private router:Router,
    private route:ActivatedRoute,
    private builder:FormBuilder,
    ){
      this.updateform=this.builder.group({
        address:['',Validators.required]
      })

     
  }

  ngOnInit(): void {
    
    this.route.params.subscribe(params=>{
      this.email=params['email'];
      this.totalPrice=+params['totalPrice'];
      this.id=+params['id']
      this.getUserByEmail();
      console.log(this.id,this.email,this.totalPrice)
    })
    
  }


  getUserByEmail(){
    this.userService.getUserByEmail(this.email).subscribe(data=>{
      this.emailData=data
      this.userId=this.emailData.userId
      this.address=this.emailData.address
    })
  }

  

  updateAddress(){
    this.user={
      firstName: this.emailData.firstName,
      lastName: this.emailData.lastName,
      dob: this.emailData.dob,
      password: this.emailData.password,
      country: this.emailData.country,
      role: this.emailData.role,
      email: this.emailData.email,
      status: this.emailData.status,
      phoneNumber: this.emailData.phoneNumber,
      gender: this.emailData.gender,
      address: this.updateform.value.address
    }
    this.userService.updateUser(this.userId,this.user).subscribe(response=>{
      console.log(response)
      this.updateform.reset()
      this.getUserByEmail()
      this.add=false
    })
  }

  select(){
    this.add=true
  }

  procede(){
    this.router.navigate([`/pay/${this.email}/${this.totalPrice}`])
  }

  
 
  
}
