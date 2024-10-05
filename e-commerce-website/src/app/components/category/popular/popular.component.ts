import { Component } from '@angular/core';
import { CarouselService } from '../../../core/services/carousel.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-popular',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.css'
})
export class PopularComponent {

  popularProducts: any[] = [];
  heading: string = '';
  imageUrl = environment.imageUrl;

  constructor( private carouselService: CarouselService){}

  ngOnInit(): void {
    this.getPopularProducts();
  }

  getPopularProducts(): void {
    this.carouselService.getCategoryProduct().subscribe((res) => {
      if (res.code == 200) {
        const popularCategory = res.data.find((category: any) => category.category === 'Popular');
        if (popularCategory) {
          this.heading = popularCategory.category;  
          if (popularCategory.product) {
            this.popularProducts = popularCategory.product;
          }
        }
      }
    });
  }

  scrollStep = 300; // Adjust based on the card width and container width

  slideCards() {
    const scrollContainer = document.getElementById('scrollContainer');
    if (scrollContainer) {
      const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;

      // If reached the end, jump back to the first card
      if (scrollContainer.scrollLeft >= maxScrollLeft) {
        scrollContainer.scrollLeft = 0; // Jump back to the start
      } else {
        scrollContainer.scrollLeft += this.scrollStep; // Slide to the next set of cards
      }
    }
  }
}
