import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service'; // Servicio para manejar autenticación
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated$.pipe(
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(['/login'], { replaceUrl: true });
        }
      })
    );
  }
}
