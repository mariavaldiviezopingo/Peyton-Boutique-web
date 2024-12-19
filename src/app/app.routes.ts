import { Routes } from '@angular/router';
import {
  CarritoComprasComponent,
  CatalogoComponent,
  ContactoComponent,
  InfoContactoPasaComponent,
  LandingComponent,
  LoginComponent,
  NosotrosComponent,
  PasarelaPagosComponent,
  ProductDetailComponent,
  SignupComponent,
} from './public';

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Ruta login
  { path: 'signup', component: SignupComponent }, // Ruta register
  { path: '', component: LandingComponent }, // Ruta raíz
  { path: 'catalogo', component: CatalogoComponent }, // Ruta raíz
  { path: 'carrito', component: CarritoComprasComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'pasarela', component: PasarelaPagosComponent },
  { path: 'infoContacto', component: InfoContactoPasaComponent },
  { path: 'detalle', component: ProductDetailComponent },
];
