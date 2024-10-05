import { Component } from '@angular/core';
import { CarouselService } from '../../../core/services/carousel.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css'
})
export class NewComponent {

  newProducts: any[] = [];
  heading: string = '';
  imageUrl = environment.imageUrl;

  constructor( private carouselService: CarouselService){}

  ngOnInit(): void {
    this.getNewProducts();
  }
  
  getNewProducts(): void {
    this.carouselService.getCategoryProduct().subscribe((res) => {
      if (res.code == 200) {
        // Find products of 'Popular' category and extract heading
        const newCategory = res.data.find((category: any) => category.category === 'New');
        if (newCategory) {
          this.heading = newCategory.category;  // Extract the category name for the heading
          if (newCategory.product) {
            this.newProducts = newCategory.product;
          }
        }
      }
    });
  }

  
}




