import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginResponse } from '../models/login.model';
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/technikon/resources/owners/';
  private authService = inject(AuthService); 

  constructor() {}

  getOwnerByVat(): Observable<LoginResponse> {
    const vat = this.authService.getLoggedInUserVat();
    if (!vat) {
      throw new Error('VAT not found for the logged-in user');
    }

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.apiUrl}${vat}`;

    return this.http.get<LoginResponse>(url, { headers }).pipe(
      catchError((error) => throwError(() => 'Error fetching user details by VAT'))
    );
  }

  updateAddress(address: string): Observable<string> {
    const vat = this.authService.getLoggedInUserVat(); 
    if (!vat) {
      throw new Error('VAT not found for the logged-in user');
    }

    const url = `${this.apiUrl}${vat}/address`;
    const body = { address };
    return this.http.put(url, body, { responseType: 'text' }).pipe(
      catchError((error) => throwError(() => error.error || 'Error updating address'))
    );
  }

  updateEmail(email: string): Observable<string> {
    const vat = this.authService.getLoggedInUserVat(); 
    if (!vat) {
      throw new Error('VAT not found for the logged-in user');
    }

    const url = `${this.apiUrl}${vat}/email`;
    const body = { email };
    return this.http.put(url, body, { responseType: 'text' }).pipe(
      catchError((error) => throwError(() => error.error || 'Error updating email'))
    );
  }

  updatePassword(password: string): Observable<string> {
    const vat = this.authService.getLoggedInUserVat(); 
    if (!vat) {
      throw new Error('VAT not found for the logged-in user');
    }

    const url = `${this.apiUrl}${vat}/password`;
    const body = { password };
    return this.http.put(url, body, { responseType: 'text' }).pipe(
      catchError((error) => throwError(() => error.error || 'Error updating password'))
    );
  }

  deleteUser(): Observable<string> {
    const vat = this.authService.getLoggedInUserVat();
    if (!vat) {
      throw new Error('VAT not found for the logged-in user');
    }

    const url = `${this.apiUrl}${vat}`; 
    return this.http.delete(url, { responseType: 'text' }).pipe(
      catchError((error) => throwError(() => 'Error deleting user: ' + (error.error || 'Something went wrong')))
    );
  }
}