import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product-list/product-list.component';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private productsUrl = '../assets/products.json';  // URL to JSON file
  items: Product[] = [];

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: any) {
    this.loadCart();
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.getProducts().pipe(
      map(products => products.find(product => product.id === id))
    );
  }

  addToCart(product: Product) {
    this.items.push(product);
    this.saveCart();
  }

  getItems(): Product[] {
    return this.items;
  }

  private loadCart(): void {
    if (isPlatformBrowser(this.platformId)) {
      const cartItems = localStorage.getItem('cartItems');
      if (cartItems) {
        this.items = JSON.parse(cartItems);
      }
    }
  }

  // Save cart items to localStorage
  private saveCart(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cartItems', JSON.stringify(this.items));
    }
  }

  clearCart() {
    this.items = [];
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('cartItems');
    }
    return this.items;
  }

  removeFromCart(productId: number) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveCart();
  }
  
  getShippingPrices() {
    return this.http.get<{ type: string, price: number }[]>('./assets/shipping.json');
  }
}
