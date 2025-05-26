import { Routes } from '@angular/router';
import { AdminGuard } from './auth/authGuard/admin.guard';
import { LoginComponent } from './auth/login/login.component';
import { CarritoComprasComponent } from './public/carrito-compras/carrito-compras.component';
import { CatalogoComponent } from './public/catalogo/catalogo.component';
import { LandingComponent } from './public/landing/landing.component';
import { SignupComponent } from './public/signup/signup.component';

// export const routes: Routes = [
//   { path: 'login', component: LoginComponent }, // Ruta login
//   { path: 'register', component: SignupComponent }, // Ruta register
//   {
//     path: '',
//     redirectTo: 'login', // Redirige siempre al login al acceder a la raíz
//     pathMatch: 'full',
//   },
//   {
//     path: 'home',
//     component: LandingComponent, // Ruta raíz protegida después del login
//     canActivate: [AuthGuard],
//   },
//   { path: 'catalogo', component: CatalogoComponent },
//   { path: 'carrito', component: CarritoComprasComponent },
//   { path: 'nosotros', component: NosotrosComponent },
//   { path: 'contacto', component: ContactoComponent },
//   { path: 'pasarela', component: PasarelaPagosComponent },
//   { path: 'infoContacto', component: InfoContactoPasaComponent },
//   { path: 'detalle', component: ProductDetailComponent },
//   { path: 'catalogo/:categoria', component: CatalogoComponent },
// ];

// export const routes: Routes = [
//   { path: 'login', component: LoginComponent }, // Ruta login
//   { path: 'register', component: SignupComponent }, // Ruta register
//   { path: '', component: LandingComponent }, // Ruta raíz
//   { path: 'login-success', component: LoginSuccessComponent },
//   { path: 'catalogo', component: CatalogoComponent }, // Ruta raíz
//   { path: 'carrito', component: CarritoComprasComponent },
//   { path: 'nosotros', component: NosotrosComponent },
//   { path: 'contacto', component: ContactoComponent },
//   { path: 'pasarela', component: PasarelaPagosComponent },
//   { path: 'infoContacto', component: InfoContactoPasaComponent },
//   { path: 'detalle', component: ProductDetailComponent },
//   { path: 'catalogo/:categoria', component: CatalogoComponent },
//   {
//     path: 'admin',
//     canActivate: [AdminGuard],
//     component: AdminDashboardComponent,
//   },
// ];

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./public/public-layout.component').then(
        (m) => m.PublicLayoutComponent
      ),
    children: [
      { path: '', component: LandingComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: SignupComponent },
      { path: 'catalogo', component: CatalogoComponent },
      { path: 'carrito', component: CarritoComprasComponent },
    ],
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadComponent: () =>
      import('./admin/admin-layout.component').then(
        (m) => m.AdminLayoutComponent
      ),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./admin/admin-dashboard/admin-dashboard.component').then(
            (m) => m.AdminDashboardComponent
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
