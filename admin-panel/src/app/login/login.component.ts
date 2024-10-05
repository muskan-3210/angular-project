import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../app/core/services/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmit:boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private cookieService: CookieService,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.forminit();
    if(this.cookieService.get("remember") !== undefined && this.cookieService.get("remember") === "Yes"){
      this.loginForm.setValue({
        email: this.cookieService.get("email"),
        password: this.cookieService.get("password"),
        rememberMe:true,
      });
    }
  }

  forminit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    this.isSubmit = true;
    if(this.loginForm.status === "INVALID"){
      return;
    }
    let data = {...this.loginForm.value};
    const loginData = this.loginForm.value;
    this.http.post('https://mmfinfotech.website/awsMarketing/public/api/login', loginData).subscribe(
      (response: any) => {
        if(response.status == "success" && response.code == 200){
          localStorage.setItem('email', loginData.email);
        }else if(response.code == 201){
          alert(response.message);
        }
        if (response.data.user_role == "3") {
          this.router.navigate(["/dashboard"]);
        }
      },
      (err: any) => {
        this.alertService.error(err.error.message);
      }
    );
  }
}
