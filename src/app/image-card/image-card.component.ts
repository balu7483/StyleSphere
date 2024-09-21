import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.css']
})

export class ImageCardComponent implements OnInit{

  value:any
  genderData:any
  id!:number
  email!:string

  constructor(private service:ProductService,private route:ActivatedRoute,private router:Router){}

  ngOnInit(): void {

    this.route.params.subscribe(params=>{
      this.value=params['value'];
      this.getbyGender();
    })

    this.route.params.subscribe(params=>{
      this.email=params['email']
    })

  }

  getbyGender(){
    return this.service.getProductByGender(this.value).subscribe(data=>{
      this.genderData=data
      const id = this.genderData.id
    });
    
  }

  click(){
  }
}
