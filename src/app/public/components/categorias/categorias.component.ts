import { CommonModule } from '@angular/common'; // Importación para standalone si es necesario
import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnDestroy,
  computed,
  signal,
} from '@angular/core';
import { Router } from '@angular/router'; // Importa Router

interface CarouselState {
  scrollLeft: number;
  scrollWidth: number;
  clientWidth: number;
  maxScrollLeft: number;
  isInitialized: boolean;
}

@Component({
  selector: 'app-categorias',
  imports: [CommonModule],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements AfterViewInit, OnDestroy {
  constructor(private router: Router) {}

  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;

  private carouselState = signal<CarouselState>({
    scrollLeft: 0,
    scrollWidth: 0,
    clientWidth: 0,
    maxScrollLeft: 0,
    isInitialized: false,
  });

  canScrollLeft = computed(() => {
    const state = this.carouselState();
    return state.scrollLeft > 4; // Buffer de 4px
  });

  canScrollRight = computed(() => {
    const state = this.carouselState();
    return state.scrollLeft < state.maxScrollLeft - 5; // Buffer de 5px
  });

  isScrollLeftDisabled = computed(() => !this.canScrollLeft());
  isScrollRightDisabled = computed(() => !this.canScrollRight());

  shouldShowNavigation = computed(() => {
    const state = this.carouselState();
    return state.isInitialized && state.scrollWidth > state.clientWidth;
  });

  private scrollEventListener?: () => void;
  private touchEventListeners: Array<{
    event: string;
    listener: (e: Event) => void;
  }> = [];

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
    if (!this.carousel?.nativeElement) {
      return;
    }

    this.updateButtonState();

    this.scrollEventListener = () => {
      this.updateButtonState();
    };

    this.carousel.nativeElement.addEventListener(
      'scroll',
      this.scrollEventListener
    );

    this.setupTouchNavigation();
  }

  ngOnDestroy() {
    if (this.scrollEventListener && this.carousel?.nativeElement) {
      this.carousel.nativeElement.removeEventListener(
        'scroll',
        this.scrollEventListener
      );
    }

    this.touchEventListeners.forEach(({ event, listener }) => {
      if (this.carousel?.nativeElement) {
        this.carousel.nativeElement.removeEventListener(
          event,
          listener as EventListener
        );
      }
    });
    this.touchEventListeners = [];
  }

  private setupTouchNavigation() {
    if (!this.carousel?.nativeElement) {
      return;
    }

    let startX = 0;
    let scrollLeft = 0;
    let isDown = false;

    const touchStartListener = (e: TouchEvent) => {
      console.log('👆 Touch start event');
      isDown = true;
      startX = e.touches[0].pageX - this.carousel.nativeElement.offsetLeft;
      scrollLeft = this.carousel.nativeElement.scrollLeft;
    };

    const touchMoveListener = (e: TouchEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.touches[0].pageX - this.carousel.nativeElement.offsetLeft;
      const walk = (x - startX) * 2;
      const newScrollLeft = scrollLeft - walk;

      this.carousel.nativeElement.scrollLeft = newScrollLeft;
    };

    const touchEndListener = () => {
      isDown = false;
    };

    this.carousel.nativeElement.addEventListener(
      'touchstart',
      touchStartListener
    );
    this.carousel.nativeElement.addEventListener(
      'touchmove',
      touchMoveListener
    );
    this.carousel.nativeElement.addEventListener('touchend', touchEndListener);

    this.touchEventListeners.push(
      {
        event: 'touchstart',
        listener: touchStartListener as (e: Event) => void,
      },
      { event: 'touchmove', listener: touchMoveListener as (e: Event) => void },
      { event: 'touchend', listener: touchEndListener as (e: Event) => void }
    );
  }

  scrollLeft() {
    if (!this.carousel?.nativeElement) {
      return;
    }

    const currentScrollLeft = this.carousel.nativeElement.scrollLeft;
    const clientWidth = this.carousel.nativeElement.clientWidth;
    const scrollAmount =
      window.innerWidth < 640 ? clientWidth * 0.8 : clientWidth;
    const newScrollLeft = Math.max(0, currentScrollLeft - scrollAmount);

    this.carousel.nativeElement.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  }

  scrollRight() {
    if (!this.carousel?.nativeElement) {
      return;
    }

    const currentScrollLeft = this.carousel.nativeElement.scrollLeft;
    const clientWidth = this.carousel.nativeElement.clientWidth;
    const scrollWidth = this.carousel.nativeElement.scrollWidth;
    const scrollAmount =
      window.innerWidth < 640 ? clientWidth * 0.8 : clientWidth;
    const maxScrollLeft = scrollWidth - clientWidth;
    const newScrollLeft = Math.min(
      maxScrollLeft,
      currentScrollLeft + scrollAmount
    );

    this.carousel.nativeElement.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  }

  updateButtonState() {
    if (!this.carousel?.nativeElement) {
      return;
    }

    const element = this.carousel.nativeElement;
    const scrollLeft = element.scrollLeft;
    const scrollWidth = element.scrollWidth;
    const clientWidth = element.clientWidth;
    const maxScrollLeft = scrollWidth - clientWidth;

    this.carouselState.set({
      scrollLeft,
      scrollWidth,
      clientWidth,
      maxScrollLeft,
      isInitialized: true,
    });
  }

  selectCategory(categoria: string): void {
    // Agregar feedback haptic en dispositivos móviles si está disponible
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(50);
      } catch (error) {
        // Haptic feedback not available
        console.warn('Haptic feedback not available:', error);
      }
    }

    this.router.navigate(['/catalogo', categoria]);
  }
}
