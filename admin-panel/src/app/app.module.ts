import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FormGroup } from '@angular/forms';
import { provideHttpClient, withFetch, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { InterceptorService } from './core/interceptor/interceptor.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { routes } from './app.routes';
import { ToastrModule } from "ngx-toastr";
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { MatTableModule } from '@angular/material/table'; // Import MatTableModule
import { MatButtonModule } from '@angular/material/button'; // If using buttons
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NgxUiLoaderModule,NgxUiLoaderConfig } from "ngx-ui-loader";

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "bgsColor": "rgba(108,106,106,0.75)",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 110,
  "bgsType": "ball-spin-clockwise",
  "blur": 5,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "rgba(128,125,125,0.78)",
  "fgsPosition": "center-center",
  "fgsSize": 30,
  "fgsType": "wandering-cubes",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40,40,40,0.31)",
  "pbColor": "rgba(72,70,70,0.85)",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
}

@NgModule({
  declarations: [
    // AppComponent,
    LoginComponent,
    DashboardComponent,
    UserListComponent,
    UserLoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    routes,
    ReactiveFormsModule,
    CommonModule,
    NgApexchartsModule ,
    MatTableModule, 
    MatButtonModule,
    BrowserAnimationsModule,
    MatPaginator,
    MatPaginatorModule,
    NgOptimizedImage,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true, // Register the interceptor as multi
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
