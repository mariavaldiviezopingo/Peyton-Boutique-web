import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem('jwt');

  if (token) {
    const cloneRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next(cloneRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        // URLs que no deben forzar logout en caso de error 403/401
        const IGNORE_URLS = ['/reporte-laboratorio']; // puedes agregar más

        const shouldIgnore = IGNORE_URLS.some((url) => req.url.includes(url));

        if ((error.status === 401 || error.status === 403) && !shouldIgnore) {
          authService.logout();
          router.navigate(['/login']);
          return throwError(
            () => new Error('Sesión expirada. Redirigiendo...')
          );
        }

        // En caso de que se ignore, solo lanza el error para que el servicio lo maneje localmente
        return throwError(() => error);
      })
    );
  } else {
    return next(req);
  }
};
