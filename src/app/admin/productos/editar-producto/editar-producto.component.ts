import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  signal,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VarianteProductoComponent } from '../variante-producto/variante-producto.component';
import { BreadcrumbComponent, BreadcrumbItem } from '../../components';
import { Producto } from '../agregar-producto/agregar-producto.component';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [
    VarianteProductoComponent,
    BreadcrumbComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditarProductoComponent implements OnInit {
  // Referencia al componente de variantes
  @ViewChild(VarianteProductoComponent)
  variantesComponent!: VarianteProductoComponent;

  // ID del producto a editar
  productoId: number = 0;

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
  isLoadingData = signal(true);

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Productos', url: '/admin/inventario-productos' },
    { label: 'Editar producto', url: '' },
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productoId = +params['id'];
      this.cargarProducto();
    });
  }

  /**
   * Carga los datos del producto a editar
   */
  private async cargarProducto(): Promise<void> {
    this.isLoadingData.set(true);

    try {
      // Simular carga de datos (aquí iría la llamada al servicio)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Datos de ejemplo (normalmente vendrían del backend)
      const productoMock: Producto = {
        nombre: 'Camiseta Básica Editada',
        descripcion: 'Una camiseta básica cómoda y versátil para uso diario.',
        categoria: 'Ropa',
        subcategoria: 'Camisetas',
        fechaIngreso: '2025-06-01',
        proveedor: 'Textiles del Norte S.A.',
        precioCosto: 100,
        ganancia: 20,
        igv: 21.6,
        precioVenta: 141.6,
        precio: 120,
        variantes: [
          {
            talla: 'M',
            color: 'Azul',
            stock: 50,
          },
        ],
        imagenes: [],
      };

      this.producto.set(productoMock);
      this.calcularPrecioVenta();
    } catch (error) {
      console.error('Error al cargar producto:', error);
      alert('Error al cargar los datos del producto');
      this.router.navigate(['/admin/inventario-productos']);
    } finally {
      this.isLoadingData.set(false);
    }
  }

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
   * Actualiza el producto
   */
  async actualizarProducto(): Promise<void> {
    if (!this.isFormularioValido()) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    this.isLoading.set(true);

    try {
      // Obtener datos de variantes e imágenes del componente hijo
      const datosVariantes = this.variantesComponent.getDatosFormulario();

      // Preparar el producto completo
      const productoActualizado: Producto = {
        ...this.producto(),
        variantes: datosVariantes.variantes,
        imagenes: datosVariantes.imagenes,
      };

      console.log('Producto a actualizar:', productoActualizado);

      // Aquí iría la llamada al servicio para actualizar en el backend
      // await this.productosService.actualizarProducto(this.productoId, productoActualizado);

      // Simular delay para mostrar loading
      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert('Producto actualizado exitosamente!');
      this.router.navigate(['/admin/inventario-productos']);
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      alert('Error al actualizar el producto. Por favor intenta nuevamente.');
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Cancela la edición y vuelve al inventario
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
   * Resetea el formulario a los valores originales
   */
  resetearFormulario(): void {
    if (
      confirm(
        '¿Estás seguro de que quieres resetear el formulario a los valores originales?'
      )
    ) {
      this.cargarProducto();
    }
  }
}
