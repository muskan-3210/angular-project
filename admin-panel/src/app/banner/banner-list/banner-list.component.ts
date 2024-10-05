import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
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
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ImageDialogComponent } from '../../components/image-dialog/image-dialog.component';
import { BannerService } from '../../core/services/banner.service';

export interface Banner{
  id:number;
  index:number,
  image: string;
  status:string;
  createdDate: string;
  updateDate:string;
}

@Component({
  selector: 'app-banner-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatIconModule, MatTableModule, MatButtonModule, MatPaginator, MatTooltipModule, MatPaginatorModule, NgxPaginationModule, MatSelectModule, MatOptionModule, MatFormFieldModule, MatLabel, MatButtonModule, MatMenuModule],
  templateUrl: './banner-list.component.html',
  styleUrl: './banner-list.component.css'
})
export class BannerListComponent {
  // products = [
  //     {id: 1, name: "adsf" ,image: "", status:"active",description:"ghrsg"}
  //    ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  banner: Banner[] = [];
  imageUrl = environment.imageUrl;
  currentPage = 1;
  perPage = 10;
  totalItems = 100; 
  errorMessage: string = '';
  sortOrder: string = 'ASC';
  searchTerm: string = '';
  filteredProducts: Banner[] = [];
  isLoggedIn: boolean = false;

  displayedColumns: string[] = ['index', 'image',  'status', 'access', 'actions' ];
//  @ViewChild(MatSort) sort!: MatSort; 
  // products = new MatTableDataSource<User>();

  constructor( private router: Router, private authenticationService: AuthenticationService,
     private productService: ProductService, private dialog: MatDialog, private bannerService:BannerService) {}

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
          this.banner = response.data.data;
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
    this.bannerService.getAllBanner(this.currentPage, this.perPage,this.sortOrder).subscribe(
      (response: any) => {
        this.banner = response.data.data;
        // this.sortProducts();
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading products', error);
        this.errorMessage = 'There was an error loading products. Please try again.';
      }
    );
  }

  onPageChange(event: any): void {
    // console.log(event)
    this.currentPage = ++(event.pageIndex);
    this.perPage = event.pageSize;
    this.loadProducts();
  }



  // Handle sort order change
  onSortChange(event:any): void {
    console.log(event)
    this.sortOrder = event;
   // this.sortProducts();
    this.loadProducts();
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
    this.router.navigate(['banner/add']);
  }

  bannerDetail(id:number):void{
    this.router.navigate(['banner/detail', id]);
  }

  editBanner(id:number):void{
    this.router.navigate(['banner/edit', id]);
  }

  openConfirmDialog(bannerId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      disableClose: true, 
      data: { itemName: bannerId },  

      panelClass: 'custom-dialog-container'  
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {  
        this.deleteBanner(bannerId); 
      }
    });
  }

  deleteBanner(id: any): void {
    this.bannerService.deleteBanner(id).subscribe(
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

  isSidebarActive: boolean = false;

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    
    if (sidebar && content) {
      if (this.isSidebarActive) {
        sidebar.classList.add('active');
        content.classList.add('active');
      } else {
        sidebar.classList.remove('active');
        content.classList.remove('active');
      }
    }
  }
}
