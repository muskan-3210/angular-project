import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.baseUrl;
  private currentUser: any = null;
  isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) {}

  login(url:any,data:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${url}`,data);
  }
  logout(): void {
    this.currentUser = null;
    sessionStorage.removeItem('login');
    localStorage.removeItem('user'); 
    this.router.navigate(['/user-login']);
  }

  checkLoginStatus(): void {
    this.isLoggedIn = !!localStorage.getItem('user');
  }

}
