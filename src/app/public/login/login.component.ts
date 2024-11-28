import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Signal,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from '@app/components';
interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm: Signal<FormGroup> = computed(
    () =>
      new FormGroup<LoginForm>({
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
}
