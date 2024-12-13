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
      image: 'https://sc04.alicdn.com/kf/Hd47a10a2a6754c4483c5e9171754c994i.jpg',
      category: 'Niños',
      name: 'Lampara de proyector giratorio star',
      price: 28.85,
      originalPrice: 33.80,
      sold: 108,
      total: 387,
      discount: 13,
      new: false,
      hot: false
    },
    {
      image: 'https://uploads.tiendada.com/public/file-storage/im/product/95297b9a-21ad-4c3b-aa87-bab00b60bd90.rs6b0l-1727149172935',
      category: 'Juguetes',
      name: 'Calabaza Capibara - Hallowen',
      price: 48.85,
      originalPrice: 52.00,
      sold: 82,
      total: 83,
      discount: 8,
      new: true,
      hot: false
    },
    {
      image: 'https://rimage.ripley.com.pe/home.ripley/Attachment/MKP/4491/PMP20000449884/full_image-1.jpeg',
      category: 'Juguetes',
      name: 'Tocador con espejo LED para niñas',
      price: 17.85,
      originalPrice: 19.00,
      sold: 60,
      total: 80,
      discount: 10,
      new: false,
      hot: false
    },
    {
      image: 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/126638798_01/w=1500,h=1500,fit=pad',
      category: 'Juguetes',
      name: 'Muñeca Hada voladora con sensor recargable multicolor',
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