import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-form-pago',
  imports: [RouterModule],
  templateUrl: './form-pago.component.html',
  styleUrl: './form-pago.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormPagoComponent {

}
