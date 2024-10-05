import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ProductListComponent, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isNavbarVisible = false; // This variable controls the visibility of the navbar

  toggleNavbar() {
    this.isNavbarVisible = !this.isNavbarVisible;
  }
}
