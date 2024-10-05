import { Component } from '@angular/core';
import { CarouselService } from '../../../core/services/carousel.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css'
})
export class TrendingComponent {
  trendingProducts: any[] = [];
  heading: string = '';
  imageUrl = environment.imageUrl;

  constructor( private carouselService: CarouselService){}

  ngOnInit(): void {
    this.getTrendingProducts();
  }

  getTrendingProducts(): void {
    this.carouselService.getCategoryProduct().subscribe((res) => {
      if (res.code == 200) {
        const trendingCategory = res.data.find((category: any) => category.category === 'Trending');
        if (trendingCategory) {
          this.heading = trendingCategory.category;  
          if (trendingCategory.product) {
            this.trendingProducts = trendingCategory.product;
          }
        }
      }
    });
  }
}
