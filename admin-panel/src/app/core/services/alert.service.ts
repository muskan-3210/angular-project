import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private toastr: ToastrService
  ) { }

  success(message:any){
    this.toastr.success(message);
  }

  error(message:any){
    this.toastr.error(message);
  }

}
