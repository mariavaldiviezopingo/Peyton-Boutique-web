import { Routes } from '@angular/router';
import { LoginComponent } from './public';
import { LandingComponent } from './public/landing/landing.component';
import { SignupComponent } from './public/signup/signup.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Ruta login
  { path: 'signup', component: SignupComponent }, // Ruta register
  { path: '', component: LandingComponent }, // Ruta raíz
];
