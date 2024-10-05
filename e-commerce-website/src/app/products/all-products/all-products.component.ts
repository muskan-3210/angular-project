import { Component } from '@angular/core';
import { CarouselService } from '../../core/services/carousel.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent {
  allProducts : any[] = [];
  imageUrl = environment.imageUrl
  chunkedProducts: any[] = [];
  itemsPerSlide: number = 6; // Number of items to show per slide
  slides: any[][] = []; // Array to hold slides

  constructor( private carouselService: CarouselService){}

  ngOnInit(): void {
    this.loadAllProducts();
  }

  
  loadAllProducts(): void {
    this.carouselService.getUserProductAll().subscribe((res) =>{
      if (res.code == 200){
        this.allProducts = res.data;
        this.createSlides();  // Call function to create slides
      }
    })
  }

  createSlides() {
    for (let i = 0; i < this.allProducts.length; i += this.itemsPerSlide) {
      this.slides.push(this.allProducts.slice(i, i + this.itemsPerSlide));
    }
  }
  
  
}
