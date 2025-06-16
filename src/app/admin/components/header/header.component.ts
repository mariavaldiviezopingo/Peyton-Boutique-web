import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class AdminHeaderComponent {
  userName: string = 'Sheyla Cátedra';
  userRole: string = 'Administrador';
  notificationCount: number = 3;
  messageCount: number = 2;
  isUserMenuOpen: boolean = false;

  constructor(private router: Router) {}

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  closeUserMenu(): void {
    this.isUserMenuOpen = false;
  }

  goToEcommerce(): void {
    this.router.navigate(['/']);
  }

  logout(): void {
    // TODO: Aquí agregar la lógica de logout

    // Confirmar antes de cerrar sesión
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      // Limpiar datos de sesión (ajusta según tu implementación)
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      sessionStorage.clear();

      this.router.navigate(['/login']);
    }
  }
}
