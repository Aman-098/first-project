import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { EmpListComponent } from './components/emp-list/emp-list.component';



export const routes: Routes = [
    {
        path:'',
        component:RegisterComponent,
        pathMatch:"full"
    },
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'forget-password',
        component:ForgetPasswordComponent
    },
    {
        path:'dashboard',
        component:LayoutComponent,
        children:[
            {
                path:'home',
                component:HomeComponent
            },
            {
                path:'emp-list',
                component:EmpListComponent
            }
            
        ]
    },
];
