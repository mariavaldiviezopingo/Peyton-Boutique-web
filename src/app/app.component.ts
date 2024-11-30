import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
<<<<<<< HEAD
import { HeaderComponent } from './components';
import { SignupComponent } from './public/signup/signup.component';
import { FooterComponent } from './public/footer/footer.component'; 
import { LoginComponent } from './public/login/login.component'; 

=======
import {HeaderComponent} from './components/header/header.component'
import {FooterComponent} from './components/footer/footer.component';
>>>>>>> 87dc97cc6cfccf12211d0e11858e27ec7c84330c

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterOutlet, HeaderComponent, SignupComponent,FooterComponent,LoginComponent],
=======
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
>>>>>>> 87dc97cc6cfccf12211d0e11858e27ec7c84330c
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'peyton-boutique';
  logo = "assets/logo.png";
}
