import { CommonModule } from '@angular/common'; // Importación para standalone si es necesario
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-categorias',
  imports: [CommonModule],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements AfterViewInit {
  constructor(private router: Router) {}

  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;
  isScrollLeftDisabled = true;
  isScrollRightDisabled = false;

  categorias = [
    {
      nombre: 'Ropa',
      icon: 'assets/icons/ropa.svg',
      color: 'bg-primary/5 hover:bg-primary/10',
    },
    {
      nombre: 'Zapatos',
      icon: 'assets/icons/zapato.svg',
      color: 'bg-primary/5 hover:bg-primary/10',
    },
    {
      nombre: 'Accesorios',
      icon: 'assets/icons/accesorios.svg',
      color: 'bg-primary/5 hover:bg-primary/10',
    },
    {
      nombre: 'Juguetes',
      icon: 'assets/icons/juguetes.svg',
      color: 'bg-primary/5 hover:bg-primary/10',
    },
    {
      nombre: 'Hogar',
      icon: 'assets/icons/hogar.svg',
      color: 'bg-primary/5 hover:bg-primary/10',
    },
    {
      nombre: 'Escuela',
      icon: 'assets/icons/escuela.svg',
      color: 'bg-primary/5 hover:bg-primary/10',
    },
    {
      nombre: 'Belleza',
      icon: 'assets/icons/Belleza.svg',
      color: 'bg-primary/5 hover:bg-primary/10',
    },
  ];

  ngAfterViewInit() {
    this.updateButtonState();
    this.carousel.nativeElement.addEventListener('scroll', () =>
      this.updateButtonState()
    );

    // Mejorar la experiencia en móvil con gestos de toque
    this.setupTouchNavigation();
  }

  private setupTouchNavigation() {
    let startX = 0;
    let scrollLeft = 0;
    let isDown = false;

    this.carousel.nativeElement.addEventListener(
      'touchstart',
      (e: TouchEvent) => {
        isDown = true;
        startX = e.touches[0].pageX - this.carousel.nativeElement.offsetLeft;
        scrollLeft = this.carousel.nativeElement.scrollLeft;
      }
    );

    this.carousel.nativeElement.addEventListener(
      'touchmove',
      (e: TouchEvent) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - this.carousel.nativeElement.offsetLeft;
        const walk = (x - startX) * 2;
        this.carousel.nativeElement.scrollLeft = scrollLeft - walk;
      }
    );

    this.carousel.nativeElement.addEventListener('touchend', () => {
      isDown = false;
    });
  }

  scrollLeft() {
    const scrollAmount =
      window.innerWidth < 640
        ? this.carousel.nativeElement.clientWidth * 0.8
        : this.carousel.nativeElement.clientWidth;

    this.carousel.nativeElement.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });
  }

  scrollRight() {
    const scrollAmount =
      window.innerWidth < 640
        ? this.carousel.nativeElement.clientWidth * 0.8
        : this.carousel.nativeElement.clientWidth;

    this.carousel.nativeElement.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  }

  updateButtonState() {
    const scrollLeft = this.carousel.nativeElement.scrollLeft;
    const maxScrollLeft =
      this.carousel.nativeElement.scrollWidth -
      this.carousel.nativeElement.clientWidth;

    // Add small buffer to prevent disabled state when very close to edge
    this.isScrollLeftDisabled = scrollLeft <= 4;
    this.isScrollRightDisabled = scrollLeft >= maxScrollLeft - 5;
  }

  selectCategory(categoria: string): void {
    // Agregar feedback haptic en dispositivos móviles si está disponible
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    this.router.navigate(['/catalogo', categoria]);
  }
}
