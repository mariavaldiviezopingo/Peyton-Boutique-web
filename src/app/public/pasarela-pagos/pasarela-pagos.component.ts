import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { InfoContactoPasaComponent } from '../info-contacto-pasa/info-contacto-pasa.component';
import { LogearseComponent } from '../logearse/logearse.component';
@Component({
    selector: 'app-pasarela-pagos',
    imports: [RouterModule, CommonModule, InfoContactoPasaComponent, LogearseComponent],
    templateUrl: './pasarela-pagos.component.html',
    styleUrl: './pasarela-pagos.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasarelaPagosComponent {

}
