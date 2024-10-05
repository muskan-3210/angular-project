import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BannerService } from '../../core/services/banner.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-banner',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-banner.component.html',
  styleUrl: './add-banner.component.css'
})
export class AddBannerComponent {

  bannerForm! :FormGroup;
  imageFile: File | null = null;  // Holds the selected image file
  imagePreview: string | ArrayBuffer | null = null; // Image preview URL
  categories: string[] = ['active', 'inactive'];

  constructor(private router:Router, private fb: FormBuilder, private bannerService: BannerService) {
    this.bannerForm = this.fb.group({
      status: ['', [Validators.required]],
      image: ['', Validators.required],  
      
   });
   }

   addUser() {
    if (this.bannerForm.valid) {
      const formData = new FormData();
      formData.append('status', this.bannerForm.get('status')?.value);
      formData.append('image', this.bannerForm.get('image')?.value);

      // Post request to the backend API (replace YOUR_API_ENDPOINT)
      this.bannerService.addbanner(formData).subscribe(
        (response) => {
          console.log('Product created successfully!', response);
          // Reset the form after successful submission
          this.bannerForm.reset();
          this.imagePreview = null;
          this.router.navigate(["/banner"]);
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
      this.bannerForm.patchValue({ image: file });
      this.bannerForm.get('image')?.updateValueAndValidity();

      // Image preview logic (optional)
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }


  back():void{
    this.router.navigate(['/banner']);
  }
}
