import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components';
import { SignupComponent } from './public/signup/signup.component';
import { FooterComponent } from './public/footer/footer.component'; 
import { LoginComponent } from './public/login/login.component'; 


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SignupComponent,FooterComponent,LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'peyton-boutique';
}
