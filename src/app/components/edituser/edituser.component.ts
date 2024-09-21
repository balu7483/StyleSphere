import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit{

  userId!:number
  editform!:FormGroup
  user:any
  firstName!:string;
  lastName!:string;
  email!:string;
  dob!:string;
  country!:string;
  id!:number;
  password!:string;
  role!:string;
  gender!:string;
  status!:string;
  statusValue=['ACTIVE','DEACTIVE']
  genders=['Male','Female','Others']
  roles=['ROLE_ADMIN','ROLE_USER']

  constructor(private route:ActivatedRoute,private router:Router,private builder:FormBuilder,private service:UserService){
    this.editform=this.builder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      dob:['',Validators.required],
      country:['',Validators.required],
      gender:['',Validators.required],
      status:['',Validators.required],
      role:['',Validators.required],
    })
  }


  ngOnInit(): void {

    this.route.params.subscribe(params=>{
      this.userId=+params['id'];
      console.log('user ID',this.userId)

      this.getUserbyId() 
    })
    
  }

  editUser(){
   this.service.updateUser(this.userId,this.editform.value).subscribe(response=>{
    console.log(response)
    this.editform.reset()
    this.router.navigate(['/user'])
   })

  console.log(this.editform.value)
  }

  getUserbyId(){
    this.service.getUserById(this.userId).subscribe(data=>{
      this.user=data
      const firstName=this.user.firstName
      const lastName=this.user.lastName
      const dob=this.user.dob
      const password=this.user.password
      const country= this.user.country
      const id = this.user.id
      const email = this.user.email
      const role=this.user.role
      const status=this.user.status
      const gender=this.user.gender
      this.country=country
      this.id=id
      this.firstName=firstName
      this.lastName=lastName
      this.dob=dob
      this.email=email
      this.password=password
      this.gender=gender
      this.role=role
      this.status=status
      console.log(this.user)
  })
}
}

