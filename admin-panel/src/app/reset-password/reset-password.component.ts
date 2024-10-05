import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../core/services/alert.service';
import { AuthenticationService } from '../core/services/authentication.service';
import { response } from 'express';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  updateForm!: FormGroup;
  isSubmit: boolean = false;
  token!: string;
  bothPassword: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private alertService: AlertService,
    private httpService: AuthenticationService,
    private router: Router
  ){}

  ngOnInit(): void{
    this.route.params.subscribe((params : any) =>{
      if(params["token"]){
        this.token = params["token"];
      }
    });
    this.updateForm = this.fb.group({
      newpassword:['', Validators.required, Validators.minLength(8)],
      confirmpassword:['', Validators.required, Validators.minLength(8)]
    })
  }

  submitForm() :void{
    try{
      this.isSubmit = true;
      const checkdata = {...this.updateForm.value};
      if(this.updateForm.status === 'INVALID'){
        this.bothPassword = false;
        return;
      }

      if(checkdata.newpassword == checkdata.confirmpassword){
        const data = {
          token : this.token,
          new_password : checkdata.password,
          user_role: "3",
        }
        this.httpService.login('/passwordUpdate',data).subscribe((res:any) =>{
          if(res.status == "success" && res.status == 200){
            this.alertService.success(res.message);
            this.router.navigate(['/login']);
          }else if(res.status == 201){
            this.alertService.error(res.message);
          }else{
            this.alertService.error(res.message);
          }
        });
      } else{
        this.bothPassword = true;
        this.isSubmit = true;
      }
    }catch(e){
      this.alertService.error('Sormething went wrong');
    }
  }
}
