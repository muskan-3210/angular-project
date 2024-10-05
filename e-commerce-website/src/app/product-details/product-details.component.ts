
import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { provideHttpClient } from '@angular/common/http'; 
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
import { Product } from '../product-list/product-list.component';
import { ProductAlertsComponent } from '../product-alerts/product-alerts.component';
import products from '../../assets/products.json';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';



@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CurrencyPipe,RouterModule, ProductAlertsComponent, FooterComponent, NavbarComponent],
  // providers: [provideHttpClient()],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  

  product: any | [];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit() {
    console.log(products)
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));
    this.product = products.find((product:any) => product.id === productIdFromRoute);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

  onNotify(): void {
    window.alert('The Sale of this Product is above 700');
  }
}