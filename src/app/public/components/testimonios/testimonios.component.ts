import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-testimonios',
  standalone: true,
  imports: [],
  templateUrl: './testimonios.component.html',
  styleUrl: './testimonios.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestimoniosComponent {
  // Índice actual del carrusel
  currentSlide = 0;

  // Array de puntos para los controles de navegación
  dots = [0, 1, 2];

  // Mover al testimonio correspondiente
  moveToSlide(index: number) {
    this.currentSlide = index;
  }
}
