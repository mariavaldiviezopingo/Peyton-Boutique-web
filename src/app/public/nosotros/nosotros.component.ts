import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { InfoComponent } from '../components';

@Component({
    selector: 'app-nosotros',
    imports: [RouterModule, CommonModule, InfoComponent],
    templateUrl: './nosotros.component.html',
    styleUrl: './nosotros.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NosotrosComponent {

  valores = [
    { 
      nombre: 'Calidad', 
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', 
      descripcion: 'Productos de alta calidad que superan expectativas'
    },
    { 
      nombre: 'Elegancia', 
      icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z', 
      descripcion: 'Estilo y sofisticación en cada pieza'
    },
    { 
      nombre: 'Innovación', 
      icon: 'M13 10V3L4 14h7v7l9-11h-7z', 
      descripcion: 'Siempre a la vanguardia de las tendencias'
    },
    { 
      nombre: 'Servicio', 
      icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', 
      descripcion: 'Atención personalizada y excepcional'
    }
  ];

}
