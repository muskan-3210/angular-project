import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Product {
  id: number;
  index:number;
  name: string;
  price: number;
  quantity: number;
  code: string | null;
  image: string;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}


@Injectable({
  providedIn: 'root',
})

export class ProductService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {
  }
   token = localStorage.getItem('authorization') // Replace with your token retrieval logic

  private getHeaders() {
    return new HttpHeaders({
      'authorization': `Bearer ${this.token}`,
      'authkey': 'TESTING_AUTH'
    });
  }


  getAllProducts(page: number, limit: number, sort: string,search : string): Observable<any> {
    const options = { headers: this.getHeaders() };
    console.log(search)
    if(search){
      return this.http.get<any[]>(`${this.baseUrl}/getAllProduct?page=${page}&limit=${limit}&search=${search}&sort=${sort}`,options);
    }else{
      return this.http.get<any[]>(`${this.baseUrl}/getAllProduct?page=${page}&&limit=${limit}&&sort=${sort}`,options);

    }
  }

  getProductById(id: number): Observable<any> {
    const options = { headers: this.getHeaders() };
    return this.http.get<any>(`${this.baseUrl}/getproductbyid`, {
      headers: options.headers,
      params: { id: id.toString() } 
    });
  }

  addProduct(data:any): Observable<Product> {
    const options = { headers: this.getHeaders() };
    return this.http.post<Product>(`${this.baseUrl}/productAdd`, data,options);
  }

  editProduct(data: any): Observable<any> {
    const options = { headers: this.getHeaders() };
    return this.http.post<any>(`${this.baseUrl}/editProduct`, data, options);
  }

  deleteProduct(id: number): Observable<any> {
    const options = { headers: this.getHeaders() };
    return this.http.delete<any>(`${this.baseUrl}/deleteProduct`, { 
      headers: options.headers,
      params: { id: id.toString() }  
    });
  }
}
