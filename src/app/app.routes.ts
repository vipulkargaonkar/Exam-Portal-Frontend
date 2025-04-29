import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

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
    }
];
