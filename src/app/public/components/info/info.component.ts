import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoComponent {

}
