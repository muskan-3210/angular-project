import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { User } from '../../user/user-list/user-list.component';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jsonUrl = 'http://localhost:5000/users'; 
  private currentUser: any = null;
 // private users: User[] = []; 

  constructor(private http: HttpClient, private router: Router ,  @Inject(PLATFORM_ID) private platformId: any
    
  ) {
    // this.loadUsers();
  }

  // getUsers():Observable<User[]>{
  //   return this.http.get<User[]>(this.jsonUrl);
  // }

  // getUsersById(id:number): Observable<User | undefined>{
  //   return this.getUsers().pipe(
  //     map(users => users.find(user=> user.id === id))
  //   );
  // }

  // private saveUser(): void{
  //   if (isPlatformBrowser(this.platformId)){
  //     localStorage.setItem('userdetail', JSON.stringify(this.users));
  //   }
  // }
  // addUser(user:User){
  //   this.users.push(user);
  //   this.saveUser();
  //   this.router.navigate(['/user-list']);
  // }
  // private loadUsers(): void {
  //   if (isPlatformBrowser(this.platformId)){
  //     const userdetail = localStorage.getItem('userdetail');
  //     if(userdetail){
  //       this.users = JSON.parse(userdetail);
  //     }
  //   }
  // }

  // getUsersData(): User[]{
  //   return this.users;
  // }


    // Login Authentication

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.jsonUrl).pipe(
      map((users) => {
        const user = users.find(
          (u) => u.username === username && u.password === password
        );
        if (user) {
          this.currentUser = user;
          sessionStorage.setItem('loggedInUser', JSON.stringify(user));

          if(user.role === 'Admin'){
            this.router.navigate(["user-list"]);
          }else{
            this.router.navigate(["user-dashboard"]);
          }
          return true;
        }
        return false;
      })
    );
  }

  getLoggedInUser(): any {
    return this.currentUser || JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
  }

  isLoggedIn(): boolean {
    return !!this.getLoggedInUser().username;
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }

  logout(): void {
    this.currentUser = null;
    sessionStorage.removeItem('loggedInUser');
    localStorage.removeItem('user'); 
    this.router.navigate(['/user-login']);
  }

  
}
