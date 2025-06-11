import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  AfterViewInit,
  ElementRef,
  ViewChild,
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
import {
  ContactService,
  ContactFormData,
  RecaptchaService,
} from '../../services';

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
export class ContactoComponent implements AfterViewInit {
  @ViewChild('recaptchaElement', { static: false })
  recaptchaElement!: ElementRef;

  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private recaptchaService = inject(RecaptchaService);

  private recaptchaWidgetId: number | null = null;
  private recaptchaToken: string = '';

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
  showErrorMessage = signal(false);
  errorMessage = signal('');
  isAnimatingOut = signal(false);
  recaptchaError = signal(false);

  ngAfterViewInit(): void {
    this.initRecaptcha();
  }

  private async initRecaptcha(): Promise<void> {
    if (!this.recaptchaElement) {
      console.error('Elemento reCAPTCHA no encontrado');
      return;
    }

    try {
      this.recaptchaWidgetId = await this.recaptchaService.renderRecaptcha(
        this.recaptchaElement.nativeElement,
        (token: string) => {
          this.recaptchaToken = token;
          this.recaptchaError.set(false);
        }
      );
    } catch (error) {
      console.error('Error al inicializar reCAPTCHA:', error);
    }
  }

  private resetRecaptcha(): void {
    if (this.recaptchaWidgetId !== null) {
      this.recaptchaService.resetRecaptcha(this.recaptchaWidgetId);
      this.recaptchaToken = '';
    }
  }

  onSubmit() {
    this.formSubmitted.set(true);

    // Validar reCAPTCHA
    if (!this.recaptchaToken) {
      this.recaptchaError.set(true);
      return;
    }

    if (this.contactForm.valid) {
      this.isSubmitting.set(true);

      const formData: ContactFormData = {
        nombreCompleto: this.contactForm.get('nombre')?.value,
        correoElectronico: this.contactForm.get('correo')?.value,
        asunto: this.contactForm.get('asunto')?.value,
        mensaje: this.contactForm.get('mensaje')?.value,
        recaptchaToken: this.recaptchaToken,
      };

      this.contactService.sendContactForm(formData).subscribe({
        next: (response) => {
          console.log('Formulario enviado exitosamente:', response);
          this.isSubmitting.set(false);
          this.showSuccessMessage.set(true);
          this.contactForm.reset();
          this.formSubmitted.set(false);
          this.resetRecaptcha();

          setTimeout(() => {
            this.isAnimatingOut.set(true);
            setTimeout(() => {
              this.showSuccessMessage.set(false);
              this.isAnimatingOut.set(false);
            }, 300);
          }, 4000);
        },
        error: (error) => {
          console.error('Error al enviar el formulario:', error);
          this.isSubmitting.set(false);
          this.resetRecaptcha();

          let errorMsg =
            'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.';

          if (error.error?.error === 'RECAPTCHA_VALIDATION_FAILED') {
            errorMsg =
              'Verificación de reCAPTCHA fallida. Por favor, inténtalo nuevamente.';
          } else if (error.error?.message) {
            errorMsg = error.error.message;
          }

          this.errorMessage.set(errorMsg);
          this.showErrorMessage.set(true);

          setTimeout(() => {
            this.isAnimatingOut.set(true);
            setTimeout(() => {
              this.showErrorMessage.set(false);
              this.isAnimatingOut.set(false);
              this.errorMessage.set('');
            }, 300);
          }, 5000);
        },
      });
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
      if (field.errors['invalidName']) {
        return 'El nombre solo puede contener letras y espacios';
      }
      if (field.errors['onlySpaces']) {
        return 'El campo no puede contener solo espacios';
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
