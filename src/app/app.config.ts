import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  LucideAngularModule,
  Search,
  Plus,
  ChevronDown,
  Phone,
  MapPin,
  MessageCircle,
  Bell,
  FileText,
  User,
  X,
  Funnel,
} from 'lucide-angular';

import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      LucideAngularModule.pick({
        Search,
        Plus,
        ChevronDown,
        Phone,
        MapPin,
        MessageCircle,
        Funnel,
        Bell,
        FileText,
        User,
        X,
      })
    ),
  ],
};
