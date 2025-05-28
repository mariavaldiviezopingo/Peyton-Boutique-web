import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  const token = isPlatformBrowser(platformId)
    ? localStorage.getItem('jwt')
    : null;

  if (token) {
    const cloneRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next(cloneRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        const IGNORE_URLS = ['/reporte-laboratorio'];
        const shouldIgnore = IGNORE_URLS.some((url) => req.url.includes(url));

        if ((error.status === 401 || error.status === 403) && !shouldIgnore) {
          authService.logout();
          router.navigate(['/login']);
          return throwError(
            () => new Error('Sesión expirada. Redirigiendo...')
          );
        }

        return throwError(() => error);
      })
    );
  } else {
    return next(req);
  }
};
