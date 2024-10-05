import { Component } from '@angular/core';
import { CarouselService, Product } from '../../core/services/carousel.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  productdetail! :Product;
  productId!: number;
  imageUrl = environment.imageUrl

  constructor( private carouselService: CarouselService, private router: Router, private route: ActivatedRoute){}

  ngOnInit():void{
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.loadProductDetail(this.productId);
    });
  }

  loadProductDetail(id:number): void {
    this.carouselService.getProductDetail(id).subscribe((res) =>{
      if(res.code == 200){
        this.productdetail = res.data;
      }
    })
  }
}
