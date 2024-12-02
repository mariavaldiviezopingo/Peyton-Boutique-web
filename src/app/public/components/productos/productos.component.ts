import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importación necesaria para ngFor y ngIf

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule], // Importación de CommonModule
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css',], // Corrección en styleUrls (plural)
  changeDetection: ChangeDetectionStrategy.Default
})

export class ProductosComponent {
  productos = [
    {
      nombre: 'Set de Brochas 8 pc',
      precio: 'S/ 59.90',
      imagen: 'https://www.maybelline.es/-/media/project/loreal/brand-sites/mny/emea/iberic/tips-and-trends/productos-basicos-de-maquillaje/productos-basicos-de-maquillaje_0.jpg?la=es-es&h=349&w=624&rev=50d56cb1cf11407882d815e667fc3bbc&hash=2B10585742F38F4577E56E6F0BD5AEAE',
    },
    {
      nombre: 'Set de Maquillaje Completo',
      precio: 'S/ 89.90',
      imagen: 'assets/images/maquillaje.jpg',
    },
    {
      nombre: 'Set de Labiales',
      precio: 'S/ 49.90',
      imagen: 'assets/images/labiales.jpg',
    },
  ];
}