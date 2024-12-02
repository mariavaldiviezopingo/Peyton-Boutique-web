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
      imagen: '',
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