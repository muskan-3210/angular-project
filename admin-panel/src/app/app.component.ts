import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth-user.service';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent,CommonModule,NgxUiLoaderModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-angular-app';
  showSidebar: boolean = false; // Correctly define and initialize the property

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check user role after navigating
        const loggedInUser = this.authService.getLoggedInUser();
        if (loggedInUser && (loggedInUser.role === 'Admin' || loggedInUser.role === 'User')) {
          this.showSidebar = true; // Set to true if user is logged in and has a role
        } else {
          this.showSidebar = false; // Set to false if no logged-in user is found
        }
      }
    });
  }
}
