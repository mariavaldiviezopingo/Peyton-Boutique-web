import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
} from '../../components/breadcrumb/breadcrumb.component';

interface ProductoInventario {
  id: number;
  nombre: string;
  unidades: number;
  precioBase: number;
  precioFinal: number;
  categoria: string;
  subcategoria: string;
  ganancia: number;
  fechaIngreso: string;
  estado: 'Stock' | 'Agotado' | 'Desestimado';
}

@Component({
  selector: 'app-inventario-productos',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
  templateUrl: './inventario-productos.component.html',
  styleUrls: ['./inventario-productos.component.css'],
})
export class InventarioProductosComponent {
  breadcrumbItems: BreadcrumbItem[] = [{ label: 'Productos', url: '' }];

  productos: ProductoInventario[] = [
    {
      id: 1,
      nombre: 'Camiseta Básica',
      unidades: 50,
      precioBase: 100.0,
      precioFinal: 120.0,
      categoria: 'Ropa',
      subcategoria: 'Camisetas',
      ganancia: 20.0,
      fechaIngreso: '2025-06-01',
      estado: 'Stock',
    },
    {
      id: 2,
      nombre: 'Zapatos Deportivos',
      unidades: 0,
      precioBase: 300.0,
      precioFinal: 350.0,
      categoria: 'Calzado',
      subcategoria: 'Deportivos',
      ganancia: 50.0,
      fechaIngreso: '2025-05-20',
      estado: 'Agotado',
    },
    {
      id: 3,
      nombre: 'Bolso de Mano',
      unidades: 15,
      precioBase: 200.0,
      precioFinal: 250.0,
      categoria: 'Accesorios',
      subcategoria: 'Bolsos',
      ganancia: 50.0,
      fechaIngreso: '2025-06-10',
      estado: 'Stock',
    },
    {
      id: 4,
      nombre: 'Perfume Floral',
      unidades: 5,
      precioBase: 80.0,
      precioFinal: 100.0,
      categoria: 'Belleza',
      subcategoria: 'Perfumes',
      ganancia: 20.0,
      fechaIngreso: '2025-06-15',
      estado: 'Stock',
    },
    {
      id: 5,
      nombre: 'Juguete Educativo',
      unidades: 0,
      precioBase: 60.0,
      precioFinal: 75.0,
      categoria: 'Juguetes',
      subcategoria: 'Educativos',
      ganancia: 15.0,
      fechaIngreso: '2025-06-12',
      estado: 'Desestimado',
    },
  ];

  constructor(private router: Router) {}

  irAgregarProducto() {
    this.router.navigate(['/admin/inventario-productos/agregar']);
  }
}
