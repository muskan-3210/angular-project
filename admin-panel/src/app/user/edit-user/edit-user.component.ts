import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/services/product.service'; 
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  editProductForm!: FormGroup;  // FormGroup to handle the edit product form
  productId!: number;  // Variable to store the product ID from the route
  productDetail: any;  // Variable to store the fetched product details
  errorMessage: string = '';  // Error message to display to the user
  imageFile: File | null = null;  // For handling file uploads
  currentImageUrl: File | null = null; 
  categories: string[] = ['Trending', 'New', 'Popular'];

  constructor(
    private fb: FormBuilder,  // FormBuilder for creating the reactive form
    private productService: ProductService,  // Inject ProductService
    private route: ActivatedRoute,  // Inject ActivatedRoute to get route parameters
    private router: Router  // Router for navigating after successful submission
  ) {}

  ngOnInit(): void {
    this.initializeForm();  // Initialize the form
    this.route.params.subscribe(params => {
      this.productId = +params['id'];  // Retrieve 'id' from route params and convert it to a number
      this.getProductDetails(this.productId);  // Call method to fetch product details
    });
  }

  // Initialize the form with validation rules
  initializeForm(): void {
    this.editProductForm = this.fb.group({
      id: ['', Validators.required],  
      name: ['', Validators.required],  
      quantity: ['', Validators.required], 
      price: ['', Validators.required], 
      description:['',Validators.required],
      category: ['', Validators.required], 
      status:['',Validators.required],
      image: ['']  
    });
  }

  // Fetch product details to populate the form
 getProductDetails(id: number): void {
  this.productService.getProductById(id).pipe(
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
      formData.append('name', this.editProductForm.get('name')?.value);
      formData.append('quantity', this.editProductForm.get('quantity')?.value);
      formData.append('price', this.editProductForm.get('price')?.value);
      formData.append('category', this.editProductForm.get('category')?.value);
      formData.append('description', this.editProductForm.get('description')?.value);
      formData.append('status',this.editProductForm.get('status')?.value);
      
      if (this.currentImageUrl) {
        formData.append('currentImageUrl', this.currentImageUrl);  // Append the current image URL if it exists
      }

      if (this.imageFile) {
        formData.append('image', this.imageFile);
      }

      this.productService.editProduct(formData).subscribe(
        (response) => {
          console.log('Product updated successfully', response);
          this.router.navigate(['/user-list']);
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
    this.router.navigate(['/user-list']);
  }

}
