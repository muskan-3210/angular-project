import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserDashboardComponent } from '../../user/user-dashboard/user-dashboard.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth-user.service';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [UserDashboardComponent,CommonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isAdmin: boolean = false;
  navheading:any;
  isSidebarActive: boolean = false;

  ngOnInit(): void {
  }
  constructor(private authService: AuthenticationService, private router: Router) {}
  navigateTo(route: string) {
    this.router.navigate([route]);
  }


  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    
    if (sidebar && content) {
      if (this.isSidebarActive) {
        sidebar.classList.add('active');
        content.classList.add('active');
      } else {
        sidebar.classList.remove('active');
        content.classList.remove('active');
      }
    }
  }
  logOut(): void {
    this.authService.logout();
  }
}
