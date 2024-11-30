<<<<<<< HEAD
import { ChangeDetectionStrategy, Component } from '@angular/core';
=======
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
>>>>>>> 87dc97cc6cfccf12211d0e11858e27ec7c84330c

@Component({
  selector: 'app-login',
  standalone: true,
<<<<<<< HEAD
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

=======
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
>>>>>>> 87dc97cc6cfccf12211d0e11858e27ec7c84330c
}
