import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  VarianteProductoComponent,
  VarianteProducto,
} from '../variante-producto/variante-producto.component';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
} from '../../components/breadcrumb/breadcrumb.component';

// Interfaz para el producto completo
export interface Producto {
  nombre: string;
  descripcion: string;
  categoria: string;
  subcategoria: string;
  fechaIngreso: string;
  proveedor: string;
  precioCosto: number;
  ganancia: number;
  igv: number;
  precioVenta: number;
  precio: number;
  variantes: VarianteProducto[];
  imagenes: string[];
}

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [
    VarianteProductoComponent,
    BreadcrumbComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgregarProductoComponent {
  // Referencia al componente de variantes
  @ViewChild(VarianteProductoComponent)
  variantesComponent!: VarianteProductoComponent;

  // Datos del producto
  producto = signal<Producto>({
    nombre: '',
    descripcion: '',
    categoria: '',
    subcategoria: '',
    fechaIngreso: '',
    proveedor: '',
    precioCosto: 0,
    ganancia: 0,
    igv: 0,
    precioVenta: 0,
    precio: 0,
    variantes: [],
    imagenes: [],
  });

  // Opciones para el select de categorías
  categorias = [
    'Ropa',
    'Zapatos',
    'Accesorios',
    'Belleza',
    'Hogar',
    'Juguetes',
    'Escuela',
  ];

  // Estado del formulario
  isLoading = signal(false);

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Productos', url: '/admin/inventario-productos' },
    { label: 'Agregar producto', url: '' },
  ];

  constructor(private router: Router) {}

  /**
   * Actualiza los datos básicos del producto
   * @param field Campo a actualizar
   * @param value Nuevo valor
   */
  updateProducto(field: keyof Producto, value: any): void {
    this.producto.update((producto) => ({
      ...producto,
      [field]: value,
    }));
  }

  /**
   * Maneja el cambio en inputs de texto
   * @param event Evento del input
   * @param field Campo a actualizar
   */
  onInputChange(event: Event, field: keyof Producto): void {
    const target = event.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    const value = target.value;

    if (field === 'precio' || field === 'precioCosto' || field === 'ganancia') {
      this.updateProducto(field, parseFloat(value) || 0);
      // Recalcular IGV y precio de venta cuando cambie el costo o ganancia
      if (field === 'precioCosto' || field === 'ganancia') {
        this.calcularPrecioVenta();
      }
    } else {
      this.updateProducto(field, value);
    }
  }

  /**
   * Calcula automáticamente el IGV y precio de venta
   */
  private calcularPrecioVenta(): void {
    const prod = this.producto();
    const subtotal = prod.precioCosto + prod.ganancia;
    const igvCalculado = subtotal * 0.18; // 18% de IGV
    const precioVentaCalculado = subtotal + igvCalculado;

    this.producto.update((producto) => ({
      ...producto,
      igv: igvCalculado,
      precioVenta: precioVentaCalculado,
    }));
  }

  /**
   * Valida que todos los campos obligatorios estén completos
   * @returns true si el formulario es válido
   */
  isFormularioValido(): boolean {
    const prod = this.producto();
    const basicDataValid =
      prod.nombre.trim() !== '' &&
      prod.descripcion.trim() !== '' &&
      prod.categoria !== '' &&
      prod.subcategoria.trim() !== '' &&
      prod.fechaIngreso !== '' &&
      prod.proveedor.trim() !== '' &&
      prod.precioCosto > 0 &&
      prod.ganancia >= 0;

    const variantesValid =
      this.variantesComponent?.isFormularioValido() || false;

    return basicDataValid && variantesValid;
  }

  /**
   * Guarda el producto completo
   */
  async guardarProducto(): Promise<void> {
    if (!this.isFormularioValido()) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    this.isLoading.set(true);

    try {
      // Obtener datos de variantes e imágenes del componente hijo
      const datosVariantes = this.variantesComponent.getDatosFormulario();

      // Preparar el producto completo
      const productoCompleto: Producto = {
        ...this.producto(),
        variantes: datosVariantes.variantes,
        imagenes: datosVariantes.imagenes,
      };

      console.log('Producto a guardar:', productoCompleto);

      // Aquí iría la llamada al servicio para guardar en el backend
      // await this.productosService.crearProducto(productoCompleto);

      // Simular delay para mostrar loading
      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert('Producto guardado exitosamente!');
      this.router.navigate(['/admin/inventario-productos']);
    } catch (error) {
      console.error('Error al guardar producto:', error);
      alert('Error al guardar el producto. Por favor intenta nuevamente.');
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Cancela la creación y vuelve al inventario
   */
  cancelar(): void {
    if (
      confirm(
        '¿Estás seguro de que quieres cancelar? Se perderán todos los cambios.'
      )
    ) {
      this.router.navigate(['/admin/inventario-productos']);
    }
  }

  /**
   * Limpia el formulario
   */
  limpiarFormulario(): void {
    if (confirm('¿Estás seguro de que quieres limpiar el formulario?')) {
      this.producto.set({
        nombre: '',
        descripcion: '',
        categoria: '',
        subcategoria: '',
        fechaIngreso: '',
        proveedor: '',
        precioCosto: 0,
        ganancia: 0,
        igv: 0,
        precioVenta: 0,
        precio: 0,
        variantes: [],
        imagenes: [],
      });

      // Resetear el componente de variantes si existe
      if (this.variantesComponent) {
        this.variantesComponent.variantes.set([]);
        this.variantesComponent.imagenes.set([null, null, null]);
        // Usar setTimeout para evitar problemas con el ciclo de detección de cambios
        setTimeout(() => {
          this.variantesComponent.agregarVariante();
        }, 0);
      }
    }
  }
}
