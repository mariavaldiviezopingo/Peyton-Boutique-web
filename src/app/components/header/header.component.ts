import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importa RouterModule


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly message = '';
  readonly isLogged = false;
  navStyle = this.message ? 'top-6' : 'top-0';
}
