import { ChangeDetectionStrategy, Component } from '@angular/core';
import {BannerComponent} from '../components/banner/banner.component';
import {CategoriasComponent} from '../components/categorias/categorias.component';
import { CampaniaComponent } from '../components/campania/campania.component';
import { DestacadosComponent } from '../components/destacados/destacados.component';
import { SuscripcionComponent } from '../components/suscripcion/suscripcion.component';
import { TestimoniosComponent } from '../components/testimonios/testimonios.component';
import { ProductosComponent } from '../components/productos/productos.component';
import { OfertasComponent } from '../components/ofertas/ofertas.component';
import { InfoComponent } from '../components/info/info.component';
import { NuevosComponent } from '../components/nuevos/nuevos.component';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [BannerComponent, CategoriasComponent, CampaniaComponent, DestacadosComponent, SuscripcionComponent, TestimoniosComponent, ProductosComponent, OfertasComponent,  InfoComponent, NuevosComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LandingComponent {

}
