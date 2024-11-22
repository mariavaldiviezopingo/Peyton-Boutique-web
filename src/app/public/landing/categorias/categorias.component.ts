import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CategoriaComponent } from './categoria/categoria.component';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CategoriaComponent ],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriasComponent {
 
}
