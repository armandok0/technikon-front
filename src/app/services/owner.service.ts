import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Repair } from '../models/repair.model';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/technikon/resources/repairs/owner/';

  getRepairsByOwner(vatNumber: string): Observable<Repair[]> {
    return this.http.get<Repair[]>(`${this.apiUrl}${vatNumber}`).pipe(
      catchError((error) => {
        console.error('Get repairs request failed', error);
        return throwError(() => new Error('Error fetching repair details'));
      })
    );
  }
}