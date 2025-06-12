import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importación necesaria para ngFor y ngIf

@Component({
  selector: 'app-banner',
  imports: [CommonModule], // Importación de CommonModule
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'], // Corrección en styleUrls (plural)
  changeDetection: ChangeDetectionStrategy.Default,
})
export class BannerComponent {
  slides = [
    {
      image:
        'https://images.unsplash.com/photo-1663970206579-c157cba7edda?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9uZG8lMjBkZSUyMHBhbnRhbGxhJTIwcGFyYSUyMHBjfGVufDB8fDB8fHww',
      alt: 'Slide 1',
    },
    {
      image:
        'https://fotografias.lasexta.com/clipping/cmsimages01/2022/10/06/89BA66AD-53C3-4AFF-8CF7-37175A651B59/fondos-pantalla_98.jpg?crop=1300,731,x0,y19&width=1900&height=1069&optimize=high&format=webply',
      alt: 'Slide 2',
    },
    {
      image:
        'https://marketplace.canva.com/EAFoe6hiEk4/1/0/1600w/canva-fondo-de-pantalla-floral-org%C3%A1nico-rosa-GJjE-IgT0Pg.jpg',
      alt: 'Slide 3',
    },
  ];

  currentSlide = 0;

  selectSlide(index: number): void {
    this.currentSlide = index;
  }

  prevSlide(): void {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }
}
