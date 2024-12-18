import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ofertas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ofertas.component.html',
  styleUrl: './ofertas.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfertasComponent  implements OnInit {
  ofertas = [
    {
      nombre: 'Set de cocina para niños',
      marca: 'Hamberger Hel',
      precioActual: '$21.00',
      precioAnterior: '$24.00',
      imagen: 'https://m.media-amazon.com/images/I/81axxWRTWzL._AC_SL1500_.jpg',
      timer: [
        { value: '87', label: 'Days' },
        { value: '10', label: 'Hours' },
        { value: '59', label: 'Mins' },
        { value: '26', label: 'Secs' },
      ],
    },
    {
      nombre: 'Proyector de luces de Navidad',
      marca: 'Navidad',
      precioActual: '$51.00',
      precioAnterior: '$55.00',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkQw7b2QymFm4Y7U-Z1Gsax4B8jG_HQzhAmw&s',
      timer: [
        { value: '00', label: 'Days' },
        { value: '00', label: 'Hours' },
        { value: '00', label: 'Mins' },
        { value: '00', label: 'Secs' },
      ],
    },
    {
      nombre: 'Maquillaje para niñas 65 piezas',
      marca: 'Hamberger Hel',
      precioActual: '$51.00',
      precioAnterior: '$55.00',
      imagen: 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/19899584_1/w=800,h=800,fit=pad',
      timer: [
        { value: '00', label: 'Days' },
        { value: '00', label: 'Hours' },
        { value: '00', label: 'Mins' },
        { value: '00', label: 'Secs' },
      ],
    },
    {
      nombre: 'Juego de cama: Edredon y sábanas',
      marca: 'Hogar',
      precioActual: '$51.00',
      precioAnterior: '$55.00',
      imagen: 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/prod16500113_1/public',
      timer: [
        { value: '00', label: 'Days' },
        { value: '00', label: 'Hours' },
        { value: '00', label: 'Mins' },
        { value: '00', label: 'Secs' },
      ],
    },
    
    // Más productos...
  ];

  ngOnInit(): void {
    // Aquí podrías implementar la lógica para el temporizador real si lo deseas
  }
}
