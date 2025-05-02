import { Routes } from '@angular/router';
import { LoginComponent, ProductDetailComponent } from './public';
import { CarritoComprasComponent } from './public/carrito-compras/carrito-compras.component';
import { CatalogoComponent } from './public/catalogo/catalogo.component';
import { ContactoComponent } from './public/contacto/contacto.component';
import { InfoContactoPasaComponent } from './public/info-contacto-pasa/info-contacto-pasa.component';
import { LandingComponent } from './public/landing/landing.component';
import { NosotrosComponent } from './public/nosotros/nosotros.component';
import { PasarelaPagosComponent } from './public/pasarela-pagos/pasarela-pagos.component';
import { SignupComponent } from './public/signup/signup.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent }, // Ruta login
    { path: 'register', component: SignupComponent  }, // Ruta register
    { path: '', component: LandingComponent }, // Ruta raíz
    { path: 'catalogo', component: CatalogoComponent }, // Ruta raíz
    {path: 'carrito', component: CarritoComprasComponent },
    {path: 'nosotros', component: NosotrosComponent },
    {path: 'contacto', component: ContactoComponent },
    {path: 'pasarela', component: PasarelaPagosComponent },
    {path: 'infoContacto', component: InfoContactoPasaComponent },
    {path: 'detalle', component: ProductDetailComponent },
    { path: 'catalogo/:categoria', component: CatalogoComponent }

];


