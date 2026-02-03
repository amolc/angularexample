import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CustomerComponent],
  template: `
    <div style="text-align:center">
      <h1>Admin Dashboard</h1>
    </div>
    <app-customer></app-customer>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
}
