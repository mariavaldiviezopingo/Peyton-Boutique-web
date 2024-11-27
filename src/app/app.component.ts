import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components';
import { LandingComponent } from './public/landing/landing.component';
@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< Updated upstream
  imports: [RouterOutlet, HeaderComponent, SignupComponent],
=======
import { LandingComponent } from './public/landing/landing.component'; // Importa el componente Landing


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LandingComponent],
>>>>>>> 9bc3cd2 (nuevos cambios de luisa)
=======
  imports: [RouterOutlet, HeaderComponent, LandingComponent],
>>>>>>> Stashed changes
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'peyton-boutique';
}
