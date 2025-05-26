import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map((user) => user?.role === 'ADMIN'),
      tap((isAdmin) => {
        if (!isAdmin) {
          this.router.navigate(['/login']); // redirige a una página de acceso denegado
        }
      })
    );
  }
}
