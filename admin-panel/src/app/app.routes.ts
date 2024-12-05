import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { AuthGuard } from './guards/auth.service';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { BannerListComponent } from './banner/banner-list/banner-list.component';

export const routes: Routes = [
    // { path: "", redirectTo: "login", pathMatch: "full" },
    // {path:'login', component:LoginComponent},
    // {path:'dashboard', component:DashboardComponent},
    // {path: 'forgot-password', component:ForgotPasswordComponent},
    // {path: 'reset-password', component:ResetPasswordComponent},
    //  { path: 'user-list', component: UserListComponent }, // Route to Dashboard
    //  { path: '', redirectTo: '/user-list', pathMatch: 'full' }, // Redirect root to dashboard
    //  { path: '**', redirectTo: '/user-list' }, // Wildcard route to handle undefined paths
    {
        path: "",
        redirectTo: "auth",
        pathMatch: "full",
      },
    
    // { path: 'banner', component: BannerListComponent},

    {path: '',
        loadChildren:() => import("../../src/app/layouts/admin-layout/admin-layout.routing").then((m) => m.AdminLayoutRoutes)
    },
    {path:'auth',
        loadChildren:() => import("../../src/app/layouts/auth-layout/auth-layout.routing").then((m) => m.AuthLayoutRoutes)
    }

];
