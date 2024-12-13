import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-info-contacto-pasa',
  standalone: true,
  imports: [],
  templateUrl: './info-contacto-pasa.component.html',
  styleUrl: './info-contacto-pasa.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoContactoPasaComponent {
  submitForm() {
    console.log('Formulario enviado');
  }
}
