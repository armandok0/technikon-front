import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { OwnerHomeComponent } from './components/owner/owner-home/owner-home.component';
import { OwnerDetailsComponent } from './components/owner/owner-details/owner-details.component';
import { OwnerPropertiesComponent } from './components/owner/owner-properties/owner-properties.component';
import { OwnerRepairsComponent } from './components/owner/owner-repairs/owner-repairs.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { FileNotFoundComponent } from './components/errors/file-not-found/file-not-found.component';


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
