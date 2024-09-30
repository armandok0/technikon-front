import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OwnerHomeComponent } from './owner-home/owner-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { RegisterComponent } from './register/register.component';
import { FileNotFoundComponent } from './file-not-found/file-not-found.component';
import { OwnerPropertiesComponent } from './owner-properties/owner-properties.component';
import { OwnerRepairsComponent } from './owner-repairs/owner-repairs.component';
import { OwnerDetailsComponent } from './owner-details/owner-details.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, 
  { path: 'owner-home', component: OwnerHomeComponent },
  { path: 'owner-details', component: OwnerDetailsComponent },
  { path: 'owner-properties', component: OwnerPropertiesComponent },
  { path: 'owner-repairs', component: OwnerRepairsComponent },
  { path: 'admin-home', component: AdminHomeComponent }, 
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', component: FileNotFoundComponent }
];
