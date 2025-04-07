import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BannerComponent,
  CampaniaComponent,
  CategoriasComponent,
  DestacadosComponent,
  InfoComponent,
  NuevosComponent,
  OfertasComponent,
  ProductosComponent,
  SuscripcionComponent,
  TestimoniosComponent,
} from '../components';
@Component({
    selector: 'app-landing',
    imports: [
        BannerComponent,
        CategoriasComponent,
        CampaniaComponent,
        DestacadosComponent,
        SuscripcionComponent,
        TestimoniosComponent,
        ProductosComponent,
        OfertasComponent,
        InfoComponent,
        NuevosComponent,
    ],
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent {}
