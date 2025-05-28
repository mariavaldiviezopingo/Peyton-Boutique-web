import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from '../carrito-compras/carrito.service';
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

  constructor(
    private route: ActivatedRoute,
    private catalogoService: CatalogoService,
    private cdr: ChangeDetectorRef,
    private carritoService: CarritoService
  ) {}

  ngOnInit() {
    // Escuchar cambios en los parámetros de la ruta
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log('Parámetro ID recibido:', id); // Rastreo del ID recibido
      if (id) {
        this.loadProduct(+id); // Cargar el producto con el nuevo ID
      } else {
        console.error('No se recibió un ID válido');
      }
    });
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
          this.loadRelatedProducts(this.product.categoria);
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error('Error al cargar producto', err);
      },
    });
  }

  private loadRelatedProducts(category: string) {
    console.log('Cargando productos relacionados para la categoría:', category);
    this.catalogoService.getProductsByCategory(category).subscribe({
      next: (products) => {
        // Filtrar para excluir el producto actual y limitar a 5 productos
        this.relatedProducts = products
          .filter((p) => p.id !== this.product?.id)
          .slice(0, 5); // Limitar a los primeros 5 productos
        console.log('Productos relacionados cargados:', this.relatedProducts);
      },
      error: (err) => {
        console.error('Error al cargar productos relacionados:', err);
      },
    });
  }

  selectVariante(variante: VarianteProducto) {
    console.log('Variante seleccionada manualmente:', variante); // Rastreo de la variante seleccionada manualmente
    this.selectedVariante = variante;
    this.selectedVariante = { ...variante };
  }

  selectTalla(talla: string) {
    this.tallaSeleccionada = talla;
  }

  selectColor(color: string) {
    this.colorSeleccionado = color;
  }

  agregarAlCarrito() {
    if (!this.product || !this.tallaSeleccionada || !this.colorSeleccionado) {
      alert('Selecciona talla y color');
      return;
    }
    this.carritoService.addItem({
      id: this.product.id,
      nombre: this.product.nombre,
      precio: this.product.precio,
      imagen: this.selectedVariante?.imagen || '',
      color: this.colorSeleccionado,
      talla: this.tallaSeleccionada,
      cantidad: this.cantidadSeleccionada,
    });
    alert('Producto agregado al carrito');
  }

  decrementarCantidad() {
    this.cantidadSeleccionada = Math.max(1, this.cantidadSeleccionada - 1);
  }
}
