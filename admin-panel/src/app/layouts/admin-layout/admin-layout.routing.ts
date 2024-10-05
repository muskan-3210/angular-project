import { Routes } from "@angular/router";
import { UserListComponent } from "../../user/user-list/user-list.component";
import { UserDashboardComponent } from "../../user/user-dashboard/user-dashboard.component";
import { AuthGuard } from "../../guards/auth.service";
import { CreateUserComponent } from "../../user/create-user/create-user.component";
import { EditUserComponent } from "../../user/edit-user/edit-user.component";
import { UserDetailComponent } from "../../user/user-detail/user-detail.component";
import { AdminDashboardComponent } from "../../admin/admin-dashboard/admin-dashboard.component";
import { DashboardComponent } from "../../dashboard/dashboard.component";
import { AdminLayoutComponent } from "./admin-layout.component";
import { BannerListComponent } from "../../banner/banner-list/banner-list.component";
import { AddBannerComponent } from "../../banner/add-banner/add-banner.component";
import { BannerDetailComponent } from "../../banner/banner-detail/banner-detail.component";
import { EditBannerComponent } from "../../banner/edit-banner/edit-banner.component";


export const AdminLayoutRoutes: Routes = [
    {
        path: '',
        component:AdminLayoutComponent,
        canActivate:[],
        children:[

            { path: 'user-list', component: UserListComponent, canActivate: [], data: { title: 'Products' } },
            { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard], data: { title: 'User' } },
            { path: 'users/create', component: CreateUserComponent },
            { path: 'users/edit/:id', component: EditUserComponent },
            { path: 'users/detail/:id', component: UserDetailComponent },
            { path: 'admin-dashboard', component: AdminDashboardComponent },
            { path: 'dashboard', component:DashboardComponent, data: { title: "Dashboard" }},
            { path: 'banner', component: BannerListComponent,canActivate: [], data: { title: 'Banner' } },
            { path: 'banner/add', component:AddBannerComponent},
            { path: 'banner/detail/:id', component:BannerDetailComponent},
            { path: 'banner/edit/:id', component: EditBannerComponent}

        ]
    }
]