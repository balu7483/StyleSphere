import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService } from 'src/app/service/email.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginform!:FormGroup
  menu!:any
  logindata:any
  message!:string
  error:any
  emailControl!:FormControl
  passwordControl!:FormControl
  emailData:any
  // email!:string
  
  constructor(private builder:FormBuilder,private service:UserService,private router:Router,private route:ActivatedRoute,private emailService:EmailService){ 
    this.emailControl=new FormControl('',[Validators.required,Validators.email])
    this.passwordControl=new FormControl('',[Validators.required])
    this.loginform=this.builder.group({
      email:this.emailControl,
      password:this.passwordControl
    })
  }

  

  ngOnInit(): void {
    
  }

  login(UserEmail:string) {
    const logindata = this.loginform.value;
    this.service.login(logindata).subscribe(
      (data) => {
       console.log(data)
       const email=this.loginform.value.email;
       this.emailService.setEmail(email);
       this.service.getUserByEmail(email).subscribe(email=>{
        this.emailData=email
        if(this.emailData.status==='DEACTIVE'){
          this.message="Your Account is blocked!"
        }
        else if(this.emailData.role==='ROLE_USER'){
          this.router.navigate([`/home/${UserEmail}`])
        }
        else if(this.emailData.role==='ROLE_ADMIN'){
          this.router.navigate(['/user'])
        }
        
       })
      },
    );
  }

  datatoprofile(){
    
  }


  
}
