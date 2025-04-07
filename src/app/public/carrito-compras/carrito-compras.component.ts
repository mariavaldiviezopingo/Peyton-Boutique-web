import {ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { Router } from '@angular/router';
import { CatalogoComponent } from '../catalogo/catalogo.component';

@Component({
    selector: 'app-carrito-compras',
    imports: [RouterModule, CommonModule],
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
