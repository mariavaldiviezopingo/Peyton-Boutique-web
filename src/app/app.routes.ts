import { Routes } from '@angular/router';
import { LandingComponent } from './public/landing/landing.component';
import {SignupComponent} from './public/signup/signup.component'
import { RegisterComponent } from './public/register/register.component';

export const routes: Routes = [
    { path: 'login', component: SignupComponent }, // Ruta login
    { path: 'register', component: RegisterComponent }, // Ruta register
    { path: '', component: LandingComponent }, // Ruta raíz

];


