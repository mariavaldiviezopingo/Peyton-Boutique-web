import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [],
  templateUrl: './categoria.component.html',
  styleUrl:'./categoria.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriaComponent {
  @Input() bgColor: string =''; 
  @Input() url1: string = '';
  @Input() path1: string = '';
  @Input() nombre: string = '';
}