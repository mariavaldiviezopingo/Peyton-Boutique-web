import { Routes } from '@angular/router';
import { LandingComponent } from './public/landing/landing.component';
import {SignupComponent} from './signup/signup.component'

export const routes: Routes = [
    { path: 'login', component: SignupComponent }, // Ruta raíz
    { path: '', component: LandingComponent }, // Ruta raíz

];
