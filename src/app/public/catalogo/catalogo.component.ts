import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router'; // Importa RouterModule
import { CatalogoService, Product } from './catalogo.service';
@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css',
})
export class CatalogoComponent implements OnInit {
  constructor(
    private catalogoService: CatalogoService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.selectedCategory = params.get('categoria') || '';
      this.loadProducts();
      if (this.selectedCategory) {
        this.loadSubcategories(this.selectedCategory);
      }
    });
  }

  products: Product[] = [];
  filteredProducts: Product[] = [];
  subcategories: string[] = [];
  selectedCategory: string = '';
  subcategoriaSeleccionada: string = ''; 

  currentPage = 1;
  itemsPerPage = 9;
  selectedTalla = '';
  selectedColor = '';
  precioMin?: number;
  precioMax?: number;

  objectKeys = Object.keys;

  loadProducts(): void {
    this.catalogoService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filterProductsByCategory();
      },
      error: (err) => console.error('Error al cargar productos', err),
    });
  }

  loadSubcategories(categoria: string): void {
    this.catalogoService.obtenerSubcategorias(categoria).subscribe({
      next: (subcategorias) => {
        console.log('Subcategorías cargadas:', subcategorias); // Añade este log
        this.subcategories = subcategorias;
      },
      error: (err) => console.error('Error al obtener subcategorías', err),
    });
  }
  

  filterProductsByCategory(): void {
    if (this.selectedCategory) {
      this.filteredProducts = this.products.filter(
        (producto) => producto.categoria === this.selectedCategory
      );
    } else {
      this.filteredProducts = [...this.products];
    }
  }
  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedCategory = selectElement.value;
    console.log('Categoría seleccionada:', selectedCategory);

    if (selectedCategory) {
      this.catalogoService.getProductsByCategory(selectedCategory).subscribe({
        next: (data) => {
          console.log('Productos filtrados por categoría:', data);
          this.filteredProducts = data;
          this.currentPage = 1; // Reiniciar paginación al cambiar de categoría
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Error al filtrar productos por categoría', err);
        },
      });
    } else {
      // Si no hay categoría, cargar todos los productos nuevamente
      this.loadProducts();
    }
  }

  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  applyFilters(): void {
    this.catalogoService
      .getFilteredProducts({
        categoria: this.selectedCategory,
        talla: this.selectedTalla,
        color: this.selectedColor,
        precioMin: this.precioMin,
        precioMax: this.precioMax,
      })
      .subscribe({
        next: (data) => {
          this.filteredProducts = data;
          this.currentPage = 1;
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Error al aplicar filtros', err);
        },
      });
  }

  filtrarPorSubcategoria(subcat: string): void {
    this.subcategoriaSeleccionada = subcat;

    this.catalogoService.filtrarPorSubcategoria(subcat).subscribe({
      next: (productos) => (this.filteredProducts = productos),
      error: (err) => console.error('Error al filtrar por subcategoría', err),
    });
  }

  selectCategory(categoria: string): void {
    this.selectedCategory = categoria;
    this.applyFilters();
  }

  get paginatedFilteredProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  get totalPages() {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  @ViewChild('carouselContainer', { static: false }) carouselRef!: ElementRef;

  scrollCarrusel(direction: 'left' | 'right') {
    const container = this.carouselRef.nativeElement as HTMLElement;
    const scrollAmount = 200; // cantidad a desplazar

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  getImageForSubcategory(subcat: string): string {
    const subcatImages: { [key: string]: string } = {
      "Niños": 'assets/img/subcategorias/ropa-ninos.jpg',
      "Adultos": 'assets/img/subcategorias/ropa-adultos.jpg',
      "Mujer": 'assets/img/subcategorias/ropa-mujer.jpg',
      // Añadir más subcategorías e imágenes según sea necesario
    };
  
    // Retorna la imagen correspondiente o una por defecto
    return subcatImages[subcat] || 'assets/img/subcategorias/default.jpg';
  }
  
}