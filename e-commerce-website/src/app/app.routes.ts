
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';

import { ProductBuyComponent } from './product-buy/product-buy.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { LoginComponent } from './authentication/login/login.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component:LoginComponent},
  { path: 'home', component: ProductListComponent },
  { path: 'products/:productId', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'buy/:productId', component: ProductBuyComponent },
  {path: 'product-detail/:id', component:ProductDetailComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }