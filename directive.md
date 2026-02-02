# 🛠️ Angular Directives & Pipes

Directives and Pipes are fundamental concepts in Angular that allow you to transform the DOM and format data in your templates.

---

## 🏗️ 1. Angular Directives
Directives are classes that add new behavior to elements in the HTML. There are three main types of directives in Angular:

### **A. @Component Directive**
A component is actually a directive with a template. It is the most common directive used in Angular.
- **Purpose:** Defines a reusable UI building block.
- **Example:**
```typescript
@Component({
  selector: 'app-root',
  template: '<h1>Hello Angular!</h1>'
})
export class AppComponent {}
```

### **B. Structural Directives**
These directives change the DOM layout by adding or removing elements. They are marked with an asterisk (`*`).
- **`*ngIf`:** Conditionally includes a template based on an expression.
- **`*ngFor`:** Iterates over a list and renders a template for each item.
- **`*ngSwitch`:** Selects one of several elements based on a condition.

**Example:**
```html
<div *ngIf="isLoggedIn">Welcome Back!</div>
<ul>
  <li *ngFor="let user of users">{{ user.name }}</li>
</ul>
```

### **C. Attribute Directives**
These directives change the appearance or behavior of an existing element, component, or another directive.
- **`ngClass`:** Adds or removes a set of CSS classes.
- **`ngStyle`:** Adds or removes a set of HTML styles.
- **`ngModel`:** Adds two-way data binding to an HTML form element.

---

## 🎨 2. Custom Directives
You can create your own directives to implement custom behavior.
- **Command:** `ng generate directive <name>`
- **Example:** A directive that changes background color on hover.

```typescript
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }
}
```

---

## 🧪 3. Angular Pipes
Pipes are simple functions used in template expressions to accept an input value and return a transformed value.

### **A. Built-in Pipes**
- **`uppercase` / `lowercase`**: Changes text case.
- **`date`**: Formats dates.
- **`currency`**: Formats numbers as currency.
- **`json`**: Useful for debugging, converts objects to JSON strings.

**Example:**
```html
<p>{{ birthday | date:'fullDate' | uppercase }}</p>
```

### **B. Chaining Pipes**
You can apply multiple pipes to a single value by chaining them with the pipe operator (`|`).

---

## 🛠️ 4. Custom Pipes
Custom pipes allow you to create specific data transformations.
- **Command:** `ng generate pipe <name>`
- **Interface:** Must implement the `PipeTransform` interface and the `transform` function.

**Example:**
```typescript
@Pipe({ name: 'square' })
export class SquarePipe implements PipeTransform {
  transform(value: number): number {
    return value * value;
  }
}
```

---

## ⚡ 5. Pure vs Impure Pipes
- **Pure Pipes:** Only executed when Angular detects a "pure change" to the input value (e.g., change to a primitive input or a new object reference). They are highly performant.
- **Impure Pipes:** Executed during every change detection cycle, regardless of whether the input changed. Use these sparingly as they can impact performance.

---

Happy Transforming! 🚀
