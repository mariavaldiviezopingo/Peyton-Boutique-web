import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { Subscription } from 'rxjs';
import {
  CarritoService,
  ItemCarrito,
} from '../carrito-compras/carrito.service';
import {
  CatalogoService,
  Product,
  VarianteProducto,
} from '../catalogo/catalogo.service';
import { ProductCardComponent } from '../components';
import { ColorHexPipe } from './color-hex.pipe';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, ColorHexPipe, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  tallasUnicas: string[] = [];
  coloresUnicos: string[] = [];

  cantidadSeleccionada = 1;
  tallaSeleccionada: string | null = null;
  colorSeleccionado: string | null = null;

  selectedVariante: VarianteProducto | null = null;
  relatedProducts: Product[] = []; // Array para almacenar los productos relacionados
  private routeSub?: Subscription;

  estadoStock: string = 'Stock';
  colorStock: string = 'text-green-600';
  constructor(
    private route: ActivatedRoute,
    private catalogoService: CatalogoService,
    private cdr: ChangeDetectorRef,
    private carritoService: CarritoService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Suscribirse a los cambios de parámetros de la ruta
    this.routeSub = this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadProduct(+id);
      } else {
        this.product = undefined;
        this.relatedProducts = [];
        this.cdr.markForCheck();
      }
    });
  }

  ngOnDestroy() {
    // Limpiar la suscripción al destruir el componente
    this.routeSub?.unsubscribe();
  }

  // Método para cargar el producto
  private loadProduct(id: number) {
    console.log('Cargando producto con ID:', id); // Rastreo antes de llamar al servicio
    this.catalogoService.getProductById(id).subscribe({
      next: (prod) => {
        console.log('Producto recibido del servicio:', prod); // Rastreo del producto recibido
        if (prod) {
          this.product = prod;
          this.selectedVariante = this.product.variantes[0];
          console.log('Variante seleccionada:', this.selectedVariante); // Rastreo de la variante seleccionada
          this.tallasUnicas = [
            ...new Set(this.product.variantes.map((v) => v.talla)),
          ];
          this.coloresUnicos = [
            ...new Set(this.product.variantes.map((v) => v.color)),
          ];
          console.log('Tallas únicas calculadas:', this.tallasUnicas); // Rastreo de las tallas únicas

          // Cargar productos relacionados basados en la categoría
          this.loadRelatedProducts(this.product.categoria, this.product.id);
          this.cdr.markForCheck();

          this.actualizarEstadoStock();
          this.cdr.markForCheck();
        }
      },
      error: (err) => {
        console.error('Error al cargar producto', err);
      },
    });
  }

  private loadRelatedProducts(category: string, currentProductId: number) {
    this.relatedProducts = [];
    console.log('Cargando productos relacionados para la categoría:', category);
    this.catalogoService.getProductsByCategory(category).subscribe({
      next: (products) => {
        this.relatedProducts = products
          .filter((p) => p.id !== currentProductId)
          .slice(0, 5);
        console.log('Productos relacionados cargados:', this.relatedProducts);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error al cargar productos relacionados:', err);
        this.cdr.markForCheck();
      },
    });
  }

  selectVariante(variante: VarianteProducto) {
    console.log('Variante seleccionada manualmente:', variante); // Rastreo de la variante seleccionada manualmente
    this.selectedVariante = variante;
    this.selectedVariante = { ...variante };
  }

  // selectTalla(talla: string) {
  //   this.tallaSeleccionada = talla;
  // }

  // selectColor(color: string) {
  //   this.colorSeleccionado = color;
  // }

  selectColor(color: string) {
    this.colorSeleccionado = color;
    this.actualizarSelectedVariante();
  }

  selectTalla(talla: string) {
    this.tallaSeleccionada = talla;
    this.actualizarSelectedVariante();
  }

  private actualizarSelectedVariante() {
    if (!this.product || !this.colorSeleccionado || !this.tallaSeleccionada) {
      return;
    }

    const variante = this.product.variantes.find(
      (v) =>
        v.color === this.colorSeleccionado && v.talla === this.tallaSeleccionada
    );

    if (variante) {
      this.selectedVariante = variante;
      this.actualizarEstadoStock();
      this.cdr.markForCheck();
      console.log('Variante actualizada:', variante);
    } else {
      console.warn(
        'No existe variante para',
        this.colorSeleccionado,
        this.tallaSeleccionada
      );
    }
  }

  // agregarAlCarrito() {
  //   if (!this.product || !this.tallaSeleccionada || !this.colorSeleccionado) {
  //     alert('Selecciona talla y color');
  //     return;
  //   }
  //   this.carritoService.addItem({
  //     id: this.product.id,
  //     varianteId: this.selectedVariante?.id || 0,
  //     nombre: this.product.nombre,
  //     precio: this.product.precio,
  //     imagen: this.selectedVariante?.imagen || '',
  //     color: this.colorSeleccionado,
  //     talla: this.tallaSeleccionada,
  //     cantidad: this.cantidadSeleccionada,
  //   });
  //   alert('Producto agregado al carrito');
  // }

  agregarAlCarrito() {
    if (!this.product || !this.tallaSeleccionada || !this.colorSeleccionado) {
      alert('Selecciona talla y color');
      return;
    }

    const item: ItemCarrito = {
      productoId: this.product.id,
      varianteId: this.selectedVariante?.id || 0,
      nombre: this.product.nombre,
      precio: this.product.precio,
      imagen: this.selectedVariante?.imagen || '',
      color: this.colorSeleccionado,
      talla: this.tallaSeleccionada,
      cantidad: this.cantidadSeleccionada,
    };

    if (this.authService.isAuthenticated()) {
      // Usuario logueado → enviar al backend
      this.carritoService.agregarProductoAlServidor(item).subscribe({
        next: () => {
          alert('Producto agregado al carrito de tu cuenta');
        },
        error: (err) => {
          console.error('Error al agregar producto al servidor', err);
          if (err.status === 400 && err.error) {
            alert(err.error);
          } else {
            alert('Error inesperado al agregar el producto');
          }
        },
      });
    } else {
      // Usuario no logueado → guardar en localStorage
      this.carritoService.addItem(item);
      alert('Producto agregado al carrito local');
    }
  }

  decrementarCantidad() {
    this.cantidadSeleccionada = Math.max(1, this.cantidadSeleccionada - 1);
  }

  actualizarEstadoStock() {
    if (
      !this.product ||
      !this.product.variantes ||
      this.product.variantes.length === 0
    ) {
      this.estadoStock = '';
      this.colorStock = '';
      return;
    }

    // Si todas las variantes tienen stock 0, mostrar "Agotado"
    const todasAgotadas = this.product.variantes.every((v) => v.stock === 0);
    if (todasAgotadas) {
      this.estadoStock = 'Agotado';
      this.colorStock = 'text-red-600';
      return;
    }

    // Si hay variante seleccionada, evalúa su estado
    if (this.selectedVariante) {
      if (this.selectedVariante.stock === 0) {
        this.estadoStock = 'Agotado';
        this.colorStock = 'text-red-600';
      } else if (this.selectedVariante.desestimado) {
        this.estadoStock = 'Desestimado';
        this.colorStock = 'text-orange-500';
      } else {
        this.estadoStock = 'Stock';
        this.colorStock = 'text-green-600';
      }
      return;
    }

    // Si no hay variante seleccionada y no todas están agotadas, mostrar "Stock"
    this.estadoStock = 'Stock';
    this.colorStock = 'text-green-600';
  }
}
