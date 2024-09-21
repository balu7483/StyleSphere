import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';
import { Cart } from '../Model/Cart';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit{

  idData:any
  userId!:number
  cartdata!:Cart
  userData:any
  productData:any
  emitcolor:any
  emitsize:any
  quantity:number=0
  message!:string
  userDataId!:number
  userIdData:any

  @Input() sizes!:string[]
  @Output() sizeSelected = new EventEmitter<string>();

  @Input() colors!:string[]
  @Output() colorSelected = new EventEmitter<string>();

  selectedSize!: string;
  selectedColor!:string;

  selectColor(color:string){
    this.selectedColor=color;
    this.colorSelected.emit(color);
    this.emitcolor=color
  }

  selectSize(size: string) {
    this.selectedSize = size;
    this.sizeSelected.emit(size);
    this.emitsize=size
  }

  productName!:string
  productBrand!:string
  productGender!:string
  productType!:string
  productMaterialType!:string
  productDesign!:string
  productDesc!:string
  productPrice!:number
  productImageUrl:any
  email!:string


  

  constructor(private service:ProductService,private router:Router,private route:ActivatedRoute,private cartService:CartService,private userservice:UserService){
    
  }

  ngOnInit(): void {

    this.route.params.subscribe(params=>{
      this.userId=+params['id']
      console.log("product "+this.userId)
    })

    this.route.params.subscribe(params=>{
      this.email=params['email']
    })

    this.getProcutById();
    this.getUserByEmail();

  }

  getProcutById(){
    this.service.getProductById(this.userId).subscribe(data=>{
      this.idData=data
      this.sizes=this.idData.productSize
      this.colors=this.idData.productColor
      this.productBrand=this.idData.productBrand
      this.productDesc=this.idData.productDesc
      this.productName=this.idData.productName
      this.productType=this.idData.productType
      this.productMaterialType=this.idData.productMaterialType
      this.productDesign=this.idData.productDesign
      this.productPrice=this.idData.productPrice
      this.productImageUrl=this.idData.productImageUrl

    })
  }

 getUserByEmail(){
  this.userservice.getuserbyemail(this.email).subscribe(data=>{
    this.userData=data
    this.userDataId=this.userData.id
  })
 }


cart(){
  if(this.email==null){
    this.message="please Sign In to add Product to Cart"
  }
  else if(this.quantity==0){
    this.message="Please Select the Quantity"
  }
  else if(this.emitcolor==null){
    this.message="Please Select Color"
  }
  else if(this.emitsize==null){
    this.message="Please Select Size"
  }
  else{
  this.cartService.addtoCart(this.cartdata={
    user:this.userData,
    product:this.idData,
    color:this.emitcolor,
    quantity:this.quantity,
    size:this.emitsize
  }).subscribe(response=>{
    this.message=response
  })}
}


add(){
  this.quantity++
}

sub(){
  if(this.quantity>0){
    this.quantity--
  }
}

user(){
  console.log(this.userData)
  console.log(this.email)
}

cart1(){
  if(this.email==null){
    this.message="please Sign In to Buy a Product"
  }
  else if(this.quantity==0){
    this.message="Please Select the Quantity"
  }
  else if(this.emitcolor==null){
    this.message="Please Select Color"
  }
  else if(this.emitsize==null){
    this.message="Please Select Size"
  }
  else{
  this.cartService.addtoCart(this.cartdata={
    user:this.userData,
    product:this.idData,
    color:this.emitcolor,
    quantity:this.quantity,
    size:this.emitsize
  }).subscribe(response=>{
    this.message=response
    this.router.navigate([`/pay/${this.email}/${this.productPrice}`])
  })}
}



}
