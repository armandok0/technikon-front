import { Injectable } from '@angular/core';
import { LoginResponse } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  getLoggedInUserVat(): string | null {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser: LoginResponse = JSON.parse(user);
      return parsedUser.vat;
    }
    return null;
  }
}
