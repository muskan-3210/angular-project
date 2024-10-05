import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) {
  }
  token = localStorage.getItem('authorization')

  private getHeaders(){
    return new HttpHeaders({
      'authorization' : `Bearer${this.token}`,
      'authkey' :'TESTING_AUTH'
    })
  }

  getDashboard(): Observable<any> {
    const options = { headers: this.getHeaders() };
    return this.http.get<any>(`${this.baseUrl}/getDashboard`, options);
  }
  
}
