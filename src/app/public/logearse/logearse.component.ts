import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importa RouterModule

@Component({
    selector: 'app-logearse',
    imports: [RouterModule, CommonModule],
    templateUrl: './logearse.component.html',
    styleUrl: './logearse.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogearseComponent {
  closeModal() {
    console.log('Cerrar modal');
  }

  submitLogin() {
    console.log('Iniciar sesión');
  }
}
