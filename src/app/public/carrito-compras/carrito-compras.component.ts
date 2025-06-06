import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Importa RouterModule
import { CarritoService, ItemCarrito } from './carrito.service';

@Component({
  selector: 'app-carrito-compras',
  imports: [RouterModule, CommonModule],
  templateUrl: './carrito-compras.component.html',
  styleUrl: './carrito-compras.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarritoComprasComponent {
  items: ItemCarrito[] = [];
  constructor(private router: Router, private carritoService: CarritoService) {
    this.items = this.carritoService.getItems();
  }

  procederPago() {
    // Aquí puedes realizar cualquier lógica antes de redirigir
    console.log('Pago procesado con éxito.');

    // Redirigir a la ruta "pasarela"
    this.router.navigate(['pasarela']);
  }

  get subtotal(): number {
    return this.items.reduce(
      (sum, item) => sum + item.precio * item.cantidad,
      0
    );
  }

  get total(): number {
    // Si tienes costo de envío, súmalo aquí. Por ahora es 0.
    return this.subtotal;
  }
  eliminarProducto(item: ItemCarrito) {
    this.carritoService.removeItem(item);
    this.items = this.carritoService.getItems(); // refrescar lista local
  }
}
