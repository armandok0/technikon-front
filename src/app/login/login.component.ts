import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../models/login.model'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  fb = inject(FormBuilder);
  loginService = inject(LoginService);
  router = inject(Router);

  loginResponse: LoginResponse | null = null;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9@]+$')]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

onLogin() {
  if (this.loginForm.valid) {
    const loginData = this.loginForm.value;
    this.loginService.login(loginData).subscribe({
      next: (response: LoginResponse) => {
        if (response) {
          localStorage.setItem('user', JSON.stringify(response)); 
          this.router.navigate([response.role === 'USER' ? '/owner-home' : '/admin-home']);
          alert('Login successful!');
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Login failed. Please check your credentials.');
      }
    });
  } else {
    console.log('Form is invalid');
  }
}
}