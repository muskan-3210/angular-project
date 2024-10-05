import { Routes } from "@angular/router";
import { UserLoginComponent } from "../../user/user-login/user-login.component";
import { AuthLayoutComponent } from "./auth-layout.component";

export const AuthLayoutRoutes: Routes =[
  {
    
    path: "",
    component: AuthLayoutComponent,
    canActivate: [],
    children: [
      { path: '', redirectTo: 'user-login', pathMatch: 'full' },
      { path: 'user-login', component: UserLoginComponent }, 
    ],

  },

]