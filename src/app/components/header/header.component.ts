import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { CurrentUser } from '@app/models/current-user';
import { CarritoService } from '@app/public/carrito-compras/carrito.service';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly message = '';
  navPosition = this.message ? 'top-6' : 'top-0';
  menuPosition = this.message ? 'top-[6.5rem]' : 'top-20';
  menuVisible = false;
  cantidadCarrito = 0;

  eRef = inject(ElementRef);
  private authService = inject(AuthService);

  // Señal reactiva para saber si el usuario está logueado
  isLogged = signal(false);
  currentUser = signal<CurrentUser | null>(null);

  constructor(private carritoService: CarritoService) {
    // Escuchar el estado de autenticación
    effect(() => {
      this.authService.isAuthenticated$.subscribe((auth) => {
        this.isLogged.set(auth);
      });
    });
    // Escuchar los datos del usuario actual
    effect(() => {
      this.authService.currentUser$.subscribe((user) => {
        this.currentUser.set(user);
      });
    });

    this.carritoService.cantidadTotal$.subscribe(cantidad => {
      this.cantidadCarrito = cantidad;
    });
  }

  showUserMenu = false;

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.menuVisible = !this.menuVisible;
  }

  logout() {
    this.authService.logout();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const menuElement = this.eRef.nativeElement.querySelector('#menu');
    if (
      menuElement &&
      !menuElement.contains(event.target) &&
      this.menuVisible
    ) {
      this.menuVisible = false;
    }
  }
}
