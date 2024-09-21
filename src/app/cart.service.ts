import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from './Model/Cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  baseUrl='http://localhost:8080/api/cart'

  constructor(private http:HttpClient) {

    
  }

  public addtoCart(cart:Cart):Observable<any>{
    return this.http.post(`${this.baseUrl}/add-to-cart`,cart,{responseType:'text'})
  }

  public getitems(id:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/getItem/${id}`)
  }

  public deleteItem(id:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/delete/${id}`,{responseType:'text'})
  }

  public setOrdered(id:number):Observable<any>{
    return this.http.put(`${this.baseUrl}/update-order/${id}`,id,{responseType:'text'})

  }

  public getOrdered():Observable<any>{
    return this.http.get(`${this.baseUrl}/getOrdered`)
  }
}
