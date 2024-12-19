import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../components';
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NgOptimizedImage, ProductCardComponent, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent {
  mainImageSrc: string = 'images/logo_peyton.webp';

  changeMainImage(newSrc: string): void {
    this.mainImageSrc = newSrc;
  }

  quantity: number = 1;

  increment() {
    this.quantity++;
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
