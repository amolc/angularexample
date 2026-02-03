# Angular Router Guide

The Angular Router enables navigation from one view to the next as users perform application tasks. This guide covers the essential features of the Angular Router.

## 1. Setting Up Routes

In modern Angular applications (Standalone), routes are configured using `provideRouter` in the `app.config.ts` file.

### Step 1: Define Routes
Create a `app.routes.ts` file to define your application's navigation paths.

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'customers', component: CustomerComponent },
];
```

### Step 2: Provide Router
Register the routes in your `app.config.ts`.

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};
```

### Step 3: Add Router Outlet
In your `app.component.html`, add the `<router-outlet>` directive where you want the routed components to appear.

```html
<!-- app.component.html -->
<nav>
  <a routerLink="/">Home</a>
  <a routerLink="/customers">Customers</a>
</nav>

<router-outlet></router-outlet>
```

## 2. Adding Routes Using RouterLink

The `routerLink` directive is used to navigate between routes in your templates.

```html
<!-- Link to a static route -->
<a routerLink="/customers">View Customers</a>

<!-- Link with parameters -->
<a [routerLink]="['/customer', customer.id]">View Details</a>
```

## 3. Wildcard and Redirecting Routes

Wildcard routes handle invalid URLs, while redirects point one path to another.

```typescript
export const routes: Routes = [
  { path: 'old-path', redirectTo: '/customers', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent } // Wildcard route
];
```

## 4. Adding Navigation Programmatically

You can navigate to a route from within a component class using the `Router` service.

```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({ ... })
export class MyComponent {
  constructor(private router: Router) {}

  goToCustomers() {
    this.router.navigate(['/customers']);
  }

  goToDetails(id: number) {
    this.router.navigate(['/customer', id]);
  }
}
```

## 5. Passing Route Parameters

Define routes with parameters using the colon (`:`) syntax.

```typescript
{ path: 'customer/:id', component: CustomerDetailComponent }
```

## 6. Extracting Parameters Using ActivatedRoute

Use the `ActivatedRoute` service to retrieve parameters from the current route.

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({ ... })
export class CustomerDetailComponent implements OnInit {
  customerId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Snapshot (for one-time initialization)
    this.customerId = this.route.snapshot.paramMap.get('id');

    // Observable (if the component stays initialized but the ID changes)
    this.route.paramMap.subscribe(params => {
      this.customerId = params.get('id');
    });
  }
}
```

## 7. Optional Route Parameters (Query Parameters)

Query parameters are not part of the route definition and are added after the `?` in the URL.

### Navigating with Query Params
```typescript
this.router.navigate(['/customers'], { queryParams: { sort: 'name', page: 1 } });
```

### Extracting Query Params
```typescript
this.route.queryParamMap.subscribe(params => {
  const sort = params.get('sort');
});
```

## 8. Child Routes

Child routes allow you to nest views within a parent component.

```typescript
export const routes: Routes = [
  {
    path: 'customers',
    component: CustomerComponent,
    children: [
      { path: 'list', component: CustomerListComponent },
      { path: 'add', component: AddCustomerComponent }
    ]
  }
];
```

The parent `CustomerComponent` must also have its own `<router-outlet>`.

## 9. Route Guards

Route guards control access to routes based on logic (e.g., authentication).

### Example: Auth Guard
```typescript
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

// Applying the guard
{ path: 'admin', component: AdminComponent, canActivate: [authGuard] }
```
