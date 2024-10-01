import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Repair } from '../models/repair.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RepairService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/technikon/resources/repairs/owner/';
  private authService = inject(AuthService); 

  constructor() {}

  getRepairsByOwner(): Observable<Repair[]> {
    const vat = this.authService.getLoggedInUserVat();
    if (!vat) {
      return throwError(() => new Error('VAT not found for the logged-in user'));
    }
    
    return this.http.get<Repair[]>(`${this.apiUrl}${vat}`).pipe(
      catchError((error) => {
        console.error('Get repairs request failed', error);
        return throwError(() => new Error('Error fetching repair details'));
      })
    );
  }
}
