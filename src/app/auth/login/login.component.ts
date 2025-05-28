import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '@app/components';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    NgOptimizedImage,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  private readonly _form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  loginForm = signal(this._form);
  loginSuccessMessage = signal<string | null>(null);

  onSubmit(): void {
    const form = this.loginForm();

    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    const { email, password } = form.getRawValue();

    this.authService.login({ email, password }).subscribe({
      next: () => {
        this.authService.currentUser$.subscribe((user) => {
          if (user) {
            alert('✅ Login exitoso');
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 1500);
          }
        });
      },
      error: (error) => {
        console.error('Login error:', error);
        alert('❌ Ingrese un usuario y una contraseña valida.');
      },
    });
  }
}
