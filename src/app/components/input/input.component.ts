import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
    selector: 'app-input',
    imports: [ReactiveFormsModule],
    templateUrl: './input.component.html',
    styleUrl: './input.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {
  control = input.required<FormControl>();
  label = input.required<string>();
  type = input.required<string>();
  placeholder = input.required<string>();
  errorMessage = input.required<string>();
}
