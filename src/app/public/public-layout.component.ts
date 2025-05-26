import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent, HeaderComponent } from '@app/components';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  template: `
    <app-header></app-header>
    <main><router-outlet></router-outlet></main>
    <app-footer></app-footer>
  `,
})
export class PublicLayoutComponent {}
