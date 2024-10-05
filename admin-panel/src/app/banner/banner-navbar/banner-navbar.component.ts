import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-banner-navbar',
  standalone: true,
  imports: [],
  templateUrl: './banner-navbar.component.html',
  styleUrl: './banner-navbar.component.css'
})
export class BannerNavbarComponent {
  isSidebarActive: boolean = false;

  constructor( private authentication: AuthenticationService) {}

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

  logout(){
    this.authentication.logout();
  }
}
