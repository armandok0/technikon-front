import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OwnerService } from '../../../services/owner.service';
import { LoginResponse } from '../../../models/login.model';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../../sidebar/sidebar.component';

@Component({
  selector: 'app-owner-details',
  standalone: true,
  imports: [SidebarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.css']
})
export class OwnerDetailsComponent implements OnInit {
  userDetailsForm: FormGroup;
  originalData: LoginResponse | null = null;

  private fb = inject(FormBuilder);
  private ownerService = inject(OwnerService);
  private router = inject(Router);

  constructor() {
    this.userDetailsForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      vat: [{ value: '', disabled: true }],
      name: [{ value: '', disabled: true }],
      surname: [{ value: '', disabled: true }],
      address: [{ value: '', disabled: false }, Validators.required],
      phoneNumber: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: false }, [Validators.required, Validators.email]],
      username: [{ value: '', disabled: true }],
      role: [{ value: '', disabled: true }],
      password: ['', [Validators.minLength(8)]],
    });
  }

  ngOnInit() {
    this.ownerService.getOwnerByVat().subscribe({
      next: (response: LoginResponse) => {
        this.initializeForm(response);
        this.originalData = response; 
      },
      error: (error) => {
        console.error('Error fetching owner details', error);
        alert('Failed to fetch user details');
      }
    });
  }

  initializeForm(user: LoginResponse) {
    this.userDetailsForm.patchValue({
      id: user.id,
      vat: user.vat,
      name: user.name,
      surname: user.surname,
      address: user.address,
      phoneNumber: user.phoneNumber,
      email: user.email,
      username: user.username,
      role: user.role,
    });
  }

  onUpdate() {
    if (this.userDetailsForm.valid) {
      const currentAddress = this.userDetailsForm.get('address')?.value;
      const currentEmail = this.userDetailsForm.get('email')?.value;
      const password = this.userDetailsForm.get('password')?.value;

      if (this.originalData?.address !== currentAddress) {
        this.ownerService.updateAddress(currentAddress).subscribe({
          next: () => {
            console.log('Address updated successfully'); 
            alert('Address updated successfully!');
          },
          error: (error) => {
            console.error('Error updating address', error);
            alert('Error updating address: ' + error);
          }
        });
      }

      if (this.originalData?.email !== currentEmail) {
        this.ownerService.updateEmail(currentEmail).subscribe({
          next: () => {
            console.log('Email updated successfully'); 
            alert('Email updated successfully!');
          },
          error: (error) => {
            console.error('Error updating email', error);
            alert('Error updating email: ' + error);
          }
        });
      }

      if (password) {
        this.ownerService.updatePassword(password).subscribe({
          next: () => {
            console.log('Password updated successfully');
            alert('Password updated successfully!');
          },
          error: (error) => {
            console.error('Error updating password', error);
            alert('Error updating password: ' + error);
          }
        });
      }
    } else {
      alert('Please fill in all required fields.');
    }
  }

  confirmDelete() {
    const confirmation = confirm('Are you sure you want to delete?');
    if (confirmation) {
      this.ownerService.updateUserStatus().subscribe({
        next: (response) => {
          console.log('User status updated response:', response);
          alert('User status updated successfully!');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error updating user status', error);
          alert('Failed to update user status.');
        }
      });
    }
  }  
}
