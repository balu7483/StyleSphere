import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './Model/Order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl='http://localhost:8080/api/order'

  constructor(private http:HttpClient) { }

  createOrder(order:Order):Observable<any>{
    return this.http.post(`${this.baseUrl}/create`,order)
  }

  getOrderByUserId(userId:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/getItems/${userId}`)
  }
}
