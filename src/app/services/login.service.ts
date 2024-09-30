import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, retry, throwError, Observable } from 'rxjs';
import { LoginResponse } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/technikon/resources/owners/authenticate';

  login(data: { email: string; password: string }): Observable<LoginResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http
      .post<LoginResponse>(this.apiUrl, JSON.stringify(data), { headers })
      .pipe(
        retry(1),
        catchError((error) => throwError(() => 'Something went wrong during login'))
      );
  }
}
