import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  Brands=[
    'PUMA','NIKE','VAN HUSEN','USPA','LEVIS','WRANGLER','JACK AND JONES',
    'ALLEN SOLLY','EHTNIC CURRY','LIFE','WEDANI','INKD'
  ]
  Genders=['MEN','WOMEN','BOY','GIRL']
  Types=['SHOE','SHIRT','SLIDES','PANT','FLIP FLOPS','T SHIRT','TOP',]
  MaterialTypes=['DENIM','COTTON','LINEN','LEATHER','NYLON','POLESTER']
  Designs=['HEELS','FULL SLEEVES','HALF SLEEVES','COLGS','LOAFERS','BOOTS','SNEAKERS','RUNNING','TRAINERS','BASKETBALL','TENNIES','CASUAL','JEANS','JOGGERS',
  'SHORT SLEEVE',
]


  constructor(
    private builder: FormBuilder,
    private service: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
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

  addProduct(){
   this.service.addProduct(this.productForm.value).subscribe((response=>{
    console.log(response)
    this.productForm.reset()
    this.router.navigate(['/product'])
   }))
  }
}
