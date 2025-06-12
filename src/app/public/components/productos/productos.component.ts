import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Producto {
  id?: number;
  nombre: string;
  descripcion?: string;
  precio: string;
  imagen: string;
}

@Component({
  selector: 'app-productos',
  imports: [CommonModule, RouterLink],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ProductosComponent {
  productos: Producto[] = [
    {
      id: 1,
      nombre: 'Set de Mochilas con 5 piezas',
      descripcion:
        'Set de mochilas con 5 piezas, incluye mochila grande, mochila mediana, mochila pequeña, estuche y bolso de mano.',
      precio: 'S/ 59.90',
      imagen:
        'https://ae01.alicdn.com/kf/S7e1b48f22a0341ba92bdb0908a12255bf.jpg_960x960.jpg',
    },
    {
      id: 2,
      nombre: 'Set de Brochas',
      descripcion:
        'Juego de brochas de maquillaje profesional, incluye 25 brochas para base, polvo, sombra y más.',
      precio: 'S/ 89.90',
      imagen:
        'https://ae01.alicdn.com/kf/H822a4c1491e440e1b6834aec03d7272eu/Jessup-Juego-de-brochas-de-maquillaje-25-uds-brocha-de-maquillaje-profesional-base-en-polvo-sint.jpg',
    },
    {
      id: 3,
      nombre: 'Juego de Ollas',
      descripcion:
        'Juego de ollas de acero inoxidable de 10 piezas, incluye cacerolas, sartenes y utensilios de cocina.',
      precio: 'S/ 49.90',
      imagen:
        'https://oechsle.vteximg.com.br/arquivos/ids/3870419-800-800/image-641a52c43aa24aa3bcdd63ba74e65a74.jpg?v=637587147934830000',
    },
  ];

  trackByProducto(index: number, producto: Producto): number {
    return producto.id || index;
  }
}
