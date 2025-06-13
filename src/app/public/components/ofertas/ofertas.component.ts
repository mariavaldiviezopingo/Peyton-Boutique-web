import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
  signal,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface TimerItem {
  value: string;
  label: string;
}

interface Oferta {
  id?: string;
  nombre: string;
  marca: string;
  precioActual: string;
  precioAnterior: string;
  imagen: string;
  timer: TimerItem[];
  category?: string;
  stock?: number;
  rating?: number;
}

@Component({
  selector: 'app-ofertas',
  imports: [CommonModule],
  templateUrl: './ofertas.component.html',
  styleUrl: './ofertas.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfertasComponent implements OnInit, OnDestroy {
  private intervalId?: number;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Signal para las ofertas
  ofertas = signal<Oferta[]>([
    {
      id: 'set-cocina-ninos',
      nombre: 'Set de cocina para niños completo con accesorios',
      marca: 'Hamberger Hel',
      precioActual: '$21.00',
      precioAnterior: '$24.00',
      imagen: 'https://m.media-amazon.com/images/I/81axxWRTWzL._AC_SL1500_.jpg',
      category: 'Juguetes',
      stock: 15,
      rating: 4.5,
      timer: [
        { value: '87', label: 'Days' },
        { value: '10', label: 'Hours' },
        { value: '59', label: 'Mins' },
        { value: '26', label: 'Secs' },
      ],
    },
    {
      id: 'proyector-navidad',
      nombre: 'Proyector de luces de Navidad LED multicolor',
      marca: 'Navidad',
      precioActual: '$51.00',
      precioAnterior: '$55.00',
      imagen:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkQw7b2QymFm4Y7U-Z1Gsax4B8jG_HQzhAmw&s',
      category: 'Decoración',
      stock: 8,
      rating: 4.2,
      timer: [
        { value: '05', label: 'Days' },
        { value: '12', label: 'Hours' },
        { value: '45', label: 'Mins' },
        { value: '30', label: 'Secs' },
      ],
    },
    {
      id: 'maquillaje-ninas',
      nombre: 'Maquillaje para niñas 65 piezas seguro y lavable',
      marca: 'Beauty Kids',
      precioActual: '$35.00',
      precioAnterior: '$42.00',
      imagen:
        'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/19899584_1/w=800,h=800,fit=pad',
      category: 'Belleza',
      stock: 12,
      rating: 4.7,
      timer: [
        { value: '12', label: 'Days' },
        { value: '08', label: 'Hours' },
        { value: '23', label: 'Mins' },
        { value: '15', label: 'Secs' },
      ],
    },
    {
      id: 'juego-cama',
      nombre: 'Juego de cama: Edredón y sábanas de algodón premium',
      marca: 'Hogar Premium',
      precioActual: '$68.00',
      precioAnterior: '$85.00',
      imagen:
        'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/prod16500113_1/public',
      category: 'Hogar',
      stock: 6,
      rating: 4.8,
      timer: [
        { value: '03', label: 'Days' },
        { value: '18', label: 'Hours' },
        { value: '41', label: 'Mins' },
        { value: '52', label: 'Secs' },
      ],
    },
  ]);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startTimer();
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId && isPlatformBrowser(this.platformId)) {
      clearInterval(this.intervalId);
    }
  }

  private startTimer(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.intervalId = window.setInterval(() => {
        this.updateTimers();
      }, 1000);
    }
  }
  // * Esta logica deberia ser remplazada cuando se cnfigure con el backend
  private updateTimers(): void {
    // Obtener las ofertas actuales y crear una copia para modificar
    const currentOfertas = this.ofertas();
    const updatedOfertas = currentOfertas.map((oferta) => {
      const updatedTimer = [...oferta.timer]; // Crear copia del timer

      // Buscar índices de cada unidad de tiempo
      const secsIndex = updatedTimer.findIndex(
        (t: TimerItem) => t.label === 'Secs'
      );
      const minsIndex = updatedTimer.findIndex(
        (t: TimerItem) => t.label === 'Mins'
      );
      const hoursIndex = updatedTimer.findIndex(
        (t: TimerItem) => t.label === 'Hours'
      );
      const daysIndex = updatedTimer.findIndex(
        (t: TimerItem) => t.label === 'Days'
      );

      if (secsIndex !== -1) {
        let seconds = parseInt(updatedTimer[secsIndex].value);

        if (seconds > 0) {
          // Decrementar segundos
          updatedTimer[secsIndex] = {
            ...updatedTimer[secsIndex],
            value: (seconds - 1).toString().padStart(2, '0'),
          };
        } else {
          // Segundos llegaron a 0, reiniciar a 59 y decrementar minutos
          updatedTimer[secsIndex] = {
            ...updatedTimer[secsIndex],
            value: '59',
          };

          if (minsIndex !== -1) {
            let minutes = parseInt(updatedTimer[minsIndex].value);

            if (minutes > 0) {
              updatedTimer[minsIndex] = {
                ...updatedTimer[minsIndex],
                value: (minutes - 1).toString().padStart(2, '0'),
              };
            } else {
              // Minutos llegaron a 0, reiniciar a 59 y decrementar horas
              updatedTimer[minsIndex] = {
                ...updatedTimer[minsIndex],
                value: '59',
              };

              if (hoursIndex !== -1) {
                let hours = parseInt(updatedTimer[hoursIndex].value);

                if (hours > 0) {
                  updatedTimer[hoursIndex] = {
                    ...updatedTimer[hoursIndex],
                    value: (hours - 1).toString().padStart(2, '0'),
                  };
                } else {
                  // Horas llegaron a 0, reiniciar a 23 y decrementar días
                  updatedTimer[hoursIndex] = {
                    ...updatedTimer[hoursIndex],
                    value: '23',
                  };

                  if (daysIndex !== -1) {
                    let days = parseInt(updatedTimer[daysIndex].value);

                    if (days > 0) {
                      updatedTimer[daysIndex] = {
                        ...updatedTimer[daysIndex],
                        value: (days - 1).toString().padStart(2, '0'),
                      };
                    } else {
                      // Oferta expirada
                      updatedTimer[daysIndex] = {
                        ...updatedTimer[daysIndex],
                        value: '00',
                      };
                    }
                  }
                }
              }
            }
          }
        }
      }

      return {
        ...oferta,
        timer: updatedTimer,
      };
    });

    // Actualizar el signal con las nuevas ofertas
    this.ofertas.set(updatedOfertas);
  }

  onAddToCart(oferta: Oferta): void {
    // TODO: implementart lógica para agregar al carrito
    console.log(`Agregando ${oferta.nombre} al carrito`);
  }

  calculateDiscount(currentPrice: string, originalPrice: string): number {
    const current = parseFloat(currentPrice.replace('$', ''));
    const original = parseFloat(originalPrice.replace('$', ''));
    return Math.round(((original - current) / original) * 100);
  }
}
