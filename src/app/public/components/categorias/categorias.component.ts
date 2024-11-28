import { Component, AfterViewInit,ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swiper, { Navigation, Pagination } from 'swiper';

// Importa los módulos necesarios de Swiper
Swiper.use([Pagination]);

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriasComponent implements AfterViewInit {
  slides: string[] = ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4', 'Slide 5', 'Slide 6'];

  ngAfterViewInit(): void {
    new Swiper('.centered-slide-carousel', {
      centeredSlides: true,
      loop: true,
      spaceBetween: 0,
      slideToClickedSlide: true,
      pagination: {
        el: '.centered-slide-carousel .swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        1920: { slidesPerView: 4, spaceBetween: 30 },
        1440: { slidesPerView: 3, spaceBetween: 20 }, // Nuevo breakpoint
        1280: { slidesPerView: 3, spaceBetween: 15 }, // Nuevo breakpoint
        1028: { slidesPerView: 2, spaceBetween: 10 },
        768: { slidesPerView: 2, spaceBetween: 8 },  // Nuevo breakpoint
        990: { slidesPerView: 1, spaceBetween: 0 },
      }
    });
  }
}
