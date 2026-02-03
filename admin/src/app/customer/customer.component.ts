import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  customers: any[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.apiService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load customers.';
        console.error(err);
      }
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.errorMessage = '';
      this.successMessage = '';
      
      this.apiService.addCustomer(form.value).subscribe({
        next: (data) => {
          this.successMessage = 'Customer added successfully!';
          this.loadCustomers(); // Refresh list
          form.resetForm();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => {
          if (err.status === 400 && err.error) {
            // DRF returns error details in err.error
            const errors = err.error;
            this.errorMessage = Object.keys(errors)
              .map(key => `${key}: ${errors[key]}`)
              .join(', ');
          } else {
            this.errorMessage = 'Failed to add customer. Please check if the email or username already exists.';
          }
          console.error('Error adding customer:', err);
        }
      });
    }
  }
}



