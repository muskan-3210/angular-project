import { Component } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { response } from 'express';
import { catchError, of } from 'rxjs';
import { Product } from '../user-list/user-list.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {
  productId!: number;  
  productDetail!: Product;
  errorMessage: string = '';  

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.getDetailProduct(this.productId);
    });
  }

  getDetailProduct(id: number): void {
    this.productService.getProductById(id).pipe(
      catchError(error => {
        console.error('Error fetching product details:', error);
        this.errorMessage = 'Product not found or there was an error fetching the product details.';
        return of(null);
      })
    ).subscribe(response => {
      if (response) {
        this.productDetail = response.data;
        console.log('Product Details:', this.productDetail);
      }
    });
  }

  back(): void{
    this.router.navigate(['/user-list']);
  }
}
