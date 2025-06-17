import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-header *ngIf="authService.isAuthenticated()"></app-header>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  constructor(public authService: AuthService) {}
}
