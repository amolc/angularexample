import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/customers';

  constructor(private http: HttpClient) {}

  // GET request - Fetch all customers (matches path('', ...))
  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/`);
  }

  // POST request - Add a new customer (matches path('', ...))
  addCustomer(customer: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, customer);
  }

  // PUT request - Edit a customer (matches path('edit/<int:id>/', ...))
  updateCustomer(id: number, customer: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/edit/${id}/`, customer);
  }

  // DELETE request - Delete a customer (matches path('delete/<int:id>/', ...))
  deleteCustomer(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}/`);
  }

  // POST request - Login (matches path('login/', ...))
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/`, credentials);
  }
}
