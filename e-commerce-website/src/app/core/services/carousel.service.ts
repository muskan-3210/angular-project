import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';

export interface Product {
  id: number;
  index:number;
  name: string;
  price: number;
  quantity: number;
  description:string;
  code: string | null;
  image: string;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  private baseUrl = environment.baseUrl;

  constructor( private http:HttpClient) { }

  token = localStorage.getItem('authorization') // Replace with your token retrieval logic

  private getHeaders() {
    return new HttpHeaders({
      'authkey': 'TESTING_AUTH'
    });
  }

  getAllBanner():Observable<any>{
    const options = {headers: this.getHeaders()};
    return this.http.get<any[]>(`${this.baseUrl}/getUserBanner`,options);
  }

  getCategoryProduct():Observable<any>{
    const options = {headers: this.getHeaders()};
    return this.http.get<any[]>(`${this.baseUrl}/getCategoryProduct`,options);
  }

  getUserProductAll(): Observable<any>{
    const options = {headers: this.getHeaders()};
    return this.http.get<any[]>(`${this.baseUrl}/getUserProductAll`,options);
  }

  getProductDetail(id:number): Observable<any>{
    const options = {headers: this.getHeaders()};
    return this.http.get<any[]>(`${this.baseUrl}/getProductDetail`,{
      headers: options.headers,
      params: { id: id.toString()}
    });
  }
}
