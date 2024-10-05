import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth-user.service'; // Adjust the path as per your project structure
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AlertService } from '../../core/services/alert.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { APIs } from '../../core/common/api.constants';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule,NgxUiLoaderModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
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
    private authService: AuthenticationService, 
    private loader : NgxUiLoaderService, // Adjust the path as per your project structure
    private alertService: AlertService) {}


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
        this.alertService.success(success?.message);
        this.router.navigate(['/user-list']); // Redirect to the dashboard upon successful login
        console.log(success)
      } else {
        this.alertService.error(success?.message);
        this.loader.stop();
      }

    });
  }catch(err:any){
    this.loader.stop();
    this.alertService.error("Something went wrong");
  }
  }
}
