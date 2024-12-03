import {Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importación para standalone si es necesario

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css',],
})
export class CategoriasComponent implements AfterViewInit {
  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;
  isScrollLeftDisabled = true;
  isScrollRightDisabled = false;

  categorias = [
    { nombre: 'Ropa', icon: 'icons/shopping_cart.icon.svg', color: 'bg-blue-100' },
    { nombre: 'Zapatos', icon: 'icono2.png', color: 'bg-green-100' },
    { nombre: 'Accesorios', icon: 'icono3.png', color: 'bg-red-100' },
    { nombre: 'Accesorios', icon: 'icono3.png', color: 'bg-red-100' },
    { nombre: 'Accesorios', icon: 'icono3.png', color: 'bg-red-100' },
    { nombre: 'Accesorios', icon: 'icono3.png', color: 'bg-red-100' },
    { nombre: 'Accesorios', icon: 'icono3.png', color: 'bg-red-100' },

  ];

  ngAfterViewInit() {
    this.updateButtonState();
    this.carousel.nativeElement.addEventListener('scroll', () => this.updateButtonState());
  }

  scrollLeft() {
    this.carousel.nativeElement.scrollBy({ left: -this.carousel.nativeElement.clientWidth, behavior: 'smooth' });
  }

  scrollRight() {
    this.carousel.nativeElement.scrollBy({ left: this.carousel.nativeElement.clientWidth, behavior: 'smooth' });
  }

  updateButtonState() {
    const scrollLeft = this.carousel.nativeElement.scrollLeft;
    const maxScrollLeft = this.carousel.nativeElement.scrollWidth - this.carousel.nativeElement.clientWidth;
    this.isScrollLeftDisabled = scrollLeft <= 0;
    this.isScrollRightDisabled = scrollLeft >= maxScrollLeft;
  }
}
