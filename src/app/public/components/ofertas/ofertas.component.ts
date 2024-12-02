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
      nombre: 'Organic Cage Grade A Large Eggs',
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
      nombre: 'Naturally Flavored Cinnamon Vanilla',
      marca: 'Hamberger Hel',
      precioActual: '$51.00',
      precioAnterior: '$55.00',
      imagen: 'https://www.maybelline.es/-/media/project/loreal/brand-sites/mny/emea/iberic/tips-and-trends/productos-basicos-de-maquillaje/productos-basicos-de-maquillaje_0.jpg?la=es-es&h=349&w=624&rev=50d56cb1cf11407882d815e667fc3bbc&hash=2B10585742F38F4577E56E6F0BD5AEAE',
      timer: [
        { value: '00', label: 'Days' },
        { value: '00', label: 'Hours' },
        { value: '00', label: 'Mins' },
        { value: '00', label: 'Secs' },
      ],
    },
    {
      nombre: 'Naturally Flavored Cinnamon Vanilla',
      marca: 'Hamberger Hel',
      precioActual: '$51.00',
      precioAnterior: '$55.00',
      imagen: 'https://www.maybelline.es/-/media/project/loreal/brand-sites/mny/emea/iberic/tips-and-trends/productos-basicos-de-maquillaje/productos-basicos-de-maquillaje_0.jpg?la=es-es&h=349&w=624&rev=50d56cb1cf11407882d815e667fc3bbc&hash=2B10585742F38F4577E56E6F0BD5AEAE',
      timer: [
        { value: '00', label: 'Days' },
        { value: '00', label: 'Hours' },
        { value: '00', label: 'Mins' },
        { value: '00', label: 'Secs' },
      ],
    },
    {
      nombre: 'Naturally Flavored Cinnamon Vanilla',
      marca: 'Hamberger Hel',
      precioActual: '$51.00',
      precioAnterior: '$55.00',
      imagen: 'https://www.maybelline.es/-/media/project/loreal/brand-sites/mny/emea/iberic/tips-and-trends/productos-basicos-de-maquillaje/productos-basicos-de-maquillaje_0.jpg?la=es-es&h=349&w=624&rev=50d56cb1cf11407882d815e667fc3bbc&hash=2B10585742F38F4577E56E6F0BD5AEAE',
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
