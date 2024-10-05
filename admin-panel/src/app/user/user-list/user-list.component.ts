import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../core/services/auth-user.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSort } from '@angular/material/sort';
import { ProductService } from '../../core/services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { AuthenticationService } from '../../core/services/authentication.service';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ImageDialogComponent } from '../../components/image-dialog/image-dialog.component';


export interface Product{
  id:number;
  index:number,
  name:string;
  price:number;
  description:string;
  category:string;
  quantity: string;
  status:string;
  image: string;
  createdDate: string;
  updateDate:string;
}
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, SidebarComponent, NavbarComponent, FormsModule, RouterModule, MatTableModule, MatButtonModule, MatPaginator, MatTooltipModule, MatPaginatorModule, NgxPaginationModule, MatSelectModule, MatOptionModule, MatFormFieldModule, MatLabel, MatMenuModule, MatIconModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  // loggedInUser: any = null;
  // order:string = '';
  // isAdmin: boolean = false;

  //  products = [
  //   {id: 1, name: "adsf", price: 200, quantity: 5, code: null, category:"man's wear" ,image: ""}
  //  ]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  products: Product[] = [];
  imageUrl = environment.imageUrl;
  currentPage = 1;
  perPage = 10;
  totalItems = 100; 
  errorMessage: string = '';
  sortOrder: string = 'ASC';
  searchTerm: string = '';
  filteredProducts: Product[] = [];
  isLoggedIn: boolean = false;

  displayedColumns: string[] = ['index', 'image', 'name', 'price', 'category', 'quantity', 'status', 'access', 'actions'];
//  @ViewChild(MatSort) sort!: MatSort; 
  // products = new MatTableDataSource<User>();

  constructor(private authService: AuthService, private router: Router, private authenticationService: AuthenticationService,
     private userService: UserService, private productService: ProductService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.authenticationService.checkLoginStatus();
    if (this.authenticationService.isLoggedIn) {
      // User is logged in, proceed to dashboard
    } else {
      // User is not logged in, redirect to login page
    }
    this.loadProducts();
   
  }

  search(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const input = (event.target as HTMLInputElement).value;
      this.productService.getAllProducts(this.currentPage, this.perPage,this.sortOrder,input).subscribe(
        (response: any) => {
          this.products = response.data.data;
          // this.sortProducts();
        },
        (error: HttpErrorResponse) => {
          console.error('Error loading products', error);
          this.errorMessage = 'There was an error loading products. Please try again.';
        }
      );
    }
  }


  loadProducts(): void {
    this.productService.getAllProducts(this.currentPage, this.perPage,this.sortOrder,this.searchTerm).subscribe(
      (response: any) => {
        this.products = response.data.data;
        // this.sortProducts();
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading products', error);
        this.errorMessage = 'There was an error loading products. Please try again.';
      }
    );
  }

  onPageChange(event: any): void {
    console.log(event)
    this.currentPage = ++(event.pageIndex);
    this.perPage = event.pageSize;
    this.loadProducts();
  }

  sortProducts() {
    this.products.sort((a, b) => {
      if (this.sortOrder === 'asc') {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
  }

  // Handle sort order change
  onSortChange(event:any): void {
    console.log(event)
    this.sortOrder = event;
   // this.sortProducts();
    this.loadProducts();
  }
  searchOnKey(event: any): void {
    this.searchTerm = event.target.value;
    console.log('Search term updated:', this.searchTerm); // Debug line
    this.loadProducts(); // Load products with the updated searchTerm
  }
  
  openImageDialog(imageUrl: string): void {
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      width: '600px',
      data: { imageUrl: imageUrl }  // Pass the image URL to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the dialog is closed if needed
    });
  }


  getIndex(index:number):number{
    return index + 1;
  }
  
  logOut() :void{
    this.authenticationService.logout();
  }

  navigateTo() {
    this.router.navigate(['users/create']);
  }

  userDetail(id:number):void{
    this.router.navigate(['users/detail', id]);
  }

  editUser(id:number):void{
    this.router.navigate(['users/edit', id]);
  }

  openConfirmDialog(productId: number, productName: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      disableClose: true, 
      data: { itemName: productName },  

      panelClass: 'custom-dialog-container'  
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {  
        this.deleteProduct(productId); 
      }
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      (response) => {
        console.log('Product deleted successfully', response);
        this.loadProducts();  // Reload the product list after deletion
      },
      (error) => {
        console.error('Error deleting product:', error);
        this.errorMessage = 'There was an error deleting the product. Please try again.';
      }
    );
  }
  
}
