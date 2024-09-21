import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  signupform!:FormGroup

  constructor(private service:UserService,private route:ActivatedRoute,private router:Router,private builder:FormBuilder){
    this.signupform=this.builder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      dob:['',Validators.required],
      country:['',Validators.required],
      role:['ROLE_USER'],
      gender:['',Validators.required],
      status:['ACTIVE']
    })
  }


  ngOnInit(): void {
    
  }

  signup(){
    this.service.signUp(this.signupform.value).subscribe(response=>{
      console.log(response)
      this.signupform.reset()
      this.router.navigate(['/login'])
    })
  }


}
