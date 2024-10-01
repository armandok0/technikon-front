import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/technikon/resources/owners/create';

  register(data: {
    vat: string;
    name: string;
    surname: string;
    address: string;
    phoneNumber: string;
    email: string;
    username: string;
    password: string;
  }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post(this.apiUrl, data, { headers, responseType: 'text' })
      .pipe(
        catchError((error) => {
          console.error('Error occurred:', error);
          return throwError(() => new Error(error.error || 'Something went wrong during registration')); 
        })
      );
  }
}