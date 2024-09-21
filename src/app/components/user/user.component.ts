import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { faRemove } from '@fortawesome/free-solid-svg-icons'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'dob'];

  editicon = faEdit;
  deleteicon = faRemove;
  searchMessage!:string;
  userEmail!: String;
  searchform!:FormGroup
  searchData:any

  userData: any;
  firstname!:string

  filteredUserData: any;


  constructor(private service: UserService, private router: Router, private route: ActivatedRoute,private builder:FormBuilder) {
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.message = this.route.snapshot.queryParams['message'] || '';
    //   }
    // });

    this.searchform=this.builder.group({
      search:'',
    })

  }


  ngOnInit(): void {
    

    this.getUser();
  }

  getUser() {
    return this.service.getUsers().subscribe(data => {
      this.userData = data
    })
  }

  delete(id: number) {
    return this.service.delete(id).subscribe(response => {
      console.log(response)
      this.getUser();
    })
  }

  edit(id: number) {
    this.router.navigate([`/user/update/${id}`])
  }

 
getbyemail(){
  
} 
 search(){
  const searchterm =this.searchform.value.search
  if(searchterm.includes('.com')){
    this.service.getuserbyemail(searchterm).subscribe(response=>{
      this.searchData=response;
      console.log(this.searchData)
    })
  }
  else if (/\d/.test(searchterm)) {
    this.service.getUserById(searchterm).subscribe(response=>{
      this.searchData=response;
      console.log(this.searchData)
    })
  }
  else {
    this.service.getUserByName(searchterm).subscribe(response=>{
      this.searchData=response;
      console.log(this.searchData)
    },(error) => {
      console.error('User Not found:', error);
      this.searchMessage="User not found"
    }
    
    )
  }
 
  
}
}

