import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BannerSidebarComponent } from '../../banner/banner-sidebar/banner-sidebar.component';
import { BannerNavbarComponent } from '../../banner/banner-navbar/banner-navbar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet,BannerSidebarComponent,BannerNavbarComponent,NavbarComponent,SidebarComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
