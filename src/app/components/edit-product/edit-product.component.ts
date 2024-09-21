import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{

  productForm!:FormGroup
  productId!:number
  productIdData:any
  productName!:string 
        productBrand!:string 
        productType!:string 
        productMaterialType!:string 
        productGender!:string 
        productColor!:string 
        productSize!:string 
        productImageUrl!:string 
        productDate!:string 
        productDesign!:string 
        productPrice!:number
        productDesc!:string
        Brands=[
          'PUMA','NIKE','VAN HUSEN','USPA','LEVIS','WRANGLER','JACK AND JONES',
          'ALLEN SOLLY','EHTNIC CURRY','LIFE','WEDANI','INKD'
        ]
        Genders=['MEN','WOMEN','BOY','GIRL']
        Types=['SHOE','SHIRT','SLIDES','PANT','FLIP FLOPS','T SHIRT']
        MaterialTypes=['DENIM','COTTON','LINEN','LEATHER','NYLON','POLESTER']
        Designs=['HEELS','FULL SLEEVES','HALF SLEEVES','COLGS','LOAFERS','BOOTS','SNEAKERS','RUNNING','TRAINERS','BASKETBALL','TENNIES','CASUAL','JEANS','JOGGERS',
        'SHORT SLEEVE'
      
      ]


    

  constructor(private service:ProductService,private router:Router,private route:ActivatedRoute,private builder:FormBuilder){
     this.productForm = this.builder.group({
      productName: ['', Validators.required],
      productBrand: ['', Validators.required],
      productType: ['', Validators.required],
      productMaterialType: ['', Validators.required],
      productGender: ['', Validators.required],
      productColor: this.builder.array([]),
      productSize: this.builder.array([]),
      productImageUrl: this.builder.array([]),
      productDate: ['', Validators.required],
      productDesign: ['', Validators.required],
      productPrice:[0,Validators.required],
      productDesc:['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.productId=+params['id']
    })
    console.log('product id',this.productId)
    this.getProductById()
  }

  get productColorArray(){
    return this.productForm.get('productColor') as FormArray
  }

  get productSizeArray(){
    return this.productForm.get('productSize') as FormArray
  }

  get productImageUrlArray(){
    return this.productForm.get('productImageUrl') as FormArray
  }

  addProductColor(){
    this.productColorArray.push(this.builder.control(''))
  }

  addProductSize(){
    this.productSizeArray.push(this.builder.control(''))
  }
  addProductImageUrl(){
    this.productImageUrlArray.push(this.builder.control(''))
  }

  removeProductColor(index:number){
    this.productColorArray.removeAt(index)
  }
  
  removeProductSize(index:number){
    this.productSizeArray.removeAt(index)
  }

  removeProductImageUrl(index:number){
    this.productImageUrlArray.removeAt(index)
  }

  editProduct(){
    this.service.editProduct(this.productId,this.productForm.value).subscribe(response=>{
      console.log(response)
      this.productForm.reset()
      this.router.navigate(['/product'])
    })
  }

  getProductById(){
    this.service.getProductById(this.productId).subscribe(data=>{
      this.productIdData=data
      this.productName=this.productIdData.productName
      this.productBrand=this.productIdData.productBrand
      this.productType=this.productIdData.productType
      this.productMaterialType=this.productIdData.productMaterialType
      this.productDate=this.productIdData.productDate
      this.productGender=this.productIdData.productGender
      this.productDesign=this.productIdData.productDesign
      this.productColor=this.productIdData.productColor
      this.productSize=this.productIdData.productSize
      this.productImageUrl=this.productIdData.productImageUrl
      this.productPrice=this.productIdData.productPrice
      this.productDesc=this.productIdData.productDesc
    })
  }

   

}
