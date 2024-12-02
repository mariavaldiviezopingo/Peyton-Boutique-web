import { ChangeDetectionStrategy, Component, ElementRef, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importación necesaria para ngFor y ngIf

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule], // Importación de CommonModule
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css',], // Corrección en styleUrls (plural)
  changeDetection: ChangeDetectionStrategy.Default
})
export class CategoriasComponent {
  categorias = [
    { nombre: 'VESTIDOS', icon: 'assets/icons/vestidos.svg', color: 'bg-green-100' },
    { nombre: 'POLOS', icon: 'assets/icons/polos.svg', color: 'bg-blue-100' },
    { nombre: 'CALZADO', icon: 'assets/icons/calzado.svg', color: 'bg-orange-100' },
    { nombre: 'ABRIGOS', icon: 'assets/icons/abrigos.svg', color: 'bg-purple-100' },
    { nombre: 'JUGUETES', icon: 'assets/icons/juguetes.svg', color: 'bg-yellow-100' },
    { nombre: 'BELLEZA', icon: 'assets/icons/belleza.svg', color: 'bg-red-100' },
  ];

  @ViewChild('carousel') carousel!: ElementRef;

  scrollLeft() {
    this.carousel.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight() {
    this.carousel.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
  }
}
