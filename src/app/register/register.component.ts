import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  fb = inject(FormBuilder);
  registerService = inject(RegisterService);
  router = inject(Router);

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      vat: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)],],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const registerData = this.registerForm.value;
  
      this.registerService.register(registerData).subscribe({
        next: (response: any) => {
          console.log('API Response:', response);
          alert('Registration successful!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration failed:', err);
          if (err.error) {
            alert(`Registration failed: ${err.error}`); 
          } else if (err.message) {
            alert(`Registration failed: ${err.message}`); 
          } else {
            alert('Registration failed. Please check your input.');
          }
        }
      });

    } else {
      console.log('Form is invalid');
    }
  }
}
