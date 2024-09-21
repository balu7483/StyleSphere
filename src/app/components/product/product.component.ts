import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  animations: [
    trigger('slideAnimation', [
      transition(':increment', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})
export class ProductComponent implements OnInit{

  productData:any
  searchform!:FormGroup
  searchData:any
  message!:string
  
  showBigImageFlag: boolean = false;


  constructor(private router:Router,private service:ProductService,private route:ActivatedRoute,private builder:FormBuilder){
    this.searchform=this.builder.group({
      search:''
    })
  }
  
  showBigImage(imageUrl: string) {
    this.showBigImageFlag = true;
  }

  hideBigImage() {
    this.showBigImageFlag = false;
  }
  

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    return this.service.getProducts().subscribe(data=>{
      this.productData=data;
    })
  }

  editProduct(id:number){
    this.router.navigate([`product/edit/${id}`])
  }

  deleteProduct(id:number){
    this.service.deleteProduct(id).subscribe(response=>{
      console.log(response)
      this.getProducts()
    })
  }

  search(){
    const searchTerm = this.searchform.value.search

    if (/\d/.test(searchTerm)) {
      this.service.getProductById(searchTerm).subscribe(response=>{
        this.searchData=response
      })
    }
    else {
      this.service.getProductByName(searchTerm).subscribe(response=>{
        this.searchData=response
      },
      (error)=>{
        console.error("product not found")
        this.message="Product Not Found"
      }
      );
    }
  }
}
