import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faL, faShoppingCart,faUser,} from '@fortawesome/free-solid-svg-icons'
import {  } from '@fortawesome/free-regular-svg-icons'
import { NgxSpinnerService } from 'ngx-spinner';
import { tick } from '@angular/core/testing';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  email!:string
  show =false
  faperson=faUser
  fashop=faShoppingCart 
  hide = false
  emaildata:any
  message!:string

  firstName!:string
  lastName!:string
  id!:number
  


  constructor(private service:UserService,
    private router:Router,
    private route:ActivatedRoute,
    private spinner:NgxSpinnerService
    ){ }

  ngOnInit(): void {
    this.route.params.subscribe(data=>{
      this.email=data['email']
      console.log(this.email)

    })

    if(this.email==null){
      this.show=true
    }

    if(this.email!=null){
      this.hide=true
    }

    this.getByEmail()
    this.showSpinner()
    
  }

  getByEmail(){
    this.service.getUserByEmail(this.email).subscribe(response=>{
      this.emaildata=response
      this.firstName=this.emaildata.firstName
      this.id=this.emaildata.id
      this.lastName=this.emaildata.lastName

    })
  }

  profile(){
    if(this.email==null){
      this.router.navigate(['/login'])
    }
    else{
      console.log("u are logged in and u are good to go")
    }
  }

  cart(){
    if(this.email==null){
      this.router.navigate(['/login'])
    }
    else{
      this.router.navigate([`/cart/${this.email}`])
    }
  }

  routeUrl(){
    return this.router.url.startsWith('/pay/')
  }

  showSpinner(){
    if(this.routeUrl()){
      this.show=false
    }
    else{
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  }

  logout(){
    this.router.navigate(['home'])
  }
}
