
import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
// import { provideHttpClient } from '@angular/common/http'; 
import { RouterModule } from '@angular/router';
import { CartService } from '../cart.service';
import { Product} from '../product-list/product-list.component'
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe,RouterModule, FooterComponent, NavbarComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CurrencyPipe,] 
})
export class CartComponent {

  items: Product[] = [];  


  constructor(
    private cartService: CartService,
  ){}
  

  ngOnInit() {
    this.items = this.cartService.getItems();  
    console.log(this.items);
  }


  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.items = this.cartService.getItems();
  }
}
