import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit{

  id!:number
  changeform!:FormGroup
  
  constructor(private service:UserService,private route:ActivatedRoute,private router:Router,private builder:FormBuilder){
    this.changeform=this.builder.group({
      newPassword:['',Validators.required],
      repeatePassword:['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.id=+params['id']
    })
    console.log(this.id)
  }

  change(){
    if(this.changeform.value.newPassword===this.changeform.value.repeatePassword){
      this.service.changePassword(this.id,this.changeform.value.newPassword).subscribe(response=>{
        console.log(response)
        this.router.navigate(['/user'])
      })
    }
  }

}
