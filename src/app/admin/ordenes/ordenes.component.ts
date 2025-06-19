import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-ordenes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdenesComponent {
  ordenes = Array.from({ length: 10 }).map((_, i) => ({
    numero: i + 1,
    cliente: 'Cliente ' + (i + 1),
    fecha: '2025-06-18',
    pago: 'Tarjeta',
    precio: '$100',
    stock: 'Disponible',
    estado: 'Completado',
  }));
}
