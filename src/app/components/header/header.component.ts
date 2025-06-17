import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  showLogoutPopup = false;

  constructor(public authService: AuthService, private router: Router) {}

  toggleLogoutPopup(): void {
    this.showLogoutPopup = !this.showLogoutPopup;
  }

  logout(): void {
    this.authService.logout();
    this.showLogoutPopup = false;
    this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (
      !target.closest('.logout-popup-trigger') &&
      !target.closest('.logout-popup')
    ) {
      this.showLogoutPopup = false;
    }
  }
}
