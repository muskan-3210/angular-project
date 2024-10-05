import { Component } from '@angular/core';
import { Product } from '../user-list/user-list.component';
import { AuthService } from '../../core/services/auth-user.service';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  productForm!:FormGroup;
  imageFile: File | null = null;  // Holds the selected image file
  imagePreview: string | ArrayBuffer | null = null; // Image preview URL
  categories: string[] = ['Trending', 'New', 'Popular'];
  statusCategories: string[] = ['active', 'inactive'];

  constructor(private authService: AuthService, private router:Router, private userService: UserService, private fb: FormBuilder, 
    private toaster: ToastrService, private productService: ProductService
  ){

    this.productForm = this.fb.group({
       name: ['', Validators.required],
       price: ['', Validators.required],
       quantity: ['', Validators.required],
       category: ['', [Validators.required]],
       status: ['', [Validators.required]],  
       image: ['', Validators.required],  
       description:['',Validators.required]
       
    });
  }


  addUser() {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('category', this.productForm.get('category')?.value);
      formData.append('quantity', this.productForm.get('quantity')?.value);
      formData.append('image', this.productForm.get('image')?.value);
      formData.append('status', this.productForm.get('status')?.value);
      formData.append('description', this.productForm.get('description')?.value);

      // Post request to the backend API (replace YOUR_API_ENDPOINT)
      this.productService.addProduct(formData).subscribe(
        (response) => {
          console.log('Product created successfully!', response);
          // Reset the form after successful submission
          this.productForm.reset();
          this.imagePreview = null;
          this.router.navigate(["/user-list"]);
        },
        (error) => {
          console.error('Error creating product', error);
        }
      );
    }
  }

  uploadImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({ image: file });
      this.productForm.get('image')?.updateValueAndValidity();

      // Image preview logic (optional)
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }


  back(): void{
    this.router.navigate(['/user-list']);
  }
}
