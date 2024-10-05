import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerService } from '../../core/services/banner.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-edit-banner',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-banner.component.html',
  styleUrl: './edit-banner.component.css'
})
export class EditBannerComponent {
  editProductForm!: FormGroup;  // FormGroup to handle the edit product form
  bannerId!: number;  // Variable to store the product ID from the route
  productDetail: any;  // Variable to store the fetched product details
  errorMessage: string = '';  // Error message to display to the user
  imageFile: File | null = null;  // For handling file uploads
  currentImageUrl: string | null = null; 
  categories: string[] = ['active', 'inactive'];

  constructor(
    private fb: FormBuilder,  // FormBuilder for creating the reactive form
    private bannerService: BannerService,
    private route: ActivatedRoute,  // Inject ActivatedRoute to get route parameters
    private router: Router  // Router for navigating after successful submission
  ) {}

  ngOnInit(): void {
    this.initializeForm();  // Initialize the form
    this.route.params.subscribe(params => {
      this.bannerId = +params['id'];  // Retrieve 'id' from route params and convert it to a number
      this.getProductDetails(this.bannerId);  // Call method to fetch product details
    });
  }

  // Initialize the form with validation rules
  initializeForm(): void {
    this.editProductForm = this.fb.group({
      id: ['', Validators.required],  // Product ID is required
      status: ['', Validators.required],  // Category is required
      image: ['']  // Optional image upload
    });
  }

  // Fetch product details to populate the form
 getProductDetails(id: number): void {
  this.bannerService.getBannerById(id).pipe(
    catchError((error: any) => {
      console.error('Error fetching product details:', error);  
      this.errorMessage = 'Product not found or there was an error fetching the product details.';  
      return of(null);  
    })
  ).subscribe(
    (response) => {
      if (response) {
        this.productDetail = response.data;  
        this.currentImageUrl = this.productDetail.imageUrl;  // Set the current image URL
        console.log('Current Image URL:', this.currentImageUrl); // Log for debugging
        this.editProductForm.patchValue(this.productDetail);  
      }
    }
  );
}


  // Handle image file change
  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;  // Assign the selected file to 'imageFile'
    }
  }

  // Submit the updated product details
  onSubmit(): void {
    if (this.editProductForm.valid) {
      const formData = new FormData();
      formData.append('id', this.editProductForm.get('id')?.value);
      formData.append('status', this.editProductForm.get('status')?.value);
      if (this.imageFile) {
        formData.append('image', this.imageFile);
      }

      this.bannerService.editBanner(formData).subscribe(
        (response) => {
          console.log('Product updated successfully', response);
          this.router.navigate(['/banner']);
        },
        (error) => {
          console.error('Error updating product:', error);
          this.errorMessage = 'There was an error updating the product. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'Please fill all required fields correctly.';
    }
  }


   back(): void{
    this.router.navigate(['/banner']);
  }
}
