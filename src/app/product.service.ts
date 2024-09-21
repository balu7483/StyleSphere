import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './Model/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl="http://localhost:8080/api/product"

  constructor(private http:HttpClient) { }


  public getProducts(){
     return this.http.get(`${this.baseUrl}/products`)
  }

  public addProduct(product:Product):Observable<any>{
    return this.http.post(`${this.baseUrl}/addProduct`,product)
  }
  
  public editProduct(id:number,product:Product):Observable<any>{
    return this.http.put(`${this.baseUrl}/productUpdate/${id}`,product,{responseType:'text'})
  }

  public getProductById(id:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/getId/${id}`)
  }

  public deleteProduct(id:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/productDelete/${id}`,{responseType:'text'})
  }

  public getProductByName(name:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/getName/${name}`)
  }

  public getProductByBrand(brand:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/getBrand/${brand}`)
  }

  public getProductByType(type:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/getType/${type}`)
  }

  public getProductByMaterialType(materialType:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/getMaterialType/${materialType}`)
  }

  public getProductByGender(gender:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/getGender/${gender}`)
  }

  public getProductByDesign(design:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/getDesign/${design}`)
  }

  
}
