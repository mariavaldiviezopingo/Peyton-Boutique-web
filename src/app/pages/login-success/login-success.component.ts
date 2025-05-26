import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-login-success',
  template: '<p>Redirigiendo...</p>',
})
export class LoginSuccessComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];

      if (token) {
        localStorage.setItem('jwt', token);

        this.authService.getCurrentUser().subscribe({
          next: (user) => {
            if (user) {
              localStorage.setItem('user', JSON.stringify(user));
              this.authService.setCurrentUser(user); // <-- Método que debes crear
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
