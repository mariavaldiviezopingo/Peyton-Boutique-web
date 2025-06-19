import { Routes } from '@angular/router';
import { AdminGuard } from './auth/authGuard/admin.guard';
import { LoginComponent } from './auth/login/login.component';
import { LoginSuccessComponent } from './pages/login-success/login-success.component';
import { ProductDetailComponent } from './public';
import { CarritoComprasComponent } from './public/carrito-compras/carrito-compras.component';
import { CatalogoComponent } from './public/catalogo/catalogo.component';
import { ContactoComponent } from './public/contacto/contacto.component';
import { FormLocationComponent } from './public/form-location/form-location.component';
import { FormPagoComponent } from './public/form-pago/form-pago.component';
import { InfoContactoPasaComponent } from './public/info-contacto-pasa/info-contacto-pasa.component';
import { LandingComponent } from './public/landing/landing.component';
import { NosotrosComponent } from './public/nosotros/nosotros.component';
import { PasarelaPagosComponent } from './public/pasarela-pagos/pasarela-pagos.component';
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
      { path: 'login-success', component: LoginSuccessComponent },
      { path: 'register', component: SignupComponent },
      { path: 'catalogo', component: CatalogoComponent },
      { path: 'carrito', component: CarritoComprasComponent },
      { path: 'nosotros', component: NosotrosComponent },
      { path: 'contacto', component: ContactoComponent },
      { path: 'pasarela', component: PasarelaPagosComponent },
      { path: 'infoContacto', component: InfoContactoPasaComponent },
      { path: 'entrega', component: FormLocationComponent },
      { path: 'pago', component: FormPagoComponent },
      { path: 'detalle', component: ProductDetailComponent },
      { path: 'detalle/:id', component: ProductDetailComponent },
      { path: 'catalogo/:categoria', component: CatalogoComponent },
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
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./admin/admin-dashboard/admin-dashboard.component').then(
            (m) => m.AdminDashboardComponent
          ),
      },
      {
        path: 'inventario-productos',
        loadComponent: () =>
          import(
            './admin/productos/inventario-productos/inventario-productos.component'
          ).then((m) => m.InventarioProductosComponent),
      },
      {
        path: 'inventario-productos/agregar',
        loadComponent: () =>
          import(
            './admin/productos/agregar-producto/agregar-producto.component'
          ).then((m) => m.AgregarProductoComponent),
      },
      {
        path: 'inventario-productos/editar/:id',
        loadComponent: () =>
          import(
            './admin/productos/editar-producto/editar-producto.component'
          ).then((m) => m.EditarProductoComponent),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
