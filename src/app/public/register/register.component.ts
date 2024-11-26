import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {  
  onSubmit() {
    // Lógica para manejar el registro    
    console.log('Formulario enviado');
  }
}
