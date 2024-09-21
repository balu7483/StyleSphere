import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';



@Component({
  selector: 'app-useradd',
  templateUrl: './useradd.component.html',
  styleUrls: ['./useradd.component.css']
})
export class UseraddComponent implements OnInit{

  addFrom!:FormGroup

  constructor(private service:UserService,private builder:FormBuilder,private router:Router,private route:ActivatedRoute){
    this.addFrom=this.builder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      dob:['',Validators.required],
      password:['',Validators.required],
      country:['',Validators.required],
      phoneNumber:['',Validators.required],
      role:['',Validators.required],
      status:['',Validators.required],
      gender:['',Validators.required],
    })
  }


  ngOnInit(): void {
    
  }


  addUser(){
    return this.service.signUp(this.addFrom.value).subscribe(response=>{
      console.log(response)
      this.router.navigate(['/user'])
    })
  }
}
