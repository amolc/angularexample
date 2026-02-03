# Angular Services and Dependency Injection

In Angular, a **Service** is a broad category encompassing any value, function, or feature that an application needs. A service is typically a class with a narrow, well-defined purpose.

---

## **1. Need for a Service**
Components should focus on the user experience (presenting data) and delegate data access, logging, and complex business logic to services.
- **Separation of Concerns**: Keep components lean.
- **Code Reusability**: Share logic across multiple components.
- **Data Sharing**: Maintain a single source of truth for data.

---

## **2. Dependency Injection (DI)**
DI is a design pattern in which a class requests dependencies from external sources rather than creating them. Angular's DI framework handles the instantiation and delivery of services to components.

---

## **3. Creating a Service**
Use the Angular CLI: `ng generate service data`

### **Example: data.service.ts**
```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Makes the service available application-wide as a singleton
})
export class DataService {
  private data: string[] = ['Apple', 'Banana', 'Cherry'];

  getData() {
    return this.data;
  }

  addData(item: string) {
    this.data.push(item);
  }
}
```

---

## **4. Hierarchical Injector**
Angular has a hierarchical DI system:
- **`providedIn: 'root'`**: Singleton for the entire app.
- **Module Level**: Shared by all components in that module.
- **Component Level**: A new instance of the service is created for each component instance.

---

## **5. Injecting A Service into Another Service**
Services can depend on other services.

```typescript
@Injectable({ providedIn: 'root' })
export class LoggerService {
  log(message: string) {
    console.log(`[LOG]: ${message}`);
  }
}

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private logger: LoggerService) {} // Injecting LoggerService

  fetchData() {
    this.logger.log('Fetching data...');
    // logic...
  }
}
```

---

## **6. Observables and RxJS**
Angular uses **RxJS** (Reactive Extensions for JavaScript) to handle asynchronous operations.
- **Observable**: A stream of data that can be observed over time.
- **Subscription**: You must `.subscribe()` to an observable to receive its data.

### **Example: Observable usage**
```typescript
import { of, Observable } from 'rxjs';

getData(): Observable<string[]> {
  return of(['Item 1', 'Item 2']); // returns an observable
}
```

---

## **7. Interaction with Backend (HttpClient)**
The `HttpClient` service allows you to communicate with remote HTTP servers.

### **Setup**
Add `provideHttpClient()` to your `app.config.ts` (Angular 17+) or import `HttpClientModule` (older versions).

### **Example: API Service**
```typescript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'https://api.example.com/items';

  constructor(private http: HttpClient) {}

  // GET request
  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // POST request
  addItem(item: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, item);
  }
}
```

---

## **8. Parts of an HTTP Request**
- **URL**: The endpoint address.
- **Method**: GET, POST, PUT, DELETE, etc.
- **Headers**: Metadata (e.g., `Content-Type: application/json`).
- **Body**: The data sent (for POST/PUT).
- **Query Params**: Extra data in URL (e.g., `?id=123`).
