import { Routes } from '@angular/router';
import { FooterComponent } from './public/footer/footer.component';
import { RegisterComponent } from './public/register/register.component';

export const routes: Routes = [
    { path: 'public/footer', component: FooterComponent },
    { path: 'public/register', component: RegisterComponent }
];
