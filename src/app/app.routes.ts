import { Routes } from '@angular/router';
import { LandingComponent } from './public/landing/landing.component';
import {SignupComponent} from './public/signup/signup.component'
import { LoginComponent } from './public';

export const routes: Routes = [
    { path: 'login', component: LoginComponent }, // Ruta login
    { path: 'register', component: SignupComponent  }, // Ruta register
    { path: '', component: LandingComponent }, // Ruta raíz

];


