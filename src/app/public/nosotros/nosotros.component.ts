import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NosotrosComponent {

}
