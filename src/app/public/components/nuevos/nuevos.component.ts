import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-nuevos',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './nuevos.component.html',
  styleUrl: './nuevos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NuevosComponent {

  products = [
    {
      image: 'https://m.media-amazon.com/images/I/81axxWRTWzL._AC_SL1500_.jpg',
      category: 'Fresh Fruit',
      name: 'Seeds of Change Organic Red Rice',
      price: 28.85,
      originalPrice: 33.80,
      sold: 108,
      total: 387,
      discount: 13,
      new: false,
      hot: false
    },
    {
      image: 'https://m.media-amazon.com/images/I/81axxWRTWzL._AC_SL1500_.jpg',
      category: 'Baking material',
      name: 'Angie’s Sweet & Salty Kettle Corn',
      price: 48.85,
      originalPrice: 52.00,
      sold: 82,
      total: 83,
      discount: 8,
      new: true,
      hot: false
    },
    {
      image: 'https://m.media-amazon.com/images/I/81axxWRTWzL._AC_SL1500_.jpg',
      category: 'Baking material',
      name: 'Foster Farms Takeout Crispy Classic',
      price: 17.85,
      originalPrice: 19.00,
      sold: 60,
      total: 80,
      discount: 10,
      new: false,
      hot: false
    },
    {
      image: 'https://m.media-amazon.com/images/I/81axxWRTWzL._AC_SL1500_.jpg',
      category: 'Fresh Fruit',
      name: 'Blue Almonds Lightly Salted Vegetables',
      price: 23.85,
      originalPrice: 35.00,
      sold: 102,
      total: 262,
      discount: 8,
      new: false,
      hot: true
    }
  ];
}