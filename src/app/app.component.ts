import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'peyton-boutique';
  logo = 'assets/img/login_image.webp';

  private authService = inject(AuthService);

  ngOnInit(): void {
    // Esto intenta validar el token y cargar el usuario actual si existe en localStorage
    this.authService.validateCurrentToken().subscribe();
  }
}
