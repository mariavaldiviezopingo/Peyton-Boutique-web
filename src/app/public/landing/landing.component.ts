import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component'; 
import {BannerComponent} from '../components/banner/banner.component';
import {CategoriasComponent} from '../components/categorias/categorias.component';
import { CampaniaComponent } from '../components/campania/campania.component';
import { DestacadosComponent } from '../components/destacados/destacados.component';
import { SuscripcionComponent } from '../components/suscripcion/suscripcion.component';
import { TestimoniosComponent } from '../components/testimonios/testimonios.component';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeaderComponent, BannerComponent, CategoriasComponent, CampaniaComponent, DestacadosComponent, SuscripcionComponent, TestimoniosComponent ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LandingComponent {

}
