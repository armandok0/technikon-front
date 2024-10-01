import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, map } from 'rxjs';
import { AuthService } from './auth.service';
import { Property } from '../models/property.model';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/technikon/resources/properties/';
  private authService = inject(AuthService);

  constructor() {}

  getPropertiesByOwner(): Observable<Property[]> {
    const vat = this.authService.getLoggedInUserVat();
    if (!vat) {
      return throwError(() => new Error('VAT not found for the logged-in user'));
    }

    return this.http.get<Property[]>(`${this.apiUrl}vat/${vat}`).pipe(
      catchError((error) => {
        console.error('Get properties request failed', error);
        return throwError(() => new Error('Error fetching property details'));
      })
    );
  }

  getLatestProperty(): Observable<Property> {
    const vat = this.authService.getLoggedInUserVat();
    if (!vat) {
      return throwError(() => new Error('VAT not found for the logged-in user'));
    }

    return this.http.get<Property[]>(`${this.apiUrl}vat/${vat}`).pipe(
      map((properties: Property[]) => properties[properties.length - 1]),
      catchError((error) => {
        console.error('Get latest property request failed', error);
        return throwError(() => new Error('Error fetching latest property details'));
      })
    );
  }
}
