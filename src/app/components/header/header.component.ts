import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '@app/services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly message = '';

  private loginService = inject(LoginService);
  isLogged = this.loginService.isLoggedIn$;

  navPosition = this.message ? 'top-6' : 'top-0';
  menuPosition = this.message ? 'top-[6.5rem]' : 'top-20';
  menuVisible = false;

  eRef = inject(ElementRef);

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.menuVisible = !this.menuVisible;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const menuElement = this.eRef.nativeElement.querySelector('#menu');
    if (
      menuElement &&
      !menuElement.contains(event.target) &&
      this.menuVisible
    ) {
      this.menuVisible = false;
    }
  }
}
