import {  Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OwnerHomeComponent } from './owner-home/owner-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { RegisterComponent } from './register/register.component';
import { FileNotFoundComponent } from './file-not-found/file-not-found.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'owner-home', component: OwnerHomeComponent },
  { path: 'admin-home', component: AdminHomeComponent }, 
  { path: 'register', component: RegisterComponent }, 
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', component: FileNotFoundComponent }
];