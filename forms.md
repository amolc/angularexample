# Angular Forms

Angular provides two different approaches to handling user input through forms: **Template-driven** and **Reactive** forms. Both capture user input events from the view, validate the user input, create a form model and data model to update, and provide a way to track changes.

---

## **1. Underlying Building Blocks**

Both types of forms are built on the same low-level building blocks:

- **FormControl**: Tracks the value and validation status of an individual form control.
- **FormGroup**: Tracks the same values and status for a group of form controls (e.g., a nested object).
- **FormArray**: Tracks the same values and status for an array of form controls (useful for dynamic lists).
- **ControlValueAccessor**: An interface that creates a bridge between the Angular forms API and a native element in the DOM.

---

## **2. Template-driven vs Reactive Forms**

| Feature | Template-Driven | Reactive |
|---------|-----------------|----------|
| **Setup** | Declarative (in HTML) | Programmatic (in TS) |
| **Data Model** | Implicit (created by Angular) | Explicit (created by developer) |
| **Predictability** | Asynchronous | Synchronous |
| **Form Validation** | Directives | Functions |
| **Scalability** | Good for simple forms | Excellent for complex forms |
| **Testing** | Difficult (requires DOM) | Easy (logic is in TS) |

---

## **3. Template-driven Forms**

Template-driven forms rely on directives in the template to create and manipulate the underlying object model. They are easy to use but less scalable than Reactive forms.

### **Implementation**
1. Import `FormsModule` in your `AppModule`.
2. Use `ngModel` for two-way data binding.

#### **Example: user-form.component.html**
```html
<form #userForm="ngForm" (ngSubmit)="onSubmit(userForm)">
  <div>
    <label>Username:</label>
    <input type="text" name="username" ngModel required #name="ngModel">
    <div *ngIf="name.invalid && name.touched">Username is required</div>
  </div>

  <div>
    <label>Email:</label>
    <input type="email" name="email" ngModel required email #email="ngModel">
  </div>

  <button type="submit" [disabled]="userForm.invalid">Submit</button>
</form>
```

#### **Example: user-form.component.ts**
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {
  onSubmit(form: any) {
    console.log('Form Data:', form.value);
  }
}
```

---

## **4. Reactive Forms**

Reactive forms provide a model-driven approach to handling form inputs whose values change over time. They are more robust, scalable, and easier to test.

### **Implementation**
1. Import `ReactiveFormsModule` in your `AppModule`.
2. Define the form structure in the component class.

#### **Example: profile-form.component.ts**
```typescript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html'
})
export class ProfileFormComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: [''],
      address: this.fb.group({
        street: [''],
        city: ['']
      })
    });
  }

  onSubmit() {
    console.warn(this.profileForm.value);
  }
}
```

#### **Example: profile-form.component.html**
```html
<form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
  <label for="first-name">First Name: </label>
  <input id="first-name" type="text" formControlName="firstName">
  
  <div formGroupName="address">
    <h3>Address</h3>
    <label for="street">Street: </label>
    <input id="street" type="text" formControlName="street">
  </div>

  <button type="submit" [disabled]="!profileForm.valid">Submit</button>
</form>
```

---

## **5. Dynamically Adding Data (FormArray)**

`FormArray` is used when you don't know the number of controls in advance (e.g., adding multiple phone numbers).

### **Example: Dynamic Controls**
```typescript
get aliases() {
  return this.profileForm.get('aliases') as FormArray;
}

addAlias() {
  this.aliases.push(this.fb.control(''));
}
```

---

## **6. Form Validation**

- **Built-in Validators**: `Validators.required`, `Validators.minLength()`, `Validators.email`, etc.
- **Custom Validators**: Functions that return an error object if the control is invalid.

```typescript
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function forbiddenNameValidator(control: AbstractControl): ValidationErrors | null {
  const forbidden = /admin/.test(control.value);
  return forbidden ? { forbiddenName: { value: control.value } } : null;
}
```
