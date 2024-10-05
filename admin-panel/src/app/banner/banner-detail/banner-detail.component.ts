import { Component } from '@angular/core';
import { BannerService } from '../../core/services/banner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Banner } from '../banner-list/banner-list.component';
import { response } from 'express';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner-detail.component.html',
  styleUrl: './banner-detail.component.css'
})
export class BannerDetailComponent {
  bannerId!: number;  
  bannerDetail!: Banner;
  errorMessage: string = '';  

  constructor( private route: ActivatedRoute, private router: Router, private bannerService: BannerService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bannerId = +params['id'];
      this.getDetailProduct(this.bannerId);
    });
  }

  getDetailProduct(id: number): void {
    this.bannerService.getBannerById(id).pipe(
      catchError(error => {
        console.error('Error fetching product details:', error);
        this.errorMessage = 'Product not found or there was an error fetching the product details.';
        return of(null);
      })
    ).subscribe(response => {
      if (response) {
        this.bannerDetail = response.data;
        console.log('Product Details:', this.bannerDetail);
      }
    });
  }

  back(): void{
    this.router.navigate(['/banner']);
  }
}
