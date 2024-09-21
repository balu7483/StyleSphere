import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { EmailService } from 'src/app/service/email.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  emaildata!:string
  emailData:any
  firstName!:string
  lastName!:string
  email!:string
  dob!:string
  country!:string
  password!:string
  id!:number

  constructor(private service:UserService,private emailService:EmailService,private router:Router,private route:ActivatedRoute){

  }


  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.emaildata=params['email']
    })
    console.log(this.emaildata)
    this.getUserByEmail()

  }

  getUserByEmail(){
    this.service.getUserByEmail(this.emaildata).subscribe(data=>{
      this.emailData=data
      this.firstName=this.emailData.firstName
      this.email=this.emailData.email
      this.dob=this.emailData.dob
      this.country=this.emailData.country
      this.id=this.emailData.id
      this.password=this.emailData.password
    })
  }

  changePassword(){
    this.router.navigate([`/user/changePassword/${this.id}`])
  }

}
