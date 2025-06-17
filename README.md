Here is the **fully updated `README.md`** with the addition of `app.routes.ts` and `app.component.ts` in the project structure under the `app/` folder.

---

# FinStack Task Management - Frontend

Angular-based frontend for the FinStack Task Management System.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── task-list/         # Task listing with filtering/sorting
│   │   ├── task-form/         # Task creation/edit form
│   │   ├── filters-modal/     # Filter modal
│   │   └── ...                # Other presentational components
│   ├── services/
│   │   ├── task.service.ts    # Task API service
│   │   ├── auth.service.ts    # Authentication service
│   │   └── ...                # Other services
│   ├── models/                # Type interfaces
│   ├── guards/                # Route guards
│   ├── interceptors/          # HTTP interceptors
│   ├── app.routes.ts          # Application routes using Angular standalone routing
│   ├── app.component.ts       # Root application component
│   └── app.config.ts          # Application-wide configuration
├── assets/                    # Static assets
├── environments/              # Environment configurations
└── styles/                    # Global styles
```

---

## 🛠️ Technical Stack

* **Framework**: Angular 17.0.0 (Standalone Components)
* **Routing**: Standalone Angular Routing with `app.routes.ts`
* **State Management**: Service-based (No NgRx)
* **Styling**: Tailwind CSS 3.0.0
* **Icons**: Lucide Angular 0.515.0
* **Build Tool**: Angular CLI 17.0.0
* **Hosting**: Netlify (SPA redirect support)

---

## ✨ Key Features

* Standalone component architecture
* Reactive forms for task creation and editing
* JWT-based authentication flow
* Responsive design using **Tailwind CSS**
* Client-side filtering and sorting of tasks
* Clean, modular routing with `app.routes.ts`
* Deployed on **Netlify** with SPA support

---

## 🤖 Use of AI in Development

This project leveraged AI assistance in the following areas:

### **Angular-Specific Assistance**
- Resolving version conflicts between Angular 17 and Tailwind CSS
- Debugging module import errors in standalone components
- Optimizing `app.routes.ts` configuration for lazy loading
- Implementing proper TypeScript interfaces for API responses

### **Hosting & Deployment**
- Troubleshooting Render.com deployment issues
- Configuring Netlify's `_redirects` for SPA routing
- Fixing CORS configuration between frontend/backend
- Optimizing build commands for production

### **Learning & Implementation**
- Understanding Angular's standalone component architecture
- Implementing JWT authentication flow
- Creating reusable service patterns
- Debugging Tailwind CSS purge configuration

### **Independent Work**
- All Flask backend development
- Database schema design
- Core business logic implementation
- Basic component templates
- Final architectural decisions

**AI Tools Used**:  
Primarily Claude and Deepseek for specific technical queries and debugging assistance.

---

## 🚀 Development Setup

1. **Install dependencies** (use `--force` or `--legacy-peer-deps` if needed)

   ```bash
   npm install --force
   # or
   npm install --legacy-peer-deps
   ```

2. **Configure environment variables**

   Update the environment file at `src/environments/environment.ts`:

   ```ts
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:5000/api', // Your backend API base URL
   };
   ```

3. **Run the development server**

   ```bash
   ng serve
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

---

## 🎨 Tailwind CSS

This project uses **Tailwind CSS 4.0.0** for styling. It enables:

* Mobile-first, responsive layouts
* Utility-first development

Global styles and resets can be found in the `styles/` directory.

---

## 🌍 Deployment - Netlify

The app is deployed on **Netlify** with Single Page Application (SPA) support.

To ensure routing works correctly, create a `_redirects` file inside the `public/` directory with the following content:

```
/* /index.html 200
```

> Make sure to point Netlify’s deploy settings to your Angular `dist/app-name/browser` folder.

---

