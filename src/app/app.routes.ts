import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { adminGuard } from './services/admin.guard';
import { userGuard } from './services/user.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoriesComponent } from './pages/admin/add-categories/add-categories.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: "full"
    },
    {
        path: 'signup',
        component: SignupComponent,
        pathMatch: "full"
    },
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: "full"
    },
    {
        path: 'admin-dashboard',
        component: DashboardComponent,
        // pathMatch: "full",
        canActivate: [adminGuard],
        children:[
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: '',
                component: WelcomeComponent
            },
            {
                path: 'categories',
                component: ViewCategoriesComponent
            },
            {
                path: 'add-category',
                component: AddCategoriesComponent
            },
        ]
    },
    {
        path: 'user-dashboard',
        component: UserDashboardComponent,
        pathMatch: "full",
        canActivate: [userGuard]
    }
];
