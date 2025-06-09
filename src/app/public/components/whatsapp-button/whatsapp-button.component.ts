import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatsapp-button.component.html',
  styleUrl: './whatsapp-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhatsappButtonComponent {
  @Input() phoneNumber: string = '51978781880'; // Número con código de país
  @Input() message: string =
    'Hola, me gustaría obtener más información sobre sus servicios.';
  @Input() showText: boolean = false;

  openWhatsApp() {
    const encodedMessage = encodeURIComponent(this.message);
    const whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }
}
