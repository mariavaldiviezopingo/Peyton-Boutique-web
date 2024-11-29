import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { ElementRef, HostListener, inject } from '@angular/core';


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
  readonly isLogged = true;
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
