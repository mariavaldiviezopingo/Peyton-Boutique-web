import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from './header/header.component'; 
import {BannerComponent} from './banner/banner.component';
import {CategoriasComponent} from './categorias/categorias.component';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeaderComponent, BannerComponent, CategoriasComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LandingComponent {

}
