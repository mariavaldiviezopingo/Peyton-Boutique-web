import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-form-pago',
  imports: [RouterModule, CommonModule],
  templateUrl: './form-pago.component.html',
  styleUrl: './form-pago.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormPagoComponent {
  items = [
    { nombre: 'Blusa woman', cantidad: 3, precio: 50.00, imagen: 'assets/img/descarga.jpg' },
    { nombre: 'Pantalón men', cantidad: 1, precio: 300.00, imagen: 'assets/img/descarga.jpg' },
  ];

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.precio * item.cantidad, 0);
  }

}
