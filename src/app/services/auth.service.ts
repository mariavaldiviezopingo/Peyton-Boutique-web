import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router para redirigir
import { CurrentUser } from '@app/models/current-user';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
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
  private platformId = inject(PLATFORM_ID);

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.hasValidToken()
  );
  private currentUserSubject = new BehaviorSubject<CurrentUser | null>(
    this.loadCurrentUserFromStorage()
  );

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  get currentUser$(): Observable<CurrentUser | null> {
    return this.currentUserSubject.asObservable();
  }

  fetchCurrentUser(): Observable<CurrentUser | null> {
    return this.http.get<CurrentUser>(`${this.authUrl}/auth/currentUser`).pipe(
      tap((response) => {
        this.isAuthenticatedSubject.next(true);
        this.currentUserSubject.next(response);
      }),
      catchError(() => {
        this.currentUserSubject.next(null);
        this.isAuthenticatedSubject.next(false);
        this.clearCurrentUserFromStorage();
        return of(null);
      })
    );
  }

  login(request: LoginRequest): Observable<TokenResponse> {
    localStorage.removeItem('jwt');

    return this.http
      .post<TokenResponse>(`${this.authUrl}/auth/login`, request)
      .pipe(
        tap((response) => {
          if (this.isBrowser()) {
            localStorage.setItem('jwt', response.jwt);
          }
          this.isAuthenticatedSubject.next(true);

          // Aquí pedimos los datos del usuario y actualizamos el observable
          this.getCurrentUser().subscribe((user) => {
            if (this.isBrowser()) {
              localStorage.setItem('currentUser', JSON.stringify(user));
            }
            this.currentUserSubject.next(user);
            if (user.role === 'ADMIN') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/']); // Página de inicio para user normal
            }
          });
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

  getCurrentUser(): Observable<CurrentUser> {
    return this.http.get<CurrentUser>(`${this.authUrl}/auth/currentUser`);
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
    } catch (error) {
      // Por si el JSON está malformado
      this.logout();
      return of(false);
    }
  }
  setCurrentUser(user: CurrentUser): void {
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  register(data: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.authUrl}/auth/signup`, data);
  }

  // private loginForm(): {
  //   invalid: boolean;
  //   markAllAsTouched: () => void;
  //   value: { email: string; password: string };
  // } {
  //   return {
  //     invalid: false, // Replace with actual validation logic
  //     markAllAsTouched: () => {
  //       console.log('Marking all fields as touched');
  //     },
  //     value: {
  //       email: '', // Replace with actual email value
  //       password: '', // Replace with actual password value
  //     },
  //   };
  // }

  // onSubmit(): void {
  //   if (this.loginForm().invalid) {
  //     this.loginForm().markAllAsTouched();
  //     return;
  //   }

  //   const { email, password } = this.loginForm().value;
  //   this.login({ username: email, password }).subscribe({
  //     next: () => {
  //       this.router.navigate(['/dashboard']); // ✅ Redirige tras login exitoso
  //     },
  //     error: (err) => {
  //       console.error('Error en login', err);
  //       // Mostrar mensaje de error al usuario si deseas
  //     },
  //   });
  // }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private saveCurrentUserToStorage(user: CurrentUser): void {
    if (this.isBrowser()) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  private loadCurrentUserFromStorage(): CurrentUser | null {
    if (this.isBrowser()) {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  private clearCurrentUserFromStorage(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('currentUser');
    }
  }
}
