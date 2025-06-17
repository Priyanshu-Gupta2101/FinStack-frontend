# FinStack Task Management - Frontend

Angular-based frontend for the FinStack Task Management System

## Project Structure
src/
├── app/
│ ├── components/
│ │ ├── task-list/ # Task listing with filtering/sorting
│ │ ├── task-form/ # Task creation/edit form
│ │ ├── status-toggle/ # Status change component
│ │ └── ... # Other presentational components
│ ├── services/
│ │ ├── task.service.ts # Task API service
│ │ ├── auth.service.ts # Authentication service
│ │ └── ... # Other services
│ ├── models/ # Type interfaces
│ ├── guards/ # Route guards
│ ├── interceptors/ # HTTP interceptors
│ └── app.config.ts # Application configuration
├── assets/ # Static assets
├── environments/ # Environment configurations
└── styles/ # Global styles

text

## Technical Stack

- **Angular**: 17.0.0 (Standalone Components)
- **State Management**: Service-based (No NgRx)
- **Styling**: Tailwind CSS 3.0.0
- **Icons**: Lucide Angular 0.515.0
- **Build System**: Angular CLI 17.0.0

## Key Features

- Standalone components architecture
- Reactive forms for task management
- JWT authentication flow
- Responsive design with Tailwind
- Client-side filtering/sorting

## Development Setup

1. Install dependencies:
   ```bash
   npm install
Configure environment:

bash
cp .env.example .env
Run development server:

bash
npm start
Build for production:

bash
npm run build
Environment Variables
ini
API_URL=http://localhost:5000/api  # Your backend API URL
Deployment
Hosted on Netlify with SPA redirects:

text
/_redirects
/* /index.html 20
