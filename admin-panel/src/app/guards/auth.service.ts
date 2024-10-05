import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../core/services/auth-user.service'; // Adjust the path as per your project structure

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean {
    const loggedInUser = this.authService.getLoggedInUser();

    if(loggedInUser){
      const requiredRole = route.data['role'];
      
      if (requiredRole === loggedInUser.role) {
        return true;
      } else {
        // Redirect based on role
        this.redirectBasedOnRole(loggedInUser.role);
        return false;
      }
    }

    this.router.navigate(['/login']);
    return false;
  }
  private redirectBasedOnRole(role:string): void{
    if(role == 'Admin'){
      this.router.navigate(['/user-list']);
    }else if(role == 'User'){
      this.router.navigate(['/user-dashboard']);
    }
  }
}
