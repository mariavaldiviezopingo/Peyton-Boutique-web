import { ChangeDetectionStrategy, Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CategoriaComponent } from './categoria/categoria.component';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CategoriaComponent ],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriasComponent {
  @ViewChild('carousel') carousel: ElementRef | undefined;
  @ViewChild('carouselContainer') carouselContainer: ElementRef | undefined;
  
  translateX: number = 0;
  itemWidth: number = 0;
  totalScroll: number = 0; 

  ngAfterViewInit() {
    this.itemWidth = (this.carouselContainer?.nativeElement.offsetWidth || 1) / 4; // Ajusta según el número de elementos por vista
    this.totalScroll = this.carousel?.nativeElement.scrollWidth - this.carouselContainer?.nativeElement.offsetWidth;
  }

  moveNext() {
    this.translateX = Math.min(this.translateX + this.itemWidth, this.totalScroll);
  }

  movePrev() {
    this.translateX = Math.max(this.translateX - this.itemWidth, 0);
  }
}
