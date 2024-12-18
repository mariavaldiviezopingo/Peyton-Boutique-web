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
    { nombre: 'Ropa', icon: 'icons/ropa.svg', color: 'bg-blue-100' },
    { nombre: 'Zapatos', icon: 'icons/zapato.svg', color: 'bg-green-100' },
    { nombre: 'Accesorios', icon: 'icons/accesorios.svg', color: 'bg-red-100' },
    { nombre: 'Juguetes', icon: 'icons/juguetes.svg', color: 'bg-orange-100' },
    { nombre: 'Hogar', icon: 'icons/hogar.svg', color: 'bg-purple-100' },
    { nombre: 'Escuela', icon: 'icons/escuela.svg', color: 'bg-blue-100' },
    { nombre: 'Belleza', icon: 'icons/Belleza.svg', color: 'bg-green-100' },

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
