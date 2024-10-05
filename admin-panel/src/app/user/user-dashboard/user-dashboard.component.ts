import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth-user.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  loggedInUser: any = null;
  users: any[] = [];
  isAdmin: boolean = false;
  showProfile:boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser();

    if (this.isAdmin) {
      // Fetch all users if the logged-in user is an admin
      this.authService.getAllUsers().subscribe((users) => {
        this.users = users;
      });
    }
  }

  toggleProfile(): void{
    this.showProfile = !this.showProfile
  }

  logout() :void{
    this.authService.logout();
  }

  
}
