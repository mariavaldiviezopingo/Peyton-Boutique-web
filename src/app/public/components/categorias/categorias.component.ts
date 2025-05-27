import { CommonModule } from '@angular/common'; // Importación para standalone si es necesario
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router

@Component({
    selector: 'app-categorias',
    imports: [CommonModule],
    templateUrl: './categorias.component.html',
    styleUrls: ['./categorias.component.css',]
})
export class CategoriasComponent implements AfterViewInit {

  constructor(private router: Router) {} 

  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;
  isScrollLeftDisabled = true;
  isScrollRightDisabled = false;

  categorias = [
    { nombre: 'Ropa', icon: 'assets/icons/ropa.svg', color: 'bg-blue-100' },
    { nombre: 'Zapatos', icon: 'assets/icons/zapato.svg', color: 'bg-green-100' },
    { nombre: 'Accesorios', icon: 'assets/icons/accesorios.svg', color: 'bg-red-100' },
    { nombre: 'Juguetes', icon: 'assets/icons/juguetes.svg', color: 'bg-orange-100' },
    { nombre: 'Hogar', icon: 'assets/icons/hogar.svg', color: 'bg-purple-100' },
    { nombre: 'Escuela', icon: 'assets/icons/escuela.svg', color: 'bg-blue-100' },
    { nombre: 'Belleza', icon: 'assets/icons/Belleza.svg', color: 'bg-green-100' },

  ];


  selectCategory(categoria: string): void {
    this.router.navigate(['/catalogo', categoria]);
  }

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
