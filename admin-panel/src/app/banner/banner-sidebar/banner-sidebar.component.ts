import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';

@Component({
  selector: 'app-banner-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule,AdminLayoutComponent],
  templateUrl: './banner-sidebar.component.html',
  styleUrl: './banner-sidebar.component.css'
})
export class BannerSidebarComponent {
  navheading:any;
}
