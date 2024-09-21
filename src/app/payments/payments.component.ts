import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../cart.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderService } from '../order.service';
import { Order } from '../Model/Order';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {


  credit = false
  show =false
  hide=false
  debit = false
  email!: string
  totalAmount!: number
  net = false
  upi = false
  payment = false
  message!: string
  creditForm!:FormGroup
  debitFrom!:FormGroup
  netFrom!:FormGroup
  upiFrom!:FormGroup
  userData:any
  userId!:number
  order=false;
  mainmain=true;
  orderData :any;
  cartItems!:any[] 
  cartData!:any
  orders!:Order
  ordered!:any


  constructor(private route: ActivatedRoute, 
    private userService: UserService,
    private cartservice:CartService,
    private builder:FormBuilder,
    private spinner:NgxSpinnerService,
    private orderService:OrderService
    ) {
    this.creditForm=this.builder.group({
      name:['',Validators.required],
      cardNumber: ['', [Validators.required,Validators.minLength(16),Validators.maxLength(16)]],
      month:['',Validators.required],
      year:['',Validators.required],
      cvv:['',Validators.required]
    })

    this.debitFrom=this.builder.group({
      name:['',Validators.required],
      cardNumber:['',[Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      month:['',Validators.required],
      year:['',Validators.required],
      cvv:['',Validators.required]
    })

    this.netFrom=this.builder.group({
      bank:['',Validators.required],
      name:['',Validators.required],
      accountNumber:['',Validators.required],
      code:['',Validators.required]
    })

    this.upiFrom=this.builder.group({
      upi:['',Validators.required]
    })
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.email = params['email']
      this.totalAmount = params['totalPrice']
      this.getUser()
    })
  }

  creditop() {
    this.credit = true;
    this.debit = false
    this.net = false
    this.upi = false
  }

  debitop() {
    this.debit = true;
    this.credit = false;
    this.net = false
    this.upi = false
  }

  netop() {
    this.net = true;
    this.debit = false;
    this.credit = false;
    this.upi = false
  }
  upiop() {
    this.upi = true
    this.credit = false
    this.debit = false
    this.debit = false
  }

  getUser() {
    this.userService.getUserByEmail(this.email).subscribe(data=>{
      this.userData=data
      this.userId=this.userData.userId
      this.orders={
        user:this.userData,
        cart:this.cartData,
        status:'Processing',
      }
      this.getCartItems();

    })
  }

  getCartItems(){
    this.cartservice.getitems(this.userId).subscribe(data=>{
      this.cartData=data
      this.ordered = this.cartData.ordered
      console.log(this.cartData.id);
    })
  }

  
  pay() {
   this.orderService.createOrder(this.orders).subscribe(data=>{
    console.log(data)
    this.cartservice.setOrdered(this.userId).subscribe(response=>{
      console.log(response)
    })
    this.order=true
    this.credit=false
   this.debit=false
   this.net=false
   this.upi=false
   this.mainmain=false
   this.showSpinner()
   })
   

  }

  showSpinner(){
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }


}
