# 🅰️ Angular Fundamentals & Web Architecture

This guide covers the core concepts of modern web development using Angular, from high-level architecture to the specific building blocks of the framework.

---

## 🏗️ 1. Web Application Architecture
Modern web applications typically follow a **Client-Server Architecture**:
- **Client (Front-end):** The user interface (HTML/CSS/JS) running in the browser.
- **Server (Back-end):** Handles business logic, database interactions, and authentication.
- **API (REST/GraphQL):** The bridge that allows the client and server to communicate.

---

## 🚀 2. Introduction to Angular
Angular is a **platform and framework** for building single-page client applications (SPAs) using HTML and TypeScript. It is maintained by Google and provides a robust ecosystem for enterprise-level development.

### **Front-end Tool Comparison**
| Feature | Angular | React | Vue |
| :--- | :--- | :--- | :--- |
| **Type** | Full Framework | Library | Progressive Framework |
| **Language** | TypeScript | JavaScript/JSX | JavaScript |
| **Learning Curve** | Steep | Moderate | Easy |
| **Data Binding** | Two-way | One-way | Two-way |

---

## 📐 3. Angular Architecture
Angular follows a **Component-Based Architecture**. An application is a tree of components that communicate with each other.

### **Core Building Blocks**
1. **Modules (`@NgModule`):** Containers for a cohesive block of code (components, services, directives).
2. **Components:** The basic UI building block. Consists of an HTML template, CSS, and a TypeScript class.
3. **Templates:** The HTML that defines the view.
4. **Metadata:** Instructions to Angular on how to process a class (e.g., `@Component`, `@Injectable`).
5. **Data Binding:** Synchronizing data between the component and the template.
6. **Directives:** Instructions to transform the DOM (e.g., `*ngIf`, `*ngFor`).
7. **Services & Dependency Injection:** Reusable logic shared across components.

---

## 🛠️ 4. Installation & Angular CLI
The **Angular CLI** (Command Line Interface) is the essential tool for initializing, developing, scaffolding, and maintaining Angular applications.

### **Installation**
1. Install Node.js (which includes npm).
2. Install the CLI globally:
   ```bash
   npm install -g @angular/cli
   ```

### **Common CLI Commands**
| Command | Purpose |
| :--- | :--- |
| `ng new <app-name>` | Creates a new Angular project. |
| `ng serve` | Launches the server and watches for changes. |
| `ng generate component <name>` | Creates a new component (`ng g c <name>`). |
| `ng generate service <name>` | Creates a new service (`ng g s <name>`). |
| `ng build` | Compiles the app into an output directory. |
| `ng test` | Runs unit tests via Karma. |

---

## 📦 5. Angular Modules (`AppModule`)
Every Angular app has at least one module, the **Root Module** (usually named `AppModule`).

**Example `app.module.ts`:**
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [ AppComponent ], // Components, Directives, Pipes
  imports: [ BrowserModule ],      // Other modules needed
  providers: [],                   // Services
  bootstrap: [ AppComponent ]      // The main component to launch
})
export class AppModule { }
```

---

## 📂 6. Understanding the File Structure
When you create a new project, Angular generates several key files:
- **`src/app/`**: Contains the main application logic and components.
- **`src/index.html`**: The main HTML file served to the user.
- **`src/main.ts`**: The entry point that bootstraps the Root Module.
- **`angular.json`**: CLI configuration for build and test tools.
- **`package.json`**: Project dependencies and scripts.
- **`tsconfig.json`**: TypeScript compiler configuration.

---

Happy Coding with Angular! 🅰️🚀
