import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../cart.service';
import { Product } from '../product-list/product-list.component';
import { Observable } from 'rxjs';
import products from '../../assets/products.json';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-product-buy',
  standalone: true,
  templateUrl: './product-buy.component.html',
  styleUrls: ['./product-buy.component.css'],
  imports: [CommonModule, CurrencyPipe,RouterModule, ReactiveFormsModule, FooterComponent,  NavbarComponent],
})
export class ProductBuyComponent implements OnInit {
  
  product: any | [];

  checkoutForm: FormGroup;
  isFormVisible: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.checkoutForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      city: ['', Validators.required],

    });
  }

  
  ngOnInit() {
    console.log(products)
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));
    this.product = products.find((product:any) => product.id === productIdFromRoute);
    this.shippingCosts =  this.cartService.getShippingPrices();
  }

  onSubmit(): void {
    console.warn('Your order has been submitted', this.checkoutForm.value);
    window.alert('Your order has been submitted');
    this.checkoutForm.reset();
    this.checkoutForm.patchValue({
      name: "",
      address: ''
    })
    
    // if(this.checkoutForm.valid){
    //   window.alert('Your order has been submitted');
    // }else{
    //   window.alert('Please fill all the required fields');
    // }
    
  }

  shippingCosts!: Observable<{ type: string, price: number }[]>;

}
