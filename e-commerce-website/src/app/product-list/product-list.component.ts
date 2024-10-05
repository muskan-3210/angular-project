
import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductAlertsComponent } from '../product-alerts/product-alerts.component';
import { CartService } from '../cart.service';
import { FooterComponent } from '../footer/footer.component';
import { CarouselComponent } from '../components/carousel/carousel.component';
import { PopularComponent } from '../components/category/popular/popular.component';
import { TrendingComponent } from '../components/category/trending/trending.component';
import { NewComponent } from '../components/category/new/new.component';
import { AllProductsComponent } from '../products/all-products/all-products.component';
import { NavbarComponent } from '../navbar/navbar.component';


export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export const products: Product[] = [];

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductAlertsComponent, NavbarComponent,CurrencyPipe, FooterComponent, CarouselComponent, NewComponent, TrendingComponent, PopularComponent, AllProductsComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  share(): void {
    window.alert('The product has been add to the cart!');
  }

  onNotify(): void {
    window.alert('The Sale of this Product is above 700');
  }
}
