import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Importa RouterModule

@Component({
    selector: 'app-carrito-compras',
    imports: [RouterModule, CommonModule,],
    templateUrl: './carrito-compras.component.html',
    styleUrl: './carrito-compras.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarritoComprasComponent {
  constructor(private router: Router) {}

  procederPago() {
    // Aquí puedes realizar cualquier lógica antes de redirigir
    console.log('Pago procesado con éxito.');
    
    // Redirigir a la ruta "pasarela"
    this.router.navigate(['pasarela']);
  }
}
