import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent, HeaderComponent } from './components';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'peyton-boutique';
  logo = 'images/logo_peyton.webp';

  private authService = inject(AuthService);

  ngOnInit(): void {
    // Esto intenta validar el token y cargar el usuario actual si existe en localStorage
    this.authService.validateCurrentToken().subscribe();
  }
}
