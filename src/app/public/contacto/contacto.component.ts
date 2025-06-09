import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { WhatsappButtonComponent } from '../components';

@Component({
  selector: 'app-contacto',
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    WhatsappButtonComponent,
  ],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactoComponent {
  private fb = inject(FormBuilder);

  contactForm: FormGroup = this.fb.group({
    nombre: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/),
      ],
    ],
    correo: ['', [Validators.required, Validators.email]],
    asunto: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    mensaje: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000),
      ],
    ],
  });

  isSubmitting = signal(false);
  formSubmitted = signal(false);
  showSuccessMessage = signal(false);
  isAnimatingOut = signal(false);

  onSubmit() {
    this.formSubmitted.set(true);

    if (this.contactForm.valid) {
      this.isSubmitting.set(true);

      // Simulamos el envío del formulario - conectar a backend o servicio
      setTimeout(() => {
        console.log('Formulario enviado:', this.contactForm.value);
        this.isSubmitting.set(false);
        this.showSuccessMessage.set(true);
        this.contactForm.reset();
        this.formSubmitted.set(false);

        setTimeout(() => {
          this.isAnimatingOut.set(true);
          setTimeout(() => {
            this.showSuccessMessage.set(false);
            this.isAnimatingOut.set(false);
          }, 300);
        }, 4000);
      }, 2000);
    } else {
      Object.keys(this.contactForm.controls).forEach((key) => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);

    if (
      field?.errors &&
      (field.dirty || field.touched || this.formSubmitted())
    ) {
      if (field.errors['required']) {
        return `Este campo es requerido`;
      }
      if (field.errors['email']) {
        return 'Ingresa un email válido';
      }
      if (field.errors['minlength']) {
        const minLength = field.errors['minlength'].requiredLength;
        return `Debe tener al menos ${minLength} caracteres`;
      }
      if (field.errors['maxlength']) {
        const maxLength = field.errors['maxlength'].requiredLength;
        return `No debe exceder ${maxLength} caracteres`;
      }
      if (field.errors['pattern']) {
        if (fieldName === 'nombre') {
          return 'El nombre solo puede contener letras y espacios';
        }
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(
      field?.errors &&
      (field.dirty || field.touched || this.formSubmitted())
    );
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field?.valid && (field.dirty || field.touched));
  }
}
