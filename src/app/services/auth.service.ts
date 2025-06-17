import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUser } from '@app/models/current-user';
import { CarritoService } from '@app/public/carrito-compras/carrito.service';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environment/environment';

interface LoginRequest {
  email: string;
  password: string;
}

interface TokenResponse {
  jwt: string;
  message: string;
  status: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authUrl = environment.authUrl;
  private readonly apiUrl = environment.apiUrl;
  private platformId = inject(PLATFORM_ID);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly carritoService = inject(CarritoService);

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<CurrentUser | null>(null);

  constructor() {
    if (this.isBrowser()) {
      const user = this.loadCurrentUserFromStorage();
      const valid = this.hasValidToken();
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(valid);
    }
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  get currentUser$(): Observable<CurrentUser | null> {
    return this.currentUserSubject.asObservable();
  }

  login(request: LoginRequest): Observable<CurrentUser> {
    if (this.isBrowser()) {
      localStorage.removeItem('jwt');
    }

    return this.http
      .post<TokenResponse>(`${this.authUrl}/auth/login`, request)
      .pipe(
        tap((response) => {
          if (this.isBrowser()) {
            localStorage.setItem('jwt', response.jwt);
          }
          this.isAuthenticatedSubject.next(true);
        }),
        switchMap(() => this.getCurrentUser()),
        tap((user) => {
          if (this.isBrowser()) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          this.currentUserSubject.next(user);
          this.carritoService.sincronizarCarritoAlIniciarSesion(); // <-- llamada al servicio limpio
          this.router.navigate([user.role === 'ADMIN' ? '/admin' : '/']);
        }),
        catchError((error) => throwError(() => error))
      );
  }

  register(data: {
    name: string;
    email: string;
    password: string;
  }): Observable<CurrentUser> {
    return this.http
      .post<TokenResponse>(`${this.authUrl}/auth/signup`, data)
      .pipe(
        tap((response) => {
          if (this.isBrowser()) {
            localStorage.setItem('jwt', response.jwt);
          }
          this.isAuthenticatedSubject.next(true);
        }),
        switchMap(() => this.getCurrentUser()),
        tap((user) => {
          if (this.isBrowser()) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          this.currentUserSubject.next(user);
          this.router.navigate([user.role === 'ADMIN' ? '/admin' : '/']);
        }),
        catchError((error) => throwError(() => error))
      );
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.clear();
    }
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  // logout(): void {
  //   if (this.isBrowser()) {
  //     // localStorage.clear(); // <-- Esto borra TODO, incluido el carrito
  //     localStorage.removeItem('jwt');
  //     localStorage.removeItem('currentUser');
  //     // NO borres 'carrito'
  //   }
  //   this.isAuthenticatedSubject.next(false);
  //   this.currentUserSubject.next(null);
  //   this.router.navigate(['/login']);
  // }

  fetchCurrentUser(): Observable<CurrentUser | null> {
    return this.http.get<CurrentUser>(`${this.authUrl}/auth/currentUser`).pipe(
      tap((response) => {
        this.isAuthenticatedSubject.next(true);
        this.currentUserSubject.next(response);
      }),
      catchError(() => {
        this.clearCurrentUserFromStorage();
        this.currentUserSubject.next(null);
        this.isAuthenticatedSubject.next(false);
        return of(null);
      })
    );
  }

  getCurrentUser(): Observable<CurrentUser> {
    return this.http.get<CurrentUser>(`${this.authUrl}/auth/currentUser`);
  }

  validateCurrentToken(): Observable<boolean> {
    if (!this.isBrowser()) return of(false);

    const token = localStorage.getItem('jwt');
    const userJson = localStorage.getItem('currentUser');

    if (!token || !userJson) return of(false);

    try {
      const user = JSON.parse(userJson);
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
      return of(true);
    } catch {
      this.logout();
      return of(false);
    }
  }

  setCurrentUser(user: CurrentUser): void {
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private loadCurrentUserFromStorage(): CurrentUser | null {
    if (!this.isBrowser()) return null;
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  private clearCurrentUserFromStorage(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('currentUser');
    }
  }

  private hasValidToken(): boolean {
    if (!this.isBrowser()) return false;
    const token = localStorage.getItem('jwt');
    if (!token) return false;

    try {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      return tokenData.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  private mergeAnonymousCart(): void {
    if (!this.isBrowser()) return;

    const cartJson = localStorage.getItem('carrito');
    if (!cartJson) return;

    try {
      const anonymousCart = JSON.parse(cartJson);
      if (!Array.isArray(anonymousCart) || anonymousCart.length === 0) return;

      const payload = anonymousCart.map((item) => ({
        productoId: item.productoId,
        varianteId: item.varianteId,
        cantidad: item.cantidad,
      }));

      this.http.post(`${this.apiUrl}/carrito/merge`, payload).subscribe({
        next: () => {
          localStorage.removeItem('carrito');
          this.carritoService.obtenerCarritoServidor();
        },
        error: (err) => {
          console.error('Error al fusionar el carrito anónimo:', err);
        },
      });
    } catch (e) {
      console.error('Error al parsear carrito anónimo:', e);
    }
  }
}
