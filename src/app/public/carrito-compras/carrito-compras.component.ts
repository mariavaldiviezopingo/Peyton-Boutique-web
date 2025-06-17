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
  carrito: any; // Agrega la propiedad carrito, ajusta el tipo si tienes una interfaz específica

  constructor(private router: Router, private carritoService: CarritoService) {}

  ngOnInit(): void {
    const carritoItems = this.carritoService.getItems();
    this.items = Array.isArray(carritoItems) ? carritoItems : [];
  }

  procederPago() {
    // Aquí puedes realizar cualquier lógica antes de redirigir
    console.log('Pago procesado con éxito.');

    // Redirigir a la ruta "pasarela"
    this.router.navigate(['pasarela']);
  }

  finalizarCompra() {
    this.carritoService.checkout().subscribe({
      next: (msg) => {
        alert(msg); // o usa un toast si tienes uno
        this.obtenerCarrito(); // esto refresca el carrito
      },
      error: (err) => {
        alert(err.error.message || 'Ocurrió un error al finalizar la compra');
      },
    });
  }

  obtenerCarrito(): void {
    this.carritoService.obtenerCarrito().subscribe({
      next: (carrito) => {
        this.carrito = carrito;
      },
      error: (err) => {
        console.error('Error al obtener el carrito:', err);
      },
    });
  }

  get subtotal(): number {
    return this.items.reduce((acc, item) => {
      const precio = Number(item.precio);
      const cantidad = Number(item.cantidad);
      if (!isNaN(precio) && !isNaN(cantidad)) {
        return acc + precio * cantidad;
      }
      return acc;
    }, 0);
  }

  get total(): number {
    return this.subtotal; // o suma + envío si tienes envío
  }

  // get subtotal(): number {
  //   return this.items.reduce(
  //     (sum, item) => sum + item.precio * item.cantidad,
  //     0
  //   );
  // }

  // get total(): number {
  //   // Si tienes costo de envío, súmalo aquí. Por ahora es 0.
  //   return this.subtotal;
  // }
  eliminarProducto(item: ItemCarrito) {
    this.carritoService.removeItem(item);
    this.items = this.carritoService.getItems(); // refrescar lista local
  }
}
