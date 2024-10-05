import { Component } from '@angular/core';
import { CarouselService } from '../../core/services/carousel.service';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {

  banners: any[] = [];

  constructor( private carouselService: CarouselService){}

  ngOnInit():void{
    this.loadBanners();
  }

  ngAfterViewInit(): void {
    // Ensure the carousel starts after the view is initialized
    const carouselElement = document.getElementById('carouselExample');
    if (carouselElement) {
      carouselElement.classList.add('carousel');
    }
  }

  loadBanners():void{
    console.log('testing')
    this.carouselService.getAllBanner().subscribe((res) =>{
      if(res.code == 200){
        this.banners = res.data;
      }
 
    })
  }
}
