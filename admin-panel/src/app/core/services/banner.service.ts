import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Banner{
  id:number;
  index:number,
  image: string;
  status:string;
  createdDate: string;
  updateDate:string;
}


@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private baseUrl = environment.baseUrl;

  constructor( private http:HttpClient) { }

  token = localStorage.getItem('authorization') // Replace with your token retrieval logic

  private getHeaders() {
    return new HttpHeaders({
      'authorization': `Bearer ${this.token}`,
      'authkey': 'TESTING_AUTH'
    });
  }

  getAllBanner(page:number, limit:number, sort:string):Observable<any>{
    const options = {headers: this.getHeaders()};
    return this.http.get<any[]>(`${this.baseUrl}/getAllBanner?page=${page}&limit=${limit}&sort=${sort}`,options);
  }

  getBannerById(id:number): Observable<any>{
    const options = { headers: this.getHeaders() };
    return this.http.get<any>(`${this.baseUrl}/getBannerById`,
      { headers: options.headers, 
       params: {id : id.toString() }
    });
  }

  addbanner(data:any): Observable<Banner>{
    const options = {headers: this.getHeaders()};
    return this.http.post<Banner>(`${this.baseUrl}/bannerAdd`, data, options);
  }

  editBanner(data: any): Observable<any> {
    const options = { headers: this.getHeaders() };
    return this.http.post<any>(`${this.baseUrl}/editBanner`, data, options);
  }

  deleteBanner(id: number): Observable<any> {
    const options = { headers: this.getHeaders() };
    return this.http.delete<any>(`${this.baseUrl}/deleteBanner`, { 
      headers: options.headers,
       params: { id: id.toString() } 
      });
  }
}
