
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://fakestoreapi.com/products'; // Path to your JSON file

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProductsById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl,product);
  }

  updateUser(id: any, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }

  deleteProduct(id:any): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

}
