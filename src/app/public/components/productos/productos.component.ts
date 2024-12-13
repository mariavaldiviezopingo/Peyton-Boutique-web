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
      nombre: 'Set de Mochilas con 5 piezas',
      precio: 'S/ 59.90',
      imagen: 'https://ae01.alicdn.com/kf/S7e1b48f22a0341ba92bdb0908a12255bf.jpg_960x960.jpg',
    },
    {
      nombre: 'Set de Brochas',
      precio: 'S/ 89.90',
      imagen: 'https://ae01.alicdn.com/kf/H822a4c1491e440e1b6834aec03d7272eu/Jessup-Juego-de-brochas-de-maquillaje-25-uds-brocha-de-maquillaje-profesional-base-en-polvo-sint.jpg',
    },
    {
      nombre: 'Juego de Ollas',
      precio: 'S/ 49.90',
      imagen: 'https://oechsle.vteximg.com.br/arquivos/ids/3870419-800-800/image-641a52c43aa24aa3bcdd63ba74e65a74.jpg?v=637587147934830000',
    },
  ];
}