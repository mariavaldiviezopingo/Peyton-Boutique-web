import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-banner',
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class BannerComponent implements OnInit, OnDestroy {
  slides = [
    {
      image:
        'https://images.unsplash.com/photo-1663970206579-c157cba7edda?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9uZG8lMjBkZSUyMHBhbnRhbGxhJTIwcGFyYSUyMHBjfGVufDB8fDB8fHww',
      alt: 'Colección Primavera - Descubre los últimos estilos',
    },
    {
      image:
        'https://fotografias.lasexta.com/clipping/cmsimages01/2022/10/06/89BA66AD-53C3-4AFF-8CF7-37175A651B59/fondos-pantalla_98.jpg?crop=1300,731,x0,y19&width=1900&height=1069&optimize=high&format=webply',
      alt: 'Ofertas Especiales - Hasta 50% de descuento',
    },
    {
      image:
        'https://marketplace.canva.com/EAFoe6hiEk4/1/0/1600w/canva-fondo-de-pantalla-floral-org%C3%A1nico-rosa-GJjE-IgT0Pg.jpg',
      alt: 'Nueva Temporada - Productos exclusivos',
    },
  ];

  currentSlide = 0;
  private autoPlayInterval: ReturnType<typeof setInterval> | null = null;
  private readonly autoPlayDelay = 5000; // 5 segundos
  isAutoPlaying = true;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.startAutoPlay();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.isBrowser) {
      this.stopAutoPlay();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.isBrowser && this.isAutoPlaying) {
      this.startAutoPlay();
    }
  }

  private startAutoPlay(): void {
    this.stopAutoPlay();
    if (this.isBrowser) {
      this.autoPlayInterval = setInterval(() => {
        this.nextSlide();
      }, this.autoPlayDelay);
    }
  }

  private stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  selectSlide(index: number): void {
    this.currentSlide = index;
    // Reiniciar autoplay cuando se selecciona manualmente
    if (this.isBrowser && this.isAutoPlaying) {
      this.startAutoPlay();
    }
  }

  prevSlide(): void {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    // Reiniciar autoplay
    if (this.isBrowser && this.isAutoPlaying) {
      this.startAutoPlay();
    }
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    // Reiniciar autoplay
    if (this.isBrowser && this.isAutoPlaying) {
      this.startAutoPlay();
    }
  }

  toggleAutoPlay(): void {
    this.isAutoPlaying = !this.isAutoPlaying;
    if (this.isBrowser) {
      if (this.isAutoPlaying) {
        this.startAutoPlay();
      } else {
        this.stopAutoPlay();
      }
    }
  }
}
