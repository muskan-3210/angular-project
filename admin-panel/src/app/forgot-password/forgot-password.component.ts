import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '../core/services/alert.service';
import { AuthenticationService } from '../core/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

 forgetForm! : FormGroup;
 isButon : boolean = false;
  isSubmit:boolean = false;

  constructor(
    private fb: FormBuilder,
    private httpService: AuthenticationService,
    private alertService: AlertService,  
  ){}

  ngOnInit(): void{
    this.formInit();
  }

  formInit() {
    this.forgetForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.forgetForm.status === "INVALID") {
      return;
    }

    let data = { ...this.forgetForm.value };
    this.httpService.login('/forgetPassword', data).subscribe(
      (res: any) => {
        if (res.status == "success" && res.code == 200) {
          this.alertService.success(res.message);
          this.isButon = true;
         
        } else if (res.code == 201) {
          this.alertService.error(res.message);
         
        }
      },
      (err: any) => {
        this.alertService.error(err.error.message);
      

      }
    );
  }

}
