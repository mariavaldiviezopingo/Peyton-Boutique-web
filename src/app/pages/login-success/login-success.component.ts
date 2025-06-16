import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from '@app/public/carrito-compras/carrito.service';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-login-success',
  template: '<p>Redirigiendo...</p>',
})
export class LoginSuccessComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private carritoService: CarritoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (!isPlatformBrowser(this.platformId)) return;

      const token = params['token'];

      if (token) {
        localStorage.setItem('jwt', token);

        this.authService.getCurrentUser().subscribe({
          next: (user) => {
            if (user) {
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.authService.setCurrentUser(user);

              // this.carritoService.sincronizarCarritoAlIniciarSesion();

              this.router.navigate(['/']);
            } else {
              this.router.navigate(['/login']);
            }
          },
          error: () => {
            this.router.navigate(['/login']);
          },
        });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
