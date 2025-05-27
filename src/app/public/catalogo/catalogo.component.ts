import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Importa RouterModule
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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Suscripción a los cambios en los parámetros de la URL (como la categoría seleccionada)
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
  subcategoriaSeleccionada:  string | null = null;

  currentPage = 1;
  itemsPerPage = 9;
  selectedTalla = '';
  selectedColor = '';
  precioMin?: number;
  precioMax?: number;

  objectKeys = Object.keys;

  loadProducts(): void {
    if (this.selectedCategory) {
      this.catalogoService
        .getProductsByCategory(this.selectedCategory)
        .subscribe({
          next: (data) => {
            this.filteredProducts = data;
            this.currentPage = 1;
            this.cdr.detectChanges();
          },
          error: (err) =>
            console.error('Error al cargar productos filtrados', err),
        });
    } else {
      this.catalogoService.getProducts().subscribe({
        next: (data) => {
          this.filteredProducts = data;
          this.currentPage = 1;
          this.cdr.detectChanges();
        },
        error: (err) =>
          console.error('Error al cargar todos los productos', err),
      });
    }
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
      // Navegar primero, pero esperar a que Angular reactive la vista
      this.router.navigate(['/catalogo', selectedCategory]).then(() => {
        // Actualiza la categoría y carga los productos correspondientes
        this.selectedCategory = selectedCategory;
        this.catalogoService.getProductsByCategory(selectedCategory).subscribe({
          next: (data) => {
            this.filteredProducts = data;
            this.currentPage = 1;
            this.cdr.detectChanges(); // Forzar refresco de la vista
          },
          error: (err) => {
            console.error('Error al filtrar productos por categoría', err);
          },
        });

        // Cargar subcategorías asociadas
        this.loadSubcategories(selectedCategory);
      });
    } else {
      this.router.navigate(['/catalogo']).then(() => {
        this.selectedCategory = '';
        this.loadProducts();
      });
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
  this.catalogoService.getFilteredProducts({
    categoria: this.selectedCategory,
    subcategoria: this.subcategoriaSeleccionada || undefined,
    talla: this.selectedTalla,
    color: this.selectedColor,
    precioMin: this.precioMin,
    precioMax: this.precioMax,
  }).subscribe({
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

  this.catalogoService.getFilteredProducts({
    categoria: this.selectedCategory,
    subcategoria: subcat,
    talla: this.selectedTalla,
    color: this.selectedColor,
    precioMin: this.precioMin,
    precioMax: this.precioMax,
  }).subscribe({
    next: (productos) => {
      this.filteredProducts = productos;
      this.currentPage = 1;
      this.cdr.detectChanges();
    },
    error: (err) => console.error('Error al filtrar por subcategoría', err),
  });
}

  selectCategory(categoria: string): void {
    this.selectedCategory = categoria;
    this.applyFilters();
    this.router.navigate(['/catalogo', categoria]);
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
      Navidad:'assets/img/descarga.jpg',
      Tendencia: 'assets/img/descarga.jpg',
      Niños: 'assets/img/descarga.jpg',
      Varon:'assets/img/descarga.jpg',
      Mujer: 'assets/img/descarga.jpg'
    };

    // Retorna la imagen correspondiente o una por defecto
    return subcatImages[subcat] || 'assets/img/subcategorias/default.jpg';
  }
}