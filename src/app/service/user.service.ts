import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../Model/User';
import { Login } from '../Model/Login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl='http://localhost:8080/api/user'

  constructor(private http:HttpClient) { }


  login(login:Login):Observable<any>{
    return this.http.post(`${this.baseUrl}/login`,login,{responseType :'text'})
  }

  getUsers():Observable<any>{
    return this.http.get(`${this.baseUrl}/user`)
  }

  signUp(user:User):Observable<any>{
    return this.http.post(`${this.baseUrl}/signup`,user,{responseType:'text'})
  }
  
  delete(id:number){
    return this.http.delete(`${this.baseUrl}/delete/${id}`,{responseType:'text'})
  }

  updateUser(id: number, newUser: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`,newUser,{ responseType: 'text' });
  }

  getUserById(id: number) {
    return this.http.get(`${this.baseUrl}/getId/${id}`)
 }

 getUserByEmail(email:string){
  return this.http.get(`${this.baseUrl}/getEmail/${email}`)
 }

 changePassword(id:number,newPassword:string){
  return this.http.put(`${this.baseUrl}/changePassword/${id}`,newPassword,{responseType:'text'});
 }

 getUserByName(name:string):Observable<any>{
  return this.http.get(`${this.baseUrl}/getName/${name}`)
 }

 getuserbyemail(email:string):Observable<any>{
  return this.http.get(`${this.baseUrl}/getEmail/${email}`)
 }

}
