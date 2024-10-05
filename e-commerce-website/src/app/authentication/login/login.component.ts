import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { APIs } from '../../core/common/api.constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  loginForm!: FormGroup;

  isLoading: boolean = false;
  isSubmit : boolean = false;
  constructor(private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private cookieService: CookieService,
    private authService: AuthService, 
    private loader : NgxUiLoaderService, // Adjust the path as per your project structure
   ) {}


  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      // rememberMe: [false]
    });
    
  }

  onLogin(): any {
    try{
    this.isSubmit = true;
    console.log(this.loginForm)
    if (!this.loginForm.valid) {
      return;
    }
    this.loader.start();
    let data = { ...this.loginForm.value };
    console.log(data)
    this.authService.login(APIs.LOGIN,data).subscribe((success) => {
      if (success.status && success.code == 200) {
        this.loader.stop();
        localStorage.setItem('authorization',success?.data.token);
        this.router.navigate(['/home']); // Redirect to the dashboard upon successful login
        console.log(success)
      } else {
        this.loader.stop();
      }

    });
  }catch(err:any){
    this.loader.stop();
  }
  }
}
