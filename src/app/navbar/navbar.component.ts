import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { } from '@fortawesome/free-regular-svg-icons'
import { faAdd,faUser } from '@fortawesome/free-solid-svg-icons'
import { NgxSpinnerService } from 'ngx-spinner';
import { EmailService } from '../service/email.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  addicon=faAdd
  usericon=faUser
  showLoadingIndicator = false;
  email!:string
  showProfileDetails: boolean = false;
  storedEmail=this.emailService.getEmail();
  public componentLinks = [
    {
        link: 'avatar',
        name: 'Avatar'
    },
    {
        link: 'badge',
        name: 'Badge'
    },
    {
        link: 'button-group',
        name: 'Button Group'
    }
];

  constructor(private router:Router,private route:ActivatedRoute,private spinner: NgxSpinnerService,private emailService:EmailService){ }


  ngOnInit(): void {
    const storedEmail = this.emailService.getEmail();
    if (storedEmail) {
      this.email = storedEmail;
    }
   this.showSpinner()
   console.log(this.email)
  }


  shouldShowButton(){
    return this.router.url === '/user'
  }


  shouldShowButtonOn(){
    return this.router.url === '/login'
  }

  shouldShowButtonOn1(){
    return this.router.url === '/signup'
  }
  shouldShowsignup(){
    return this.router.url.startsWith('/user');
  }

  shouldnotShow(){
    return this.router.url.startsWith('/user/signup/')
  }
  addUser(){
    this.router.navigate(['user/add'])
  }

  signUp(){
      this.router.navigate(['/signup']); 
  }

  logout(){
    
    this.router.navigate(['/login'])
  }
 
  
  
  showSpinner(){
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

 
  login(){
    this.router.navigate(['/login']);
  }

  profile(){
    this.router.navigate([`user/profile/${this.email}`])
  }

  products(){
    this.router.navigate(['product'])
  }

  user(){
    this.router.navigate(['user'])
  }

  shouldshowMenu(){
    return this.router.url.startsWith('/product');
  }
  addProduct(){
    this.router.navigate(["/product/add"])
  }
  shouldshowMenu1(){
   return this.router.url === "/product"
  }
  }

