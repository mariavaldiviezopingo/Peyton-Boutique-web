import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '@app/components';
import { AuthService } from '@app/services/auth.service';

interface SignupForm {
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-signup',
  imports: [NgOptimizedImage, InputComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  signupForm: Signal<FormGroup> = computed(
    () =>
      new FormGroup<SignupForm>({
        name: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        email: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required, Validators.email],
        }),
        password: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      })
  );

  onSubmit(): void {
    const form = this.signupForm();

    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    const { name, email, password } = form.value;

    this.authService.register({ name, email, password }).subscribe({
      next: (response) => {
        console.log('Usuario registrado con éxito:', response);
        this.router.navigate(['/login']); // o redirige a donde quieras
      },
      error: (error) => {
        console.error('Error al registrar:', error);
        alert('❌ Ingrese un usuario y una contraseña valida.');
      },
    });
  }
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}
}
