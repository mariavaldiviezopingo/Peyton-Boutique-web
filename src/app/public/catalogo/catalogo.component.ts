import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importa RouterModule
@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CatalogoComponent {
  products = [
    { name: 'Camisa Manga Larga', price: 100, imageUrl: 'path_to_image_1' },
    { name: 'Pantalón', price: 120, imageUrl: 'path_to_image_2' },
    { name: 'Zapatos', price: 200, imageUrl: 'path_to_image_3' },
    { name: 'Gorra', price: 80, imageUrl: 'path_to_image_4' },
    { name: 'Chaqueta', price: 250, imageUrl: 'path_to_image_5' },
    { name: 'Vestido', price: 150, imageUrl: 'path_to_image_6' },
    { name: 'Bufanda', price: 60, imageUrl: 'path_to_image_7' },
    { name: 'Guantes', price: 40, imageUrl: 'path_to_image_8' },
    { name: 'Cinturón', price: 90, imageUrl: 'path_to_image_9' },
    { name: 'Bolso', price: 300, imageUrl: 'path_to_image_10' },
    { name: 'Camisa Manga Larga', price: 100, imageUrl: 'path_to_image_1' },
    { name: 'Pantalón', price: 120, imageUrl: 'path_to_image_2' },
    { name: 'Zapatos', price: 200, imageUrl: 'path_to_image_3' },
    { name: 'Gorra', price: 80, imageUrl: 'path_to_image_4' },
    { name: 'Chaqueta', price: 250, imageUrl: 'path_to_image_5' },
    { name: 'Vestido', price: 150, imageUrl: 'path_to_image_6' },
    { name: 'Bufanda', price: 60, imageUrl: 'path_to_image_7' },
    { name: 'Guantes', price: 40, imageUrl: 'path_to_image_8' },
    { name: 'Cinturón', price: 90, imageUrl: 'path_to_image_9' },
    { name: 'Bolso', price: 300, imageUrl: 'path_to_image_10' }
  ];

  currentPage = 1;
  itemsPerPage = 8; // Número de productos por página

  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.products.length / this.itemsPerPage);
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
}