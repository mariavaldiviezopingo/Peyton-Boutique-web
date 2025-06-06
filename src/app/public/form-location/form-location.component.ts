import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-form-location',
  imports: [RouterModule],
  templateUrl: './form-location.component.html',
  styleUrl: './form-location.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormLocationComponent {

}
