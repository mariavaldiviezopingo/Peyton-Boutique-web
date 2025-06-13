import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-suscripcion',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './suscripcion.component.html',
  styleUrl: './suscripcion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuscripcionComponent {
  subscriptionForm: FormGroup;
  isSubmitting = signal(false);
  isSubmitted = signal(false);
  submitMessage = signal('');

  constructor(private fb: FormBuilder) {
    this.subscriptionForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.subscriptionForm.valid) {
      this.isSubmitting.set(true);

      // Simular envío (aquí iría la llamada al servicio)
      setTimeout(() => {
        this.isSubmitting.set(false);
        this.isSubmitted.set(true);
        this.submitMessage.set(
          '¡Gracias! Te has suscrito exitosamente a nuestro newsletter.'
        );
        this.subscriptionForm.reset();

        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
          this.isSubmitted.set(false);
        }, 5000);
      }, 1500);
    } else {
      this.subscriptionForm.markAllAsTouched();
    }
  }

  get email() {
    return this.subscriptionForm.get('email');
  }

  get emailError() {
    if (this.email?.errors && this.email?.touched) {
      if (this.email.errors['required']) {
        return 'El email es requerido';
      }
      if (this.email.errors['email']) {
        return 'Ingresa un email válido';
      }
    }
    return null;
  }
}
