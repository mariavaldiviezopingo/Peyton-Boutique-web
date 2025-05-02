import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogearseComponent } from '../logearse/logearse.component';
@Component({
    selector: 'app-pasarela-pagos',
    imports: [RouterModule, CommonModule, LogearseComponent],
    templateUrl: './pasarela-pagos.component.html',
    styleUrl: './pasarela-pagos.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasarelaPagosComponent {

}
